import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        flex: 1,
    },
    icon: {
        paddingLeft: 12,
    },
})
@ControlWrap
export default class BarcodeScannerText extends PureComponent {
    static contextTypes = {
        barcodeScan: PropTypes.func,
    }
    static defaultProps = {
        iconSize: 24,
    }
    onPress = async () => {
        if (this.disabled) {
            return;
        }
        if (this.context.barcodeScan) {
            const text = await this.context.barcodeScan();
            this.props.onChange && this.props.onChange(text);
        }
    }
    render() {
        const { displayValue, style, disabled, iconSize } = this.props;
        return (
            <View style={[styles.container, this.props.layoutStyles, style]}>
                <Text style={[styles.text, this.props.textStyles]}>{displayValue}</Text>
                <Icon onPress={this.onPress} size={iconSize} style={styles.icon} color={disabled ? 'gray' : '#8BC34A'} name="qrcode" />
            </View>
        )
    }
}
