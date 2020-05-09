/**
 * 用于表格中的文本控件
 */
import React from 'react';
import { Text } from 'react-native';
import { ControlWrap } from 'yes-intf';
import Element from '../template/Element';

const YText = ({ displayValue, style, isVirtual, controlState, caption, icon }) => {
    return (<Text style={style}>
        {icon ? <Element meta={icon} /> : null}
        {displayValue || "空"}
    </Text>);
};

let result = ControlWrap(YText);
// if (__STORYBOOK__) {
//     const StoryControlWrap = require('./StoryControlWrap');
//     result = StoryControlWrap.default(YText);
// } 

export default result;
