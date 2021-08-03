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
/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */
import React, { PureComponent } from 'react';
import { GridWrap } from 'yes-intf';
import Element from '../../template/Element';
/**
 *
 */
var GridRowCountLimit = /** @class */ (function (_super) {
    __extends(GridRowCountLimit, _super);
    function GridRowCountLimit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getRowCount = function () {
            return _this.props.data ? _this.props.data.size : 0;
        };
        return _this;
    }
    GridRowCountLimit.prototype.render = function () {
        var _a = this.props, element = _a.element, children = _a.children, sizeLimit = _a.sizeLimit;
        if (this.getRowCount() < sizeLimit) {
            return element ? React.createElement(Element, { meta: element }) : children;
        }
        return null;
    };
    GridRowCountLimit.defaultProps = {
        sizeLimit: Number.MAX_VALUE,
    };
    GridRowCountLimit = __decorate([
        GridWrap
    ], GridRowCountLimit);
    return GridRowCountLimit;
}(PureComponent));
export default GridRowCountLimit;
