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
import { ListComponents } from 'yes-comp-react-native-web';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import SplitText from '../Yigo/Text/SplitText';
var ListText = ListComponents.ListText;
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingRight: 12,
    },
    text: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
    }
});
var currencyData = {
    'CNY': '¥',
    'USD': '$',
    'GBP ': '￡',
    'EURO': '€',
    'JPY': '￥',
};
var currencyCodeToSign = function (code) {
    if (!code) {
        return '';
    }
    var result = currencyData[code.toUpperCase()];
    return result || code;
};
var MoneyWithCurrency = /** @class */ (function (_super) {
    __extends(MoneyWithCurrency, _super);
    function MoneyWithCurrency() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoneyWithCurrency.prototype.render = function () {
        var _a = this.props, showCurrencySign = _a.showCurrencySign, currencyField = _a.currencyField, moneyField = _a.moneyField, currencyStyle = _a.currencyStyle, moneyStyle = _a.moneyStyle, containerStyle = _a.containerStyle;
        var currencyElement = null;
        var moneyElement = null;
        if (typeof currencyField === 'string') {
            if (showCurrencySign) {
                currencyElement = React.createElement(SplitText, { emptyStr: "", format: currencyCodeToSign, style: [styles.text, currencyStyle], yigoid: currencyField });
            }
            else {
                currencyElement = React.createElement(SplitText, { emptyStr: "", style: [styles.text, currencyStyle], yigoid: currencyField });
            }
        }
        else {
            currencyElement = this.context.createElement(currencyField);
        }
        if (typeof moneyField === 'string') {
            moneyElement = React.createElement(ListText, { style: [styles.text, moneyStyle], yigoid: moneyField });
        }
        else {
            moneyElement = this.context.createElement(moneyField);
        }
        return (React.createElement(View, { style: [styles.container, containerStyle] },
            currencyElement,
            moneyElement));
    };
    MoneyWithCurrency.defaultProps = {
        showCurrencySign: false,
    };
    MoneyWithCurrency.contextTypes = {
        createElement: PropTypes.func,
    };
    return MoneyWithCurrency;
}(PureComponent));
export default MoneyWithCurrency;
