import React from 'react';
import {
    NavigationContainer,
} from '@react-navigation/native';
import {
    createStackNavigator
} from '@react-navigation/stack';
import {
    createBottomTabNavigator
} from '@react-navigation/bottom-tabs';
import {
    createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import Element from '../template/Element';
import DynamicView from '../DynamicView';
import Controls from '../config/control';
import WorkitemView from '../WorkitemView';
import IconFontIcon from '../font';
import generateRouteComponent from '../util/generateRouteComponent';
import getPathFromState from './getPathFromState.tsx';
import getStateFromPath from './getStateFromPath.tsx';
import getActionFromState from './getActionFromState'
// import { generateKey } from '@react-navigation/core/lib/module/routers/KeyGenerator';
// import { StackViewStyleInterpolator } from 'react-navigation-stack';

// function injectStackNavigator(navigator) {
//     const oldFunc = navigator.router.getActionForPathAndParams;
//     navigator.router.getActionForPathAndParams = function () {
//         const action = oldFunc.apply(this, arguments);
//         if (action && action.action) {
//             action.action.key = action.action.key || generateKey();
//         }
//         return action;
//     }
// }

const defaultCardRoute = [
    // DynamicDetail: {
    //     screen: DynamicView,
    //     path: 'YESMOBILE/:metaKey/:id/:status',
    // },
    {
        key: 'YigoForm',
        screen: DynamicView,
        path: 'card/YES/:metaKey/:id/:status',
    },
    {
        key: 'YigoFormWithParent',
        screen: DynamicView,
        path: 'card/YES/:metaKey/:id/:status/:parent',
    },
    {
        key: 'Workitem',
        screen: WorkitemView,
        path: 'card/WORKITEM/:wid/:onlyOpen/:loadInfo',
    },
    // WorkitemM: {
    //     screen: WorkitemView,
    //     path: 'WORKITEMM/:wid/:onlyOpen/:loadInfo/:msg',
    // },
];
// const defaultModalRoute = {
//     DynamicDetail: {
//         screen: DynamicView,
//         path: 'YESMOBILE/:metaKey/:id/:status',
//     },
//     DynamicDetail1: {
//         screen: DynamicView,
//         path: 'YES/:metaKey/:id/:status',
//     },
//     Workitem: {
//         screen: WorkitemView,
//         path: 'WORKITEM/:wid/:onlyOpen/:loadInfo',
//     },
//     WorkitemM: {
//         screen: WorkitemView,
//         path: 'WORKITEMM/:wid/:onlyOpen/:loadInfo/:msg',
//     },
// };

const buildTabNavigator = (tabConfig) => {
    const tabs = [];
    for (let tab of tabConfig.tabs) {
        const page = buildScreen(tab);
        if (!page.navigationOptions) {
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
        }
        tabs.push({
            component: page,
            options: page.navigationOptions,
            name: tab.key,
        });
        // tabs[tab.key] = page;
    }
    // if (!tabConfig.tabPosition || tabConfig.tabPosition === "top") {
    const tabBarPosition = tabConfig.tabPosition || 'top';
    const indicatorStyle = {};
    if (tabBarPosition === 'bottom') {
        // indicatorStyle.display = 'none';
        // top: 0,
        Object.assign(indicatorStyle, {
            top: 0,
        })
    }
    const navigatorProps = {};
    if (tabConfig.tabbarElement) {
        navigatorProps.tabBar = (props) => <Element {...props} meta={tabConfig.tabbarElement} />
    }
    if (tabBarPosition === 'bottom') {
        const BottomTab = createBottomTabNavigator();
        return () => <BottomTab.Navigator
            initialRouteName={tabConfig.tabs[0].key}
            headerMode='none'
            tabBarOptions={{
                labelPosition: 'below-icon',
                labelStyle: {
                    fontSize: 14,
                    margin: 0,
                },
                activeBackgroundColor: tabConfig.activeBackgroundColor || 'white',
                activeTintColor: tabConfig.activeTintColor || '#008CD7',
                inactiveBackgroundColor: tabConfig.inactiveBackgroundColor || 'white',
                inactiveTintColor: tabConfig.inactiveTintColor || '#aaa',
                showLabel: tabConfig.showLabel,
                showIcon: tabConfig.showIcon,
                style: {
                    backgroundColor: 'white',
                },
            }}
            {
            ...navigatorProps
            }
        >
            {
                tabs.map((tab) =>
                    <BottomTab.Screen
                        {...tab}
                    />
                )
            }
        </BottomTab.Navigator>;
        return createBottomTabNavigator(
            tabs, {
            initialRouteName: tabConfig.tabs[0].key,
            headerMode: 'none',
            swipeEnabled: true,
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
            ...navigatorProps
        });
    }
    return createMaterialTopTabNavigator(
        tabs, {
        // headerMode: 'none',
        title: "1111",
        swipeEnabled: true,
        initialRouteName: tabConfig.tabs[0].key,
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
        ...navigatorProps
    });
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
        case 'button':
            const result = () => null;
            result.navigationOptions = {
                // tabBarButtonComponent: Controls[config.tabControl],
                tabBarButton: () => {
                    const C = Controls[config.tabControl];
                    return <C />
                }
            }
            return result;
        default:
            return buildControlScreen(config);
    }
};

export default (config) => {
    const customRoute = [];
    let initialRouteName = null;
    const linking = {
        screens: {
        }
    };
    defaultCardRoute.forEach((r) => {
        linking.screens[r.key] = {
            path: r.path
        };
    });
    for (let r of config) {
        let route = {};
        const Screen = buildScreen(r);
        route.screen = Screen;
        route.path = r.path;
        route.key = r.key;
        // customRoute[r.key] = route;
        customRoute.push(route);
        if (r.isRoot) {
            initialRouteName = r.key;
        }
        linking.screens[r.key] = {
            path: r.path,
        }
    }
    const Stack = createStackNavigator();
    const mainCardNavigator = () =>
        <Stack.Navigator
            headerMode="none"
        >
            {
                defaultCardRoute.map((card) =>
                    <Stack.Screen
                        name={card.key}
                        component={card.screen}
                    />
                )
            }
        </Stack.Navigator>
    // const mainCardNavigator = createStackNavigator(
    //     defaultCardRoute,
    //     {
    //         headerMode: 'none',
    //         cardStyle: {
    //             flex: 1
    //         },
    //         defaultNavigationOptions: {
    //             header: null,
    //             // gesturesEnabled: true,
    //             animationEnabled: true,
    //         },
    //     }
    // )
    // const mainModalNavigator = createStackNavigator(
    //     defaultModalRoute,
    //     {
    //         defaultNavigationOptions: {
    //             header: null,
    //         },
    //         cardStyle: {
    //             backgroundColor: 'transparent',
    //         },
    //         initialRouteName,
    //         mode: 'modal',
    //         headerMode: 'none',
    //         transparentCard: true,
    //     }
    // )
    // injectStackNavigator(mainModalNavigator);
    const MainNavigator = () =>
        <Stack.Navigator
            initialRouteName={initialRouteName}
            headerMode="none"
        >
            {
                [...customRoute, ...defaultCardRoute].map((r) =>
                    <Stack.Screen
                        name={r.key}
                        component={r.screen}
                        options = {{
                            animationEnabled: true,
                        }}
                    />
                )
            }
        </Stack.Navigator>
    // const MainNavigator = createStackNavigator(
    //     {
    //         ...customRoute,
    //         Card: {
    //             screen: mainCardNavigator,
    //             path: 'card',
    //         },
    //         // ...defaultModalRoute,
    //         // Modal: {
    //         //     screen: mainModalNavigator,
    //         //     path: 'modal',
    //         // }
    //     },
    //     {
    //         defaultNavigationOptions: {
    //             header: null,
    //             // gesturesEnabled: true,
    //             animationEnabled: true,
    //         },
    //         cardStyle: {
    //             backgroundColor: 'transparent',
    //         },
    //         initialRouteName,
    //         mode: 'modal',
    //         headerMode: 'none',
    //         transparentCard: true,
    //     },
    // );
    // injectStackNavigator(MainNavigator);
    linking.initialRouteName = initialRouteName;
    return () =>
        <NavigationContainer linking={{
            enabled: true,
            getStateFromPath,
            getPathFromState,
            getActionFromState,
            prefixes: ['://'],
            config: linking
        }}
        >
            <MainNavigator />
        </NavigationContainer>
}
