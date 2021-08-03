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
import { GridChart } from 'yg-echarts';
import StoryWrapper from '../StoryWrapper';
export default {
    title: 'yes-framework/grid/Chart',
    component: GridChart,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(GridChart, __assign({}, args)))); };
var argTypes = {};
export var Pie = Template.bind({});
Pie.argTypes = argTypes;
Pie.args = {
    yigoid: 'grid1',
    title: {
        text: 'Pie',
    },
    legend: {},
    style: {
        flex: 1,
        width: '100%',
    },
    slice: [
        'title',
        'badget',
    ],
    series: [{
            type: 'pie',
            dataColumn: 'badget'
        }]
};
export var Bar = Template.bind({});
Bar.argTypes = argTypes;
Bar.args = {
    yigoid: 'grid1',
    title: {
        text: 'Bar',
    },
    "xAxis": {
        "type": "category"
    },
    "yAxis": {
        "type": "value"
    },
    legend: {},
    style: {
        flex: 1,
        width: '100%',
    },
    slice: [
        'title',
        'badget',
    ],
    series: [{
            type: 'bar',
            dataColumn: 'badget'
        }]
};
export var Line = Template.bind({});
Line.argTypes = argTypes;
Line.args = {
    yigoid: 'grid1',
    title: {
        text: 'Line',
    },
    "xAxis": {
        "type": "category"
    },
    "yAxis": {
        "type": "value"
    },
    legend: {},
    style: {
        flex: 1,
        width: '100%',
    },
    slice: [
        'title',
        'badget',
    ],
    series: [{
            type: 'line',
            dataColumn: 'badget'
        }]
};
