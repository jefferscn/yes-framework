import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Element from 'yes-framework/template/Element';

export default class ScriptWrap extends PureComponent {
    static contextTypes = {
        eval: PropTypes.func,
    }
    onPress = ()=> {
        const { script } = this.props;
        this.context.eval(script);
    }
    render() {
        const { children, element } = this.props;
        if(element) {
            return <Element meta={element} onPress={this.onPress} />;
        }
        return React.cloneElement(children, {
            onPress: this.onPress
        });
    }
}
