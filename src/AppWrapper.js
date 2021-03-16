import React from 'react';
import PlatformProvider from './providers';
import BaiduProvider from './providers/BaiduMapProvider';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd-mobile';
import AppProvider from './providers/ApplicationProvider';
import TemplateProvider from './template/TemplateProvider';

const getAntLocale = () => {
    if (navigator.language.startsWith('zh')) {
        return null;
    }
    return enUS;
}
// wechat
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

// cordova
function isCordova() {
    return window.cordova;
}

function isAppcan() {
    return window.uexDispatcherNative;
}

export default ({ children, control, projectCfg, mainThread = false, formTemplates }) => {
    const { wechat, cordova, baidumap } = projectCfg;
    let Provider = ({ children }) => {
        if (baidumap) {
            return (<BaiduProvider {...baidumap}>
                <PlatformProvider.Browser checkUpdate={mainThread}>
                    {children}
                </PlatformProvider.Browser>
            </BaiduProvider>);
        }
        return (
            <PlatformProvider.Browser>
                {children}
            </PlatformProvider.Browser>
        );
    };

    if (isWeixin() && wechat) {
        Provider = ({ children }) => {
            if (baidumap) {
                return (<BaiduProvider>
                    <PlatformProvider.Wechat {...wechat} >
                        {children}
                    </PlatformProvider.Wechat>
                </BaiduProvider>);
            }
            return (
                <PlatformProvider.Wechat {...wechat} >
                    {children}
                </PlatformProvider.Wechat>
            );
        };
    }

    if (isCordova()) {
        const cordovaProps = cordova || {};
        Provider = ({ children }) => {
            if (baidumap) {
                return (<BaiduProvider {...baidumap}>
                    <PlatformProvider.Cordova checkUpdate={mainThread} {...cordovaProps}>
                        {children}
                    </PlatformProvider.Cordova>
                </BaiduProvider>);
            }
            return (
                <PlatformProvider.Cordova {...cordovaProps}>
                    {children}
                </PlatformProvider.Cordova>
            );
        };
    }

    if (isAppcan()) {
        Provider = ({ children }) => {
            if (baidumap) {
                return (<BaiduProvider {...baidumap}>
                    <PlatformProvider.Appcan >
                        {children}
                    </PlatformProvider.Appcan>
                </BaiduProvider>);
            }
            return (
                <PlatformProvider.Appcan >
                    {children}
                </PlatformProvider.Appcan>
            );
        };
    }

    return (<LocaleProvider locale={getAntLocale()}>
        <AppProvider>
            <TemplateProvider
                CustomControls={control}
                formTemplates={formTemplates}
            >
                <Provider>
                    {children}
                </Provider>
            </TemplateProvider>
        </AppProvider>
    </LocaleProvider>)
}
