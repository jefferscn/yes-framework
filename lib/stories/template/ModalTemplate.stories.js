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
import ModalTemplate from '../../template/ModalTemplate';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import 'antd-mobile/dist/antd-mobile.css';
import StoryWrapper from '../StoryWrapper';
injectFont(fontAwesome, 'FontAwesome');
export default {
    title: 'yes-framework/template/ModalTemplate',
    component: ModalTemplate,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(ModalTemplate, __assign({}, args)))); };
var argTypes = {
    popup: {
        description: '是否popup模式',
        defaultValue: true,
    },
};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    formStatus: 'ok',
    popup: true,
    content: {
        type: "element",
        elementType: "CellLayoutTemplate",
        elementProps: {
            items: ['dict1', 'combbox1']
        }
    },
    actions: [{
            text: '确定',
            yigoid: 'button1',
        }, {
            text: '取消',
            yigoid: 'button1',
        }]
};
