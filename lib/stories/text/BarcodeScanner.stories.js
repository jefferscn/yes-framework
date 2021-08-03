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
import { BarcodeScannerText } from '../../export';
import StoryWrapper from '../StoryWrapper';
import { View, StyleSheet } from 'react-native';
var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
    }
});
export default {
    title: 'yes-framework/text/QRCodeScanner',
    component: BarcodeScannerText,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(View, { style: styles.container },
        React.createElement(BarcodeScannerText, __assign({}, args))))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'text1',
};
