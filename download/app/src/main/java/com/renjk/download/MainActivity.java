package com.renjk.download;

import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.webkit.DownloadListener;
import android.widget.Button;
import android.widget.LinearLayout;

import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity implements DownloadVideoListener{
    private Button btn,btn_control;
    private DonutProgress progress;
    int percent=0;
    int startInnerValue = 5;
    private Timer timer;
    private TimerTask task;
    private Handler doActionHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            int msgId = msg.what;

            switch (msgId) {
                case 1:
                    progress.setDonut_progress(String.valueOf((percent++)/10));
                    if(percent==1000&&startInnerValue>0){
                        percent=0;
                        progress.setText(String.valueOf(--startInnerValue));
                    }else if(startInnerValue<=0){
                        timer.cancel();
                        progress.setText(String.valueOf(0));
                        progress.setDonut_progress(String.valueOf(0));
                    }

                    break;
                default:
                    break;
            }
        }
    };
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btn_control = (Button) findViewById(R.id.btn_control);
        progress = (DonutProgress) findViewById(R.id.donut_progress);
        progress.setTextSize(100);
        btn_control.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                progress.createTask();
            }
        });



    }


    @Override
    protected void onResume() {
        super.onResume();
//        createTask();
    }

    private void createTask() {
        timer = new Timer();
        task = new TimerTask() {
            @Override
            public void run() {
                Message message = new Message();
                message.what = 1;
                doActionHandler.sendMessage(message);
            }
        };
        startInnerValue = 5;
        progress.setText(String.valueOf(startInnerValue));
        timer.schedule(task, 0, 1);
    }

    @Override
    public void progress(Integer value) {
         btn.setText(value+"%");
    }

    @Override
    public void success() {

    }

    @Override
    public void fail() {

    }
}
