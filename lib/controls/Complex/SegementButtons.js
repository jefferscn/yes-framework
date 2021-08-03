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
import { Util, BackHandler, AppDispatcher } from 'yes';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { ActionSheet } from 'antd-mobile';
import { History } from 'yes-comp-react-native-web';
import PropTypes from 'prop-types';
import VisibleRelated from '../Visible/VisibleRelated';
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: 'white',
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
});
var SegementButtons = /** @class */ (function (_super) {
    __extends(SegementButtons, _super);
    function SegementButtons() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMoreMenuPressed = function (index) {
            var action = _this.state.moreItems[index];
            _this.onMenuItemPressed(action);
            _this.backHandler && _this.backHandler();
        };
        _this.onMenuItemPressed = function (caption) {
            // const action = this.state.actions[caption];
            _this.el.focus(); //以后看看有没有其他处理方案
            if (caption === "更多") {
                setTimeout(function () {
                    ActionSheet.showActionSheetWithOptions({
                        options: _this.state.moreItems.map(function (item) { return item.text; }),
                        cancelButtonIndex: _this.state.moreItems.length - 1,
                        message: null,
                        maskClosable: true,
                    }, _this.onMoreMenuPressed);
                    History.push("#ActionSheet", false);
                    _this.backHandler = BackHandler.addPreEventListener(function () {
                        ActionSheet.close();
                        _this.backHandler();
                        return false;
                    });
                }, 0);
            }
            var itm = _this.props.items.find(function (item) { return item.text === caption; });
            if (itm) {
                // Util.waitBlurExec(() => {
                Util.safeExec(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Util.waitBlur()];
                            case 1:
                                _a.sent();
                                AppDispatcher.dispatch({
                                    type: 'STOPEVENT',
                                });
                                return [4 /*yield*/, this.context.onControlClick(itm.key)];
                            case 2:
                                _a.sent();
                                AppDispatcher.dispatch({
                                    type: 'ENABLEEVENT',
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                // });
            }
        };
        return _this;
    }
    SegementButtons.prototype.getItems = function (props) {
        return props.items;
        // return props.controlState.get('items');
        // return props.controlState.get('items').filter((value) => {
        //     const tag = value.get('tag');
        //     const key = value.get('key');
        //     return tag === 'bpm' || tag === 'loadworkitem' ||  key === 'StartInstance' || key === 'RollBack' || key==='Transit'||key === 'OPTApproveT_DZ';
        // });
    };
    SegementButtons.prototype.renderItems = function () {
        var _this = this;
        var result = [];
        var length = this.state.mainItems.length;
        this.state.mainItems.forEach(function (item, index) {
            result.push(React.createElement(VisibleRelated, { yigoid: item.key },
                React.createElement(TouchableOpacity, { ref: function (el) { return _this.el = el; }, style: styles.item, onPress: function (event) {
                        console.log(event);
                        _this.onMenuItemPressed(item.text);
                    } },
                    React.createElement(Text, { style: styles.text }, item.text))));
            if (index < length - 1) {
                result.push(React.createElement(VisibleRelated, { yigoid: item.key },
                    React.createElement(View, { style: styles.seperator })));
            }
        });
        return result;
    };
    SegementButtons.prototype.calculateItems = function (props) {
        var items = this.getItems(props);
        var mainItems = null;
        var moreItems = null;
        if (items.length > 4) { //当超过4个操作的时候，显示前三个，显示一个更多，点击之后以ActionSheet的方式弹出剩余操作
            mainItems = items.slice(0, 3);
            mainItems.push({
                text: "更多",
                key: 'more',
            });
            moreItems = items.slice(3, items.length);
            moreItems.push({
                text: "取消",
                key: "cancel",
            });
        }
        else {
            mainItems = items;
        }
        this.setState({
            mainItems: mainItems,
            moreItems: moreItems,
        });
    };
    SegementButtons.prototype.componentWillReceiveProps = function (props) {
        this.calculateItems(props);
    };
    SegementButtons.prototype.componentWillMount = function () {
        this.calculateItems(this.props);
    };
    SegementButtons.prototype.render = function () {
        var length = this.state.mainItems.length;
        if (length === 0) {
            return null;
        }
        return (React.createElement(View, { style: [styles.container, this.props.containerStyle] }, this.renderItems()));
    };
    SegementButtons.contextTypes = {
        onControlClick: PropTypes.func,
    };
    return SegementButtons;
}(PureComponent));
export default SegementButtons;
