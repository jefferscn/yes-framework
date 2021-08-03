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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { PureComponent } from 'react';
import { NavBar, Modal } from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableHighlight, ScrollView, ActivityIndicator, Text } from 'react-native';
import { DictWrap } from 'yes-intf';
import { TriggerControlWrap } from 'yes-comp-react-native-web';
var styles = StyleSheet.create({
    crumb: {
        flexDirection: 'row',
    },
    modal: {
        height: '100%',
    },
    crumbs: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'aliceblue',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
    },
    content: {
        flex: 1
    },
    dictitem: {
        flexDirection: 'row',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        alignItems: 'center',
    },
    dictitemtext: {
        textAlign: 'left',
        flex: 1,
    },
    dictitemcheck: {
        width: 30,
        color: 'blueviolet',
    },
    content: {
        flex: 1,
    },
    crumbtext: {
        color: 'rgb(33, 150, 243)',
    },
    confirm: {
        fontSize: 24,
        color: 'white',
    },
});
var DictCrumb = function (_a) {
    var item = _a.item, onPress = _a.onPress;
    var onPress_ = function () {
        onPress && onPress(item);
    };
    return (React.createElement(TouchableHighlight, { onPress: onPress_ },
        React.createElement(View, { style: styles.crumb },
            React.createElement(Text, { style: styles.crumbtext }, item.Name),
            React.createElement(Text, null, "/"))));
};
/**
 * 用于显示当前选择的项目的路径
 */
var DictCrumbs = /** @class */ (function (_super) {
    __extends(DictCrumbs, _super);
    function DictCrumbs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPressRoot = function () {
            _this.props.onPress && _this.props.onPress();
        };
        return _this;
    }
    DictCrumbs.prototype.render = function () {
        var _this = this;
        var path = this.props.path;
        return (React.createElement(View, { style: styles.crumbs }, path.map(function (item) { return React.createElement(DictCrumb, { item: item, onPress: _this.props.onPress }); })));
    };
    return DictCrumbs;
}(PureComponent));
var DictItem = function (_a) {
    var item = _a.item, onPress = _a.onPress, checked = _a.checked;
    var NodeType = item.NodeType;
    var onDictItemPress = function () {
        onPress && onPress(item);
    };
    return (React.createElement(TouchableHighlight, { onPress: onDictItemPress },
        React.createElement(View, { style: styles.dictitem },
            checked ? React.createElement(Icon, { name: "check", style: styles.dictitemcheck }) : null,
            React.createElement(Text, { style: styles.dictitemtext }, item.Name),
            NodeType === 1 ? React.createElement(Icon, { name: "chevron-right" }) : null)));
};
/**
 * 字典项目列表
 */
var DictItemList = /** @class */ (function (_super) {
    __extends(DictItemList, _super);
    function DictItemList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DictItemList.prototype.render = function () {
        var _a = this.props, items = _a.items, onDictItemSelect = _a.onDictItemSelect, value = _a.value;
        if (!items) {
            return null;
        }
        return React.createElement(View, { style: styles.dictitemlist }, items.map(function (item) {
            return React.createElement(DictItem, { checked: item.oid == value, item: item, onPress: onDictItemSelect });
        }));
    };
    return DictItemList;
}(PureComponent));
var TreeDict = /** @class */ (function (_super) {
    __extends(TreeDict, _super);
    function TreeDict() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            data: null,
            loading: false,
            loadingItem: null,
            path: [],
            value: _this.props.value,
        };
        _this.plainData = null;
        _this.closeModal = function () {
            _this.props.onChangePopupState(false);
        };
        /**
         * 加载指定项目的父节点的所有数据
         */
        _this.loadParent = function (item) {
        };
        _this.onSelectItem = function (item) { return __awaiter(_this, void 0, void 0, function () {
            var idx, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(item.NodeType === 1)) return [3 /*break*/, 8];
                        if (!this.state.path.includes(item)) return [3 /*break*/, 1];
                        idx = this.state.path.indexOf(item);
                        this.setState({
                            path: this.state.path.slice(0, idx + 1),
                        });
                        return [3 /*break*/, 7];
                    case 1:
                        this.setState({
                            loading: true,
                        });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, 6, 7]);
                        if (!!item.children) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loadChildren(item)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        this.setState({
                            path: __spreadArray(__spreadArray([], this.state.path), [item]),
                        });
                        return [3 /*break*/, 7];
                    case 5:
                        ex_1 = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        this.setState({
                            loading: false
                        });
                        return [7 /*endfinally*/];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.setState({
                            value: item.oid,
                        });
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        _this.submitChange = function () {
            _this.props.onChange(_this.state.value);
            _this.closeModal();
        };
        return _this;
    }
    TreeDict.prototype.loadChildren = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var loadChildren, result, dt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loadChildren = this.props.loadChildren;
                        return [4 /*yield*/, loadChildren(item.oid)];
                    case 1:
                        result = _a.sent();
                        item.children = result;
                        dt = {};
                        result.forEach(function (itm) {
                            dt[itm.oid] = itm;
                        });
                        this.plainData = __assign(__assign({}, this.plainData), dt);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 需要根据输入的value值加载字典树数据
     */
    TreeDict.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, value, getParentPath, result, path, _i, _b, item, itm, item, ex_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, value = _a.value, getParentPath = _a.getParentPath;
                        this.setState({
                            loading: true,
                        });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 10, 11, 12]);
                        if (!value) return [3 /*break*/, 7];
                        return [4 /*yield*/, getParentPath(value)];
                    case 2:
                        result = _c.sent();
                        path = [];
                        _i = 0, _b = result[0];
                        _c.label = 3;
                    case 3:
                        if (!(_i < _b.length)) return [3 /*break*/, 6];
                        item = _b[_i];
                        itm = item;
                        if (itm.oid == "0") {
                            itm = {
                                oid: "0",
                                itemKey: this.props.itemKey,
                                Name: this.props.caption,
                                NodeType: 1,
                            };
                        }
                        else {
                            itm = this.plainData[itm.oid];
                        }
                        return [4 /*yield*/, this.loadChildren(itm)];
                    case 4:
                        _c.sent();
                        path.push(itm);
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        //3.更新state信息
                        this.setState({
                            path: path,
                        });
                        return [3 /*break*/, 9];
                    case 7:
                        item = { oid: "0", itemKey: this.props.itemKey, Name: this.props.caption, NodeType: 1 };
                        return [4 /*yield*/, this.loadChildren(item)];
                    case 8:
                        _c.sent();
                        this.setState({
                            path: [item],
                        });
                        _c.label = 9;
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        ex_2 = _c.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        this.setState({
                            loading: false,
                        });
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    TreeDict.prototype.render = function () {
        var _a = this.props, inline = _a.inline, modalVisible = _a.modalVisible, isVirtual = _a.isVirtual, caption = _a.caption;
        //如果是内联模式则不需要显示一个模态控件
        // if (inline) {
        //     return null;
        // }
        var needTopPadding = false;
        if (this.context.getTopPadding && this.context.getTopPadding() > 0) {
            needTopPadding = true;
        }
        var path = this.state.path;
        var selectedItem = path.length > 0 ? path[path.length - 1] : null;
        return inline ? (React.createElement(View, { style: styles.modal },
            React.createElement(View, { style: styles.content },
                React.createElement(DictCrumbs, { path: this.state.path, root: caption, onPress: this.onSelectItem }),
                React.createElement(ScrollView, { style: styles.content },
                    (isVirtual || this.state.loading) ? React.createElement(ActivityIndicator, null) : null,
                    React.createElement(DictItemList, { items: selectedItem ? selectedItem.children : null, onDictItemSelect: this.onSelectItem, value: this.state.value }))),
            React.createElement(NavBar, { rightContent: React.createElement(TouchableHighlight, { onPress: this.submitChange },
                    React.createElement(Icon, { style: styles.confirm, name: "check" })) }))) : (React.createElement(Modal, { animationType: "slide", transparent: false, maskClosable: false, visible: modalVisible, onClose: this.closeModal },
            React.createElement(View, { style: styles.modal },
                React.createElement(NavBar, { className: needTopPadding ? 'nav-toppadding' : '', mode: "light", icon: React.createElement(Icon, { name: "chevron-left" }), onLeftClick: this.closeModal }, caption),
                React.createElement(View, { style: styles.content },
                    React.createElement(DictCrumbs, { path: this.state.path, root: caption, onPress: this.onSelectItem }),
                    React.createElement(ScrollView, { style: styles.content },
                        (isVirtual || this.state.loading) ? React.createElement(ActivityIndicator, null) : null,
                        React.createElement(DictItemList, { items: selectedItem ? selectedItem.children : null, onDictItemSelect: this.onSelectItem, value: this.state.value }))),
                React.createElement(NavBar, { rightContent: React.createElement(TouchableHighlight, { onPress: this.submitChange },
                        React.createElement(Icon, { style: styles.confirm, name: "check" })) }))));
    };
    TreeDict.contextTypes = {
        getTopPadding: PropTypes.func,
    };
    TreeDict = __decorate([
        DictWrap,
        TriggerControlWrap
    ], TreeDict);
    return TreeDict;
}(PureComponent));
export default TreeDict;
