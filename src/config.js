import React, { Component } from 'react';
// import { generateTabRouteConfig } from './util';
import './template';
// import projectJSON from './config/project.json';
// import loginJSON from './config/login.json';
import { BackHandler } from 'yes';
import { ProjectCfg, RouteCfg, LoginCfg, ModalCfg } from './config/index';
import control from './config/control.js';
import { ControlMappings, Switch, AuthenticatedRoute } from 'yes-comp-react-native-web';
import { Util } from 'yes-web';
import { util as projectUtil } from './project';
import i18n from './i18n';
import { LocaleProvider, Modal } from 'antd-mobile';
// import RouteConfig from './config/route.json';
import buildRoute from './route';
// import './yigopatch';
import './patch/antd-mobile.css';
import { showModal } from './SiblingMgr';
import { init as initPush } from './push';
import Element from './template/Element';
import { injectFont } from 'yes-web/dist/webutil';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import FastClick from 'fastclick';
import TemplateView from './TemplateView';
import AppWrapper from './AppWrapper';
import { openForm } from './util/navigateUtil';
import { History } from 'yes-web';
import MonthPicker from './controls/MonthPicker';

window.his = History;

// import './util/fakeFetch';
Reflect = undefined;

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

Util.showBillformInModal = (formKey, oid = -1, status = 'EDIT', params) => {
    if (ModalCfg && ModalCfg.includes(formKey)) {
        showModal(
            <TemplateView
                formKey={formKey}
                oid={oid}
                status={status}
                showType="modal"
                params={params}
            />
        );
        return ;
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

Util.buildThumbnailUrl = (url, w, h, q=1) => {
    return `${url}&w=${w}&h=${h}&q=${q}`;
}
const MainRouter = buildRoute(RouteCfg);

const onNavigationStateChange = (prevState, nextState, action) => {
    console.log(action);
};

const AuthRouter = AuthenticatedRoute(MainRouter, () => <Element meta={LoginCfg} />, 'root');
const NavigatorListenerWrapper = (props) =>
    (<AppWrapper>
        <AuthRouter
            onNavigationStateChange={onNavigationStateChange}
            {...props} />
    </AppWrapper>);

initPush();

appOptions.messages = getLocaleMessages();
// appOptions.router = NavigatorListenerWrapper;
appOptions.mock = true;
appOptions.controlMapping = ControlMappings.defaultControlMapping;
appOptions.debug = true;
appOptions.util = Util;
appOptions.root = <NavigatorListenerWrapper />;
export default appOptions;
