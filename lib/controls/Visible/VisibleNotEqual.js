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
/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */
import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import Element from '../../template/Element';
/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
var VisibleNotEqual = /** @class */ (function (_super) {
    __extends(VisibleNotEqual, _super);
    function VisibleNotEqual() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisibleNotEqual.prototype.render = function () {
        var _a = this.props, value = _a.value, targetValue = _a.targetValue, element = _a.element, children = _a.children;
        if (value != targetValue) {
            return element ? React.createElement(Element, { meta: element }) : children;
        }
        return null;
    };
    return VisibleNotEqual;
}(PureComponent));
export default ControlWrap(VisibleNotEqual);
