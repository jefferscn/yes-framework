import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import { StyleSheet, View } from 'react-native';

class BKContainer extends PureComponent {
    calcStyle = () => {
        const { displayValue } = this.props;
        if (displayValue) {
            if (displayValue.endsWith("1") || displayValue.endsWith("3") || displayValue.endsWith("5")) {
                return {
                    backgroundColor: '#FEE0E2',
                    boxShadow: '0px 0px 10px 1px rgba(136,69,73,0.2)',
                    marginTop: 10,
                    marginLeft:15,
                    marginRight: 15,
                };
            }
            if (displayValue.endsWith("2") || displayValue.endsWith("8") || displayValue.endsWith("6")) {
                return {
                    backgroundColor: '#F8EFD2',
                    boxShadow: '0px 0px 10px 1px rgba(184,156,65,0.2)',
                    marginTop: 10,
                    marginLeft:15,
                    marginRight: 15,
                };
            }
            if (displayValue.endsWith("0") || displayValue.endsWith("4") || displayValue.endsWith("7") || displayValue.endsWith("9")) {
                return {
                    backgroundColor: '#BEEDF3',
                    boxShadow: '0px 0px 10px 1px rgba(45,193,212,0.2)',
                    marginTop: 10,
                    marginLeft:15,
                    marginRight: 15,
                };
            }
        }
        return null;
    }
    render() {
        const { style, children } = this.props;
        const bkColorStyle = this.calcStyle();

        return (
            <View style={[style, bkColorStyle]}>
                {children}
            </View>
        )
    }
}

export default ControlWrap(BKContainer);
