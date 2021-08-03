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
import { Text, View } from 'react-native';
import GridBadge from '../../controls/Yigo/Grid/GridBadge';
export default {
    title: 'yes-framework/gridsummary/GridSum',
    component: GridBadge.GridSumBadge,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(View, { style: {
            width: 100,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightgray',
        } },
        React.createElement(GridBadge.GridSumBadge, __assign({}, args),
            React.createElement(Text, { style: { flex: 1 } }, "\u5F85\u529E"))))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    sumField: 'score',
};
