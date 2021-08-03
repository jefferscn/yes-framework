var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import AwesomefontIcon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.prototype.render = function () {
        var _a = this.props, icon = _a.icon, title = _a.title, style = _a.style, textStyle = _a.textStyle, iconStyle = _a.iconStyle, onPress = _a.onPress, direction = _a.direction;
        var iconElement = null;
        if (icon) {
            if (typeof icon === 'string') {
                iconElement = React.createElement(AwesomefontIcon, { name: icon, style: iconStyle });
            }
            else {
                iconElement = this.context.createElement(icon);
            }
        }
        var titleElement = null;
        if (title) {
            if (typeof title === 'string') {
                titleElement = React.createElement(Text, { style: [styles.textStyle, textStyle] }, title);
            }
            else {
                titleElement = this.context.createElement(title);
            }
        }
        return (React.createElement(TouchableHighlight, { onPress: onPress, style: [{ flex: 1 }, style] },
            React.createElement(View, { style: [styles.container, direction === 'row' ? styles.directionRow : styles.directionColumn] },
                iconElement,
                titleElement)));
    };
    Button.contextTypes = {
        createElement: PropTypes.func,
    };
    Button.defaultProps = {
        direction: 'row',
    };
    return Button;
}(PureComponent));
export default Button;
