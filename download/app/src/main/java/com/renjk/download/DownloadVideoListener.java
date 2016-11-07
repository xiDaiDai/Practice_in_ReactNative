package com.renjk.download;


/**
 * Created by admin on 2016/10/28.
 */
public interface DownloadVideoListener {
     void progress(Integer value);
     void success();
     void  fail();
}
