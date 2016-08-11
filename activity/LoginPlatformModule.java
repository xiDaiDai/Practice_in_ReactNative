package module;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.umeng.socialize.UMAuthListener;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.bean.SHARE_MEDIA;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

/**
 * Created by admin on 2016/7/21.
 *使用前参考友盟社会化分享sdk集成方案，进行android环境配置
 */
public class LoginPlatformModule extends ReactContextBaseJavaModule implements ActivityEventListener, LifecycleEventListener {


    private static final String QQ_LOGIN = "qq";
    private static final String WEIBO_LOGIN = "sina";
    private static final String WECHAT_LOGIN = "weixin";
    private UMShareAPI mShareAPI = null;
    private Context context;
    private Activity currenActivity;

    public LoginPlatformModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
        reactContext.addActivityEventListener(this);
        reactContext.addLifecycleEventListener(this);
    }

    /**
     * getName方法。这个函数用于返回一个字符串名字,就是js中的模块名
     */
    @Override
    public String getName() {
        return "LoginPlatformModule";
    }

    /**
     * 导出给js使用的方法，需要使用注解@ReactMethod。方法的返回类型必须为void
     */

    @ReactMethod
    public void login(String platform, Promise promise) {
        if (platform.equals(QQ_LOGIN)) {
            doQQVerify(promise);
        } else if (platform.equals(WEIBO_LOGIN)) {
            doWeiBoVerify(promise);
        } else if (platform.equals(WECHAT_LOGIN)) {
            doWechatVerify(promise);
        }
    }

    private void doWeiBoVerify(final Promise promise) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mShareAPI.doOauthVerify(currenActivity, SHARE_MEDIA.SINA, new UMAuthListener() {
                    @Override
                    public void onComplete(SHARE_MEDIA share_media, int i, Map<String, String> map) {
                        String accesstokien = (String) map.get("access_token");
                        String uid = (String) map.get("uid");
                        String accesssecret = (String) map.get("access_secret");
                        getSinaInfo(accesstokien == null ? accesssecret : accesstokien, uid, promise);
                    }

                    @Override
                    public void onError(SHARE_MEDIA share_media, int i, Throwable throwable) {
//                    promise.reject(throwable);
                        Log.e("weibo", "verify_error");
                    }

                    @Override
                    public void onCancel(SHARE_MEDIA share_media, int i) {
                        Log.e("weibo", "verify_cancel");
                    }
                });
            }
        });

    }


    private void doWechatVerify(final Promise promise) {
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mShareAPI.doOauthVerify(getCurrentActivity(), SHARE_MEDIA.WEIXIN, new UMAuthListener() {
                    @Override
                    public void onComplete(SHARE_MEDIA share_media, int i, Map<String, String> map) {
                        final String accesstokien = (String) map.get("access_token");
                        final String uid = (String) map.get("uid");
                        getWechatInfo(accesstokien, uid, promise);

                    }

                    @Override
                    public void onError(SHARE_MEDIA share_media, int i, Throwable throwable) {
//                promise.reject(throwable);
                        Toast.makeText(getCurrentActivity(), "error_verify", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onCancel(SHARE_MEDIA share_media, int i) {

                    }
                });

            }
        });

    }


    private void doQQVerify(final Promise promise) {

        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mShareAPI.doOauthVerify(currenActivity, SHARE_MEDIA.QQ, new UMAuthListener() {
                    @Override
                    public void onComplete(SHARE_MEDIA share_media, int i, Map<String, String> map) {
                        String access_token = map.get("access_token");
                        String uid = map.get("uid");
                        getQQInfo(access_token, uid, promise);
                    }

                    @Override
                    public void onError(SHARE_MEDIA share_media, int i, Throwable throwable) {
//                promise.reject(throwable);
                        Toast.makeText(getCurrentActivity(), "error_verify", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onCancel(SHARE_MEDIA share_media, int i) {

                    }
                });

            }
        });

    }

    private void getQQInfo(final String access_token, final String uid, final Promise promise) {
        mShareAPI.getPlatformInfo(currenActivity, SHARE_MEDIA.QQ, new UMAuthListener() {
            @Override
            public void onComplete(SHARE_MEDIA share_media, int i, Map<String, String> map) {
                String username = (String) map.get("screen_name");
                String avatar = (String) map.get("profile_image_url");
                WritableMap params = Arguments.createMap();
                params.putString("platform", "QQ");
                params.putString("userName", username);
                params.putString("iconURL", avatar);
                params.putString("from", "QQ");
                params.putString("access_token", access_token);
                params.putString("app_id", "1104733423");
                params.putString("open_id", uid);
                promise.resolve(params);
            }

            @Override
            public void onError(SHARE_MEDIA share_media, int i, Throwable throwable) {
//                Toast.makeText(getCurrentActivity(), "error", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onCancel(SHARE_MEDIA share_media, int i) {

            }
        });


    }

    private void getSinaInfo(final String access_token, final String uid, final Promise promise) {

        mShareAPI.getPlatformInfo(currenActivity, SHARE_MEDIA.SINA, new UMAuthListener() {
            @Override
            public void onComplete(SHARE_MEDIA share_media, int i, Map<String, String> map) {
                String jsonResult = map.get("result");
                JSONObject jsonObject = null;
                String username = null;
                String avatar = null;
                try {
                    jsonObject = new JSONObject(jsonResult);
                    avatar = jsonObject.getString("profile_image_url");
                    username = jsonObject.getString("screen_name");
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                WritableMap params = Arguments.createMap();
                params.putString("platform", "WeiBo");
                params.putString("userName", username);
                params.putString("iconURL", avatar);
                params.putString("from", "WeiBo");
                params.putString("access_token", access_token);
                params.putString("app_id", "3761134985");
                params.putString("open_id", uid);
                for (Map.Entry<String, String> entry : map.entrySet()) {
                    System.out.println("key= " + entry.getKey() + " and value= " + entry.getValue());
                }
                promise.resolve(params);
            }

            @Override
            public void onError(SHARE_MEDIA share_media, int i, Throwable throwable) {
                Toast.makeText(getCurrentActivity(), "error", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onCancel(SHARE_MEDIA share_media, int i) {

            }
        });

    }

    private void getWechatInfo(final String access_token, final String uid, final Promise promise) {

        mShareAPI.getPlatformInfo(getCurrentActivity(), SHARE_MEDIA.WEIXIN, new UMAuthListener() {
            @Override
            public void onComplete(SHARE_MEDIA share_media, int i, Map<String, String> map) {

                String username = (String) map.get("nickname");
                String unionid = (String) map.get("unionid");
                String headimagurl = (String) map.get("headimgurl");
                WritableMap params = Arguments.createMap();
                params.putString("platform", "WeiXin");
                params.putString("userName", username);
                params.putString("iconURL", headimagurl);
                params.putString("from", "WeiXin");
                params.putString("access_token", access_token);
                params.putString("app_id", "wxfe18eb8b90d17328");
                params.putString("open_id", unionid);
                promise.resolve(params);
            }

            @Override
            public void onError(SHARE_MEDIA share_media, int i, Throwable throwable) {
                Toast.makeText(getCurrentActivity(), "error", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onCancel(SHARE_MEDIA share_media, int i) {

            }
        });
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        UMShareAPI.get(context).onActivityResult(requestCode, resultCode, data);
    }


    @Override
    public void onHostResume() {
        mShareAPI = UMShareAPI.get(context);
        currenActivity = getCurrentActivity();
    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {

    }
}
