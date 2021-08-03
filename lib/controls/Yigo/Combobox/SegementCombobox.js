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
import { ComboboxWrap } from 'yes-intf';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: 'white',
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#008CD7',
        fontSize: 16,
    },
    seperator: {
        width: 1,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 10,
        marginBottom: 10,
    },
    segementCombobox: {
        flexDirection: 'row',
    },
    segementComboboxItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    segementComboboxText: {
        paddingTop: 12,
        paddingBottom: 10,
    },
    indicator: {
        width: 28,
        paddingTop: 5,
    },
    segementComboboxItemSelected: {
        color: "#800080",
        fontWeight: 'bold',
    },
    segementComboboxItemSelected1: {
        backgroundColor: "#800080",
    }
});
var SegementComboboxItem = /** @class */ (function (_super) {
    __extends(SegementComboboxItem, _super);
    function SegementComboboxItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPress = function () {
            _this.props.onPress && _this.props.onPress(_this.props.value);
        };
        return _this;
    }
    SegementComboboxItem.prototype.render = function () {
        var _a = this.props, title = _a.title, selected = _a.selected;
        return (React.createElement(TouchableWithoutFeedback, { onPress: this.onPress },
            React.createElement(View, { style: [styles.segementComboboxItem] },
                React.createElement(Text, { style: [styles.segementComboboxText, selected ? styles.segementComboboxItemSelected : null] }, title),
                React.createElement(View, { style: [styles.indicator, selected ? styles.segementComboboxItemSelected1 : null] }))));
    };
    return SegementComboboxItem;
}(PureComponent));
var SegementCombobox = /** @class */ (function (_super) {
    __extends(SegementCombobox, _super);
    function SegementCombobox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onValueChange = function (v) {
            _this.props.onChange && _this.props.onChange(v);
        };
        _this.getTitle = function (title) {
            var titleMapping = _this.props.titleMapping;
            if (titleMapping) {
                return titleMapping[title] || title;
            }
            return title;
        };
        return _this;
    }
    SegementCombobox.prototype.render = function () {
        var _this = this;
        var _a = this.props, items = _a.items, style = _a.style, value = _a.value, titleMapping = _a.titleMapping;
        return (React.createElement(View, { style: [styles.segementCombobox, style] }, items.map(function (item) { return React.createElement(SegementComboboxItem, { title: _this.getTitle(item.get('caption')), value: item.get('value'), onPress: _this.onValueChange, selected: value === "" ? false : value == item.get('value') }); })));
    };
    return SegementCombobox;
}(PureComponent));
export default ComboboxWrap(SegementCombobox);
