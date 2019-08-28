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
import enUS from 'antd-mobile/lib/locale-provider/en_US'
import RuntimeProvider from './controls/providers/RuntimeProvider';
import './patch/antd-mobile.css';
import Element from './template/Element';
// import './yigopatch';
import './patch/antd-mobile.css';

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
    loginScreen: () => <Element meta={loginJSON} />,
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

Util.showBillformInModal = (formKey, oid=-1, status='EDIT')=> {
    showModal(
        <TemplateView 
            formKey={formKey}
            oid={oid}
            status={status}
        />
    )
}

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

/**
 * 添加一个Login的默认路由
 */
const loginRoute = {
    "key": "Login",
    "type": "control",
    "path": "Login",
    "control": loginJSON,
    "isRoot": false
};
RouteConfig.push(loginRoute);
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
    if (baidumap && baidumap.ak) {
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

if (isWeixin() && wechat && wechat.signurl) {
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

appOptions.messages = getLocaleMessages();
appOptions.router = NavigatorListenerWrapper;
appOptions.mock = true;
appOptions.debug = true;
appOptions.appWrapper = <RuntimeProvider controls = {control} />;
export default appOptions;
