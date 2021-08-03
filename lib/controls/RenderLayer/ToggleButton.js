import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import AwesomefontIcon from 'react-native-vector-icons/FontAwesome';
import Element from '../../template/Element';
import FormContextWrap from '../Context/FormContextWrap';
var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    directionRow: {
        flexDirection: 'row',
    },
    directionColumn: {
        flexDirection: 'column',
    },
    textStyle: {
        color: '#008cd7',
    },
});
export default FormContextWrap(function (props) {
    var onPress = function () {
        props.onChange(!props.value);
    };
    var icon = props.icon, title = props.title, style = props.style, textStyle = props.textStyle, iconStyle = props.iconStyle, direction = props.direction, value = props.value;
    var iconElement = null;
    var iconSt = iconStyle;
    if (typeof iconStyle === 'function') {
        iconSt = iconStyle(value);
    }
    if (icon) {
        if (typeof icon === 'string') {
            iconElement = React.createElement(AwesomefontIcon, { name: icon, style: iconSt });
        }
        else {
            iconElement = React.createElement(Element, { meta: icon });
        }
    }
    var titleElement = null;
    var titleStyle = textStyle;
    if (typeof textStyle === 'function') {
        titleStyle = textStyle(value);
    }
    if (title) {
        if (typeof title === 'string') {
            titleElement = React.createElement(Text, { style: [styles.textStyle, titleStyle] }, title);
        }
        else {
            titleElement = React.createElement(Element, { meta: title });
        }
    }
    return (React.createElement(TouchableHighlight, { onPress: onPress, style: [{ flex: 1 }, styles.container, style] },
        React.createElement(View, { style: [direction === 'row' ? styles.directionRow : styles.directionColumn] },
            iconElement,
            titleElement)));
});
