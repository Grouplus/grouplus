package com.grouplus;

/**
 * Created by daisyluo on 2015-11-29.
 */
import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Environment;
import android.os.Parcelable;
import android.provider.MediaStore;
import android.util.Base64;
import android.widget.ImageView;
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
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
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
    private File imageFile;
    private File shareImage;
    private Uri shareUri;
    private Bitmap myBitmap;

    public ImagePickerModule(ReactApplicationContext reactContext, MainActivity mainActivity) {
        super(reactContext);

        mReactContext = reactContext;
        mMainActivity = mainActivity;
       // imageFile = new File();
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
            mMainActivity.startActivityForResult(cameraIntent, REQUEST_LAUNCH_CAMERA);
        }
    }


    private String generateString(File file){
        InputStream inputStream = null;//You can get an inputStream using any IO API
        try {
            inputStream = new FileInputStream(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        byte[] bytes;
        byte[] buffer = new byte[100000];
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

    @ReactMethod
    public void shareApp(String imgurl){
        Intent sendIntent = new Intent(Intent.ACTION_SEND);
        sendIntent.setType("application/jpeg");  //list will be smaller

        try {
            URL url = new URL(imgurl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            myBitmap = BitmapFactory.decodeStream(input);
        } catch (IOException e) {
            e.printStackTrace();
        }

        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        myBitmap.compress(Bitmap.CompressFormat.JPEG, 100, bytes);
        String path = MediaStore.Images.Media.insertImage(mReactContext.getContentResolver(), myBitmap, "Title", null);
        System.out.println("emma" + Uri.parse(path));
        sendIntent.putExtra(Intent.EXTRA_STREAM, Uri.parse(path));
        mMainActivity.startActivity(Intent.createChooser(sendIntent, "Send preview via"));
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_LAUNCH_CAMERA || requestCode == REQUEST_LAUNCH_IMAGE_LIBRARY) {
            if (resultCode == Activity.RESULT_OK) {
                Uri uri = requestCode == REQUEST_LAUNCH_CAMERA ? mCameraCaptureURI : data.getData();
                String result=generateString(imageFile);
                WritableMap response = Arguments.createMap();
                response.putString("uri", uri.toString());
                response.putString("data", result);
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
