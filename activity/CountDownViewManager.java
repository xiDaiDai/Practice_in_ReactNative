package component;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import view.DonutProgress;

/**
 * Created by admin on 2016/11/4.
 */
public class CountDownViewManager extends SimpleViewManager<DonutProgress> {



    @Override
    public String getName() {
        return "RCTCountDownView";
    }

    @Override
    protected DonutProgress createViewInstance(ThemedReactContext reactContext) {
        DonutProgress donutProgress = new DonutProgress(reactContext);
        return donutProgress;
    }

    @ReactProp(name = "start")
    public void start(DonutProgress donutProgress,boolean start){
        if(start){
            donutProgress.createTask();
        }
    }
}
