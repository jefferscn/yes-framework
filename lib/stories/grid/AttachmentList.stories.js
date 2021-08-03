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
import { AttachmentList } from '../../export';
export default {
    title: 'yes-framework/grid/AttachmentList',
    component: AttachmentList,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(AttachmentList, __assign({}, args)))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    style: {
        width: '100%',
    },
    fileName: 'img',
    filePath: 'img',
    yigoAttachment: false,
    needThumbnail: false,
    yigoid: 'grid1',
};
