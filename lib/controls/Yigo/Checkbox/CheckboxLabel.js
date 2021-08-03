import React from 'react';
import { Text } from 'react-native';
import { ControlWrap } from 'yes-intf';
var CheckboxLabel = function (_a) {
    var style = _a.style, value = _a.value, trueLabel = _a.trueLabel, falseLabel = _a.falseLabel;
    var v = value ? trueLabel : falseLabel;
    if (v == null) {
        return null;
    }
    return React.createElement(Text, { style: style }, value ? trueLabel : falseLabel);
};
export default ControlWrap(CheckboxLabel);
