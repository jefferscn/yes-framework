/**
 * 用于表格中的文本控件
 */
import React from 'react';
import { Text } from 'react-native';
import { ControlWrap } from 'yes-intf';

const SplitText = ({ displayValue, style, isVirtual, controlState, caption, showIndex = 0, splitStr = " ", emptyStr="空", format }) => {
    let showStr = "";
    if (displayValue) {
        const splitArray = displayValue.split(splitStr);
        if (showIndex >= splitArray.length) {
            showStr = splitArray[0];
        } else {
            showStr = splitArray[showIndex];
        }
    }
    const formatResult = (str)=> {
        if(format && typeof format==='function'){
            return format(str);
        }
        return str;
    }
    return (<Text style={style}>
        {formatResult(showStr || emptyStr)}
    </Text>);
};

let result = ControlWrap(SplitText);

export default result;
