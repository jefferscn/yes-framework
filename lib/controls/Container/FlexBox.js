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
import PropTypes from 'prop-types';
var styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
});
var FlexBox = /** @class */ (function (_super) {
    __extends(FlexBox, _super);
    function FlexBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlexBox.prototype.render = function () {
        var _this = this;
        var _a = this.props, direction = _a.direction, style = _a.style, items = _a.items, children = _a.children;
        var itms = items || children;
        return (React.createElement(View, { style: [direction === 'column' ? styles.column : styles.row, style] }, itms.map(function (item) { return _this.context.createElement(item); })));
    };
    FlexBox.defaultProps = {
        direction: 'column',
    };
    FlexBox.contextTypes = {
        createElement: PropTypes.func,
    };
    return FlexBox;
}(PureComponent));
export default FlexBox;
