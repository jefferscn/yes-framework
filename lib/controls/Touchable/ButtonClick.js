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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import PropTypes from 'prop-types';
var ButtonClick = /** @class */ (function (_super) {
    __extends(ButtonClick, _super);
    function ButtonClick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPress = function () {
            _this.props.onClick && _this.props.onClick();
        };
        return _this;
    }
    ButtonClick.prototype.render = function () {
        var _a = this.props, element = _a.element, children = _a.children, disabled = _a.disabled, hideWhenDisabled = _a.hideWhenDisabled;
        if (disabled && hideWhenDisabled) {
            return null;
        }
        var child = this.context.createElement(element || children);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    };
    ButtonClick.contextTypes = {
        createElement: PropTypes.func,
    };
    ButtonClick.defaultProps = {
        hideWhenDisabled: true,
    };
    ButtonClick = __decorate([
        ControlWrap
    ], ButtonClick);
    return ButtonClick;
}(PureComponent));
export default ButtonClick;
