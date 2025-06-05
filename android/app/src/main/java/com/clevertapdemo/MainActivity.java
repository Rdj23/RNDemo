// File: android/app/src/main/java/com/clevertapdemo/MainActivity.java

package com.clevertapdemo;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

// SoLoader import (legacy overload, still valid for initializing before any JNI loads)
import com.facebook.soloader.SoLoader;

public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
        return "CleverTapDemo";  // Your JS entry-point name
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // ─── Initialize SoLoader EARLY so that RN's delegate never tries to load missing .so ───
        SoLoader.init(this, /* native exopackage */ false);
        //                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        // This ensures “SoLoader.init() not yet called” errors cannot occur,
        // and prevents ReactActivityDelegate from triggering feature-flags JNI.

        super.onCreate(savedInstanceState);
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        // By passing (false, false), we force the RN delegate to skip any
        // Fabric/TurboModules and thus skip feature-flags JNI entirely.
        boolean fabricEnabled = false;
        boolean turboModuleEnabled = false;

        return new DefaultReactActivityDelegate(
            this,
            getMainComponentName(),
            fabricEnabled,
            turboModuleEnabled
        );
    }
}
