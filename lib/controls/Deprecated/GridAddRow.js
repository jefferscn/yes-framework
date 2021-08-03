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
import { View } from 'react-native';
var GridAddRow_ = /** @class */ (function (_super) {
    __extends(GridAddRow_, _super);
    function GridAddRow_() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPress = function () {
            _this.props.addNewRow && _this.props.addNewRow();
        };
        _this.getRowCount = function () {
            return _this.props.data ? _this.props.data.size : 0;
        };
        return _this;
    }
    GridAddRow_.prototype.render = function () {
        var _a = this.props, children = _a.children, editable = _a.editable, sizeLimit = _a.sizeLimit;
        if (!editable || this.getRowCount() >= sizeLimit) {
            return null;
        }
        var child = this.context.createElement(children);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    };
    GridAddRow_.contextTypes = {
        createElement: PropTypes.func,
    };
    GridAddRow_.defaultProps = {
        sizeLimit: Number.MAX_VALUE,
    };
    GridAddRow_ = __decorate([
        GridWrap,
        withDetail
    ], GridAddRow_);
    return GridAddRow_;
}(PureComponent));
var GridAddRow = /** @class */ (function (_super) {
    __extends(GridAddRow, _super);
    function GridAddRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridAddRow.prototype.render = function () {
        var style = this.props.style;
        return React.createElement(View, { style: style },
            React.createElement(GridAddRow_, __assign({}, this.props)));
    };
    return GridAddRow;
}(PureComponent));
export default GridAddRow;
