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
import { ControlWrap } from 'yes-intf';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
var GridSelect = /** @class */ (function (_super) {
    __extends(GridSelect, _super);
    function GridSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPress = function () {
            _this.props.onChange(!_this.props.value);
        };
        return _this;
    }
    GridSelect.prototype.render = function () {
        var _a = this.props, value = _a.value, onlyShow = _a.onlyShow, style = _a.style;
        if (onlyShow) {
            if (value) {
                return React.createElement(View, { style: styles.container },
                    React.createElement(Icon, { name: 'check', size: this.props.size, color: this.props.color }));
            }
        }
        else {
            return React.createElement(TouchableOpacity, { style: style, onPress: this.onPress },
                React.createElement(Icon, { name: value ? 'check-circle-o' : 'circle-o', size: this.props.size, color: this.props.color }));
        }
        return null;
    };
    GridSelect.defaultProps = {
        size: 14,
        color: 'red',
        onlyShow: true,
    };
    return GridSelect;
}(PureComponent));
var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
    }
});
export default ControlWrap(GridSelect);
