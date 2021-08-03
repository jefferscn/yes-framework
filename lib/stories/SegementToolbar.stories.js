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
import { SegementToolbar } from '../export';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import StoryContext from 'yes-comp-react-native-web/stories/StoryContext';
import 'antd-mobile/dist/antd-mobile.css';
injectFont(fontAwesome, 'FontAwesome');
import AppWrapper from '../AppWrapper';
import { ProjectCfg } from '../config/index';
import control from '../config/control';
export default {
    title: 'yes-framework/SegementToolbar',
    component: SegementToolbar,
};
var Template = function (args) { return (React.createElement(AppWrapper, { control: control, projectCfg: ProjectCfg },
    React.createElement(StoryContext, null,
        React.createElement(SegementToolbar, __assign({}, args))))); };
var argTypes = {
    captionMapping: {
        description: '映射表，设计的Caption->App的Caption'
    },
    ignoreItems: {
        description: '强制不显示的项目'
    }
};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    ignoreItems: [],
    captionMapping: {}
};
