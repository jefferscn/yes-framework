import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ScriptWrap extends PureComponent {
    static contextTypes = {
        eval: PropTypes.func,
    }
    onPress = ()=> {
        const { script } = this.props;
        this.context.eval(script);
    }
    render() {
        return React.cloneElement(this.props.children, {
            onPress: this.onPress
        });
    }
}
