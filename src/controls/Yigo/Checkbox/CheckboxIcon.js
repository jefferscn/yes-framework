import React from 'react';
import { ControlWrap } from 'yes-intf';
import AwesomefontIcon from 'react-native-vector-icons/FontAwesome';
import Element from 'yes-framework/template/Element';

const CheckboxIcon = ({ style, value, trueIcon, falseIcon, trueStyle, falseStyle }) => {
    const icon = value ? trueIcon : falseIcon;
    const iconStyle = value ? trueStyle : falseStyle;
    let iconElement = null;
    if (icon) {
        if (typeof icon === 'string') {
            iconElement = <AwesomefontIcon name={icon} style={iconStyle} />;
        } else {
            // iconElement = this.context.createElement(icon, style);
            iconElement = <Element meta = {icon} style={iconStyle} />
        }
    }
    return iconElement;
}

export default ControlWrap(CheckboxIcon)
