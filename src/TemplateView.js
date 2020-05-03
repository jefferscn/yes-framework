import React, { PureComponent } from 'react';
import { Components } from 'yes-platform'; // eslint-disable-line
import defaultTemplateMapping from './template/defaultTemplateMapping';
import billform from './config/billforms';
import PropTypes from 'prop-types';
import CustomControls from './config/control.js';
import { CustomBillForm } from 'yes-comp-react-native-web';

export default class TemplateView extends PureComponent {
    static childContextTypes = {
        getControlProps: PropTypes.func,
        createElement: PropTypes.func,
    }

    controlProps = {}

    getChildContext() {
        return {
            getControlProps: this.getControlProps,
            createElement: this.createElement,
        };
    }

    createElement(obj) {
        if (obj && obj.type === 'element') {
            const C = CustomControls[obj.elementType];
            return <C {...obj.elementProps} />;
        }
        return obj;
    }

    getControlProps = (yigoid) => {
        const { formKey } = this.props;
        const [fKey, tKey] = formKey.split('|');
        if (this.controlProps[yigoid]) {
            return this.controlProps[yigoid];
        }

        if (!billform[fKey]) {
            return {};
        }
        const { controls } = billform[fKey];
        if (!controls) {
            return {};
        }
        const key = `${fKey}_${yigoid}`;
        const props = controls[yigoid];
        if (props) {
            this.calculateElement(props);
            this.controlProps[key] = props;
            return props;
        }
        return {};
    }

    calculateElement(props) {
        if (props.control && typeof props.control === 'string') {
            props['control'] = CustomControls[props.control];
        }
        for (const key in props) {
            const ele = props[key];
            if (Array.isArray(ele)) {
                for (let i = 0; i < ele.length; i++) {
                    const ele1 = ele[i];
                    if (ele1 && ele1.type === 'element') {
                        const CC = CustomControls[ele1.elementType];
                        ele[i] = <CC {...ele1.elementProps} />;
                    }
                }
            }
            if (ele && ele.type === 'element') {
                const Control = CustomControls[ele.elementType];
                props[key] = <Control {...ele.elementProps} />;
            }
        }
    }

    render() {
        const { formKey, status, oid, ...otherProps } = this.props;
        let extraProps;
        // 支持反向模版
        extraProps = billform.default;
        const [fKey, tKey] = formKey.split('|');

        if (billform[fKey]) {
            extraProps = Object.assign({}, extraProps, billform[fKey]);
        }
        if (billform[formKey]) {
            extraProps = Object.assign({}, extraProps, billform[formKey]);
        }
        const TemplateComponent = defaultTemplateMapping.get(extraProps.formTemplate);

        return (
            <CustomBillForm
                formKey={formKey}
                status={status || 'VIEW'}
                oid={oid ? oid : -1} // eslint-disable-line
                {...otherProps}
                {...extraProps}
            >
                <TemplateComponent
                    formKey={formKey}
                    status={status || 'VIEW'}
                    oid={oid ? oid : -1} // eslint-disable-line
                    {...otherProps}
                    {...extraProps}
                />
            </CustomBillForm>
        );
    }
}
