package com.reduxlearn;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Collections;

public class AndroidReactPackage implements ReactPackage {


    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        // 这里的MyToastModule是之前他添加的module
        modules.add(new AndroidToastModule(reactContext));
        modules.add(new ImagePickerModule(reactContext));
        modules.add(new AlarmModule(reactContext));

        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        // TODO Auto-generated method stub
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        // TODO Auto-generated method stub
        return Arrays.<ViewManager>asList(
                new ReactWebViewManager());//////
    }

}