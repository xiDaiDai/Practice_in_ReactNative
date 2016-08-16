package com.reduxlearn;

/**
 * Created by admin on 2016/8/14.
 */
public class AlarmObj {
    private String time;
    private String title;
    private String content;
    private int id;

    public AlarmObj(String time, String title, String content) {
        this.time = time;
        this.title = title;
        this.content = content;

    }

    public AlarmObj(String time, String title, String content, int id) {
        this.time = time;
        this.title = title;
        this.content = content;
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "AlarmObj{" +
                "time='" + time + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", id=" + id +
                '}';
    }
}
