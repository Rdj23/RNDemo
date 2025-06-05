// File: android/app/src/main/java/com/clevertapdemo/MainApplication.java

package com.clevertapdemo;

import android.app.Application;
import android.content.Context;

// CleverTap imports (only if you are using CleverTap)
import com.clevertap.android.sdk.ActivityLifecycleCallback;
import com.clevertap.react.CleverTapPackage;
import com.clevertap.android.sdk.CleverTapAPI;
import com.clevertap.react.CleverTapApplication;

// React Native imports
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultReactNativeHost;

// SoLoader imports for RN 0.79.2
import com.facebook.soloader.SoLoader;
import com.facebook.react.soloader.OpenSourceMergedSoMapping;

import java.io.IOException;
import java.util.List;

public class MainApplication extends CleverTapApplication implements ReactApplication {

    // ─── 1) Use DefaultReactNativeHost so we can override isNewArchEnabled() & isHermesEnabled() ───
    private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // If CleverTapPackage isn’t autolinked, add it manually:
            return new PackageList(this).getPackages();
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
            // Bound to android/gradle.properties: newArchEnabled=false
            return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
            // Bound to android/gradle.properties: enableHermes=false
            return BuildConfig.IS_HERMES_ENABLED;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    // ─── 2) onCreate must not declare "throws", so catch IOException internally ───
    @Override
    public void onCreate() {
        // Initialize SoLoader with the Kotlin-object INSTANCE
        try {
            SoLoader.init(this, OpenSourceMergedSoMapping.INSTANCE);
        } catch (IOException e) {
            // In dev, print the stack; in production you might log this to your error-tracker
            e.printStackTrace();
        }

        super.onCreate();

        // DO NOT call DefaultNewArchitectureEntryPoint.load() (newArchEnabled=false)

        // CleverTap lifecycle registration (if using CleverTap)
        ActivityLifecycleCallback.register(this);
        CleverTapAPI.setDebugLevel(CleverTapAPI.LogLevel.VERBOSE);
    }

    // Must match ContextWrapper.attachBaseContext exactly
    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        // If you ever need multidex, add MultiDex.install(this) here
    }
}
