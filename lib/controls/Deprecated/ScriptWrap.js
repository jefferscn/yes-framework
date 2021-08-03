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
import PropTypes from 'prop-types';
import Element from '../../template/Element';
var ScriptWrap = /** @class */ (function (_super) {
    __extends(ScriptWrap, _super);
    function ScriptWrap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPress = function () {
            var script = _this.props.script;
            _this.context.eval(script);
        };
        return _this;
    }
    ScriptWrap.prototype.render = function () {
        var _a = this.props, children = _a.children, element = _a.element;
        if (element) {
            return React.createElement(Element, { meta: element, onPress: this.onPress });
        }
        return React.cloneElement(children, {
            onPress: this.onPress
        });
    };
    ScriptWrap.contextTypes = {
        eval: PropTypes.func,
    };
    return ScriptWrap;
}(PureComponent));
export default ScriptWrap;
