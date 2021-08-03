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
import { CellLayoutGridView } from '../../export';
export default {
    title: 'yes-framework/grid/CellLayout',
    component: CellLayoutGridView,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(CellLayoutGridView, __assign({}, args)))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    useBodyScroll: false,
    style: {
        flex: 1,
        width: '100%',
    },
    items: [
        'title',
        'subTitle'
    ]
};
