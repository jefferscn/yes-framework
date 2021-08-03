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
import { OperationWrap as operationWrap } from 'yes';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import GridTotal from '../../../hoc/GridTotal';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { Util } from 'yes-intf';
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: 'aliceblue',
        paddingLeft: 12,
        paddingRight: 12,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#008CD7',
        fontSize: 16,
    },
    seperator: {
        width: 1,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        width: 100,
        justifyContent: 'center',
    },
    count: {
        flex: 1,
        justifyContent: 'center',
    },
    selectAll: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        color: '#008CD7',
        fontSize: 30,
    },
});
var GridBatchOperate = /** @class */ (function (_super) {
    __extends(GridBatchOperate, _super);
    function GridBatchOperate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.doOpt = function () { return __awaiter(_this, void 0, void 0, function () {
            var item_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.props.optType === 'toolbar') {
                    item_1 = this.getItem(this.props);
                    if (item_1) {
                        Util.safeExec(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.props.onClick(item_1.get('action'))];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                    }
                }
                if (this.props.optType === 'button') {
                    Util.safeExec(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.context.onControlClick(this.props.optKey)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                }
                return [2 /*return*/];
            });
        }); };
        _this.toggleSelectAll = function () {
            var owner = _this.context.getOwner();
            if (!owner) {
                return;
            }
            var _a = _this.props, selectedCount = _a.selectedCount, title = _a.title, autoHide = _a.autoHide, count = _a.count, supportSelectAll = _a.supportSelectAll;
            if (selectedCount === count) {
                owner.unselectAll();
            }
            else {
                owner.selectAll();
            }
        };
        return _this;
    }
    GridBatchOperate.prototype.getItem = function (props) {
        var _this = this;
        var totalItems = props.controlState.get('items');
        return totalItems.find(function (value) {
            var key = value.get('key');
            return key === _this.props.optKey;
        });
    };
    GridBatchOperate.prototype.render = function () {
        var _a = this.props, selectedCount = _a.selectedCount, title = _a.title, autoHide = _a.autoHide, count = _a.count, supportSelectAll = _a.supportSelectAll, selectAllStyle = _a.selectAllStyle;
        if (!selectedCount && autoHide) {
            return null;
        }
        var selectAllComp = null;
        if (supportSelectAll) {
            var icon = null;
            if (selectedCount === 0) {
                icon = React.createElement(Icon, { style: [styles.icon, selectAllStyle], name: "circle-o" });
            }
            else {
                if (selectedCount === count) {
                    icon = React.createElement(Icon, { style: [styles.icon, selectAllStyle], name: "check-circle-o" });
                }
                else {
                    icon = React.createElement(Icon, { style: [styles.icon, selectAllStyle], name: "dot-circle-o" });
                }
            }
            selectAllComp = React.createElement(TouchableOpacity, { style: styles.selectAll, onPress: this.toggleSelectAll }, icon);
        }
        return (React.createElement(View, { style: [styles.container, this.props.containerStyle] },
            selectAllComp,
            React.createElement(View, { style: styles.count },
                React.createElement(Text, { style: styles.text }, "\u9009\u4E2D" + selectedCount + "/" + count + "\u884C")),
            React.createElement(View, { style: styles.buttonContainer },
                React.createElement(Button, { disabled: selectedCount == 0, onPress: this.doOpt, title: title }))));
    };
    GridBatchOperate.defaultProps = {
        autoHide: false,
        optType: 'toolbar',
        supportSelectAll: false,
    };
    GridBatchOperate.contextTypes = {
        onControlClick: PropTypes.func,
        getOwner: PropTypes.func,
    };
    GridBatchOperate = __decorate([
        GridTotal
    ], GridBatchOperate);
    return GridBatchOperate;
}(PureComponent));
export default operationWrap(GridBatchOperate);
