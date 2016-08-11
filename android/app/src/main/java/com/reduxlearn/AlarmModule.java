package com.reduxlearn;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Calendar;

/**
 * Created by admin on 2016/8/10.
 */
public class AlarmModule extends ReactContextBaseJavaModule {

    public AlarmModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AlarmModule";
    }

    @ReactMethod
    public void setAlarm(int sec) {
        Activity currenActivity = getCurrentActivity();
        if(currenActivity== null) return;
        Intent intent =new Intent(getCurrentActivity(), AlarmReceiver.class);
        intent.setAction("short");
        PendingIntent sender=
                PendingIntent.getBroadcast(currenActivity, 0, intent, 0);

        //设定一个五秒后的时间
        Calendar calendar=Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.add(Calendar.SECOND, sec);
        AlarmManager alarm=(AlarmManager)currenActivity.getSystemService(currenActivity.ALARM_SERVICE);
        alarm.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);
    }
}
