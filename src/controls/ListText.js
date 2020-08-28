/**
 * 用于表格中的文本控件
 */
import React from 'react';
import { Text } from 'react-native';
import { ControlWrap } from 'yes-intf';
import Element from '../template/Element';

const YText = ({ displayValue, value, style, isVirtual, controlState, caption, icon, styleMapping, emptyStr = "空" }) => {
    let extraStyle = null;
    if(styleMapping) {
        extraStyle = styleMapping(value);
    }
    return (<Text style={[style, extraStyle]}>
        {icon ? <Element meta={icon} /> : null}
        {displayValue || emptyStr}
    </Text>);
};

let result = ControlWrap(YText);
// if (__STORYBOOK__) {
//     const StoryControlWrap = require('./StoryControlWrap');
//     result = StoryControlWrap.default(YText);
// } 

export default result;
