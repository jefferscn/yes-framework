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
import { View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { Modal } from 'antd-mobile';
import defaultTemplateMapping from '../defaultTemplateMapping';
import PropTypes from 'prop-types';
import Element from '../Element';
import { Util } from 'yes-web';
// const { width, height } = Dimensions.get('window');
// const maxHeight = height * 0.7;
var styles = StyleSheet.create({
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(211,211,211,0.5)',
    }
});
var ModalTemplateForm = /** @class */ (function (_super) {
    __extends(ModalTemplateForm, _super);
    function ModalTemplateForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            modalVisible: true,
            maxHeight: Dimensions.get('window').height * 0.7,
            busyingAction: null,
        };
        _this.onActionPress = function (action) { return __awaiter(_this, void 0, void 0, function () {
            var ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.props.busying) {
                            return [2 /*return*/];
                        }
                        // const act = this.props.actions.find((item) => this.props.formatMessage(item.caption) === action);
                        this.setState({
                            busyingAction: action,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.context.onControlClick(action)];
                    case 2:
                        _a.sent();
                        if (this.props.autoClose) {
                            this.setState({
                                modalVisible: false,
                            });
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        ex_1 = _a.sent();
                        Util.alert('错误', ex_1.message);
                        return [3 /*break*/, 5];
                    case 4:
                        this.setState({
                            busyingAction: null,
                        });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        _this.onClose = function () {
            _this.props.onClose && _this.props.onClose();
        };
        return _this;
    }
    ModalTemplateForm.prototype.render = function () {
        var _this = this;
        // const actions = this.props.actions.map((item) => this.props.formatMessage(item.caption));
        var _a = this.props, title = _a.title, content = _a.content, popup = _a.popup, animationType = _a.animationType, actions = _a.actions, formStatus = _a.formStatus, style = _a.style, busying = _a.busying, drawer = _a.drawer;
        var acts = actions ? actions.map(function (action) {
            return {
                text: action.text,
                onPress: function () { return _this.onActionPress(action.yigoid); },
            };
        }) : undefined;
        return (React.createElement(Modal, { visible: this.state.modalVisible, popup: popup, animationType: animationType, transparent: true, maskClosable: true, onClose: this.onClose, title: title, footer: acts, wrapClassName: drawer ? 'am-modal-drawer' : null, 
            // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            afterClose: this.onClose }, formStatus === 'ok' ?
            React.createElement(View, { style: [{ maxHeight: this.state.maxHeight }, style] },
                React.createElement(Element, { meta: content }),
                busying ? React.createElement(View, { style: styles.mask },
                    React.createElement(ActivityIndicator, { size: "small" })) : null) :
            React.createElement(ActivityIndicator, { size: "large" }))
        // <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 24, paddingRight: 24 }}>
        //     <Dialog fullWidth style={{ container: { width: '100%' } }}>
        //         <Dialog.Title><Text>{this.props.formatMessage(this.props.title)}</Text></Dialog.Title>
        //         <Dialog.Content>
        //             <CellLayoutTemplate
        //                 items={this.props.items}
        //                 {...this.props}
        //             />
        //         </Dialog.Content>
        //         <Dialog.Actions>
        //             <DialogDefaultActions
        //                 actions={actions}
        //                 onActionPress={this.onActionPress}
        //             />
        //         </Dialog.Actions>
        //     </Dialog>
        // </View>
        );
    };
    ModalTemplateForm.contextTypes = {
        onControlClick: PropTypes.func,
    };
    ModalTemplateForm.defaultProps = {
        popup: false,
        animationType: 'slide-up',
        autoClose: false,
        drawer: false,
    };
    return ModalTemplateForm;
}(PureComponent));
defaultTemplateMapping.reg('modal', ModalTemplateForm);
export default ModalTemplateForm;
