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
import { Header } from 'yes-framework/export';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import StoryContext from 'yes-comp-react-native-web/stories/StoryContext';
injectFont(fontAwesome, 'FontAwesome');
import AppWrapper from '../AppWrapper';
import { ProjectCfg } from '../config/index';
import control from '../config/control';
export default {
    title: 'yes-framework/Header',
    component: Header,
};
var Template = function (args) { return (React.createElement(AppWrapper, { control: control, projectCfg: ProjectCfg },
    React.createElement(StoryContext, null,
        React.createElement(Header, __assign({}, args))))); };
var argTypes = {
    titleMode: {
        description: 'Title模式flex-android,absolute-ios,使用自定义title控件不起作用',
        defaultValue: 'flex',
        control: {
            type: 'radio',
            options: ['flex', 'absolute']
        }
    },
    mode: {
        control: {
            type: 'radio',
            options: ['dark', 'light']
        }
    },
};
export var CanBack = Template.bind({});
CanBack.argTypes = argTypes;
CanBack.args = {
    titleMode: 'flex',
    canBack: true,
    title: "Title",
    headerStyle: {},
    titleStyle: {},
    textStyle: {},
    mode: 'dark',
};
export var WithoutBack = Template.bind({});
WithoutBack.args = {
    titleMode: 'flex',
    canBack: false,
    title: "Title",
    headerStyle: {},
    titleStyle: {},
    textStyle: {},
    mode: 'dark',
};
export var WithStyle = Template.bind({});
WithStyle.args = {
    titleMode: 'flex',
    canBack: false,
    title: "Title",
    headerStyle: { "boder": "none" },
    titleStyle: { "backgroundColor": "red", "flex": 1 },
    textStyle: { "color": "white" },
    mode: 'dark',
};
export var YIGOFormTitle = Template.bind({});
YIGOFormTitle.argTypes = argTypes;
YIGOFormTitle.args = {
    titleMode: 'flex',
    canBack: true,
    title: "Title",
    headerStyle: {},
    titleStyle: {},
    textStyle: {},
    mode: 'dark',
    titleElement: {
        type: 'element',
        elementType: 'FormTitle'
    }
};
