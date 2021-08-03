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
import { Rating } from '../../export';
import StoryWrapper from '../StoryWrapper';
export default {
    title: 'yes-framework/number/Rating',
    component: Rating,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(Rating, __assign({}, args)))); };
var argTypes = {
    fractions: {
        description: '一个星的可操作数',
        defaultValue: 1
    },
    step: {
        description: '一个星代表的数量',
        defaultValue: 1,
    },
    start: {
        description: '最小数字',
        defaultValue: 0,
    },
    end: {
        description: '最大数字',
        defaultValue: 5,
    },
};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'score',
    fractions: 1,
    step: 1,
    start: 0,
    end: 5,
};
