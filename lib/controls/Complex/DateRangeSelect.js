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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MetaBillFormWrap } from 'yes-intf';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Popup from 'rmc-picker/es/Popup';
import { PickerView } from 'antd-mobile';
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 11,
    },
    icon: {
        paddingLeft: 7,
    }
});
/**
 * 在单据中包含起始时间和结束时间的情况下，模拟一个日期范围选择的功能
 * 当日，一周，一月，三月，半年，一年
 */
var items = [{
        label: '无限制',
        value: 'no limit'
    }, {
        label: '当天',
        value: 'current day',
    }, {
        label: '一周',
        value: 'last week',
    }, {
        label: '一月',
        value: 'last month',
    }, {
        label: '一季',
        value: 'last quarter',
    }, {
        label: '半年',
        value: 'last half year',
    }, {
        label: '一年',
        value: 'last year',
    }];
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
var DateRangeSelect = /** @class */ (function (_super) {
    __extends(DateRangeSelect, _super);
    function DateRangeSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showPopup: false,
            value: _this.props.value,
            displayValue: _this.getCaption(_this.props.value),
        };
        _this.onVisibleChange = function (visible) {
            _this.setState({
                showPopup: visible,
            });
        };
        _this.requestChange = function (v) { return __awaiter(_this, void 0, void 0, function () {
            var _a, startDateField, endDateField, endDate, startDate, momentDate;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, startDateField = _a.startDateField, endDateField = _a.endDateField;
                        endDate = new Date();
                        startDate = endDate;
                        momentDate = moment(endDate);
                        switch (v) {
                            case 'last week':
                                momentDate.subtract(1, 'w');
                                startDate = momentDate.toDate();
                                break;
                            case 'last month':
                                momentDate.subtract(1, 'M');
                                startDate = momentDate.toDate();
                                break;
                            case 'last quarter':
                                momentDate.subtract(1, 'Q');
                                startDate = momentDate.toDate();
                                break;
                            case 'last half year':
                                momentDate.subtract(6, 'M');
                                startDate = momentDate.toDate();
                                break;
                            case 'last year':
                                momentDate.subtract(1, 'y');
                                startDate = momentDate.toDate();
                                break;
                            case 'no limit':
                                startDate = null;
                                endDate = null;
                        }
                        return [4 /*yield*/, this.context.onValueChange(startDateField, startDate)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.context.onValueChange(endDateField, endDate)];
                    case 2:
                        _b.sent();
                        this.props.onChange && this.props.onChange();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onValueChange = function (_a) {
            var v = _a[0];
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.requestChange(v)];
                        case 1:
                            _b.sent();
                            this.setState({
                                showPopup: false,
                                value: v,
                                displayValue: this.getCaption(v),
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        return _this;
    }
    DateRangeSelect.prototype.getCaption = function (v) {
        var selectItem = items.find(function (item) { return item.value === v; });
        if (selectItem) {
            return selectItem.label;
        }
        return '';
    };
    DateRangeSelect.prototype.componentWillReceiveProps = function (props) {
        // if(props.formStatus==='ok' && this.props.formStatus!=='ok') {
        if (this.state.value) {
            if (props.status > 0 && this.props.status === 0)
                this.requestChange(this.state.value);
        }
        else {
            var startDate = this.context.getContextComponent(this.props.startDateField);
            var endDate = this.context.getContextComponent(this.props.endDateField);
            var startV = startDate.getValue();
            var endV = endDate.getValue();
            if (!startV && !endV) {
                this.setState({
                    value: 'no limit',
                    displayValue: '无限制'
                });
                return;
            }
            var mStartV = moment(startV);
            var mEndV = moment(endV);
            var days = mEndV.diff(mStartV, 'days');
            if (days <= 1) {
                this.setState({
                    displayValue: '当天',
                    value: 'current day',
                });
            }
            if (days <= 7 && days >= 6) {
                this.setState({
                    displayValue: '一周',
                    value: 'last week',
                });
            }
            if (days <= 31 && days >= 28) {
                this.setState({
                    displayValue: '一月',
                    value: 'last month',
                });
            }
            if (days <= 93 && days >= 88) {
                this.setState({
                    displayValue: '一季',
                    value: 'last quarter',
                });
            }
            if (days <= 183 && days >= 180) {
                this.setState({
                    displayValue: '半年',
                    value: 'last half year',
                });
            }
            if (days <= 366 && days >= 360) {
                this.setState({
                    displayValue: '一年',
                    value: 'last year',
                });
            }
        }
        // }
    };
    DateRangeSelect.prototype.componentWillMount = function () {
        if (this.props.status === 2) {
            if (this.state.value) {
                this.requestChange(this.state.value);
            }
            else {
                var startDate = this.context.getContextComponent(this.props.startDateField);
                var endDate = this.context.getContextComponent(this.props.endDateField);
                var startV = startDate.getValue();
                var endV = endDate.getValue();
                if (!startV && !endV) {
                    this.setState({
                        value: 'no limit',
                        displayValue: '无限制'
                    });
                    return;
                }
                var mStartV = moment(startV);
                var mEndV = moment(endV);
                var days = mEndV.diff(mStartV, 'days');
                if (days <= 1) {
                    this.setState({
                        displayValue: '当天',
                        value: 'current day',
                    });
                }
                if (days <= 7 && days >= 6) {
                    this.setState({
                        displayValue: '一周',
                        value: 'last week',
                    });
                }
                if (days <= 31 && days >= 28) {
                    this.setState({
                        displayValue: '一月',
                        value: 'last month',
                    });
                }
                if (days <= 93 && days >= 88) {
                    this.setState({
                        displayValue: '一季',
                        value: 'last quarter',
                    });
                }
                if (days <= 183 && days >= 180) {
                    this.setState({
                        displayValue: '半年',
                        value: 'last half year',
                    });
                }
                if (days <= 366 && days >= 360) {
                    this.setState({
                        displayValue: '一年',
                        value: 'last year',
                    });
                }
            }
        }
    };
    DateRangeSelect.prototype.render = function () {
        var _this = this;
        var _a = this.props, placeholder = _a.placeholder, openTextStyle = _a.openTextStyle, openIconStyle = _a.openIconStyle, style = _a.style, showIcon = _a.showIcon;
        var picker = (React.createElement(PickerView1, { data: items, cols: 1, cascade: false, value: [this.state.value], title: this.props.caption }));
        return (React.createElement(View, { style: (styles.container, style) },
            React.createElement(TouchableOpacity, { onPress: function () { return _this.onVisibleChange(true); } },
                React.createElement(View, { style: styles.content },
                    React.createElement(Text, { style: [styles.text, this.state.showPopup ? openTextStyle : null] }, this.state.displayValue || placeholder),
                    showIcon ? React.createElement(Icon, { style: [styles.icon, this.state.showPopup ? openIconStyle : null], name: this.state.showPopup ? "angle-up" : "angle-down", size: 16 }) : null)),
            React.createElement(Popup, { className: "ioslikepopup", picker: picker, visible: this.state.showPopup, placeholder: "\u9009\u62E9\u6708\u4EFD", onOk: this.onValueChange, onDismiss: function () { return _this.onVisibleChange(false); }, okText: "\u786E\u5B9A", dismissText: "\u53D6\u6D88" })));
    };
    DateRangeSelect.contextTypes = {
        onValueChange: PropTypes.func,
        getContextComponent: PropTypes.func,
    };
    DateRangeSelect.defaultProps = {
        showIcon: true,
    };
    DateRangeSelect = __decorate([
        MetaBillFormWrap
    ], DateRangeSelect);
    return DateRangeSelect;
}(PureComponent));
export default DateRangeSelect;
