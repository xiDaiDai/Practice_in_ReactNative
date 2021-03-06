package com.reduxlearn;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;

import com.brentvatne.react.ReactVideoPackage;
import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.greatdroid.reactnative.media.MediaKitPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.microsoft.codepush.react.CodePush;
import com.umeng.message.PushAgent;
import com.umeng.message.UmengRegistrar;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {
    private CodePush _codePush;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "reduxLearn";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSBundleFile() {
        return this._codePush.getBundleUrl("index.android.bundle");
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {

        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new AndroidReactPackage(),
                new MediaKitPackage(),
                new CodePush(this.getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), this, BuildConfig.DEBUG)

        );
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Context context = getApplicationContext();
        PushAgent mPushAgent = PushAgent.getInstance(context);
        mPushAgent.enable();
        PushAgent.getInstance(context).onAppStart();
        String device_token = UmengRegistrar.getRegistrationId(context);

        AlarmModule.cancelAlarm(context);
        AlarmModule.setAlarm(context);

    }
}
