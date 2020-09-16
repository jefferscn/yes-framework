import React, { PureComponent } from 'react';
import { Stepper } from 'antd-mobile';
import { ControlWrap } from 'yes-intf';

class YigoStepper extends PureComponent {
    static defaultProps = {
        step: 1,
        showNumber: true,
    }
    onChange=(v)=> {
        this.props.onChange(v);
    }
    render() {
        const { value, disabled, step, min, max, showNumber } = this.props;
        return <Stepper
            disabled={disabled}
            value={value}
            step={step}
            min={min}
            max={max}
            showNumber={showNumber}
            onChange={this.onChange}
        ></Stepper>
    }
}

export default ControlWrap(YigoStepper);
