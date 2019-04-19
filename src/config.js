import React, { Component } from 'react';
// import { generateTabRouteConfig } from './util';
import './template';
import projectJSON from './config/project.json';
import loginJSON from './config/login.json';
import control from './config/control.js';
import { ControlMappings, Switch, Util } from 'yes-platform';
import i18n from './i18n';
import { LocaleProvider, Modal } from 'antd-mobile';
import RouteConfig from './config/route.json';
import buildRoute from './route';
import PlatformProvider from './controls/providers';
import BaiduProvider from './controls/providers/BaiduMapProvider';
// import './yigopatch';

const { sessionKey, serverPath, appName, wechat, cordova, baidumap } = projectJSON;
const { template, tooltip, companyName, bgImagePath, logoImagePath } = loginJSON;

ControlMappings.defaultControlMapping.reg('checkbox', Switch);
let rootEl = null;
try {
    if (document) {
        rootEl = document.getElementById('app');
    }
} catch (e) {
    console.info(e.message);    // eslint-disable-line no-console
}
const appOptions = {
    sessionKey,
    serverPath,
    appName,
    rootEl,
    loginConfig: {
        template: control[template],
        tooltip,
        companyName,
        // bgImage: require(`${bgImagePath}`),
        // logoImage: require(`${logoImagePath}`),
    },
};

const getLocaleMessages = () => {
    if (navigator.language.startsWith('zh')) {
        return i18n['zh-CN'];
    }
    return i18n['en-US'];
}
const internationDictionary = getLocaleMessages();
function formatMessage(msg) {
    return internationDictionary[msg] || msg;
}

Util.alert = (title, msg) => {
    const modal = Modal.alert(formatMessage(title), formatMessage(msg), [{
        text: formatMessage('OK'),
        onPress: () => modal.close(),
    }]);
};

Util.confirm = function (title, msg, type) {
    return new Promise((resolve, reject) => {
        function pressOK() {
            resolve('OK');
        }
        function pressYes() {
            resolve('YES');
        }
        function pressNo() {
            resolve('NO');
        }
        function pressCancel() {
            resolve('Cancel');
        }
        const actions = [];
        if (type === 'OK') {
            actions.push({
                text: formatMessage('是'),
                onPress: pressOK,
            });
        }
        if (type === 'YES_NO') {
            actions.push({
                text: formatMessage('是'),
                onPress: pressYes,
            });
            actions.push({
                text: formatMessage('否'),
                onPress: pressNo,
            });
        }
        if (type === 'YES_NO_CANCEL') {
            actions.push({
                text: formatMessage('是'),
                onPress: pressYes,
            });
            actions.push({
                text: formatMessage('否'),
                onPress: pressNo,
            });
            actions.push({
                text: formatMessage('取消'),
                onPress: pressCancel,
            });
        }
        const newmsg = msg.replace(/\\n/g, '\n');
        Modal.alert(formatMessage(title), newmsg, actions);
    });
};

const MainRouter = buildRoute(RouteConfig);

const getAntLocale = () => {
    if (navigator.language === 'zh-CN') {
        return null;
    }
    return enUS;
}

const onNavigationStateChange = (prevState, nextState, action) => {
    console.log(action);
};

let Provider = ({ children }) => {
    if (baidumap) {
        return (
            <BaiduProvider>
                {children}
            </BaiduProvider>
        );
    }
    return children;
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

const NavigatorListenerWrapper = (props) =>
    (<LocaleProvider locale={getAntLocale()}>
        <Provider>
            <MainRouter
                onNavig ationStateChange={onNavigationStateChange}
                {...props} />
        </Provider>
    </LocaleProvider>);
// 
// AppDispatcher.register((action) => {
//     switch (action.type) {
//     case 'WORKFLOWCHANGE':
//         setTimeout(() => {
//                 BillformStore.reloadFormData('TSL_ToDoList.-1');
//             }, 0);
//         break;
//     default:
//     }
// });

appOptions.messages = getLocaleMessages();
appOptions.router = NavigatorListenerWrapper;
appOptions.mock = true;
appOptions.debug = true;
export default appOptions;
