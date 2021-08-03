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
import React, { PureComponent, memo } from 'react';
import { ComboboxWrap } from 'yes-intf';
import { View, StyleSheet } from 'react-native';
import { Tag } from 'antd-mobile';
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // height: 48,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});
var WrapTag = memo(function (_a) {
    var onChange = _a.onChange, title = _a.title, value = _a.value, selected = _a.selected;
    var onValueChange = function () {
        onChange(value);
    };
    return React.createElement(Tag, { style: { marginTop: 2, marginBottom: 2 }, selected: selected, onChange: onValueChange }, title);
});
var TagCombobox = /** @class */ (function (_super) {
    __extends(TagCombobox, _super);
    function TagCombobox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onValueChange = function (v) {
            _this.props.onChange && _this.props.onChange(v);
        };
        return _this;
    }
    TagCombobox.prototype.render = function () {
        var _this = this;
        var _a = this.props, items = _a.items, value = _a.value, style = _a.style, layoutStyles = _a.layoutStyles;
        var data = items.map(function (item) {
            return {
                value: '' + item.get('value'),
                label: item.get('caption')
            };
        });
        return (React.createElement(View, { style: [styles.container, layoutStyles, style] }, data.map(function (item) { return React.createElement(WrapTag, { key: item.value, selected: value == item.value, onChange: _this.onValueChange, value: item.value, title: item.label }); })));
    };
    TagCombobox.defaultProps = {};
    return TagCombobox;
}(PureComponent));
export default ComboboxWrap(TagCombobox);
