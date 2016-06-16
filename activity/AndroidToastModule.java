package com.reduxlearn;

import android.widget.Toast;

import com.facebook.drawee.components.DraweeEventTracker;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

public class AndroidToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public AndroidToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    /**
     * getName方法。这个函数用于返回一个字符串名字,就是js中的模块名
     */
    @Override
    public String getName() {
        return "AndroidToast";
    }

    /**
     * 返回了需要导出给JavaScript使用的常量
     */
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    /**
     * 导出给js使用的方法，需要使用注解@ReactMethod。方法的返回类型必须为void
     */
    @ReactMethod
    public void showToast(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
        WritableMap params = Arguments.createMap();
        params.putString("event","Android send event to ReactNative");
        sendEvent(getReactApplicationContext(), "toastShowEvent", params);

    }

    @ReactMethod
    public void measureLayout(Callback errorCallback,
                              Callback successCallback) {
        try {
            successCallback.invoke(100, 100, 200, 200);
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());

        }

    }

     @ReactMethod
    public void measureLayoutPromise(String message,Promise promise) {
         try {
            promise.resolve(message);
        } catch (IllegalViewOperationException e) {
            promise.reject(e.getMessage());

        }

    }


    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }





}