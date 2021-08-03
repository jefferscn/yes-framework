var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import PlatformProvider from './providers';
import BaiduProvider from './providers/BaiduMapProvider';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd-mobile';
import AppProvider from './providers/ApplicationProvider';
import TemplateProvider from './template/TemplateProvider';
var getAntLocale = function () {
    if (navigator.language.startsWith('zh')) {
        return null;
    }
    return enUS;
};
// wechat
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    }
    else {
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
export default (function (_a) {
    var children = _a.children, control = _a.control, projectCfg = _a.projectCfg, _b = _a.mainThread, mainThread = _b === void 0 ? false : _b, formTemplates = _a.formTemplates;
    var wechat = projectCfg.wechat, cordova = projectCfg.cordova, baidumap = projectCfg.baidumap;
    var Provider = function (_a) {
        var children = _a.children;
        if (baidumap) {
            return (React.createElement(BaiduProvider, __assign({}, baidumap),
                React.createElement(PlatformProvider.Browser, { checkUpdate: mainThread }, children)));
        }
        return (React.createElement(PlatformProvider.Browser, null, children));
    };
    if (isWeixin() && wechat) {
        Provider = function (_a) {
            var children = _a.children;
            if (baidumap) {
                return (React.createElement(BaiduProvider, null,
                    React.createElement(PlatformProvider.Wechat, __assign({}, wechat), children)));
            }
            return (React.createElement(PlatformProvider.Wechat, __assign({}, wechat), children));
        };
    }
    if (isCordova()) {
        var cordovaProps_1 = cordova || {};
        Provider = function (_a) {
            var children = _a.children;
            if (baidumap) {
                return (React.createElement(BaiduProvider, __assign({}, baidumap),
                    React.createElement(PlatformProvider.Cordova, __assign({ checkUpdate: mainThread }, cordovaProps_1), children)));
            }
            return (React.createElement(PlatformProvider.Cordova, __assign({}, cordovaProps_1), children));
        };
    }
    if (isAppcan()) {
        Provider = function (_a) {
            var children = _a.children;
            if (baidumap) {
                return (React.createElement(BaiduProvider, __assign({}, baidumap),
                    React.createElement(PlatformProvider.Appcan, null, children)));
            }
            return (React.createElement(PlatformProvider.Appcan, null, children));
        };
    }
    return (React.createElement(LocaleProvider, { locale: getAntLocale() },
        React.createElement(AppProvider, null,
            React.createElement(TemplateProvider, { CustomControls: control, formTemplates: formTemplates },
                React.createElement(Provider, null, children)))));
});
