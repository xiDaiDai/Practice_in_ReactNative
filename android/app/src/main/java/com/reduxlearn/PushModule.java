package com.reduxlearn;

import android.content.Context;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.umeng.message.PushAgent;

/**
 * Created by admin on 2016/8/12.
 */
public class PushModule extends ReactContextBaseJavaModule implements LifecycleEventListener{
    private PushAgent mPushAgent;
    private Context context;

    public PushModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "PushModule";
    }

    @Override
    public void onHostResume() {
         mPushAgent = PushAgent.getInstance(context);
    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }

    @ReactMethod
    public void disablePushService(){
        mPushAgent.disable();
    }

    @ReactMethod
    public void enablePushService(){
        mPushAgent.enable();
    }

    @ReactMethod
     public void setTag(String... tag){
        try {
            mPushAgent.getTagManager().add(tag);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void resetTags(){
        try {
            mPushAgent.getTagManager().reset();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
