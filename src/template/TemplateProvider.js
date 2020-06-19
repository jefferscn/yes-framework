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

    createElement = (obj, props) => {
        if (obj && obj.type === 'element') {
            const C = this.props.CustomControls[obj.elementType];
            if(!C) {
                console.log(`ElementType ${obj.elementType} missing!`);
                return null;
            }
            return <C {...obj.elementProps} {...props} />;
        }
        return obj;
    }

    render() {
        return this.props.children;
    }
}
