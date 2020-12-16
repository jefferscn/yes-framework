import React, { PureComponent } from 'react';
import { ListComponents } from 'yes-comp-react-native-web';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import SplitText from './SplitText';

const { ListText } = ListComponents;

const styles = StyleSheet.create({
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

const currencyData = {
    'CNY': '¥',
    'USD': '$',
    'GBP ': '￡',
    'EURO': '€',
    'JPY': '￥',
};

const currencyCodeToSign = (code) => {
    if (!code) {
        return '';
    }
    const result = currencyData[code.toUpperCase()];
    return result || code;
};
export default class MoneyWithCurrency extends PureComponent {
    static defaultProps = {
        showCurrencySign: false,
    }
    static contextTypes = {
        createElement: PropTypes.func,
    }
    render() {
        const { showCurrencySign, currencyField, moneyField, currencyStyle, moneyStyle, containerStyle } = this.props;
        let currencyElement = null;
        let moneyElement = null;
        if (typeof currencyField === 'string') {
            if (showCurrencySign) {
                currencyElement = <SplitText emptyStr="" format={currencyCodeToSign} style={[styles.text, currencyStyle]} yigoid={currencyField} />;
            } else {
                currencyElement = <SplitText emptyStr="" style={[styles.text, currencyStyle]} yigoid={currencyField} />;
            }
        } else {
            currencyElement = this.context.createElement(currencyField);
        }
        if (typeof moneyField === 'string') {
            moneyElement = <ListText style={[styles.text, moneyStyle]} yigoid={moneyField} />
        } else {
            moneyElement = this.context.createElement(moneyField);
        }
        return (
            <View style={[styles.container, containerStyle]}>
                {
                    currencyElement
                }
                {
                    moneyElement
                }
            </View>
        )
    }
}
