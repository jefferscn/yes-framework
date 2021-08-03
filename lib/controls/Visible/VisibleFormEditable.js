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
import { MetaBillFormWrap } from 'yes-intf';
import Element from '../../template/Element';
/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
var VisibleFormEditable = /** @class */ (function (_super) {
    __extends(VisibleFormEditable, _super);
    function VisibleFormEditable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisibleFormEditable.prototype.render = function () {
        var _a = this.props, billform = _a.billform, children = _a.children, element = _a.element;
        if (billform) {
            var formStatus = billform.form.getOperationState();
            if (formStatus === 1 || formStatus === 2) {
                return children || React.createElement(Element, { meta: element });
            }
        }
        return null;
    };
    return VisibleFormEditable;
}(PureComponent));
export default MetaBillFormWrap(VisibleFormEditable);
