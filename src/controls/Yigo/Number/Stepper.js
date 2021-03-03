import React, { PureComponent } from 'react';
import { Stepper } from 'antd-mobile';
import { ControlWrap } from 'yes-intf';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

class YigoStepper extends PureComponent {
    static defaultProps = {
        step: 1,
        showNumber: true,
    }
    onChange = (v) => {
        this.props.onChange(v);
    }
    render() {
        const { value, disabled, step, min, max, showNumber, style, layoutStyles } = this.props;
        return <View
            style={[styles.container, style, layoutStyles]}
        ><Stepper
            disabled={disabled}
            value={value}
            step={step}
            min={min}
            max={max}
            showNumber={showNumber}
            onChange={this.onChange}
        ></Stepper>
        </View>
    }
}

export default ControlWrap(YigoStepper);
