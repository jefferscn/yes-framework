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
// import SegementCombobox from '../../controls/SegementCombobox';
import Element from '../../template/Element';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import CellLayoutTemplate from '../../template/TabTemplate/CellLayoutTemplate';
var FilterButton = /** @class */ (function (_super) {
    __extends(FilterButton, _super);
    function FilterButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showModal: _this.props.showModal,
        };
        _this.onClose = function () {
            _this.setState({
                showModal: false,
            });
        };
        _this.showModal = function () {
            _this.setState({
                showModal: true,
            });
        };
        _this.onClearCondition = function () {
            _this.props.items.forEach(function (item) {
                if (typeof item === 'string') {
                    _this.context.onValueChange(item, null);
                }
            });
        };
        _this.onQuery = function () {
            _this.context.onControlClick(_this.props.queryButton);
            _this.setState({
                showModal: false,
            });
        };
        return _this;
    }
    FilterButton.prototype.render = function () {
        var _a = this.props, style = _a.style, items = _a.items;
        return (React.createElement(View, { style: [styles.filterButton] },
            React.createElement(TouchableOpacity, { onPress: this.showModal, style: styles.iconWrap },
                React.createElement(Icon, { onPress: this.showModal, name: "filter", size: "16" })),
            React.createElement(Modal, { popup: true, visible: this.state.showModal, onClose: this.onClose, animationType: "slide-up" },
                React.createElement(View, { style: styles.condition },
                    React.createElement(View, null),
                    React.createElement(CellLayoutTemplate, { items: items }),
                    React.createElement(View, { style: styles.action },
                        React.createElement(View, { style: styles.button },
                            React.createElement(Button, { title: "\u91CD\u7F6E", style: styles.inverseButton, onPress: this.onClearCondition })),
                        React.createElement(View, { style: styles.seperator1 }),
                        React.createElement(View, { style: styles.button },
                            React.createElement(Button, { title: "\u67E5\u8BE2", onPress: this.onQuery })))))));
    };
    FilterButton.contextTypes = {
        onControlClick: PropTypes.func,
        onValueChange: PropTypes.func,
    };
    FilterButton.defaultProps = {
        showModal: false,
    };
    return FilterButton;
}(PureComponent));
/**
 * 用于显示流水单据的查询模块
 */
var FilterBlock = /** @class */ (function (_super) {
    __extends(FilterBlock, _super);
    function FilterBlock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onConditionChange = function (yigoid, v) {
            var queryButton = _this.props.queryButton;
            if (queryButton) {
                _this.context.onControlClick(queryButton);
            }
        };
        return _this;
    }
    FilterBlock.prototype.componentWillReceiveProps = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var defaultValue, queryButton, _a, _b, _i, key;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(props.formStatus === 'ok' && this.props.formStatus !== 'ok')) return [3 /*break*/, 6];
                        defaultValue = props.defaultValue, queryButton = props.queryButton;
                        if (!defaultValue) return [3 /*break*/, 6];
                        _a = [];
                        for (_b in defaultValue)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        key = _a[_i];
                        return [4 /*yield*/, this.context.onValueChange(key, defaultValue[key])];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, this.context.onControlClick(queryButton)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FilterBlock.prototype.render = function () {
        var _this = this;
        var _a = this.props, filterItems = _a.filterItems, comboboxId = _a.comboboxId, hasMore = _a.hasMore, moreItems = _a.moreItems, queryButton = _a.queryButton, style = _a.style;
        return (React.createElement(View, { style: [styles.container, style] },
            React.createElement(View, { style: styles.filterContainer }, filterItems.map(function (item) { return React.createElement(Element, { onChange: _this.onConditionChange, meta: item }); })),
            hasMore ? React.createElement(View, { style: styles.seperator }) : null,
            hasMore ? React.createElement(FilterButton, { items: moreItems, queryButton: queryButton }) : null));
    };
    FilterBlock.contextTypes = {
        onControlClick: PropTypes.func,
        onValueChange: PropTypes.func,
    };
    FilterBlock.defaultProps = {
        hasMore: false,
    };
    return FilterBlock;
}(PureComponent));
export default FilterBlock;
var styles = StyleSheet.create({
    action: {
        flexDirection: 'row',
    },
    button: {
        // color: '#2196f3',
        // borderWidth: 1,
        // borderColor: '#2196f3',
        // backgroundColor: 'white',
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        // boxShadow: 'inset 1px -4px 4px lightgrey',
    },
    filterContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    seperator: {
        width: 1,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 10,
        marginBottom: 10,
    },
    seperator1: {
        width: 10
    },
    filterButton: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    condition: {
        padding: 16,
    },
});
