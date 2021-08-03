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
/**
 * 一个支持主文字，副文字以及右边有一个链接标志的列表
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListView, PullToRefresh } from 'antd-mobile';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { ListRowWrap as listRowWrap, ListWrap, DynamicControl } from 'yes';
import { ListComponents } from 'yes-comp-react-native-web';
import ListViewItem from '../../Container/ListViewItem';
var ListText = ListComponents.ListText;
var AntdListView = /** @class */ (function (_super) {
    __extends(AntdListView, _super);
    function AntdListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.generateRowIdentifier = function (props) {
            var data = props.data;
            var result = [];
            for (var i = 0; i < data.size; i++) {
                result.push(i);
            }
            return result;
        };
        _this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: function (row1, row2) { return row1 !== row2; },
                getRowData: function (dataBlob, sectionIndex, rowIndex) {
                    return dataBlob[sectionIndex].get(rowIndex);
                },
            }),
            loadingMore: false,
        };
        _this.onClick = function (rowIndex) {
            if (_this.props.onClick) {
                _this.props.onClick(rowIndex);
            }
        };
        _this.generateTertiaryElement = function () {
            var el = [];
            if (_this.props.tertiaryKey) {
                _this.props.tertiaryKey.forEach(function (item) {
                    var itemtype = typeof item;
                    if (itemtype === 'string') {
                        el.push(React.createElement(ListText, { yigoid: item, style: [styles.secondaryText] }));
                    }
                    else {
                        var tmp = _this.context.createElement(item);
                        if (tmp.$$typeof) {
                            el.push(tmp);
                        }
                        else {
                            el.push(React.createElement(ListText, __assign({}, tmp)));
                        }
                    }
                });
                return React.createElement(View, { style: { flexDirection: 'row' } }, el);
            }
            return null;
        };
        _this.generatePrimaryELement = function () {
            var primaryKey = _this.props.primaryKey;
            var el;
            if (!primaryKey) {
                return null;
            }
            var itemtype = typeof (primaryKey);
            if (itemtype === 'string') {
                el = React.createElement(ListText, { style: [styles.primaryText], yigoid: primaryKey });
            }
            else {
                if (primaryKey.$$typeof) {
                    el = primaryKey;
                }
                else {
                    var tmp = _this.context.createElement(primaryKey);
                    if (tmp.$$typeof) {
                        el = tmp;
                    }
                    else {
                        el = React.createElement(ListText, __assign({ style: [styles.primaryText] }, primaryKey));
                    }
                }
            }
            return React.createElement(View, { style: [{ flexDirection: 'row' }, _this.props.style.firstline] }, el);
        };
        _this.generateSecondaryElement = function () {
            var el = [];
            if (_this.props.secondKey) {
                _this.props.secondKey.forEach(function (item) {
                    var itemtype = typeof item;
                    if (itemtype === 'string') {
                        el.push(React.createElement(ListText, { style: [styles.secondaryText], key: item, yigoid: item }));
                    }
                    else {
                        if (item.$$typeof) {
                            el.push(item);
                        }
                        else {
                            el.push(React.createElement(ListText, __assign({ style: [styles.secondaryText] }, item)));
                        }
                    }
                });
                return React.createElement(View, { style: { flexDirection: 'row' } }, el);
            }
            return null;
        };
        _this.generateActions = function () { return (React.createElement(View, { style: [styles.flexrow_r, _this.props.actionContainerStyle] }, _this.props.actions.map(function (action) {
            var itemType = typeof (action);
            if (itemType === 'string') {
                return React.createElement(DynamicControl, { yigoid: action });
            }
            if (itemType.$$typeof) {
                return action;
            }
            return React.createElement(DynamicControl, __assign({}, action));
        }))); };
        _this.centerComp = (React.createElement(View, { style: [{ flex: 1, overflow: 'hidden' }, _this.props.style.centerStyle] },
            _this.generatePrimaryELement(),
            _this.generateSecondaryElement(),
            _this.generateTertiaryElement()));
        _this.NewListItem = listRowWrap(ListViewItem, _this.props.yigoid);
        // RowView = listRowWrap(View, this.props.yigoid)
        _this.renderItem = function (item, secionId, rowId, highlightRow) {
            if (_this.props.RowElement) {
                var rowElement = _this.context.createElement(_this.props.RowElement);
                return React.cloneElement(rowElement, {
                    rowIndex: rowId,
                    onPress: function () { return _this.onClick(rowId); }
                });
            }
            var NewListItem = _this.NewListItem;
            var showArrow = _this.props.showArrow;
            return (React.createElement(NewListItem, { centerElement: _this.centerComp, rightElement: _this.context.createElement(_this.props.rightElement), containerStyle: [styles.rowStyle, _this.props.rowStyle], onPress: function () { return _this.onClick(rowId); }, 
                // divider={this.props.divider}
                rowIndex: rowId, showArrow: showArrow, leftElement: _this.props.leftElement }));
        };
        _this.onRefresh = function () {
            _this.props.onRefresh && _this.props.onRefresh();
        };
        _this.onEndReached = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.hasMore) return [3 /*break*/, 2];
                        if (this.state.loadingMore) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            loadingMore: true,
                        });
                        return [4 /*yield*/, this.props.loadMore()];
                    case 1:
                        _a.sent();
                        this.setState({
                            loadingMore: false,
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.renderFoot = function () {
            if (!_this.props.onRefresh) {
                return null;
            }
            return !_this.props.hasMore ?
                (React.createElement(View, { style: styles.foot },
                    React.createElement(Text, null, "\u6CA1\u6709\u66F4\u591A\u6570\u636E"))) : (_this.state.loadingMore ? (React.createElement(View, { style: styles.foot },
                React.createElement(ActivityIndicator, null))) : null);
        };
        return _this;
    }
    AntdListView.prototype.componentWillReceiveProps = function (nextProps) {
        var data = nextProps.data;
        if (data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.data, this.generateRowIdentifier(nextProps)),
            });
        }
    };
    AntdListView.prototype.componentWillMount = function () {
        if (this.props.data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.data, this.generateRowIdentifier(this.props)),
            });
        }
    };
    AntdListView.prototype.render = function () {
        var _a = this.props, controlState = _a.controlState, layoutStyles = _a.layoutStyles, style = _a.style, useBodyScroll = _a.useBodyScroll;
        if (controlState && controlState.get('isVirtual')) {
            return (React.createElement(View, { style: [styles.center, style] },
                React.createElement(ActivityIndicator, { size: "large", color: "cadetblue" })));
        }
        return (React.createElement(ListView, { style: style, dataSource: this.state.dataSource, useBodyScroll: useBodyScroll, renderRow: this.renderItem, pageSize: 4, onEndReached: this.onEndReached, contentContainerStyle: {
                backgroundColor: 'lightgray',
                width: '100%',
            }, renderFooter: this.renderFoot, 
            // pullToRefresh
            pullToRefresh: this.props.onRefresh ? React.createElement(PullToRefresh, { refreshing: false, onRefresh: this.onRefresh }) : null }));
    };
    AntdListView.propTypes = {
        yigoid: PropTypes.string,
        primaryKey: PropTypes.string,
        divider: PropTypes.bool,
    };
    AntdListView.contextTypes = {
        createElement: PropTypes.func,
    };
    // static contextTypes = {
    //     uiTheme: PropTypes.object.isRequired,
    // };
    AntdListView.defaultProps = {
        // ...ImmutableVirtulized.defaultProps,
        style: {},
        divider: true,
        useBodyScroll: false,
        showArrow: true,
    };
    return AntdListView;
}(PureComponent));
// AntdListView.propTypes = propTypes.List;
var styles = StyleSheet.create({
    rowStyle: {
        padding: 12,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1,
    },
    head: {
        flexDirection: 'row',
        paddingLeft: 12,
    },
    headTitle: {
        paddingTop: 8,
        paddingBottom: 8,
        flex: 1,
        opacity: '80%',
    },
    list: {
        flex: 1,
    },
    primaryText: {
        paddingTop: 8,
        paddingLeft: 4,
        fontSize: 12,
        whiteSpace: 'nowrap',
    },
    secondaryText: {
        paddingTop: 4,
        paddingLeft: 6,
        paddingBottom: 4,
        opacity: '60%',
        fontSize: 12,
    },
    tertiaryContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        lineHeight: 12,
        paddingBottom: 6,
    },
    tertiaryText: {
        fontSize: 10,
        color: 'rgba(0,0,0,0.5)',
    },
    foot: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});
// export const GridView = GridWrap(AntdListView);
export default ListWrap(AntdListView);
