import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import PropTypes from 'prop-types';

@ControlWrap
export default class ButtonClick extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    static defaultProps = {
        hideWhenDisabled: true,
    }
    onPress = () => {
        this.props.onClick && this.props.onClick();
    }
    render() {
        const { element, children, disabled, hideWhenDisabled } = this.props;
        if(disabled && hideWhenDisabled) {
            return null;
        }
        const child = this.context.createElement(element || children);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    }
}
