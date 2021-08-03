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
import TemplateView from './TemplateView';
import { YIUI, closeform } from 'yes-core';
import { AppDispatcher } from 'yes';
import { Modal } from 'antd-mobile';
import { internationalWrap } from 'yes-intf';
var LoadingComp = Components.LoadingComp;
// const WorkitemBill = workitemWrap(DynamicBillForm, LoadingComp);
var WorkitemView = /** @class */ (function (_super) {
    __extends(WorkitemView, _super);
    function WorkitemView() {
        // static navigationOptions = ({ navigation }) => {
        //     return {
        //         headerTitle: <WorkitemBill hideLoading workitemId={navigation.state.params.wid} onlyOpen={navigation.state.params.onlyOpen} loadInfo={navigation.state.params.loadInfo}>
        //             <FormInfo.FormCaption containerStyle={{ width: '100%' }} />
        //         </WorkitemBill>,
        //         // headerLeft: <View style={{ flexDirection: 'row' }}><HeaderBackButton /></View>,
        //         // headerRight: (
        //         //     <WorkitemBill
        //         //         hideLoading
        //         //         workitemId={navigation.state.params.wid}
        //         //     >
        //         //         <WorkflowOperationBar />
        //         //     </WorkitemBill>
        //         // ),
        //         headerStyle: {
        //             // backgroundColor: '#2196f3',
        //         },
        //     };
        // };
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loading: true,
        };
        _this.formatMessage = function (msg) {
            if (msg) {
                return _this.props.formatMessage ? _this.props.formatMessage(msg) : msg;
            }
            return msg;
        };
        return _this;
    }
    WorkitemView.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var workitemInfo, expVals_1, ex_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, YIUI.BPMService.loadWorkitemInfo(this.props.navigation.state.params.wid)];
                    case 1:
                        workitemInfo = _a.sent();
                        if (workitemInfo) {
                            expVals_1 = {};
                            expVals_1[YIUI.BPMConstants.WORKITEM_INFO] = workitemInfo;
                            // InteractionManager.runAfterInteractions(() =>
                            setTimeout(function () {
                                return _this.setState({
                                    loading: false,
                                    expVals: expVals_1,
                                });
                            }, 400);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ex_1 = _a.sent();
                        Modal.alert(this.formatMessage('错误'), this.formatMessage('加载流程信息失败'), [{ text: 'OK', onPress: function () { return AppDispatcher.dispatch(closeform()); } }]);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WorkitemView.prototype.render = function () {
        if (this.state.loading) {
            return React.createElement(LoadingComp, null);
        }
        var formKey = this.state.expVals.WorkitemInfo.FormKey;
        if (this.state.expVals.WorkitemInfo.TemplateKey) {
            formKey = formKey + "|" + this.state.expVals.WorkitemInfo.TemplateKey;
        }
        var oid = this.state.expVals.WorkitemInfo.OID ? this.state.expVals.WorkitemInfo.OID : -1;
        var status = 'DEFAULT';
        var expVals = this.state.expVals;
        if (this.state.expVals.WorkitemInfo.State === 1 && this.props.navigation.state.params.loadInfo === 'true') {
            if (this.state.expVals.WorkitemInfo.IgnoreFormState) {
                status = 'EDIT';
            }
        }
        else {
            expVals[YIUI.BPMKeys.WORKITEM_INFO] = null;
        }
        return (React.createElement(TemplateView, { formKey: formKey, oid: oid, field: this.props.navigation.state.params.field, status: status, expVals: expVals }));
    };
    WorkitemView.propTypes = {
        navigation: PropTypes.object,
    };
    return WorkitemView;
}(PureComponent));
export default internationalWrap(WorkitemView);
