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
import StoryWrapper from '../StoryWrapper';
import { Card } from '../../export';
export default {
    title: 'yes-framework/container/Card',
    component: Card,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(Card, __assign({}, args)))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    title: '卡片演示',
    content: {
        type: 'element',
        elementType: 'CellLayoutTemplate',
        elementProps: {
            items: ['dict1', 'number1', 'image1']
        }
    },
    headIcon: {
        type: 'element',
        elementType: 'AwesomeFontIcon',
        elementProps: {
            name: 'star',
        }
    },
    collapseable: true,
    bookmark: 'text1',
    extra: {
        type: 'element',
        elementType: 'AwesomeFontIcon',
        elementProps: {
            name: 'star',
            style: {
                flex: 1,
                textAlign: 'right',
            }
        }
    }
};
