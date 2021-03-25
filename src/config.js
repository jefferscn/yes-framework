import React, { Component } from 'react';
import './template';
import { BackHandler, AppDispatcher } from 'yes';
import { ProjectCfg, RouteCfg, LoginCfg, ModalCfg, OpenwithHandler, billforms } from './config/index';
import control from './config/control.js';
import { ControlMappings, AuthenticatedRoute } from 'yes-comp-react-native-web';
import { Util, IndexedDBCacheAdapter } from 'yes-web';
import { util as projectUtil } from './project';
import i18n from './i18n';
import { injectFetchConfig } from 'yes-core';
import { Modal } from 'antd-mobile';
import buildRoute from './route';
import './patch/antd-mobile.css';
import { showModal } from './SiblingMgr';
import { init as initPush } from './push';
import { init as initOpenWith } from './openwith';
import Element from './template/Element';
import { injectFont } from 'yes-web/dist/webutil';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import FastClick from 'fastclick';
import TemplateView from './TemplateView';
import AppWrapper from './AppWrapper';
import { openForm } from './util/navigateUtil';
import { History } from 'yes-web';
import Switch from './controls/Yigo/Checkbox/Switch';
import MonthPicker from './controls/Yigo/MonthPicker/MonthPicker';
import './preload';
import { init as initSiblingMgr } from './SiblingMgr';

if (ProjectCfg.isYIGO3) {
    require('./yigopatch/yigo3');
}

if(ProjectCfg.fetch) {
    injectFetchConfig(ProjectCfg.fetch);
}
window.his = History;
window.Util = Util;

try {
    IndexedDBCacheAdapter.clear('form');
    IndexedDBCacheAdapter.clear('formdata');
    IndexedDBCacheAdapter.clear('formrights');
} catch (ignore) {}

initSiblingMgr(control, ProjectCfg, billforms);
// import './util/fakeFetch';
// Reflect = undefined;

FastClick.attach(document.body);
injectFont(fontAwesome, 'FontAwesome');

projectUtil.showModal = showModal;

const { sessionKey, serverPath, appName, wechat, cordova, baidumap } = ProjectCfg;
const { template, tooltip, companyName, bgImagePath, logoImagePath } = LoginCfg;

ControlMappings.defaultControlMapping.reg('checkbox', Switch);
ControlMappings.defaultControlMapping.reg('monthpicker', MonthPicker);
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
    History.push(`#util_alert`);
    const backHandler = BackHandler.addPreEventListener(() => {
        modal.close();
        backHandler();
    });

    const modal = Modal.alert(formatMessage(title), formatMessage(msg), [{
        text: formatMessage('OK'),
        onPress: () => {
            modal.close();
            backHandler();
        }
    }]);
};

Util.showBillformInModal = (formKey, oid = -1, status = 'EDIT', params, showType) => {
    let modalKey = formKey;
    if (showType) {
        modalKey = `${formKey}_${showType}`;
    }
    if (ModalCfg && ModalCfg.includes(modalKey)) {
        showModal(
            <TemplateView
                formKey={formKey}
                oid={oid}
                status={status}
                modalWrap={true}
                showType={showType || "modal"}
                params={params}
            />
        );
        return;
    }
    openForm(formKey, oid, status);
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
                text: formatMessage('否'),
                onPress: pressNo,
            });
            actions.push({
                text: formatMessage('是'),
                onPress: pressYes,
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

Util.buildThumbnailUrl = (url, w, h, q = 1) => {
    return `${url}&w=${w}&h=${h}&q=${q}`;
}
const MainRouter = buildRoute(RouteCfg);

const onNavigationStateChange = (prevState, currentState) => {
    const getCurrentRouteName = (navigationState) => {
        if (!navigationState) return null;
        const route = navigationState.routes[navigationState.index];
        if (route.routes) return getCurrentRouteName(route);
        return route.routeName;
    };
    let currentRoute = getCurrentRouteName(currentState);
    console.log(currentRoute);
};

const AuthRouter = AuthenticatedRoute(MainRouter, () => <Element meta={LoginCfg} />, 'root');
const NavigatorListenerWrapper = (props) =>
(<AppWrapper
    formTemplates={billforms}
    projectCfg={ProjectCfg}
    control={control}
    mainThread
>
    <AuthRouter
        onNavigationStateChange={onNavigationStateChange}
        {...props} />
</AppWrapper>);

AppDispatcher.register((action) => {
    switch (action.type) {
        case 'LOGOUTED':
            // history.go(0);
            console.log('logouted');
            break;
    }
})

if (window.cordova) {
    document.addEventListener('deviceready', () => {
        initPush();
        initOpenWith(OpenwithHandler);
    }, false);
}

appOptions.messages = getLocaleMessages();
appOptions.mock = true;
appOptions.controlMapping = ControlMappings.defaultControlMapping;
appOptions.debug = true;
appOptions.util = Util;
appOptions.root = <NavigatorListenerWrapper />;
export default appOptions;
