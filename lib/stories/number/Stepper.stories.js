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
import { Stepper } from '../../export';
import StoryWrapper from '../StoryWrapper';
export default {
    title: 'yes-framework/number/Stepper',
    component: Stepper,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(Stepper, __assign({}, args)))); };
var argTypes = {
    step: {
        description: '步长',
        defaultValue: 1,
    },
    min: {
        description: '最小数字',
        defaultValue: 0,
    },
    max: {
        description: '最大数字',
        defaultValue: 5,
    },
};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'score',
    min: 0,
    max: 100,
    step: 1,
    showNumber: true,
};
