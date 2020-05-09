/**
 * 用于表格中的文本控件
 */
import React from 'react';
import { Text } from 'react-native';
import { ControlWrap } from 'yes-intf';

const SplitText = ({ displayValue, style, isVirtual, controlState, caption, showIndex = 0, splitStr = " ", emptyStr="空" }) => {
    let showStr = "";
    if (displayValue) {
        const splitArray = displayValue.split(splitStr);
        if (showIndex >= splitArray.length) {
            showStr = splitArray[0];
        } else {
            showStr = splitArray[showIndex];
        }
    }
    return (<Text style={style}>
        {showStr || emptyStr }
    </Text>);
};

let result = ControlWrap(SplitText);
// if (__STORYBOOK__) {
//     const StoryControlWrap = require('./StoryControlWrap');
//     result = StoryControlWrap.default(YText);
// } 

export default result;
