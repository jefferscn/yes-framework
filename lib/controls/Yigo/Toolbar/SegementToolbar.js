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
import { OperationWrap as operationWrap, Util, BackHandler, AppDispatcher } from 'yes';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { ActionSheet } from 'antd-mobile';
import { History } from 'yes-platform';
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
var SegementToolbar = /** @class */ (function (_super) {
    __extends(SegementToolbar, _super);
    function SegementToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMoreMenuPressed = function (index) {
            if (index === _this.state.moreItems.length - 1) {
                _this.backHandler();
                _this.backHandler = null;
                return;
            }
            var action = _this.state.moreItems[index];
            _this.onMenuItemPressed(action);
            _this.backHandler && _this.backHandler();
        };
        _this.onMenuItemPressed = function (caption) {
            var action = _this.state.actions[caption];
            _this.el.focus(); //以后看看有没有其他处理方案
            if (caption === "更多") {
                setTimeout(function () {
                    ActionSheet.showActionSheetWithOptions({
                        options: _this.state.moreItems,
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
            if (action) {
                // Util.waitBlurExec(() => {
                console.log('toolbar pressed');
                Util.safeExec(function () { return __awaiter(_this, void 0, void 0, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Util.waitBlur()];
                            case 1:
                                _a.sent();
                                AppDispatcher.dispatch({
                                    type: 'STOPEVENT',
                                });
                                _a.label = 2;
                            case 2:
                                _a.trys.push([2, 4, 5, 6]);
                                return [4 /*yield*/, this.props.onClick(action)];
                            case 3:
                                _a.sent();
                                return [3 /*break*/, 6];
                            case 4:
                                e_1 = _a.sent();
                                throw e_1;
                            case 5:
                                AppDispatcher.dispatch({
                                    type: 'ENABLEEVENT',
                                });
                                return [7 /*endfinally*/];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); });
                // });
            }
        };
        return _this;
    }
    SegementToolbar.prototype.getItems = function (props) {
        var ignoreItems = props.ignoreItems, showItems = props.showItems;
        var totalItems = props.controlState.get('items');
        return totalItems.filter(function (value) {
            var tag = value.get('tag');
            var key = value.get('key');
            if (ignoreItems && ignoreItems.includes(key)) {
                return false;
            }
            if (showItems) {
                if (showItems.includes(key)) {
                    return true;
                }
                return false;
            }
            return true;
        });
    };
    SegementToolbar.prototype.renderItems = function () {
        var _this = this;
        var result = [];
        var length = this.state.mainItems.length;
        this.state.mainItems.forEach(function (item, index) {
            result.push(React.createElement(TouchableOpacity, { ref: function (el) { return _this.el = el; }, style: styles.item, onPress: function (event) {
                    console.log(event);
                    _this.onMenuItemPressed(item);
                } },
                React.createElement(Text, { style: styles.text }, item)));
            if (index < length - 1) {
                result.push(React.createElement(View, { style: styles.seperator }));
            }
        });
        return result;
    };
    SegementToolbar.prototype.calculateItems = function (props) {
        var captionMapping = this.props.captionMapping;
        var items = this.getItems(props);
        var toolbarItems = [];
        var actions = {};
        items.forEach(function (item) {
            if (item.get('visible') && item.get('enable')) {
                var caption = item.get('caption');
                if (captionMapping) {
                    caption = captionMapping[caption] || caption;
                }
                toolbarItems.push(caption);
                actions[caption] = item.get('action');
                // toolbarActions.push(item.get('action'));
            }
        });
        var mainItems = null;
        var moreItems = null;
        if (toolbarItems.length > 4) { //当超过4个操作的时候，显示前三个，显示一个更多，点击之后以ActionSheet的方式弹出剩余操作
            mainItems = toolbarItems.slice(0, 3);
            mainItems.push("更多");
            moreItems = toolbarItems.slice(3, toolbarItems.length);
            moreItems.push("取消");
        }
        else {
            mainItems = toolbarItems;
        }
        this.setState({
            mainItems: mainItems,
            moreItems: moreItems,
            actions: actions,
        });
    };
    SegementToolbar.prototype.componentWillReceiveProps = function (props) {
        this.calculateItems(props);
    };
    SegementToolbar.prototype.componentWillMount = function () {
        this.calculateItems(this.props);
    };
    SegementToolbar.prototype.render = function () {
        var length = this.state.mainItems.length;
        if (length === 0) {
            return null;
        }
        return (React.createElement(View, { style: [styles.container, this.props.containerStyle] }, this.renderItems()));
    };
    return SegementToolbar;
}(PureComponent));
export default operationWrap(SegementToolbar);
