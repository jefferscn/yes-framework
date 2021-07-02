import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ExecScriptClick extends PureComponent {
    static contextTypes = {
        eval: PropTypes.func,
        createElement: PropTypes.func,
    }
    onPress = ()=> {
        const { script } = this.props;
        this.context.eval(script);
    }
    render() {
        const { children, element } = this.props;
        const child = this.context.createElement(element || children);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    }
}
