import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
                <TouchableOpacity onPress={this.onPress} style={styles.icon}>
                    <Icon size={iconSize} color={disabled ? 'gray' : '#8BC34A'} name="qrcode" />
                </TouchableOpacity>
            </View>
        )
    }
}
