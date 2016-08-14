package com.reduxlearn;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import java.util.Calendar;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

/**
 * Created by admin on 2016/8/10.
 */
public class AlarmModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private static SharedPreferences sharedPreferences;
    private static Context context ;
    private static Activity activity;


    public AlarmModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        sharedPreferences = reactContext.getSharedPreferences("timer",Context.MODE_PRIVATE);
    }

    @Override
    public String getName() {
        return "AlarmModule";
    }

    @ReactMethod
    public void setAlarm(int sec,String title,String content) {
        Activity currenActivity = getCurrentActivity();
        if(currenActivity== null) return;
        Intent intent =new Intent(getCurrentActivity(), AlarmReceiver.class);
        intent.putExtra("title",title);
        intent.putExtra("content",content);
        intent.setAction("short");
        PendingIntent sender=
                PendingIntent.getBroadcast(currenActivity, 0, intent, 0);

        //设定一个五秒后的时间
        Calendar calendar=Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());

        calendar.add(Calendar.SECOND, sec);
        AlarmManager alarm=(AlarmManager)currenActivity.getSystemService(currenActivity.ALARM_SERVICE);
        alarm.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);

        AlarmObj alarmObj = new AlarmObj(String.valueOf(calendar.getTimeInMillis()),title,content);
        Gson gson = new Gson();
        String alarmStr = gson.toJson(alarmObj);
        HashSet set = new HashSet();
        set.add(alarmStr);
        sharedPreferences.edit().putStringSet("alarm", set).commit();

    }


    public static void setAlarm(Context context) {
        Gson gson = new Gson();
        sharedPreferences =  context.getSharedPreferences("timer",Context.MODE_PRIVATE);
        HashSet set = (HashSet) sharedPreferences.getStringSet("alarm", null);
        if(set == null) return;

        Iterator<String> iterator=set.iterator();
        while(iterator.hasNext()){
            String alarmStr = iterator.next();
            Log.e("alarmer",alarmStr);
            AlarmObj alarmObj = gson.fromJson(alarmStr, AlarmObj.class);
            if(Long.valueOf(alarmObj.getTime()) > System.currentTimeMillis()) {
                Intent intent = new Intent(context, AlarmReceiver.class);
                intent.putExtra("title", alarmObj.getTitle());
                intent.putExtra("content", alarmObj.getContent());
                intent.setAction("short");
                PendingIntent sender =
                        PendingIntent.getBroadcast(context, 0, intent, 0);
                Calendar calendar = Calendar.getInstance();
                calendar.setTimeInMillis(Long.valueOf(alarmObj.getTime()));
                AlarmManager alarm = (AlarmManager) context.getSystemService(activity.ALARM_SERVICE);
                alarm.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);
            }
        }

    }

    public static void cancelAlarm(Context context){


        Intent intent =new Intent(context, AlarmReceiver.class);
        PendingIntent sender=
                PendingIntent.getBroadcast(context, 0, intent, 0);
        AlarmManager alarm=(AlarmManager)context.getSystemService(activity.ALARM_SERVICE);
        alarm.cancel(sender);
    }

    @Override
    public void onHostResume() {
        activity = getCurrentActivity();
    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }
}
