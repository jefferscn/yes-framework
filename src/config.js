import React, { Component } from 'react';
import { AppDispatcher, BillformStore } from 'yes';
import {
    StackNavigator as stackNavigator,
    TabNavigator as tabNavigator,
    withNavigation,
} from 'react-navigation';
import DynamicView from './DynamicView';
import WorkitemView from './WorkitemView';
import FieldView from './FieldView';
// import { generateTabRouteConfig } from './util';
import './template';
import projectJSON from './config/project.json';
import loginJSON from './config/login.json';
import initialPageJSON from './config/initialPage.json';
import control from './config/control.js';
import { ControlMappings, Switch } from 'yes-platform';
import { generateTabRouter, generatePageRouter } from 'yes-router';
import generateRouteComponent from './util/generateRouteComponent';
import i18n from './i18n';
import { LocaleProvider } from 'antd-mobile';
// import './yigopatch';

const { sessionKey, serverPath, appName } = projectJSON;
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

const routes = {
    DynamicDetail: {
        screen: withNavigation(DynamicView),
        path: 'YESMOBILE/:metaKey/:id/:status',
    },
    DynamicDetail1: {
        screen: withNavigation(DynamicView),
        path: 'YES/:metaKey/:id/:status',
    },
    Workitem: {
        screen: withNavigation(WorkitemView),
        path: 'WORKITEM/:wid',
    },
    WorkitemField: {
        screen: withNavigation(FieldView),
        path: 'WORKITEM/:wid/:field',
    },
    DynamicMulti: {
        screen: withNavigation(DynamicView),
        path: 'YESMOBILE/:metaKey/:status',
    },
};

let MainRouter = null;
switch (initialPageJSON.type) {
    case 'tab':
        MainRouter = generateTabRouter(initialPageJSON.tab, routes, generateRouteComponent);
        break;
    case 'custom':
        const customScreen = control[initialPageJSON.page];
        MainRouter = generatePageRouter(customScreen, routes);
        break;
    case 'page':
        const homeScreen = generateRouteComponent(initialPageJSON);
        MainRouter = generatePageRouter(homeScreen, routes);
        break;
    default:
}

const getAntLocale = () => {
    if (navigator.language === 'zh-CN') {
        return null;
    }
    return enUS;
}
const getLocaleMessages = () => {
    if (navigator.language === 'zh-CN') {
        return i18n['zh-CN'];
    }
    return i18n['en-US'];
}

const onNavigationStateChange = (prevState, nextState, action) => {
    console.log(action);
};

const NavigatorListenerWrapper = (props) => 
    (<LocaleProvider locale={getAntLocale()}>
        <MainRouter 
            onNavigationStateChange={onNavigationStateChange} 
            {...props} />
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
