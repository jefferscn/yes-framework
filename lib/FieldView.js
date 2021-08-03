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
import { Components } from 'yes-comp-react-native-web'; // eslint-disable-line
// import billform from './billform';
import billform from './config/billforms';
import controls from './config/control.js';
import { YIUI } from 'yes-core';
import { DynamicControl } from 'yes';
var CustomBillForm = Components.CustomBillForm, LoadingComp = Components.LoadingComp;
// const WorkitemBill = workitemWrap(BillForm, LoadingComp);
var FieldView = /** @class */ (function (_super) {
    __extends(FieldView, _super);
    function FieldView() {
        // static navigationOptions = ({ navigation }) => {
        //     return {
        //         headerTitle: <WorkitemBill workitemId={navigation.state.params.wid}>
        //             <FormInfo.FieldCaption style={{ fontSize: 20 }} yigoid={navigation.state.params.field} />
        //         </WorkitemBill>,
        //         headerStyle: {
        //             // backgroundColor: '#2196f3',
        //         },
        //     };
        // };
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loading: true,
        };
        return _this;
    }
    FieldView.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var workitemInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, YIUI.BPMService.loadWorkitemInfo(this.props.navigation.state.params.wid)];
                    case 1:
                        workitemInfo = _a.sent();
                        if (workitemInfo) {
                            this.setState({
                                loading: false,
                                workitemInfo: workitemInfo,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FieldView.prototype.render = function () {
        if (this.state.loading) {
            return React.createElement(LoadingComp, null);
        }
        var formKey = this.state.workitemInfo.FormKey;
        var oid = this.state.workitemInfo.OID ? this.state.workitemInfo.OID : -1;
        var expVals = {};
        expVals[YIUI.BPMConstants.WORKITEM_INFO] = this.state.workitemInfo;
        var extraProps;
        // 支持反向模版
        extraProps = billform.default;
        if (billform[formKey]) {
            extraProps = Object.assign(extraProps, billform[formKey]);
        }
        if (this.state.workitemInfo.TemplateKey) {
            formKey = formKey + "|" + this.state.workitemInfo.TemplateKey;
        }
        var fieldProps = extraProps.controls[this.props.navigation.state.params.field];
        this.calculateElement(fieldProps);
        return (React.createElement(CustomBillForm, { formKey: formKey, oid: oid, status: 'VIEW', expVals: expVals },
            React.createElement(DynamicControl, __assign({ yigoid: this.props.navigation.state.params.field }, fieldProps))));
    };
    FieldView.prototype.calculateElement = function (props) {
        if (props.control && typeof props.control === 'string') {
            props['control'] = controls[props.control];
        }
        for (var key in props) {
            var ele = props[key];
            if (ele.type === 'element') {
                var Control = controls[ele.elementType];
                props[key] = React.createElement(Control, __assign({}, ele.elementProps));
            }
        }
    };
    FieldView.propTypes = {
        navigation: PropTypes.object,
    };
    return FieldView;
}(PureComponent));
export default FieldView;
