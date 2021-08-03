var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
var TemplateView = /** @class */ (function (_super) {
    __extends(TemplateView, _super);
    function TemplateView(args, context) {
        var _this = _super.call(this, args) || this;
        _this.controlProps = {};
        _this.getControlProps = function (yigoid) {
            var formKey = _this.props.formKey;
            var _a = formKey.split('|'), fKey = _a[0], tKey = _a[1];
            if (_this.controlProps[yigoid]) {
                return _this.controlProps[yigoid];
            }
            if (!_this.context.getFormTemplate(fKey)) {
                return {};
            }
            var controls = _this.context.getFormTemplate(fKey).controls;
            if (!controls) {
                return {};
            }
            var key = fKey + "_" + yigoid;
            var props = controls[yigoid];
            if (props) {
                _this.calculateElement(props);
                _this.controlProps[key] = props;
                return props;
            }
            return {};
        };
        _this.onClose = function (form) {
            console.log('form.onClose');
            if (form) {
                if (!_this.state.extraProps.keepAlive) {
                    setTimeout(function () {
                        AppDispatcher.dispatch(closeForm(form.form.uniqueId));
                    });
                }
                var parentForm = form.form.getParentForm();
                if (parentForm && parentForm.onChildClose) {
                    parentForm.onChildClose(form.form);
                }
                _this.props.onClose && _this.props.onClose();
            }
        };
        _this.changeContextValue = function (key, value) {
            var dt = {};
            dt[key] = value;
            _this.setState({
                contextValue: __assign(__assign({}, _this.state.contextValue), dt)
            });
        };
        var _a = _this.props, formKey = _a.formKey, meta = _a.meta, showType = _a.showType;
        var extraProps = meta;
        var hasJson = false;
        // 支持反向模版
        if (!extraProps) {
            extraProps = context.getDefaultFormTemplate();
            var _b = formKey.split('|'), fKey = _b[0], tKey = _b[1];
            if (context.getFormTemplate(fKey)) {
                extraProps = Object.assign({}, extraProps, context.getFormTemplate(fKey));
            }
            if (context.getFormTemplate(formKey)) {
                extraProps = Object.assign({}, extraProps, context.getFormTemplate(formKey));
            }
            if (showType) {
                var fKey1 = fKey + "_" + showType;
                var fKey2 = formKey + "_" + showType;
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
        _this.state = {
            extraProps: extraProps,
            hasJson: hasJson,
            error: null,
            errorInfo: null,
            contextValue: {}
        };
        return _this;
    }
    TemplateView.prototype.getChildContext = function () {
        return {
            getControlProps: this.getControlProps,
        };
    };
    TemplateView.prototype.calculateElement = function (props) {
        if (props.control && typeof props.control === 'string') {
            props['control'] = this.context.getCustomControl(props.control);
        }
        for (var key in props) {
            var ele = props[key];
            if (Array.isArray(ele)) {
                for (var i = 0; i < ele.length; i++) {
                    var ele1 = ele[i];
                    if (ele1 && ele1.type === 'element') {
                        var CC = this.context.getCustomControl(ele1.elementType);
                        ele[i] = React.createElement(CC, __assign({}, ele1.elementProps));
                    }
                }
            }
            if (ele && ele.type === 'element') {
                var Control = this.context.getCustomControl(ele.elementType);
                props[key] = React.createElement(Control, __assign({}, ele.elementProps));
            }
        }
    };
    TemplateView.prototype.componentDidMount = function () {
        //根据配置关闭安卓的回退功能
        if (this.state.extraProps.blockHardBack) {
            BackHandler.lock && BackHandler.lock();
        }
    };
    TemplateView.prototype.componentWillUnmount = function () {
        //根据配置开启安卓的回退功能
        if (this.state.extraProps.blockHardBack) {
            BackHandler.unlock && BackHandler.unlock();
        }
    };
    TemplateView.prototype.componentDidCatch = function (error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    };
    TemplateView.prototype.render = function () {
        var _a = this.props, formKey = _a.formKey, status = _a.status, oid = _a.oid, meta = _a.meta, showType = _a.showType, onClose = _a.onClose, modalWrap = _a.modalWrap, otherProps = __rest(_a, ["formKey", "status", "oid", "meta", "showType", "onClose", "modalWrap"]);
        var _b = this.state, extraProps = _b.extraProps, hasJson = _b.hasJson;
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
            return (React.createElement(View, { style: { flex: 1 } },
                React.createElement(Header, { canBack: true, titleElement: React.createElement(FormTitle, { containerStyle: {
                            "alignItems": "center",
                            "justifyContent": "center"
                        } }) }),
                React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(Text, null, this.state.error))));
        }
        if (extraProps.formTemplate === 'dynamic') { //不支持，直接弹出提示
            return (React.createElement(CustomBillForm, __assign({ formKey: formKey, status: status || 'VIEW', oid: oid ? oid : -1, onClose: this.onClose }, otherProps, extraProps),
                React.createElement(View, { style: { flex: 1 } },
                    React.createElement(Header, { canBack: true, titleElement: React.createElement(FormTitle, { containerStyle: {
                                "alignItems": "center",
                                "justifyContent": "center"
                            } }) }),
                    React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(Text, null, "\u6682\u4E0D\u652F\u6301")))));
        }
        var TemplateComponent = defaultTemplateMapping.get(extraProps.formTemplate);
        if (modalWrap && !hasJson) {
            TemplateComponent = ModalWrap(TemplateComponent);
        }
        return (React.createElement(FormContext.Provider, { value: {
                contextValues: this.state.contextValue,
                changeValue: this.changeContextValue
            } },
            React.createElement(CustomBillForm, __assign({ formKey: formKey, status: status || 'VIEW', oid: oid ? oid : -1, onClose: this.onClose }, otherProps, extraProps),
                React.createElement(TemplateComponent, __assign({ formKey: formKey, status: status || 'VIEW', oid: oid ? oid : -1, onClose: this.props.onClose }, otherProps, extraProps)))));
    };
    TemplateView.contextTypes = {
        getFormTemplate: PropTypes.func,
        getCustomControl: PropTypes.func,
        getDefaultFormTemplate: PropTypes.func,
    };
    TemplateView.childContextTypes = {
        getControlProps: PropTypes.func,
    };
    return TemplateView;
}(PureComponent));
export default TemplateView;
