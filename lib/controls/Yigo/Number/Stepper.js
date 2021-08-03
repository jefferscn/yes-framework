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
import React, { PureComponent } from 'react';
import { Stepper } from 'antd-mobile';
import { ControlWrap } from 'yes-intf';
import { View, StyleSheet } from 'react-native';
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
});
var YigoStepper = /** @class */ (function (_super) {
    __extends(YigoStepper, _super);
    function YigoStepper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (v) {
            _this.props.onChange(v);
        };
        return _this;
    }
    YigoStepper.prototype.render = function () {
        var _a = this.props, value = _a.value, disabled = _a.disabled, step = _a.step, min = _a.min, max = _a.max, showNumber = _a.showNumber, style = _a.style, layoutStyles = _a.layoutStyles;
        return React.createElement(View, { style: [styles.container, style, layoutStyles] },
            React.createElement(Stepper, { disabled: disabled, value: value, step: step, min: min, max: max, showNumber: showNumber, onChange: this.onChange }));
    };
    YigoStepper.defaultProps = {
        step: 1,
        showNumber: true,
    };
    return YigoStepper;
}(PureComponent));
export default ControlWrap(YigoStepper);
