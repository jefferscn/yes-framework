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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useState } from 'react';
import { Animated, View } from 'react-native';
import { SwipeAction } from 'antd-mobile';
export default (function (_a) {
    var onRemove = _a.onRemove, _b = _a.removeable, removeable = _b === void 0 ? true : _b, _c = _a.removeText, removeText = _c === void 0 ? "删除" : _c, removeStyle = _a.removeStyle, children = _a.children, right = _a.right, otherProps = __rest(_a, ["onRemove", "removeable", "removeText", "removeStyle", "children", "right"]);
    var height = useState(new Animated.Value(0))[0];
    var animating = false;
    var onRemove_ = function () {
        animating = true;
        Animated.timing(height, {
            toValue: 0,
            duration: 300,
        }).start(function () {
            animating = false;
            onRemove && onRemove();
        });
    };
    var removeAction = {
        text: removeText,
        style: removeStyle,
        onPress: onRemove_
    };
    var right_ = [];
    if (removeable) {
        if (right) {
            right_ = __spreadArray([removeAction], right);
        }
        else {
            right_ = [removeAction];
        }
    }
    var onLayout = function (e) {
        Animated.timing(height, {
            toValue: e.nativeEvent.layout.height,
            duration: 300,
        }).start(function () {
        });
    };
    return React.createElement(Animated.View, { style: [{ overflow: 'hidden' }, {
                height: height,
            }] },
        React.createElement(View, { onLayout: onLayout },
            React.createElement(SwipeAction, __assign({}, otherProps, { right: right_ }), children)));
});
