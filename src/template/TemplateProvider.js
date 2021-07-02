import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TemplateProvider extends PureComponent {
    static childContextTypes = {
        createElement: PropTypes.func,
        getCustomControl: PropTypes.func,
        getFormTemplate: PropTypes.func,
        getDefaultFormTemplate: PropTypes.func,
    }

    getChildContext() {
        return {
            createElement: this.createElement,
            getCustomControl: this.getCustomControl,
            getFormTemplate: this.getFormTemplate,
            getDefaultFormTemplate: this.getDefaultFormTemplate,
        };
    }

    getCustomControl = (type) => {
        return this.props.CustomControls[type];
    }

    getFormTemplate = (formKey) => {
        return this.props.formTemplates[formKey];
    }

    getDefaultFormTemplate = () => {
        return this.props.formTemplates.default;
    }

    createElement = (obj, props) => {
        if (obj) {
            if (obj.type === 'element') {
                const C = this.props.CustomControls[obj.elementType];
                if (!C) {
                    console.log(`ElementType ${obj.elementType} missing!`);
                    return null;
                }
                return <C {...obj.elementProps} {...props} />;
            } else {
                if (!React.isValidElement(obj)) {
                    return null;
                }
            }
        }
        return obj;
    }

    render() {
        return this.props.children;
    }
}
