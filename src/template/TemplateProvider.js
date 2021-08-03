import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class TemplateProvider extends PureComponent {
    static childContextTypes = {
        createElement: PropTypes.func,
        getCustomControl: PropTypes.func,
        getFormTemplate: PropTypes.func,
        getDefaultFormTemplate: PropTypes.func,
        getFormParams: PropTypes.func,
        setActiveElement: PropTypes.func,
    }

    getChildContext() {
        return {
            createElement: this.createElement,
            getCustomControl: this.getCustomControl,
            getFormTemplate: this.getFormTemplate,
            getDefaultFormTemplate: this.getDefaultFormTemplate,
            getFormParams: this.getFormParams,
            setActiveElement: this.setActiveElement,
        };
    }
    /**
     * 设置当前选中的Element对象，仅在设计模式下使用
     */
    setActiveElement() {

    }

    getFormParams = (metaKey) => {
        if(this.props.formParams) {
            return null;
        }
        return this.props.formParams[metaKey];
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
