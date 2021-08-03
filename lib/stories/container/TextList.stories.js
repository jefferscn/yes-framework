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
import { TextList } from 'yes-framework/export';
export default {
    title: 'yes-framework/container/TextList',
    component: TextList,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(TextList, __assign({}, args)))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    template: '${caption}:${displayValue}',
    style: {
        paddingLeft: 12,
        paddingTop: 8,
        background: 'white',
    },
    rowStyle: {
        color: 'red',
    },
    items: [
        'map1',
        'text1',
        'dict1',
        'dict2',
        'combobox1',
        'date1',
    ]
};
