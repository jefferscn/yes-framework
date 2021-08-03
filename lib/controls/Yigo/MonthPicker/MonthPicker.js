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
import React, { PureComponent } from 'react';
import { TriggerControlWrap } from 'yes-comp-react-native-web';
import { ControlWrap } from 'yes-intf';
import Popup from 'rmc-picker/es/Popup';
import { PickerView } from 'antd-mobile';
var buildYearData = function (startYear, endYear) {
    var result = [];
    for (var year = startYear; year <= endYear; year++) {
        result.push({
            value: year,
            label: year + '',
        });
    }
    return result;
};
var yearData = buildYearData(1900, 2050);
var monthData = buildYearData(1, 12);
var data = [
    yearData,
    monthData,
];
var PickerView1 = /** @class */ (function (_super) {
    __extends(PickerView1, _super);
    function PickerView1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: _this.props.value,
        };
        _this.getValue = function () {
            return _this.state.value;
        };
        _this.onChange = function (v) {
            _this.setState({
                value: v,
            });
        };
        return _this;
    }
    PickerView1.prototype.render = function () {
        return (React.createElement(PickerView, __assign({}, this.props, { onChange: this.onChange, value: this.state.value })));
    };
    return PickerView1;
}(PureComponent));
var MonthPicker = /** @class */ (function (_super) {
    __extends(MonthPicker, _super);
    function MonthPicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleCloseModal = function () {
            if (!_this.props.disabled && !_this.props.inline) {
                _this.props.onChangePopupState(false);
            }
        };
        _this.handleDateChange = function (_a) {
            var year = _a[0], month = _a[1];
            _this.props.onChange(year * 100 + month);
            _this.handleCloseModal();
        };
        return _this;
    }
    MonthPicker.prototype.render = function () {
        var _a = this.props, onlyDate = _a.onlyDate, modalVisible = _a.modalVisible, controlState = _a.controlState, inline = _a.inline, value = _a.value;
        var dt = new Date();
        var v = [dt.getFullYear(), dt.getMonth() + 1];
        if (value) {
            v = [Math.floor(value / 100), value - Math.floor(value / 100) * 100];
        }
        if (inline) {
            return React.createElement(PickerView1, { data: data, title: "\u9009\u62E9\u6708\u4EFD`", cols: 2, cascade: false, value: v, onPickerChange: this.handleDateChange });
        }
        var picker = (React.createElement(PickerView1, { data: data, cols: 2, cascade: false, value: v, title: "\u9009\u62E9\u6708\u4EFD" }));
        return (React.createElement(Popup, { picker: picker, visible: modalVisible, date: value, placeholder: "\u9009\u62E9\u6708\u4EFD", 
            // onPickerChange={this.handleDateChange}
            onOk: this.handleDateChange, onDismiss: this.handleCloseModal }));
    };
    return MonthPicker;
}(PureComponent));
export default ControlWrap(TriggerControlWrap(MonthPicker));
