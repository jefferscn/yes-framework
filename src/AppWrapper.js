import React from 'react';
import PlatformProvider from './providers';
import BaiduProvider from './providers/BaiduMapProvider';
import { ProjectCfg } from './config/index';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd-mobile';
import TemplateProvider from './template/TemplateProvider';
import control from './config/control.js';

const getAntLocale = () => {
    if (navigator.language.startsWith('zh')) {
        return null;
    }
    return enUS;
}
const { wechat, cordova, baidumap } = ProjectCfg;
let Provider = ({ children }) => {
    if (baidumap) {
        return (<BaiduProvider {...baidumap}>
            <PlatformProvider.Browser>
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

// wechat
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

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

// cordova
function isCordova() {
    return window.cordova;
}

if (isCordova()) {
    const cordovaProps = cordova || {};
    Provider = ({ children }) => {
        if (baidumap) {
            return (<BaiduProvider {...baidumap}>
                <PlatformProvider.Cordova {...cordovaProps}>
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

export default ({children}) =>
    (<LocaleProvider locale={getAntLocale()}>
        <TemplateProvider CustomControls={control}>
            <Provider>
                {children}
            </Provider>
        </TemplateProvider>
    </LocaleProvider>)
