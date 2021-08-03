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
import { View, StyleSheet, Text, Image } from 'react-native';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
var styles = StyleSheet.create({
    inner: {
        height: 1000,
    },
    image: {
        height: 300,
    },
    text: {
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 400,
    }
});
var ScrollView = Animated.ScrollView;
var Scroll = function (_a) {
    var style = _a.style;
    var scrollHanlder = useAnimatedScrollHandler({
        onScroll: function (event, ctx) {
            console.log(event);
        },
    });
    return (
    // <PanGestureHandler onGestureEvent={event}>
    React.createElement(ScrollView
    // refreshControl={<RefreshControl />}
    , { 
        // refreshControl={<RefreshControl />}
        style: style, onScroll: scrollHanlder, scrollEventThrottle: 10 },
        React.createElement(View, { style: styles.inner },
            React.createElement(Image, { style: styles.image, source: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1361135963,570304265&fm=26&gp=0.jpg" }),
            React.createElement(Text, { style: [styles.text] }, "\u6211\u4E86\u4E2A\u5DEE"),
            React.createElement(View, { style: {
                    flex: 1,
                    background: 'yellow',
                } })))
    // </PanGestureHandler>
    );
};
export default {
    title: 'yes-framework/test/scrollview',
    component: Scroll,
};
var Template = function (args) { return (React.createElement(Scroll, __assign({}, args))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    style: {
        flex: 1,
    }
};
