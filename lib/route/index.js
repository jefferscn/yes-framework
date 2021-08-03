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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator, } from '@react-navigation/material-top-tabs';
import Element from '../template/Element';
import DynamicView from '../DynamicView';
import WorkitemView from '../WorkitemView';
// import IconFontIcon from '../font';
import generateRouteComponent from '../util/generateRouteComponent';
import getPathFromState from './getPathFromState';
import getStateFromPath from './getStateFromPath';
import getActionFromState from './getActionFromState';
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
var defaultCardRoute = [
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
var buildTabNavigator = function (tabConfig) {
    var tabs = [];
    var _loop_1 = function (tab) {
        var page = buildScreen(tab);
        if (!page.navigationOptions) {
            page.navigationOptions = function (_a) {
                var navigation = _a.navigation;
                return ({
                    tabBarIcon: tab.icon ? function (_a) {
                        var tintColor = _a.tintColor, focused = _a.focused, horizontal = _a.horizontal;
                        var meta = {
                            type: 'element',
                            elementType: 'IconFont',
                            elementProps: {
                                name: tab.icon,
                                size: 22,
                                style: {
                                    color: focused ? '#008CD7' : '#aaa'
                                }
                            }
                        };
                        return React.createElement(Element, { meta: meta });
                        // <IconFontIcon
                        //     name={tab.icon}
                        //     size={22}
                        //     style={{ color: focused ? '#008CD7' : '#aaa' }}
                        // />
                    } : null,
                    tabBarLabel: tab.label,
                });
            };
        }
        tabs.push({
            component: page,
            options: page.navigationOptions,
            name: tab.key,
        });
    };
    for (var _i = 0, _a = tabConfig.tabs; _i < _a.length; _i++) {
        var tab = _a[_i];
        _loop_1(tab);
    }
    // if (!tabConfig.tabPosition || tabConfig.tabPosition === "top") {
    var tabBarPosition = tabConfig.tabPosition || 'top';
    var indicatorStyle = {};
    if (tabBarPosition === 'bottom') {
        // indicatorStyle.display = 'none';
        // top: 0,
        Object.assign(indicatorStyle, {
            top: 0,
        });
    }
    var navigatorProps = {};
    if (tabConfig.tabbarElement) {
        navigatorProps.tabBar = function (props) { return React.createElement(Element, __assign({}, props, { meta: tabConfig.tabbarElement })); };
    }
    if (tabBarPosition === 'bottom') {
        var BottomTab_1 = createBottomTabNavigator();
        return function () { return React.createElement(BottomTab_1.Navigator, __assign({ initialRouteName: tabConfig.tabs[0].key, headerMode: 'none', tabBarOptions: {
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
            } }, navigatorProps), tabs.map(function (tab) {
            return React.createElement(BottomTab_1.Screen, __assign({}, tab));
        })); };
        return createBottomTabNavigator(tabs, __assign({ initialRouteName: tabConfig.tabs[0].key, headerMode: 'none', swipeEnabled: true, tabBarOptions: {
                labelStyle: {
                    fontSize: 14,
                    margin: 0,
                },
                indicatorStyle: __assign({ backgroundColor: tabConfig.indicatorColor || '#008CD7' }, indicatorStyle),
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
            }, tabBarPosition: tabBarPosition }, navigatorProps));
    }
    return createMaterialTopTabNavigator(tabs, __assign({ 
        // headerMode: 'none',
        title: "1111", swipeEnabled: true, initialRouteName: tabConfig.tabs[0].key, tabBarOptions: {
            labelStyle: {
                fontSize: 14,
                margin: 0,
            },
            indicatorStyle: __assign({ backgroundColor: tabConfig.indicatorColor || '#008CD7' }, indicatorStyle),
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
        }, tabBarPosition: tabBarPosition }, navigatorProps));
};
var buildYIGOBillformScreen = function (config) {
    return generateRouteComponent({
        formKey: config.formKey,
        // title: ({ focused, tintColor }) =>
        //     <RejectBadget><Text style={{ fontSize: 16, color: tintColor }}>{formatMessage('Reject List')}</Text></RejectBadget>,
        key: config.key,
        oid: config.oid,
        status: config.status || 'DEFAULT',
    });
};
var buildControlScreen = function (config) {
    // const Control = Controls[config.control];
    // return () => <Control {...config.controlProps} />
    var meta = {
        type: 'element',
        elementType: config.control,
        elementProps: config.controlProps,
    };
    return function () { return React.createElement(Element, { meta: meta }); };
};
var buildScreen = function (config) {
    switch (config.type) {
        case 'tab':
            return buildTabNavigator(config);
        case 'billform':
            return buildYIGOBillformScreen(config);
        case 'button':
            var result = function () { return null; };
            result.navigationOptions = {
                // tabBarButtonComponent: Controls[config.tabControl],
                tabBarButton: function () {
                    // const C = Controls[config.tabControl];
                    // return <C />
                    return React.createElement(Element, { meta: {
                            type: 'element',
                            elementType: config.tabControl,
                        } });
                }
            };
            return result;
        default:
            return buildControlScreen(config);
    }
};
export default (function (config) {
    var customRoute = [];
    var initialRouteName = null;
    var linking = {
        screens: {}
    };
    defaultCardRoute.forEach(function (r) {
        linking.screens[r.key] = {
            path: r.path
        };
    });
    for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
        var r = config_1[_i];
        var route = {};
        var Screen_1 = buildScreen(r);
        route.screen = Screen_1;
        route.path = r.path;
        route.key = r.key;
        // customRoute[r.key] = route;
        customRoute.push(route);
        if (r.isRoot) {
            initialRouteName = r.key;
        }
        linking.screens[r.key] = {
            path: r.path,
        };
    }
    var Stack = createStackNavigator();
    var mainCardNavigator = function () {
        return React.createElement(Stack.Navigator, { headerMode: "none" }, defaultCardRoute.map(function (card) {
            return React.createElement(Stack.Screen, { name: card.key, component: card.screen });
        }));
    };
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
    var MainNavigator = function () {
        return React.createElement(Stack.Navigator, { initialRouteName: initialRouteName, headerMode: "none" }, __spreadArray(__spreadArray([], customRoute), defaultCardRoute).map(function (r) {
            return React.createElement(Stack.Screen, { name: r.key, component: r.screen, options: {
                    animationEnabled: true,
                } });
        }));
    };
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
    return function () {
        return React.createElement(NavigationContainer, { linking: {
                enabled: true,
                getStateFromPath: getStateFromPath,
                getPathFromState: getPathFromState,
                getActionFromState: getActionFromState,
                prefixes: ['://'],
                config: linking
            } },
            React.createElement(MainNavigator, null));
    };
});
