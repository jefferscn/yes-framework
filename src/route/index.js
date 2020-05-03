import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createMaterialTopTabNavigator,
    withNavigation,
} from 'react-navigation';
import DynamicView from '../DynamicView';
import Controls from '../config/control';
import WorkitemView from '../WorkitemView';
import FieldView from '../FieldView';
// import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import IconFontIcon from '../font';
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

const buildTabNavigator = (tabConfig) => {
    const tabs = {};
    for (let tab of tabConfig.tabs) {
        const page = buildScreen(tab);
        page.navigationOptions = ({ navigation }) => ({
            tabBarIcon: tab.icon ? ({
                tintColor,
                focused,
                horizontal,
            }) => (
                    <IconFontIcon
                        name={tab.icon}
                        size={22}
                        style={{ color: focused ? '#008CD7' : '#aaa' }}
                    />
                ) : null,
            tabBarLabel: tab.label,
        });
        tabs[tab.key] = page;
    }
    // if (!tabConfig.tabPosition || tabConfig.tabPosition === "top") {
    const tabBarPosition = tabConfig.tabPosition || 'top';
    const indicatorStyle = {};
    if(tabBarPosition === 'bottom') {
        // indicatorStyle.display = 'none';
        // top: 0,
        Object.assign(indicatorStyle, {
            top: 0,
        })
    }
    return createMaterialTopTabNavigator(
        tabs, {
            headerMode: 'none',
            swipeEnabled: false,
            tabBarOptions: {
                labelStyle: {
                    fontSize: 14,
                    margin: 0,
                },
                indicatorStyle: {
                    backgroundColor: tabConfig.indicatorColor || '#008CD7',
                    ...indicatorStyle,
                },
                upperCaseLabel: false,
                activeBackgroundColor: tabConfig.activeBackgroundColor || 'white',
                activeTintColor: tabConfig.activeTintColor || '#008CD7',
                inactiveBackgroundColor: tabConfig.inactiveBackgroundColor || 'white',
                inactiveTintColor: tabConfig.inactiveTintColor || '#aaa',
                showLabel: tabConfig.showLabel,
                showIcon: tabConfig.showIcon,
                style: {
                    backgroundColor: 'white',
                }
            },
            tabBarPosition,
        }
    );
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
    const Control = Controls[config.control];
    return () => <Control {...config.controlProps} />
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
    console.log(config)
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
            headerMode: 'none',
            cardStyle: {
                flex: 1
            }
        }
    )
    const mainModalNavigator = createStackNavigator(
        defaultModalRoute,
        {
            defaultNavigationOptions: {
                header: null,
            },
            cardStyle: {
                backgroundColor: 'transparent',
            },
            initialRouteName,
            mode: 'modal',
            headerMode: 'none',
            transparentCard: true,
        }
    )
    const MainNavigator = createStackNavigator(
        {
            ...customRoute,
            Card: {
                screen: mainCardNavigator,
                path: 'card',
            },
            // ...defaultModalRoute,
            Modal: {
                screen: mainModalNavigator,
                path: 'modal',
            }
        },
        {
            defaultNavigationOptions: {
                header: null,
            },
            cardStyle: {
                backgroundColor: 'transparent',
            },
            initialRouteName,
            mode: 'modal',
            headerMode: 'none',
            transparentCard: true,
        },
    );
    return createAppContainer(MainNavigator);
}
