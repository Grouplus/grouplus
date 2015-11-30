package com.grouplus;

import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import com.facebook.react.LifecycleState;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import me.nucleartux.date.ReactDatePackage;
import com.smixx.reactnativeicons.ReactNativeIcons;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.smixx.reactnativeicons.IconFont; 
import com.grouplus.CalendarPackage;
import android.content.Intent; 
import com.magus.fblogin.FacebookLoginPackage;


public class MainActivity extends FragmentActivity implements DefaultHardwareBackBtnHandler {

    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;
    private FacebookLoginPackage mFacebookLoginPackage;
    private List<ActivityResultListener> mListeners = new ArrayList<>();

    public void addActivityResultListener(ActivityResultListener listener){
        mListeners.add(listener);
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mReactRootView = new ReactRootView(this);
        mFacebookLoginPackage = new FacebookLoginPackage(this);

        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new ReactNativeIcons()) 
                .addPackage(new ReactDatePackage(this))
                .addPackage(new CameraPackage(this))
                .addPackage(new CalendarPackage())
                .addPackage(new ImagePickerPackage(this))
                .addPackage(mFacebookLoginPackage)                
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(LifecycleState.RESUMED)
                .build();

        mReactRootView.startReactApplication(mReactInstanceManager, "Grouplus", null);

        setContentView(mReactRootView);
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }

    @Override
    public void onBackPressed() {
      if (mReactInstanceManager != null) {
        mReactInstanceManager.onBackPressed();
      } else {
        super.onBackPressed();
      }
    }

    @Override
    public void invokeDefaultOnBackPressed() {
      super.onBackPressed();
    }

    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onPause();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onResume(this);
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        for (ActivityResultListener listener : mListeners) {
            listener.onActivityResult(requestCode, resultCode, data);
        }
    }
}
