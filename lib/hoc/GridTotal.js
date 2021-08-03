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
import PropTypes from 'prop-types';
import Decimal from 'decimal.js';
export default (function (Comp) {
    var GridTotal = /** @class */ (function (_super) {
        __extends(GridTotal, _super);
        function GridTotal() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.getRowCount = function () {
                return _this.props.data ? _this.props.data.size : 0;
            };
            _this.getTotalRowCount = function () {
                var owner = _this.context.getOwner();
                if (!owner) {
                    return 0;
                }
                return owner.getTotalRowCount();
            };
            _this.getTotal = function (sumField) {
                var owner = _this.context.getOwner();
                if (!owner || !sumField) {
                    return 0;
                }
                // const index = owner.getCellIndexByKey(sumField);
                var total = new Decimal(0);
                for (var i = 0; i < _this.props.data.size; i++) {
                    var v = owner.getValueByKey(i, sumField);
                    total = total.plus(v || 0);
                }
                return parseFloat(total);
            };
            _this.getSelectedCount = function () {
                var owner = _this.context.getOwner();
                if (!owner) {
                    return 0;
                }
                if (owner.selectFieldIndex < 0) {
                    return 0;
                }
                var total = 0;
                for (var i = 0; i < _this.props.data.size; i++) {
                    var v = owner.getValueAt(i, owner.selectFieldIndex);
                    if (v) {
                        total++;
                    }
                }
                return total;
            };
            return _this;
        }
        GridTotal.prototype.render = function () {
            var count = this.getRowCount();
            var total = this.getTotal(this.props.sumField);
            var selectedCount = this.getSelectedCount();
            var totalRowCount = this.getTotalRowCount();
            return (React.createElement(Comp, __assign({}, this.props, { count: count, total: total, getTotal: this.getTotal, totalRowCount: totalRowCount, selectedCount: selectedCount })));
        };
        GridTotal.contextTypes = {
            getOwner: PropTypes.func,
        };
        GridTotal = __decorate([
            GridWrap
        ], GridTotal);
        return GridTotal;
    }(PureComponent));
    return GridTotal;
});
