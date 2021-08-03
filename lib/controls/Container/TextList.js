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
import { View, StyleSheet } from 'react-native';
import ListText from '../Yigo/Text/ListText';
var styles = StyleSheet.create({
    container: {},
    row: {
        paddingBottom: 8,
    }
});
var TextList = /** @class */ (function (_super) {
    __extends(TextList, _super);
    function TextList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextList.prototype.render = function () {
        var _a = this.props, items = _a.items, template = _a.template, style = _a.style, rowStyle = _a.rowStyle;
        return (React.createElement(View, { style: [styles.container, style] }, items.map(function (item) {
            return (React.createElement(ListText, { style: [styles.row, rowStyle], template: template, yigoid: item.key || item }));
        })));
    };
    return TextList;
}(PureComponent));
export default TextList;
