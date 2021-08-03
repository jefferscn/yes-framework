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
import Icon from 'react-native-vector-icons/FontAwesome';
import { DatePicker } from 'yes-comp-react-native-web';
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    datepicker: {
        maxWidth: 150,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
    },
    text: {
        justifyContent: 'center',
        padding: 6,
    }
});
var DateFromTo = /** @class */ (function (_super) {
    __extends(DateFromTo, _super);
    function DateFromTo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateFromTo.prototype.render = function () {
        var _a = this.props, style = _a.style, fromId = _a.fromId, toId = _a.toId, linkText = _a.linkText, linkIcon = _a.linkIcon, linkComp = _a.linkComp, fromPlaceholder = _a.fromPlaceholder, toPlaceholder = _a.toPlaceholder;
        return (React.createElement(View, { style: [styles.container, style] },
            React.createElement(DatePicker, { placeholder: fromPlaceholder, textStyles: styles.text, layoutStyles: styles.datepicker, yigoid: fromId }),
            React.createElement(Icon, { name: "minus" }),
            React.createElement(DatePicker, { placeholder: toPlaceholder, textStyles: styles.text, layoutStyles: styles.datepicker, yigoid: toId })));
    };
    return DateFromTo;
}(PureComponent));
export default DateFromTo;
