import React from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    withNavigation,
} from 'react-navigation';
import Element from '../template/Element';
import DynamicView from '../DynamicView';
import Controls from '../config/control';
import WorkitemView from '../WorkitemView';
import FieldView from '../FieldView';
// import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import IconFontIcon from '../font';
import generateRouteComponent from '../util/generateRouteComponent';
import { generateKey } from '@react-navigation/core/lib/module/routers/KeyGenerator';
import { Dimensions, Animated, Easing } from 'react-native';
import { StackViewStyleInterpolator } from 'react-navigation-stack';

function injectStackNavigator(navigator) {
    const oldFunc = navigator.router.getActionForPathAndParams;
    navigator.router.getActionForPathAndParams = function () {
        const action = oldFunc.apply(this, arguments);
        if (action && action.action) {
            action.action.key = action.action.key || generateKey();
        }
        return action;
    }
}

const defaultCardRoute = {
    DynamicDetail: {
        screen: withNavigation(DynamicView),
        path: 'YESMOBILE/:metaKey/:id/:status',
    },
    DynamicDetail1: {
        screen: withNavigation(DynamicView),
        path: 'YES/:metaKey/:id/:status',
    },
    DynamicDetail2: {
        screen: withNavigation(DynamicView),
        path: 'YES/:metaKey/:id/:status/:parent',
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
        tabs[tab.key] = page;
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
        navigatorProps.tabBarComponent = (props) => <Element {...props} meta={tabConfig.tabbarElement} />
    }
    if (tabBarPosition === 'bottom') {
        return createBottomTabNavigator(
            tabs, {
            initialRouteName: tabConfig.tabs[0].key,
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
                tabBarButtonComponent: Controls[config.tabControl],
            }
            return result;
        default:
            return buildControlScreen(config);
    }
};

export default (config) => {
    const customRoute = {};
    let initialRouteName = null;
    // console.log(config)
    for (let r of config) {
        let route = {};
        const Screen = buildScreen(r);
        route.screen = Screen;
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
            },
            defaultNavigationOptions: {
                header: null,
                // gesturesEnabled: true,
                animationEnabled: true,
            },
            transitionConfig: ()=>({
                screenInterpolator: StackViewStyleInterpolator.forHorizontal,
            }),
            // transitionConfig: () => ({
            //     transitionSpec: {
            //         duration: 300,
            //         easing: Easing.out(Easing.poly(4)),
            //         timing: Animated.timing,
            //     },
            //     screenInterpolator: sceneProps => {
            //         const { layout, position, scene } = sceneProps;
            //         const { index } = scene;

            //         // const height = layout.initHeight;
            //         const width = layout.initWidth;
            //         const translateX = position.interpolate({
            //             inputRange: [index - 1, index, index + 1],
            //             outputRange: [width, 0, 0],
            //         });

            //         const opacity = position.interpolate({
            //             inputRange: [index - 1, index - 0.99, index],
            //             outputRange: [0, 1, 1],
            //         });

            //         return { opacity, transform: [{ translateX }] };
            //     },
            // }),
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
    injectStackNavigator(mainModalNavigator);
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
                // gesturesEnabled: true,
                animationEnabled: true,
            },
            cardStyle: {
                backgroundColor: 'transparent',
            },
            initialRouteName,
            mode: 'modal',
            headerMode: 'none',
            transparentCard: true,
            transitionConfig: ()=>({
                screenInterpolator: StackViewStyleInterpolator.forHorizontal,
            })
            // transitionConfig: () => ({
            //     transitionSpec: {
            //         duration: 300,
            //         easing: Easing.out(Easing.poly(4)),
            //         timing: Animated.timing,
            //     },
            //     screenInterpolator: sceneProps => {
            //         const { layout, position, scene } = sceneProps;
            //         const { index } = scene;

            //         // const height = layout.initHeight;
            //         const width = layout.initWidth;
            //         const translateX = position.interpolate({
            //             inputRange: [index - 1, index, index + 1],
            //             outputRange: [width, 0, 0],
            //         });

            //         const opacity = position.interpolate({
            //             inputRange: [index - 1, index - 0.99, index],
            //             outputRange: [0, 1, 1],
            //         });

            //         return { opacity, transform: [{ translateX }] };
            //     },
            // }),
        },
    );
    injectStackNavigator(MainNavigator);
    return createAppContainer(MainNavigator);
}
