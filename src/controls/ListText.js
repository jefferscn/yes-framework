/**
 * 用于表格中的文本控件
 */
import React from 'react';
import { Text } from 'react-native';
import { ControlWrap } from 'yes-intf';
import Element from '../template/Element';

const YText = ({ template, displayValue, value, style, isVirtual, controlState, caption, icon, styleMapping, textMapping, emptyStr = "空" }) => {
    const getText = ()=> {
        let txt = displayValue;
        if(template) {
            return eval('`' + template + '`');
        }
        if(!txt) {    
            txt = emptyStr;
        }
        if(!textMapping) {
            return txt;
        }
        return textMapping[txt] || txt;
    }
    let extraStyle = null;
    if(styleMapping) {
        extraStyle = styleMapping(value);
    }
    return (<Text style={[style, extraStyle]}>
        {icon ? <Element meta={icon} /> : null}
        {getText()}
    </Text>);
};

let result = ControlWrap(YText);
// if (__STORYBOOK__) {
//     const StoryControlWrap = require('./StoryControlWrap');
//     result = StoryControlWrap.default(YText);
// } 

export default result;
