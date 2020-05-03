import React, { PureComponent } from 'react';
import { ListComponents } from 'yes-comp-react-native-web';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

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
export default class MoneyWithCurrency extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    render() {
        const { currencyField, moneyField, currencyStyle, moneyStyle, containerStyle } = this.props;
        let currencyElement = null;
        let moneyElement = null;
        if(typeof currentField === 'string') {
            currencyElement = <ListText style={[styles.text, currencyStyle]} yigoid={currencyField} />;
        } else {
            currencyElement = this.context.createElement(currencyField);
        }
        if(typeof moneyField === 'string') {
            moneyElement =  <ListText style={[styles.text, moneyStyle]} yigoid={moneyField} />
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
