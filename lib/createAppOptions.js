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
import './template';
import { BackHandler, AppDispatcher } from 'yes';
// import { ProjectCfg, RouteCfg, LoginCfg, ModalCfg, OpenwithHandler, billforms } from './config/index';
// import control from './config/control.js';
import { ControlMappings, AuthenticatedRoute } from 'yes-comp-react-native-web';
import { Util, IndexedDBCacheAdapter } from 'yes-web';
// import { util as projectUtil } from './project';
import i18n from './i18n';
import { injectFetchConfig } from 'yes-core';
import { Modal } from 'antd-mobile';
import buildRoute from './route';
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
import initPreload from './preload';
import Switch from './controls/Yigo/Checkbox/Switch';
import MonthPicker from './controls/Yigo/MonthPicker/MonthPicker';
// import './preload';
import { init as initSiblingMgr } from './SiblingMgr';
export default (function (ProjectCfg, RouteCfg, LoginCfg, ModalCfg, OpenwithHandler, billforms, control, util, Preload) {
    var projectUtil = util;
    if (ProjectCfg.isYIGO3) {
        require('./yigopatch/yigo3');
    }
    if (ProjectCfg.fetch) {
        injectFetchConfig(ProjectCfg.fetch);
    }
    window.his = History;
    window.Util = Util;
    try {
        IndexedDBCacheAdapter.clear('form');
        IndexedDBCacheAdapter.clear('formdata');
        IndexedDBCacheAdapter.clear('formrights');
    }
    catch (ignore) { }
    initSiblingMgr(control, ProjectCfg, billforms);
    // import './util/fakeFetch';
    // Reflect = undefined;
    FastClick.attach(document.body);
    injectFont(fontAwesome, 'FontAwesome');
    projectUtil.showModal = showModal;
    var sessionKey = ProjectCfg.sessionKey, serverPath = ProjectCfg.serverPath, appName = ProjectCfg.appName, wechat = ProjectCfg.wechat, cordova = ProjectCfg.cordova, baidumap = ProjectCfg.baidumap;
    var template = LoginCfg.template, tooltip = LoginCfg.tooltip, companyName = LoginCfg.companyName, bgImagePath = LoginCfg.bgImagePath, logoImagePath = LoginCfg.logoImagePath;
    ControlMappings.defaultControlMapping.reg('checkbox', Switch);
    ControlMappings.defaultControlMapping.reg('monthpicker', MonthPicker);
    var rootEl = null;
    try {
        if (document) {
            rootEl = document.getElementById('app');
        }
    }
    catch (e) {
        console.info(e.message); // eslint-disable-line no-console
    }
    var appOptions = {
        sessionKey: sessionKey,
        serverPath: serverPath,
        appName: appName,
        rootEl: rootEl,
        loginConfig: {
            template: control[template],
            tooltip: tooltip,
            companyName: companyName,
            // bgImage: require(`${bgImagePath}`),
            // logoImage: require(`${logoImagePath}`),
        },
    };
    var getLocaleMessages = function () {
        if (navigator.language.startsWith('zh')) {
            return i18n['zh-CN'];
        }
        return i18n['en-US'];
    };
    var internationDictionary = getLocaleMessages();
    function formatMessage(msg) {
        return internationDictionary[msg] || msg;
    }
    Util.alert = function (title, msg) {
        History.push("#util_alert");
        var backHandler = BackHandler.addPreEventListener(function () {
            focusElement && focusElement.focus();
            modal.close();
            backHandler();
        });
        var focusElement = document.activeElement;
        document.body.focus();
        var modal = Modal.alert(formatMessage(title), formatMessage(msg), [{
                text: formatMessage('OK'),
                onPress: function () {
                    focusElement && focusElement.focus();
                    modal.close();
                    backHandler();
                }
            }]);
    };
    Util.showBillformInModal = function (formKey, oid, status, params, showType) {
        if (oid === void 0) { oid = -1; }
        if (status === void 0) { status = 'EDIT'; }
        var modalKey = formKey;
        if (showType) {
            modalKey = formKey + "_" + showType;
        }
        if (ModalCfg && ModalCfg.includes(modalKey)) {
            showModal(React.createElement(TemplateView, { formKey: formKey, oid: oid, status: status, modalWrap: true, showType: showType || "modal", params: params }));
            return;
        }
        openForm(formKey, oid, status);
    };
    Util.confirm = function (title, msg, type) {
        return new Promise(function (resolve, reject) {
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
            var actions = [];
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
            var newmsg = msg.replace(/\\n/g, '\n');
            Modal.alert(formatMessage(title), newmsg, actions);
        });
    };
    Util.buildThumbnailUrl = function (url, w, h, q) {
        if (q === void 0) { q = 1; }
        return url + "&w=" + w + "&h=" + h + "&q=" + q;
    };
    var MainRouter = buildRoute(RouteCfg);
    var onNavigationStateChange = function (prevState, currentState) {
        var getCurrentRouteName = function (navigationState) {
            if (!navigationState)
                return null;
            var route = navigationState.routes[navigationState.index];
            if (route.routes)
                return getCurrentRouteName(route);
            return route.routeName;
        };
        var currentRoute = getCurrentRouteName(currentState);
        console.log(currentRoute);
    };
    var AuthRouter = AuthenticatedRoute(MainRouter, function () { return React.createElement(Element, { meta: LoginCfg }); }, 'root');
    var NavigatorListenerWrapper = function (props) {
        return (React.createElement(AppWrapper, { formTemplates: billforms, projectCfg: ProjectCfg, control: control, mainThread: true },
            React.createElement(AuthRouter, __assign({ onNavigationStateChange: onNavigationStateChange }, props))));
    };
    AppDispatcher.register(function (action) {
        switch (action.type) {
            case 'LOGOUTED':
                // history.go(0);
                console.log('logouted');
                break;
        }
    });
    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            initPush(ProjectCfg);
            initOpenWith(OpenwithHandler);
            initPreload(Preload);
        }, false);
    }
    appOptions.messages = getLocaleMessages();
    appOptions.mock = true;
    appOptions.controlMapping = ControlMappings.defaultControlMapping;
    appOptions.debug = true;
    appOptions.util = Util;
    appOptions.root = React.createElement(NavigatorListenerWrapper, null);
    return appOptions;
});
