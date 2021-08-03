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
import { SectionList } from '../../export';
export default {
    title: 'yes-framework/grid/SectionList',
    component: SectionList,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(SectionList, __assign({}, args)))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    sectionColumn: 'date',
    mapFun: "date",
    storybook: true,
    primaryKey: 'title',
    secondKey: ['subTitle'],
    tertiaryKey: ['dict2'],
    useBodyScroll: true,
    rightActions: [{
            text: '显示',
            columnKey: 'aaa'
        }],
    leftActions: [{
            text: '明细',
            columnKey: 'aaa'
        }]
};
