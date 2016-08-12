package com.reduxlearn;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

/**
 * Created by admin on 2016/8/10.
 */
public class AlarmReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        PendingIntent pendingIntent3 = PendingIntent.getActivity(this, 0,
                new Intent(this, MainActivity.class), 0);
        if(intent.getAction().equals("short")){
            Notification notify= new Notification.Builder(context)
                    .setSmallIcon(R.mipmap.ic_launcher) // 设置状态栏中的小图片，尺寸一般建议在24×24， 这里也可以设置大图标
                    .setTicker("任务的、过期了！")// 设置显示的提示文字
                    .setContentTitle("Title")// 设置显示的标题
                    .setContentText("This is message content")// 消息的详细内容
                    .setNumber(1) // 在TextView的右方显示的数字，可以在外部定义一个变量，点击累加setNumber(count),这时显示的和
                    .getNotification() // 需要注意build()是在API level16及之后增加的，在API11中可以使用getNotificatin()来代替
            ;
            NotificationManager manager =(NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            manager.notify(Notification.FLAG_AUTO_CANCEL, notify);
        }else{
            Toast.makeText(context, "repeating alarm",Toast.LENGTH_LONG).show();
        }
    }
}
