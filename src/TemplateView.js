import React, { PureComponent } from 'react';
import defaultTemplateMapping from './template/defaultTemplateMapping';
import billform from './config/billforms';
import PropTypes from 'prop-types';
import CustomControls from './config/control.js';
import { CustomBillForm } from 'yes-comp-react-native-web';
import { AppDispatcher } from 'yes-intf';
import { closeForm } from 'yes-core';

export default class TemplateView extends PureComponent {
    static childContextTypes = {
        getControlProps: PropTypes.func,
        // createElement: PropTypes.func,
    }

    controlProps = {}

    getChildContext() {
        return {
            getControlProps: this.getControlProps,
            // createElement: this.createElement,
        };
    }

    // createElement(obj, props) {
    //     if (obj && obj.type === 'element') {
    //         const C = CustomControls[obj.elementType];
    //         return <C {...obj.elementProps} {...props} />;
    //     }
    //     return obj;
    // }

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

    onClose = (form) => {
        console.log('form.onClose')
        if (form) {
            AppDispatcher.dispatch(closeForm(form.form.uniqueId));
            this.props.onClose && this.props.onClose();
        }
    }

    render() {
        const { formKey, status, oid, meta, showType, onClose, ...otherProps } = this.props;
        let extraProps = meta;
        // 支持反向模版
        if (!extraProps) {
            extraProps = billform.default;
            const [fKey, tKey] = formKey.split('|');
            if (billform[fKey]) {
                extraProps = Object.assign({}, extraProps, billform[fKey]);
            }
            if (billform[formKey]) {
                extraProps = Object.assign({}, extraProps, billform[formKey]);
            }
            if (showType) {
                const fKey1 = `${fKey}_${showType}`;
                const fKey2 = `${formKey}_${showType}`;
                if (billform[fKey1]) {
                    extraProps = Object.assign({}, extraProps, billform[fKey1]);
                }
                if (billform[fKey2]) {
                    extraProps = Object.assign({}, extraProps, billform[fKey2]);
                }
            }
        }
        const TemplateComponent = defaultTemplateMapping.get(extraProps.formTemplate);

        return (
            <CustomBillForm
                formKey={formKey}
                status={status || 'VIEW'}
                oid={oid ? oid : -1} // eslint-disable-line
                onClose={this.onClose}
                {...otherProps}
                {...extraProps}
            >
                <TemplateComponent
                    formKey={formKey}
                    status={status || 'VIEW'}
                    oid={oid ? oid : -1} // eslint-disable-line
                    onClose={this.props.onClose}
                    {...otherProps}
                    {...extraProps}
                />
            </CustomBillForm>
        );
    }
}
