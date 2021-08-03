/**
 * 用于表格中的文本控件
 */
import React from 'react';
import { Text } from 'react-native';
import { ControlWrap } from 'yes-intf';
import Element from '../../../template/Element';
var YText = function (_a) {
    var template = _a.template, displayValue = _a.displayValue, value = _a.value, style = _a.style, isVirtual = _a.isVirtual, controlState = _a.controlState, caption = _a.caption, icon = _a.icon, styleMapping = _a.styleMapping, textMapping = _a.textMapping, _b = _a.emptyStr, emptyStr = _b === void 0 ? "空" : _b;
    var getText = function () {
        var txt = displayValue;
        if (template) {
            return eval('`' + template + '`');
        }
        if (!txt) {
            txt = emptyStr;
        }
        if (!textMapping) {
            return txt;
        }
        return textMapping[txt] || txt;
    };
    var extraStyle = null;
    if (styleMapping) {
        extraStyle = styleMapping(value);
    }
    return (React.createElement(Text, { style: [style, extraStyle] },
        icon ? React.createElement(Element, { meta: icon }) : null,
        getText()));
};
var result = ControlWrap(YText);
export default result;
