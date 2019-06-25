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
import Icon from '../font/IconFont';
import generateRouteComponent from '../util/generateRouteComponent';

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
        const page = buildScreen(tab);
        page.navigationOptions = {
            tabBarIcon: tab.icon?({
                tintColor,
                focused,
                horizontal,
            }) => (
                    <Icon
                        name={tab.icon}
                        size={horizontal ? 20 : 26}
                        style={{ color: tintColor }}
                    />
                ): null,
            tabBarLabel: tab.label,
        };
        tabs[tab.key] = page;
    }
    if (!tabConfig.tabPosition || tabConfig.tabPosition === "top") {
        return createMaterialTopTabNavigator(
            tabs, {
                headerMode: 'none',
                backBehavior: 'history',
                tabBarOptions: {
                    showIcon: tabConfig.showIcon,
                    showLabel: tabConfig.showLabel==null?true: tabConfig.showLabel,
                    upperCaseLabel: false,
                    activeTintColor: tabConfig.activeTintColor,
                    inactiveTintColor: tabConfig.inactiveTintColor,
                    style: {
                        backgroundColor: tabConfig.backgroundColor,
                    },
                    indicatorStyle: {
                        backgroundColor: tabConfig.indicatorColor,
                    },
                },
            }
        );
    } else {
        return createBottomTabNavigator(
            tabs, {
                headerMode: 'none',
                backBehavior: 'history',
                showIcon: tabConfig.showIcon,
                upperCaseLabel: false,
                tabBarOptions: {
                    showIcon: tabConfig.showIcon,
                    upperCaseLabel: false,
                    showLabel: tabConfig.showLabel==null?true: tabConfig.showLabel,
                    activeTintColor: tabConfig.activeTintColor,
                    inactiveTintColor: tabConfig.inactiveTintColor,
                    style: {
                        backgroundColor: tabConfig.backgroundColor,
                    },
                    indicatorStyle: {
                        backgroundColor: tabConfig.indicatorColor,
                    },
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
    return (props)=>{
        const C = Controls[config.control];
        return <C {...props} />;
    }
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
        if (r.isRoot) {
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