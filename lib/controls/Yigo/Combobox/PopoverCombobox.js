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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { PureComponent } from 'react';
import { ComboboxWrap } from 'yes-intf';
import { Popover } from 'antd-mobile';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Popup from 'rmc-picker/es/Popup';
import { PickerView } from 'antd-mobile';
var Item = Popover.Item;
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // height: 48,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        color: '#008CD7',
        fontSize: 16,
        paddingRight: 16,
    },
    seperator: {
        width: 1,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 10,
        marginBottom: 10,
    },
    content: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 11,
    },
    icon: {
        paddingLeft: 7,
    }
});
var PickerView1 = /** @class */ (function (_super) {
    __extends(PickerView1, _super);
    function PickerView1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: _this.props.value,
        };
        _this.getValue = function () {
            return _this.state.value;
        };
        _this.onChange = function (v) {
            _this.setState({
                value: v,
            });
        };
        return _this;
    }
    PickerView1.prototype.render = function () {
        return (React.createElement(PickerView, __assign({}, this.props, { onChange: this.onChange, value: this.state.value })));
    };
    return PickerView1;
}(PureComponent));
var PopoverCombobox = /** @class */ (function (_super) {
    __extends(PopoverCombobox, _super);
    function PopoverCombobox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onValueChange = function (v) {
            _this.props.onChange && _this.props.onChange(v[0]);
            _this.props.onChangePopupState(false);
        };
        _this.closeModal = function () {
            _this.props.onChangePopupState(false);
        };
        _this.showModal = function () {
            if (_this.props.disabled) {
                return;
            }
            _this.props.onChangePopupState(true);
        };
        return _this;
    }
    PopoverCombobox.prototype.render = function () {
        var _a = this.props, showPopup = _a.showPopup, items = _a.items, displayValue = _a.displayValue, placeholder = _a.placeholder, type = _a.type, value = _a.value, inline = _a.inline, style = _a.style, openTextStyle = _a.openTextStyle, openIconStyle = _a.openIconStyle, textStyle = _a.textStyle, layoutStyles = _a.layoutStyles, textStyles = _a.textStyles;
        var data = items.map(function (item) {
            return {
                value: '' + item.get('value'),
                label: item.get('caption')
            };
        });
        var picker = (React.createElement(PickerView1, { data: data, cols: 1, cascade: false, value: ['' + value], title: this.props.caption }));
        if (inline) {
            return React.createElement(PickerView, { data: data, cols: 1, cascade: false, onChange: this.onValueChange, value: ['' + value], title: this.props.caption });
        }
        if (type === 'popover') {
            return (React.createElement(Popover, { visible: showPopup, onVisibleChange: this.onVisibleChange, onSelect: this.onValueChange, placement: "bottom", overlay: items.map(function (item) { return React.createElement(Item, { key: item.get('value'), value: item.get('value') }, item.get('caption')); }) },
                React.createElement(View, { style: [styles.item, styles.segementCombobox] },
                    React.createElement(Text, { style: styles.text }, displayValue || placeholder || ""),
                    React.createElement(Icon, { name: "angle-down", size: 16 }))));
        }
        return (React.createElement(View, { style: [styles.container, layoutStyles, style] },
            React.createElement(TouchableOpacity, { onPress: this.showModal },
                React.createElement(View, { style: styles.content },
                    React.createElement(Text, { placeholder: placeholder, style: [styles.text, textStyle, textStyles, this.props.showPopup ? openTextStyle : null] }, displayValue || placeholder),
                    React.createElement(Icon, { style: [styles.icon, this.props.showPopup ? openIconStyle : null], name: this.props.showPopup ? "angle-up" : "angle-down", size: 16 }))),
            React.createElement(Popup
            // wrapStyle={{color: 'red'}}
            , { 
                // wrapStyle={{color: 'red'}}
                className: "ioslikepopup", picker: picker, visible: showPopup, placeholder: "\u9009\u62E9\u6708\u4EFD", onOk: this.onValueChange, onDismiss: this.closeModal, okText: "\u786E\u5B9A", dismissText: "\u53D6\u6D88" })));
    };
    PopoverCombobox.defaultProps = {
        type: 'popover',
    };
    return PopoverCombobox;
}(PureComponent));
export default ComboboxWrap(PopoverCombobox);
