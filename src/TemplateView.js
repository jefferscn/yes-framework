import React, { PureComponent } from 'react';
import defaultTemplateMapping from './template/defaultTemplateMapping';
import PropTypes from 'prop-types';
import { CustomBillForm } from 'yes-comp-react-native-web';
import { AppDispatcher, BackHandler } from 'yes-intf';
import { closeForm } from 'yes-core';
import ModalWrap from './template/ModalWrap';
import { Header, FormTitle } from './export';
import { View, Text } from 'react-native';
import FormContext from './context/FormContext';
export default class TemplateView extends PureComponent {
    static contextTypes = {
        getFormTemplate: PropTypes.func,
        getCustomControl: PropTypes.func,
        getDefaultFormTemplate: PropTypes.func,
    }
    static childContextTypes = {
        getControlProps: PropTypes.func,
    }

    controlProps = {}

    getChildContext() {
        return {
            getControlProps: this.getControlProps,
        };
    }

    constructor(args, context) {
        super(args);
        const { formKey, meta, showType } = this.props;
        let extraProps = meta;
        let hasJson = false;
        // 支持反向模版
        if (!extraProps) {
            extraProps = context.getDefaultFormTemplate();
            const [fKey, tKey] = formKey.split('|');
            if (context.getFormTemplate(fKey)) {
                extraProps = Object.assign({}, extraProps, context.getFormTemplate(fKey));
            }
            if (context.getFormTemplate(formKey)) {
                extraProps = Object.assign({}, extraProps, context.getFormTemplate(formKey));
            }
            if (showType) {
                const fKey1 = `${fKey}_${showType}`;
                const fKey2 = `${formKey}_${showType}`;
                if (context.getFormTemplate(fKey1)) {
                    extraProps = Object.assign({}, extraProps, context.getFormTemplate(fKey1));
                    hasJson = true;
                }
                if (context.getFormTemplate(fKey2)) {
                    extraProps = Object.assign({}, extraProps, context.getFormTemplate(fKey2));
                    hasJson = true;
                }
            }
        }
        this.state = {
            extraProps,
            hasJson,
            error: null,
            errorInfo: null,
            contextValue: {}
        }
    }

    getControlProps = (yigoid) => {
        const { formKey } = this.props;
        const [fKey, tKey] = formKey.split('|');
        if (this.controlProps[yigoid]) {
            return this.controlProps[yigoid];
        }

        if (!this.context.getFormTemplate(fKey)) {
            return {};
        }
        const { controls } = this.context.getFormTemplate(fKey);
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
            props['control'] = this.context.getCustomControl(props.control);
        }
        for (const key in props) {
            const ele = props[key];
            if (Array.isArray(ele)) {
                for (let i = 0; i < ele.length; i++) {
                    const ele1 = ele[i];
                    if (ele1 && ele1.type === 'element') {
                        const CC = this.context.getCustomControl(ele1.elementType);
                        ele[i] = <CC {...ele1.elementProps} />;
                    }
                }
            }
            if (ele && ele.type === 'element') {
                const Control = this.context.getCustomControl(ele.elementType);
                props[key] = <Control {...ele.elementProps} />;
            }
        }
    }

    onClose = (form) => {
        console.log('form.onClose')
        if (form) {
            if (!this.state.extraProps.keepAlive) {
                setTimeout(() => {
                    AppDispatcher.dispatch(closeForm(form.form.uniqueId));
                });
            }
            const parentForm = form.form.getParentForm();
            if (parentForm && parentForm.onChildClose) {
                parentForm.onChildClose(form.form);
            }
            this.props.onClose && this.props.onClose();
        }
    }

    componentDidMount() {
        //根据配置关闭安卓的回退功能
        if (this.state.extraProps.blockHardBack) {
            BackHandler.lock && BackHandler.lock();
        }
    }

    componentWillUnmount() {
        //根据配置开启安卓的回退功能
        if (this.state.extraProps.blockHardBack) {
            BackHandler.unlock && BackHandler.unlock();
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        });
    }

    changeContextValue = (key, value) => {
        const dt = {};
        dt[key] = value;
        this.setState({
            contextValue: { ...this.state.contextValue, ...dt }
        });
    }

    render() {
        const { formKey, status, oid, meta, showType, onClose, modalWrap, ...otherProps } = this.props;
        let { extraProps, hasJson } = this.state;
        // let extraProps = meta;
        // let hasJson = false;
        // // 支持反向模版
        // if (!extraProps) {
        //     extraProps = billform.default;
        //     const [fKey, tKey] = formKey.split('|');
        //     if (billform[fKey]) {
        //         extraProps = Object.assign({}, extraProps, billform[fKey]);
        //     }
        //     if (billform[formKey]) {
        //         extraProps = Object.assign({}, extraProps, billform[formKey]);
        //     }
        //     if (showType) {
        //         const fKey1 = `${fKey}_${showType}`;
        //         const fKey2 = `${formKey}_${showType}`;
        //         if (billform[fKey1]) {
        //             extraProps = Object.assign({}, extraProps, billform[fKey1]);
        //             hasJson = true;
        //         }
        //         if (billform[fKey2]) {
        //             extraProps = Object.assign({}, extraProps, billform[fKey2]);
        //             hasJson = true;
        //         }
        //     }
        // }
        if (this.state.error) {
            return (<View style={{ flex: 1 }}>
                <Header canBack
                    titleElement={
                        <FormTitle containerStyle={{
                            "alignItems": "center",
                            "justifyContent": "center"
                        }} />
                    } />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{this.state.error}</Text>
                </View>
            </View>);
        }
        if (extraProps.formTemplate === 'dynamic') {//不支持，直接弹出提示
            return (<CustomBillForm
                formKey={formKey}
                status={status || 'VIEW'}
                oid={oid ? oid : -1} // eslint-disable-line
                onClose={this.onClose}
                {...otherProps}
                {...extraProps}
            >
                <View style={{ flex: 1 }}>
                    <Header canBack
                        titleElement={
                            <FormTitle containerStyle={{
                                "alignItems": "center",
                                "justifyContent": "center"
                            }} />
                        } />
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>暂不支持</Text>
                    </View>
                </View>
            </CustomBillForm>)
        }
        let TemplateComponent = defaultTemplateMapping.get(extraProps.formTemplate);
        if (modalWrap && !hasJson) {
            TemplateComponent = ModalWrap(TemplateComponent);
        }
        return (
            <FormContext.Provider value={{
                contextValues: this.state.contextValue,
                changeValue: this.changeContextValue
            }}>
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
            </FormContext.Provider>
        );
    }
}
