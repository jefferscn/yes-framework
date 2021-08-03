/**
 * 用于表格中的文本控件
 */
import React from 'react';
import { Text } from 'react-native';
import { ControlWrap } from 'yes-intf';
var SplitText = function (_a) {
    var displayValue = _a.displayValue, style = _a.style, isVirtual = _a.isVirtual, controlState = _a.controlState, caption = _a.caption, _b = _a.showIndex, showIndex = _b === void 0 ? 0 : _b, _c = _a.splitStr, splitStr = _c === void 0 ? " " : _c, _d = _a.emptyStr, emptyStr = _d === void 0 ? "空" : _d, format = _a.format;
    var showStr = "";
    if (displayValue) {
        var splitArray = displayValue.split(splitStr);
        if (showIndex >= splitArray.length) {
            showStr = splitArray[0];
        }
        else {
            showStr = splitArray[showIndex];
        }
    }
    var formatResult = function (str) {
        if (format && typeof format === 'function') {
            return format(str);
        }
        return str;
    };
    return (React.createElement(Text, { style: style }, formatResult(showStr || emptyStr)));
};
var result = ControlWrap(SplitText);
export default result;
