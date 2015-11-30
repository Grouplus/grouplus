package com.grouplus;

/**
 * Created by daisyluo on 2015-11-29.
 */
import android.app.Activity;
import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.os.Environment;
import android.os.Parcelable;
import android.provider.MediaStore;
import android.util.Base64;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ImagePickerModule extends ReactContextBaseJavaModule implements ActivityResultListener {
    static final int REQUEST_LAUNCH_CAMERA = 1;
    static final int REQUEST_LAUNCH_IMAGE_LIBRARY = 2;

    private final ReactApplicationContext mReactContext;
    private final MainActivity mMainActivity;

    private Uri mCameraCaptureURI;
    private Callback mCallback;
    private String fileString;

    public ImagePickerModule(ReactApplicationContext reactContext, MainActivity mainActivity) {
        super(reactContext);

        mReactContext = reactContext;
        mMainActivity = mainActivity;

        mMainActivity.addActivityResultListener(this);
    }

    @Override
    public String getName() {
        return "UIImagePickerManager"; // To coincide with the iOS native module name
    }

    // NOTE: Currently not reentrant / doesn't support concurrent requests
    @ReactMethod
    public void launchCamera(ReadableMap options, Callback callback) throws FileNotFoundException {
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (cameraIntent.resolveActivity(mMainActivity.getPackageManager()) != null) {
            File imageFile = null;
            try {
                imageFile = File.createTempFile("exponent_capture_", ".jpg",
                        Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES));
            } catch (IOException e) {
                Toast.makeText(mMainActivity.getApplicationContext(),
                        "Error creating temporary image.", Toast.LENGTH_SHORT)
                        .show();
                return;
            }
            mCameraCaptureURI = Uri.fromFile(imageFile);
            cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, mCameraCaptureURI);
            mCallback = callback;
            fileString = generateString(imageFile);
            mMainActivity.startActivityForResult(cameraIntent, REQUEST_LAUNCH_CAMERA);
        }
    }

    private String generateString(File imageFile) throws FileNotFoundException {
        InputStream inputStream = new FileInputStream(imageFile);//You can get an inputStream using any IO API
        byte[] bytes;
        byte[] buffer = new byte[8192];
        int bytesRead;
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try {
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                output.write(buffer, 0, bytesRead);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        bytes = output.toByteArray();
        String encodedString = Base64.encodeToString(bytes, Base64.DEFAULT);
        return encodedString;
    }

    // NOTE: Currently not reentrant / doesn't support concurrent requests
    @ReactMethod
    public void launchImageLibrary(ReadableMap options, Callback callback) {
        Intent libraryIntent = new Intent();
        libraryIntent.setType("image/");
        libraryIntent.setAction(Intent.ACTION_GET_CONTENT);
        mCallback = callback;
        mMainActivity.startActivityForResult(libraryIntent, REQUEST_LAUNCH_IMAGE_LIBRARY);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_LAUNCH_CAMERA || requestCode == REQUEST_LAUNCH_IMAGE_LIBRARY) {
            if (resultCode == Activity.RESULT_OK) {
                String s = requestCode == REQUEST_LAUNCH_CAMERA ? fileString : "";
                WritableMap response = Arguments.createMap();
                response.putString("stringPhoto", s);
                mCallback.invoke(false, response);
            } else if (resultCode == Activity.RESULT_CANCELED) {
                mCallback.invoke(true, Arguments.createMap());
            } else {
                Toast.makeText(mMainActivity.getApplicationContext(),
                        "Error reading image.", Toast.LENGTH_SHORT)
                        .show();
            }
        }
    }
}
