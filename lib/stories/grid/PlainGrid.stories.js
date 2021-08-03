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
import { PlainGrid } from '../../export';
import StoryWrapper from '../StoryWrapper';
export default {
    title: 'yes-framework/grid/PlainGrid',
    component: PlainGrid,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(PlainGrid, __assign({}, args)))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    cellWidth: 100,
};
