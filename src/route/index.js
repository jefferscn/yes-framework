import React from 'react';
import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    withNavigation,
} from 'react-navigation';
import DynamicView from '../DynamicView';
import Controls from '../config/control';
import WorkitemView from '../WorkitemView';
import FieldView from '../FieldView';
import generateRouteComponent from '../util/generateRouteComponent';
import Element from '../template/Element';

const defaultCardRoute = {
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
        path: 'WORKITEM/:wid/:onlyOpen/:loadInfo',
    },
    WorkitemM: {
        screen: withNavigation(WorkitemView),
        path: 'WORKITEMM/:wid/:onlyOpen/:loadInfo/:msg',
    },
    WorkitemField: {
        screen: withNavigation(FieldView),
        path: 'WORKITEM/:wid/:field',
    },
};
const defaultModalRoute = {
    DynamicDetail: {
        screen: withNavigation(DynamicView),
        path: 'modal/YESMOBILE/:metaKey/:id/:status',
    },
    DynamicDetail1: {
        screen: withNavigation(DynamicView),
        path: 'modal/YES/:metaKey/:id/:status',
    },
    Workitem: {
        screen: withNavigation(WorkitemView),
        path: 'modal/WORKITEM/:wid/:onlyOpen/:loadInfo',
    },
    WorkitemM: {
        screen: withNavigation(WorkitemView),
        path: 'modal/WORKITEMM/:wid/:onlyOpen/:loadInfo/:msg',
    },
    WorkitemField: {
        screen: withNavigation(FieldView),
        path: 'modal/WORKITEM/:wid/:field',
    },
};

const buildTabNavigator = (tabConfig) => {
    const tabs = {};
    for (let tab of tabConfig.tabs) {
        tabs[tab.key] = buildScreen(tab);
    }
    if (!tabConfig.tabPosition || tabConfig.tabPosition === "top") {
        return createMaterialTopTabNavigator(
            tabs, {
                headerMode: 'none',
                tabBarOptions: {
                    style: {
                        backgroundColor: 'white',
                    },
                    labelStyle: {
                        height: 30,
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center',
                    },
                    indicatorStyle: {
                        backgroundColor: '#008CD7',
                    },
                    activeBackgroundColor: 'white',
                    activeTintColor: '#008CD7',
                    inactiveBackgroundColor: 'white',
                    inactiveTintColor: '#aaa',
                    showLabel: true,
                },
            }
        );
    } else {
        return createBottomTabNavigator(
            tabs, {
                headerMode: 'none',
                tabBarOptions: {
                    style: {
                        backgroundColor: 'white',
                    },
                    labelStyle: {
                        height: 30,
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center',
                    },
                    indicatorStyle: {
                        backgroundColor: '#008CD7',
                    },
                    activeBackgroundColor: 'white',
                    activeTintColor: '#008CD7',
                    inactiveBackgroundColor: 'white',
                    inactiveTintColor: '#aaa',
                    showLabel: true,
                },
            }
        );
    }
};

const buildYIGOBillformScreen = (config) => {
    return generateRouteComponent({
        formKey: config.formKey,
        // title: ({ focused, tintColor }) =>
        //     <RejectBadget><Text style={{ fontSize: 16, color: tintColor }}>{formatMessage('Reject List')}</Text></RejectBadget>,
        key: config.key,
        oid: config.oid,
        status: config.status || 'DEFAULT',
    });
};

const buildControlScreen = (config) => {
    // return Controls[config.control];
    return ()=><Element debugStyle={{flex:1}} meta={config.control} />;
};

const buildScreen = (config) => {
    switch (config.type) {
        case 'tab':
            return buildTabNavigator(config);
        case 'billform':
            return buildYIGOBillformScreen(config);
        default:
            return buildControlScreen(config);
    }
};

export default (config) => {
    const customRoute = {};
    let initialRouteName = null;
    for (let r of config) {
        let route = {};
        route.screen = buildScreen(r);
        route.path = r.path;
        customRoute[r.key] = route;
        if(r.isRoot) {
            initialRouteName = r.key;
        }
    }
    const mainCardNavigator = createStackNavigator(
        defaultCardRoute,
        {
            headerMode: 'none'
        }
    )
    const MainNavigator = createStackNavigator(
        {
            ...customRoute,
            Card: {
                screen: mainCardNavigator,
                path: 'card',
            },
            ...defaultModalRoute,
        },
        {
            initialRouteName,
            mode: 'modal',
            headerMode: 'none',
            transparentCard: true,
        },
    );
    return MainNavigator;
}