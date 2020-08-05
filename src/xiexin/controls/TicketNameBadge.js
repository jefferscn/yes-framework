import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FontIcon from 'yes-framework/font';
import { ControlWrap } from 'yes-intf';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: -5,
        top: -5,
        height: 40, width: 40
    },
    text: {
        position: 'absolute',
        top: 13,
        left: 10,
        fontSize: 10,
        transform: 'rotate(-20deg)',
        color: 'blueviolet',
    }
});

class TicketNameBadge extends PureComponent {
    static defaultProps = {
        size: 40,
    }
    getText  = ()=> {
        const { displayValue } = this.props;
        if(displayValue) {
            return displayValue.substr(0,2);
        }
        return displayValue;
    }
    render() {
        const { style, size } = this.props;
        const txt = this.getText();
        return (<View style={[styles.container, style]}>
            <FontIcon name="icon-seal_" size={size} color="blueviolet" />
            <Text style={[styles.text]}>{txt}</Text>
        </View>);
    }
}

export default ControlWrap(TicketNameBadge);
