import React from 'react';
import { ControlWrap } from 'yes-intf';
import AwesomefontIcon from 'react-native-vector-icons/FontAwesome';
import { Element } from 'yes-framework';
var CheckboxIcon = function (_a) {
    var style = _a.style, value = _a.value, trueIcon = _a.trueIcon, falseIcon = _a.falseIcon, trueStyle = _a.trueStyle, falseStyle = _a.falseStyle;
    var icon = value ? trueIcon : falseIcon;
    var iconStyle = value ? trueStyle : falseStyle;
    var iconElement = null;
    if (icon) {
        if (typeof icon === 'string') {
            iconElement = React.createElement(AwesomefontIcon, { name: icon, style: iconStyle });
        }
        else {
            // iconElement = this.context.createElement(icon, style);
            iconElement = React.createElement(Element, { meta: icon, style: iconStyle });
        }
    }
    return iconElement;
};
export default ControlWrap(CheckboxIcon);
