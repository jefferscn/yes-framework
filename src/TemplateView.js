import React, { PureComponent, isValidElement } from 'react';
import { Components } from 'yes-platform'; // eslint-disable-line
import defaultTemplateMapping from './template/defaultTemplateMapping';
import billform from './config/billforms';
import PropTypes from 'prop-types';
import CustomControls from './config/control.js';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import Template from './template';

const {
    DynamicBillForm,
} = Components;

@observer
export default class TemplateView extends PureComponent {
    static childContextTypes = {
        getControlProps: PropTypes.func,
        createElement: PropTypes.func,
        getControl: PropTypes.func,
    }

    static contextTypes = {
        isDesignMode: PropTypes.func,
        deployMeta: PropTypes.func,
    }

    @observable meta = null;
    controlProps = {}

    getChildContext() {
        return {
            getControlProps: this.getControlProps,
            createElement: this.createElement,
            getControl: this.getControl,
        };
    }

    createElement = (obj) => {
        if (obj && obj.type === 'element') {
            const C = CustomControls[obj.elementType];
            if(C) {
                return <C {...this.calculateElement(obj.elementProps)} />;
            }
            return null;
        }
        return null;
    }

    getControl = (type) => {
        return CustomControls[type];
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
            const tmp = this.calculateElement(props);
            this.controlProps[key] = tmp;
            return tmp;
        }
        return {};
    }

    calculateElement(props) {
        const result = {};
        if(!props) {
            return result;
        }
        if (props.control && typeof props.control === 'string') {
            props['control'] = CustomControls[props.control];
            result['control'] = CustomControls[props.control];
        }
        for (const key in props) {
            const ele = props[key];
            // result[key] = ele;
            if (Array.isArray(ele)) {
                const arr = [];
                for (let i = 0; i < ele.length; i++) {
                    const ele1 = ele[i];
                    arr[i] = this.createElement(ele1);
                }
                result[key] = arr;
            } else {
                result[key] = this.createElement(ele);
            }
        }
        return result;
    }

    componentWillMount() {
        this.meta = this.loadMeta(this.props);
    }

    componentWillReceiveProps(props) {
        this.meta = this.loadMeta(props);
    }

    loadMeta(props) {
        const { formKey, status, oid } = props;
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
        // const TemplateComponent = defaultTemplateMapping.get(extraProps.formTemplate);
        // const meta = TemplateComponent.fromJson(extraProps);
        return extraProps;
    }

    render() {
        const { formKey, status, oid, ...otherProps } = this.props;
        // const TemplateComponent = defaultTemplateMapping.get(this.meta.formTemplate);
        return (
            <DynamicBillForm
                formKey={formKey}
                status={status || 'VIEW'}
                oid={oid ? oid : -1} // eslint-disable-line
                // {...extraProps}
            >
                <Template
                    // formKey={formKey}
                    // status={status || 'VIEW'}
                    // oid={oid ? oid : -1} // eslint-disable-line
                    formKey={formKey}
                    meta={this.meta}
                    {...otherProps}
                />
            </DynamicBillForm>
        );
    }
}
