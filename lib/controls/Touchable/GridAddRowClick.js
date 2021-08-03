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
import { GridWrap } from 'yes-intf';
import { withDetail } from 'yes-comp-react-native-web';
import PropTypes from 'prop-types';
var GridAddRowClick = /** @class */ (function (_super) {
    __extends(GridAddRowClick, _super);
    function GridAddRowClick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPress = function () {
            _this.props.addNewRow && _this.props.addNewRow();
        };
        _this.getRowCount = function () {
            return _this.props.data ? _this.props.data.size : 0;
        };
        return _this;
    }
    GridAddRowClick.prototype.render = function () {
        var _a = this.props, children = _a.children, element = _a.element, editable = _a.editable, sizeLimit = _a.sizeLimit;
        if (!editable || this.getRowCount() >= sizeLimit) {
            return null;
        }
        var child = this.context.createElement(children || element);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    };
    GridAddRowClick.contextTypes = {
        createElement: PropTypes.func,
    };
    GridAddRowClick.defaultProps = {
        sizeLimit: Number.MAX_VALUE,
    };
    GridAddRowClick = __decorate([
        GridWrap,
        withDetail
    ], GridAddRowClick);
    return GridAddRowClick;
}(PureComponent));
export default GridAddRowClick;
