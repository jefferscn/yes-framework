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
import defaultTemplateMapping from '../defaultTemplateMapping';
import { View, Text as RawText, StyleSheet, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { DynamicControl } from 'yes';
import { internationalWrap } from 'yes-intf';
import Icon from 'react-native-vector-icons/FontAwesome';
import { History } from 'yes-platform';
import { BackHandler } from 'yes';
import PropTypes from 'prop-types';
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
    },
    queryBlock: {
        flexDirection: 'row',
        height: 48,
    },
    queryitemwrap: {
        flex: 1,
        justifyContent: 'center',
    },
    advqueryitemwrap: {
        justifyContent: 'center',
        width: 50,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    query: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        left: 0,
        backgroundColor: 'white',
        right: 0,
        maxHeight: 300,
    },
    selectedText: {
        color: '#108EE9'
    },
});
var QueryItem = function (_a) {
    var selected = _a.selected, item = _a.item, onPress = _a.onPress;
    var doPress = function () {
        onPress && onPress(item);
    };
    return React.createElement(TouchableOpacity, { style: styles.queryitemwrap, onPress: doPress },
        React.createElement(View, { style: styles.item },
            React.createElement(RawText, { style: [selected ? styles.selectedText : styles.queryItemText] }, item.text),
            React.createElement(Icon, { style: [selected ? styles.selectedText : styles.queryItemText], name: selected ? 'angle-up' : 'angle-down' })));
};
var AdvanceQuery = function (_a) {
    var item = _a.item, selected = _a.selected, onPress = _a.onPress;
    var doPress = function () {
        onPress && onPress(item);
    };
    return React.createElement(TouchableOpacity, { style: styles.advqueryitemwrap, onPress: doPress },
        React.createElement(View, { style: styles.item },
            React.createElement(Icon, { name: "filter" })));
};
var QueryBlock = /** @class */ (function (_super) {
    __extends(QueryBlock, _super);
    function QueryBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedItem: null,
        };
        _this.onQuery = function (item) {
            if (item === _this.state.selectedItem) {
                _this.setState({
                    selectedItem: null,
                });
                _this.props.onQuery && _this.props.onQuery(null);
            }
            else {
                _this.setState({
                    selectedItem: item,
                });
                _this.props.onQuery && _this.props.onQuery(item);
            }
        };
        _this.onAdvanceQuery = function () {
            _this.onQuery(null);
            _this.props.onAdvanceQuery && _this.props.onAdvanceQuery();
        };
        _this.reset = function () {
            _this.onQuery(null);
        };
        return _this;
    }
    QueryBlock.prototype.render = function () {
        var _this = this;
        var _a = this.props, items = _a.items, advanceQuery = _a.advanceQuery;
        var selectedItem = this.state.selectedItem;
        return React.createElement(View, { style: styles.queryBlock },
            items.map(function (item) {
                return React.createElement(QueryItem, { item: item, selected: selectedItem === item, onPress: _this.onQuery });
            }),
            advanceQuery ? React.createElement(AdvanceQuery, { item: advanceQuery, onPress: this.props.onAdvanceQuery }) : null);
    };
    return QueryBlock;
}(PureComponent));
var ListWithQueryTemplate = /** @class */ (function (_super) {
    __extends(ListWithQueryTemplate, _super);
    function ListWithQueryTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            refreshing: false,
            showMask: false,
            showSlideMask: false,
            queryItem: null,
        };
        _this.onRefresh = function () { return __awaiter(_this, void 0, void 0, function () {
            var refresh, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            refreshing: true,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, 9, 10]);
                        refresh = this.props.refresh;
                        if (!(!refresh || refresh.type === 'form')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.props.reload()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(refresh && refresh.type === 'button')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.context.onControlClick(refresh.buttonId)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!(refresh && refresh.type === 'opt')) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.context.doOpt(refresh.optId)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        ex_1 = _a.sent();
                        console.log(ex_1);
                        return [3 /*break*/, 10];
                    case 9:
                        this.setState({
                            refreshing: false,
                        });
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        _this.addListener = function () {
            if (!_this.backHandler) {
                History.push("#ListWithQuery", false);
                _this.backHandler = BackHandler.addPreEventListener(function () {
                    // this.removeListener();
                    _this.onMaskClick();
                });
            }
        };
        _this.removeListener = function () {
            _this.backHandler && _this.backHandler();
            // this.onMaskClick();
            _this.backHandler = null;
        };
        _this.onAdvanceQuery = function () {
            var advanceQuery = _this.props.advanceQuery;
            if (!advanceQuery) {
                return;
            }
            if (advanceQuery.type === 'button') {
                _this.setState({
                    queryItem: null,
                    showMask: false,
                    showSlideMask: false,
                });
                // this.ref && this.ref.reset();
                _this.removeListener();
                _this.context.onControlClick(advanceQuery.yigoid);
            }
            else {
                _this.setState({
                    queryItem: null,
                    showMask: false,
                    showSlideMask: true,
                });
                _this.addListener();
            }
        };
        _this.onQuery = function (item) {
            if (item) {
                _this.setState({
                    showMask: true,
                    queryItem: item,
                    showSlideMask: false,
                });
                _this.addListener();
            }
            else {
                _this.setState({
                    showMask: false,
                    queryItem: item,
                    showSlideMask: false,
                });
                _this.removeListener();
            }
        };
        _this.bindRef = function (ref) {
            _this.ref = ref;
        };
        _this.onMaskClick = function () {
            _this.ref && _this.ref.reset();
        };
        _this.onPostQuery = function () {
            var _a = _this.props, queryType = _a.queryType, queryId = _a.queryId;
            _this.onMaskClick();
            if (queryType === 'button') {
                _this.context.onControlClick(queryId);
            }
        };
        return _this;
    }
    ListWithQueryTemplate.prototype.componentWillUnmount = function () {
        this.removeListener();
    };
    ListWithQueryTemplate.prototype.render = function () {
        return this.buildChildren();
    };
    ListWithQueryTemplate.prototype.buildChildren = function () {
        var _a = this.props, queryItems = _a.queryItems, advanceQuery = _a.advanceQuery, list = _a.list, action = _a.action, formStatus = _a.formStatus, error = _a.error, errorMsg = _a.errorMsg, contentStyle = _a.contentStyle, busying = _a.busying;
        //reloading状态下不显示加载状态
        var _b = this.state, showMask = _b.showMask, showSlideMask = _b.showSlideMask, refreshing = _b.refreshing;
        var listEle = this.context.createElement(list, {
            onRefresh: this.onRefresh,
            refreshing: refreshing,
        });
        var foot = this.context.createElement(this.props.foot);
        var head = this.context.createElement(this.props.head);
        var actionButton = this.context.createElement(action);
        if (!React.isValidElement(listEle)) {
            listEle = React.createElement(DynamicControl, __assign({ designPositionBase: true, yigoid: list, debugStyle: { flex: 1 }, layoutStyles: { flex: 1 }, style: { flex: 1, marginLeft: 12 } }, this.context.getControlProps(list)));
        }
        return (React.createElement(View, { style: { flex: 1, backgroundColor: 'white' } },
            this.context.createElement(head),
            React.createElement(View, { style: [{ flex: 1 }] },
                showSlideMask ? React.createElement(TouchableWithoutFeedback, { onPress: this.onMaskClick },
                    React.createElement(View, { style: styles.mask })) : null,
                (showSlideMask && this.props.advanceQuery) ? React.createElement(View, { style: styles.slide }, this.context.createElement(this.props.advanceQuery.content)) : null,
                React.createElement(QueryBlock, { ref: this.bindRef, onQuery: this.onQuery, onAdvanceQuery: this.onAdvanceQuery, items: queryItems, advanceQuery: advanceQuery }),
                React.createElement(View, { style: [{ flex: 1 }, contentStyle] },
                    ((formStatus && formStatus != 'ok') ||
                        busying) ? React.createElement(View, { style: styles.mask },
                        React.createElement(ActivityIndicator, null)) : null,
                    showMask ? React.createElement(TouchableWithoutFeedback, { onPress: this.onMaskClick, style: styles.mask },
                        React.createElement(View, { style: styles.mask })) : null,
                    (showMask && this.state.queryItem) ? React.createElement(View, { style: styles.query }, this.context.createElement(this.state.queryItem.content, {
                        onChange: this.onPostQuery
                    })) : null,
                    listEle,
                    foot,
                    actionButton))));
    };
    ListWithQueryTemplate.contextTypes = {
        createElement: PropTypes.func,
        onControlClick: PropTypes.func,
        getControlProps: PropTypes.func,
        doOpt: PropTypes.func,
    };
    ListWithQueryTemplate.defaultProps = {
        queryType: 'button',
    };
    return ListWithQueryTemplate;
}(PureComponent));
var ListWithNavigation = internationalWrap(ListWithQueryTemplate);
ListWithNavigation.caption = "单据列表模板(带过滤)";
defaultTemplateMapping.reg('listwithquery', ListWithNavigation);
export default ListWithNavigation;
