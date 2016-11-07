package com.renjk.download;

import android.content.Context;
import android.os.AsyncTask;
import android.os.Environment;
import android.util.Log;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by admin on 2016/10/28.
 */
public class DownLoadVideo extends AsyncTask<String, Integer, Boolean>  {

    private String urlStr;
    private Context context;
    private DownloadVideoListener listener;

    public DownLoadVideo(Context context, String url,DownloadVideoListener downloadVideoListener) {
        this.urlStr = url;
        this.context = context;
        this.listener = downloadVideoListener;
    }

    @Override
    protected Boolean doInBackground(String... strings) {

        BufferedInputStream bis = null;
        RandomAccessFile randomAccessFile;
        try {
            URL url = new URL(urlStr);
            HttpURLConnection urlConn = (HttpURLConnection) url.openConnection();
            int length = urlConn.getContentLength();
            InputStream input = urlConn.getInputStream();
            bis = new BufferedInputStream(input);
            File dir = new File(Environment.getExternalStorageDirectory().getAbsolutePath(), "stepic");
            if (!dir.exists()) {
                dir.mkdirs();
            }
            File file = new File(dir, System.currentTimeMillis() + ".mp4");

            if (!file.exists()) {
                file.createNewFile();
                randomAccessFile = new RandomAccessFile(file, "rw");

                byte buffer[] = new byte[1024];
                int size = -1;
                int count = 0;
                int progress=0;
                while ((size = bis.read(buffer)) != -1) {
                    int numread = bis.read(buffer);
                    count += numread;
                    progress = (int) (((float) count / length) * 100);
                    publishProgress(progress);
                    Log.e(count+"====download===="+length,progress+"%");
                    randomAccessFile.write(buffer, 0, size);
                }

                randomAccessFile.close();
                bis.close();
            }
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }


    }

    @Override
    protected void onProgressUpdate(Integer... values) {
        super.onProgressUpdate(values);
        listener.progress(values[0]);

    }


    @Override
    protected void onPostExecute(Boolean aBoolean) {
        super.onPostExecute(aBoolean);

        if(aBoolean)listener.success();
        else listener.fail();
    }
}