import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TemplateProvider extends PureComponent {
    static childContextTypes = {
        createElement: PropTypes.func,
    }

    getChildContext() {
        return {
            createElement: this.createElement,
        };
    }

    createElement = (obj) => {
        if (obj && obj.type === 'element') {
            const C = this.props.CustomControls[obj.elementType];
            return <C {...obj.elementProps} />;
        }
        return obj;
    }

    render() {
        return this.props.children;
    }
}
