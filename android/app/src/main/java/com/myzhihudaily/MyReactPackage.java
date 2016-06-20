package com.myzhihudaily;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.views.webview.ReactWebViewManager;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by ijoy on 16-6-20.
 */
public class MyReactPackage extends MainReactPackage {
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> main=super.createViewManagers(reactContext);
        List<ViewManager> result=new ArrayList<>();
        result.addAll(main);
        return result;
    }
}
