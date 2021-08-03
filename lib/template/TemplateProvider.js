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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
var TemplateProvider = /** @class */ (function (_super) {
    __extends(TemplateProvider, _super);
    function TemplateProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getFormParams = function (metaKey) {
            if (_this.props.formParams) {
                return null;
            }
            return _this.props.formParams[metaKey];
        };
        _this.getCustomControl = function (type) {
            return _this.props.CustomControls[type];
        };
        _this.getFormTemplate = function (formKey) {
            return _this.props.formTemplates[formKey];
        };
        _this.getDefaultFormTemplate = function () {
            return _this.props.formTemplates.default;
        };
        _this.createElement = function (obj, props) {
            if (obj) {
                if (obj.type === 'element') {
                    var C = _this.props.CustomControls[obj.elementType];
                    if (!C) {
                        console.log("ElementType " + obj.elementType + " missing!");
                        return null;
                    }
                    return React.createElement(C, __assign({}, obj.elementProps, props));
                }
                else {
                    if (!React.isValidElement(obj)) {
                        return null;
                    }
                }
            }
            return obj;
        };
        return _this;
    }
    TemplateProvider.prototype.getChildContext = function () {
        return {
            createElement: this.createElement,
            getCustomControl: this.getCustomControl,
            getFormTemplate: this.getFormTemplate,
            getDefaultFormTemplate: this.getDefaultFormTemplate,
            getFormParams: this.getFormParams,
        };
    };
    TemplateProvider.prototype.render = function () {
        return this.props.children;
    };
    TemplateProvider.childContextTypes = {
        createElement: PropTypes.func,
        getCustomControl: PropTypes.func,
        getFormTemplate: PropTypes.func,
        getDefaultFormTemplate: PropTypes.func,
        getFormParams: PropTypes.func,
    };
    return TemplateProvider;
}(PureComponent));
export default TemplateProvider;
