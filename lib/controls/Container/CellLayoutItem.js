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
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import CellLayoutTemplate from '../../template/TabTemplate/CellLayoutTemplate';
import { DynamicControl } from 'yes';
var pressRetentionOffset = { top: 5, left: 5, right: 5, bottom: 5 };
var CellLayoutItem = /** @class */ (function (_super) {
    __extends(CellLayoutItem, _super);
    function CellLayoutItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPress = function () {
            _this.props.onPress();
        };
        _this.generateActions = function () { return (React.createElement(View, { style: [styles.actionContainer, _this.props.actionContainerStyle] }, _this.props.actions.map(function (action) {
            var itemType = typeof (action);
            if (itemType === 'string') {
                return React.createElement(DynamicControl, { isCustomLayout: true, layoutStyles: styles.action, yigoid: action });
            }
            if (itemType.$$typeof) {
                return action;
            }
            return React.createElement(DynamicControl, __assign({ isCustomLayout: true, layoutStyles: styles.action }, action));
        }))); };
        return _this;
    }
    CellLayoutItem.prototype.render = function () {
        return (React.createElement(TouchableOpacity, { onPress: this.onPress, pressRetentionOffset: pressRetentionOffset },
            React.createElement(View, { style: [styles.container, this.props.containerStyle] },
                React.createElement(CellLayoutTemplate, { items: this.props.items }),
                this.props.actions ? this.generateActions() : null)));
    };
    return CellLayoutItem;
}(PureComponent));
export default CellLayoutItem;
var styles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
        height: 54,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        backgroundColor: 'white',
    },
    action: {
        paddingVertical: 0,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 10,
    },
    container: {},
});
