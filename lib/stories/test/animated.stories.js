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
import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withRepeat } from 'react-native-reanimated';
var styles = StyleSheet.create({
    face: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        color: 'white',
    },
    cube: {
        transformStyle: 'preserve-3d',
    },
    container: {
    // marginTop: 50,
    // marginBottom: 50,
    }
});
var Cube = function (_a) {
    var size = _a.size, style = _a.style;
    var sz = size / 2;
    var sizeStyle = {
        height: size,
        width: size,
    };
    var translateStyle = {
        backgroundColor: 'rgba(90,90,90,.7)',
        transform: [
            { translateZ: sz }
        ]
    };
    var topStyle = {
        backgroundColor: 'rgba(0,210,0,.7)',
        transform: [
            { translateZ: sz }
        ]
    };
    var bottomStyle = {
        transform: [
            { rotateX: '180deg' },
            { translateZ: sz }
        ]
    };
    var leftStyle = {
        backgroundColor: 'rgba(210,0,0,.7)',
        transform: [
            { rotateY: '90deg' },
            { translateZ: sz }
        ]
    };
    var rightStyle = {
        backgroundColor: 'rgba(0,0,210,.7)',
        transform: [
            { rotateY: '-90deg' },
            { translateZ: sz }
        ]
    };
    var frontStyle = {
        backgroundColor: 'rgba(210,210,0,.7)',
        transform: [
            { rotateX: '90deg' },
            { translateZ: sz }
        ]
    };
    var backStyle = {
        backgroundColor: 'rgba(210,0,210,.7)',
        transform: [
            { rotateX: '-90deg' },
            { translateZ: sz }
        ]
    };
    return (React.createElement(Animated.View, { style: [styles.cube, style, sizeStyle] },
        React.createElement(View, { style: [styles.face, topStyle] },
            React.createElement(Text, { style: styles.text }, "1")),
        React.createElement(View, { style: [styles.face, bottomStyle] },
            React.createElement(Text, { style: styles.text }, "2")),
        React.createElement(View, { style: [styles.face, leftStyle] },
            React.createElement(Text, { style: styles.text }, "3")),
        React.createElement(View, { style: [styles.face, rightStyle] },
            React.createElement(Text, { style: styles.text }, "4")),
        React.createElement(View, { style: [styles.face, frontStyle] },
            React.createElement(Text, { style: styles.text }, "5")),
        React.createElement(View, { style: [styles.face, backStyle] },
            React.createElement(Text, { style: styles.text }, "6"))));
};
var AnimatedCube = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 100 : _b;
    // const [x, setX] = useState(0);
    // const [y, setY] = useState(0);
    var x = useSharedValue(0);
    var y = useSharedValue(0);
    var _c = useState(0), lastX = _c[0], setLastX = _c[1];
    var _d = useState(0), lastY = _d[0], setLastY = _d[1];
    var event = useAnimatedGestureHandler({
        onStart: function (event, ctx) {
        },
        onEnd: function (event, ctx) {
            setLastX(x.value);
            setLastY(y.value);
        },
        onActive: function (event, ctx) {
            console.log(event);
            var distance = Math.sqrt(Math.pow(event.translationX, 2) + Math.pow(event.translationY, 2));
            // 200pt = 90deg
            var angle = distance * Math.PI / 400;
            var newX = lastX + 180 * Math.atan(Math.tan(angle) * event.translationX / distance) / Math.PI;
            var newY = lastY + 180 * Math.atan(Math.tan(angle) * -event.translationY / distance) / Math.PI;
            console.log(distance, angle, newX, newY);
            x.value = newX;
            y.value = newY;
        }
    });
    var rotateStyle = useAnimatedStyle(function () {
        return {
            transform: [{
                    rotateY: x.value + "deg",
                }, {
                    rotateX: y.value + "deg",
                }]
        };
    });
    var containerStyle = {
        width: size,
        height: size,
    };
    var reset = function () {
        x.value = withRepeat(withSpring(0), 2, true);
        y.value = withRepeat(withSpring(0), 2, true);
        setLastX(0);
        setLastY(0);
    };
    return (React.createElement(View, null,
        React.createElement(PanGestureHandler, { onGestureEvent: event },
            React.createElement(View, { style: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                } },
                React.createElement(Cube, { size: size, style: rotateStyle }))),
        React.createElement(Button, { title: "\u6062\u590D", onPress: reset })));
};
export default {
    title: 'yes-framework/test/animated',
    component: AnimatedCube,
};
var Template = function (args) { return (React.createElement(AnimatedCube, __assign({}, args))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    size: 150
};
