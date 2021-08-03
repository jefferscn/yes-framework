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
import { ControlWrap } from 'yes-intf';
import { StyleSheet } from 'react-native';
import Rating from 'react-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
var YIGORating = /** @class */ (function (_super) {
    __extends(YIGORating, _super);
    function YIGORating() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YIGORating.prototype.render = function () {
        var _a = this.props, value = _a.value, disabled = _a.disabled, onChange = _a.onChange, start = _a.start, step = _a.step, end = _a.end, fractions = _a.fractions, emptySymbol = _a.emptySymbol, fullSymbol = _a.fullSymbol, textStyles = _a.textStyles;
        var emptySymbolEle = emptySymbol ? this.context.createElement(emptySymbol) : React.createElement(Icon, { name: "star-o", size: 20 });
        var fullSymbolEle = fullSymbol ? this.context.createElement(fullSymbol) : React.createElement(Icon, { name: "star", size: 20, color: "red" });
        return React.createElement(Rating, { style: StyleSheet.flatten(textStyles), initialRating: value, start: start, stop: end, step: step, readonly: disabled, emptySymbol: emptySymbolEle, fullSymbol: fullSymbolEle, fractions: fractions, onChange: onChange });
    };
    YIGORating.contextTypes = {
        createElement: PropTypes.func,
    };
    YIGORating.defaultProps = {
        start: 0,
        end: 5,
        step: 1,
        fractions: 1,
    };
    return YIGORating;
}(PureComponent));
export default ControlWrap(YIGORating);
