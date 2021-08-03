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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useRef, PureComponent, useState } from 'react';
import { GridRowWrap as gridRowWrap, GridWrap } from 'yes';
import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListComponents } from 'yes-comp-react-native-web';
import ImmutableVirtulizedList from 'yes-comp-react-native-web/dist/components/List/ImmutableVirtulizedList';
import ListText from '../Text/ListText';
import PropTypes from 'prop-types';
import { RefreshControl } from 'react-native-web-refresh-control';
var ListImage = ListComponents.ListImage;
var RowView = gridRowWrap(View);
// interface Props {
//     //是否开启锁定
//     isLockTable?: boolean;
//     //标题数据
//     titleData: string[];
//     lockColumns: string[];
//     dataColumns: string[];
//     // //数据源
//     // tableData: object[];
//     data: object;
//     //单元格文字大小
//     textSize?: number;
//     //单元格文字颜色
//     textColor?: string;
//     //单元格最大宽度
//     cellMaxWidth?: number;
//     //单元格高度
//     cellHeight?: number;
//     //第一行背景色
//     firstRowBackGroundColor?: string;
//     //第一列背景色
//     firstColumnBackGroundColor?: string;
//     //表头字体颜色
//     tableHeadTextColor?: string;
// };
/**
 * 注释: 双向锁定表格
 * 时间: 2020/7/21 0021 14:06
 * @author 郭翰林
 * @param props
 * @constructor
 */
function LockTableView(props) {
    var border_width = Platform.OS === 'ios' ? StyleSheet.hairlineWidth : StyleSheet.hairlineWidth * 2;
    // let columnMaxWidth: number[] = [];
    var firstColumnData = [];
    //计算每列最大宽度、分割数据
    // let scale = props.textSize;
    // props.titleData.map((value, i) => {
    //     if (value.length * scale < props.cellMaxWidth) {
    //         columnMaxWidth[i] = value.length * scale;
    //     } else {
    //         columnMaxWidth[i] = props.cellMaxWidth;
    //     }
    // });
    // props.tableData.map((item, i) => {
    //     Object.values(item).map((value, j) => {
    //         if (j == 0 && props.isLockTable) {
    //             firstColumnData.push(value);
    //         }
    //         if (columnMaxWidth[j] < value.length * scale) {
    //             if (value.length * scale < props.cellMaxWidth) {
    //                 columnMaxWidth[j] = value.length * scale;
    //             } else {
    //                 columnMaxWidth[j] = props.cellMaxWidth;
    //             }
    //         }
    //     });
    //     if (props.isLockTable) {
    //         //删除对象第一个属性数据
    //         delete item[Object.keys(item)[0]];
    //     }
    // });
    function getCellWidth(key) {
        var width = props.cellWidth;
        if (props.cellWidths) {
            width = props.cellWidths[key] || width;
        }
        return width;
    }
    /**
     * 注释: 绘制每行数据
     * 时间: 2020/7/23 0023 9:14
     * @author 郭翰林
     */
    function renderRowCell(index) {
        var childrenViews = [];
        props.dataColumns.forEach(function (item) {
            childrenViews.push((item.type === 211 || item.tagName === 'image') ?
                React.createElement(ListImage, { yigoid: item.key, style: styles.image }) :
                React.createElement(ListText, { yigoid: item.key, style: {
                        fontSize: props.textSize,
                        color: props.textColor,
                        width: getCellWidth(item.key),
                        height: props.cellHeight,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        borderWidth: border_width,
                        borderColor: '#e7e7e7',
                        overflow: 'hidden',
                        backgroundColor: !props.isLockTable && i === 0 ? props.firstColumnBackGroundColor : 'transparent',
                    } }));
        });
        return React.createElement(RowView, { rowIndex: index, style: { flexDirection: 'row', overflow: 'hidden', alignItems: 'center' } }, childrenViews);
    }
    /**
     * 注释: 绘制第一行行数据
     * 时间: 2020/8/5 0005 17:33
     * @author 郭翰林
     * @param rowData
     * @returns {any}
     */
    function renderFirstRowCell(rowData) {
        var childrenViews = [];
        rowData.map(function (item, i) {
            childrenViews.push(React.createElement(Text, { style: {
                    fontSize: props.textSize,
                    color: props.tableHeadTextColor,
                    width: getCellWidth(item.key),
                    height: props.cellHeight,
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlignVertical: 'center',
                    borderWidth: border_width,
                    borderColor: '#e7e7e7',
                    backgroundColor: props.isLockTable ? 'transparent' : props.firstRowBackGroundColor,
                } }, item.caption));
        });
        return React.createElement(View, { style: { flexDirection: 'row', alignItems: 'center' } }, childrenViews);
    }
    /**
     * 注释: 绘制表格头
     * 时间: 2020/8/5 0005 17:36
     * @author 郭翰林
     * @returns {any}
     */
    function renderHeaderView() {
        return (React.createElement(View, { style: { flexDirection: 'row', backgroundColor: props.firstRowBackGroundColor } },
            React.createElement(View, { style: {
                    width: getCellWidth(props.lockColumns[0].key),
                    height: props.cellHeight,
                    borderWidth: border_width,
                    borderColor: '#e7e7e7',
                    justifyContent: 'center',
                    alignItems: 'center',
                } },
                React.createElement(Text, { style: {
                        fontSize: props.textSize,
                        color: props.tableHeadTextColor,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                    } }, props.lockColumns[0].caption)),
            React.createElement(ScrollView, { ref: headScrollView, style: { borderRightWidth: border_width, borderColor: '#e7e7e7' }, horizontal: true, removeClippedSubviews: true, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false, bounces: false, scrollEnabled: false, keyboardShouldPersistTaps: 'handled' }, renderFirstRowCell(props.dataColumns))));
    }
    /**
     * 注释: 绘制第一列锁定数据
     * 时间: 2020/8/5 0005 15:21
     * @author 郭翰林
     * @param rowData
     * @param index
     * @returns {any}
     */
    function renderFirstCell(index) {
        var lockColumn = props.lockColumns[0];
        return (React.createElement(RowView, { rowIndex: index, style: {
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderColor: '#e7e7e7',
                height: props.cellHeight,
                borderWidth: border_width,
            } }, (lockColumn.type === 211 || lockColumn.tagName === 'image') ?
            React.createElement(ListImage, { style: styles.image, yigoid: lockColumn.key }) : React.createElement(ListText, { yigoid: lockColumn.key, style: {
                fontSize: props.textSize,
                color: props.textColor,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                textAlignVertical: 'center',
            } })));
    }
    var lockList = useRef(null);
    var headScrollView = useRef(null);
    function onRefresh() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                props.onRefresh && props.onRefresh();
                return [2 /*return*/];
            });
        });
    }
    var _a = useState(false), loadingMore = _a[0], setLoadingMore = _a[1];
    function onEndReached() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('onEndReached');
                        if (!props.hasMore) return [3 /*break*/, 2];
                        if (loadingMore) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, props.loadMore()];
                    case 1:
                        _a.sent();
                        setLoadingMore(false);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    }
    /**
     * 注释: 绘制锁定表格
     * 时间: 2020/8/7 0007 20:29
     * @author 郭翰林
     */
    function renderLockTable() {
        return (React.createElement(View, { style: { flex: 1, backgroundColor: '#fff' } },
            renderHeaderView(),
            React.createElement(View, { style: { flex: 1, flexDirection: 'row' } },
                React.createElement(View, { style: {
                        width: getCellWidth(props.lockColumns[0].key)
                    } },
                    React.createElement(ImmutableVirtulizedList, { ref: lockList, contentContainerStyle: {
                            backgroundColor: props.firstColumnBackGroundColor,
                        }, scrollEnabled: false, data: props.data, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false, renderItem: function (_a) {
                            var index = _a.index;
                            return renderFirstCell(index);
                        } })),
                React.createElement(ScrollView, { style: { borderRightWidth: border_width, borderColor: '#e7e7e7' }, horizontal: true, bounces: false, scrollEventThrottle: 30, onScroll: function (event) {
                        headScrollView.current.scrollTo({ x: event.nativeEvent.contentOffset.x, animated: false });
                    }, keyboardShouldPersistTaps: 'handled' },
                    React.createElement(ImmutableVirtulizedList, { data: props.data, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false, refreshControl: React.createElement(RefreshControl, { refreshing: props.refreshing, onRefresh: onRefresh }), onScroll: function (event) {
                            lockList.current.scrollToOffset({
                                animated: false,
                                offset: event.nativeEvent.contentOffset.y,
                            });
                        }, onEndReached: onEndReached, renderItem: function (_a) {
                            var index = _a.index;
                            return renderRowCell(index);
                        } })))));
    }
    /**
     * 注释: 绘制不锁定表格
     * 时间: 2020/8/7 0007 20:54
     * @author 郭翰林
     * @returns {any}
     */
    function renderUnLockTable() {
        return (React.createElement(View, { style: { flex: 1, backgroundColor: '#fff' } },
            React.createElement(ScrollView, { style: { borderRightWidth: border_width, borderColor: '#e7e7e7' }, horizontal: true, bounces: false, keyboardShouldPersistTaps: 'handled' },
                React.createElement(FlatList, { data: props.tableData, showsHorizontalScrollIndicator: false, showsVerticalScrollIndicator: false, ListHeaderComponent: renderFirstRowCell(props.titleData), renderItem: function (rowData) {
                        return renderRowCell(rowData.item, rowData.index);
                    } }))));
    }
    return props.isLockTable ? renderLockTable() : renderUnLockTable();
}
LockTableView.defaultProps = {
    isLockTable: false,
    textSize: 15,
    textColor: '#666',
    tableHeadTextColor: '#666',
    cellMaxWidth: 150,
    cellHeight: 35,
    firstRowBackGroundColor: '#F0F9FF',
    firstColumnBackGroundColor: '#FFF9F7',
};
var styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
    }
});
/**
 * 一个纯粹用来显示用的表格，行列形式
 */
var PlainGrid = /** @class */ (function (_super) {
    __extends(PlainGrid, _super);
    function PlainGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlainGrid.prototype.render = function () {
        var _a = this.props, lockColumns = _a.lockColumns, dataColumns = _a.dataColumns, otherProps = __rest(_a, ["lockColumns", "dataColumns"]);
        var grid = this.context.getOwner();
        if (!grid) {
            return null;
        }
        var columns = grid.getVisibleColumns();
        columns = columns.filter(function (c) { return !c.isSelect && c.type !== 200; });
        var lockColumns_ = [columns[0]];
        if (lockColumns) {
            lockColumns_ = columns.filter(function (c) { return lockColumns.includes(c.key); });
        }
        var dataColumns_ = null;
        if (dataColumns) {
            dataColumns_ = columns.filter(function (c) { return dataColumns.includes(c.key); });
        }
        else {
            dataColumns_ = columns.filter(function (c) { return !lockColumns_.some(function (l) { return l.key === c.key; }); });
        }
        // const dataColumns_ = columns;
        return React.createElement(LockTableView, __assign({ isLockTable: true, onRefresh: this.props.onRefresh, refreshing: this.props.refreshing, lockColumns: lockColumns_, dataColumns: dataColumns_ }, otherProps));
    };
    PlainGrid.contextTypes = {
        getOwner: PropTypes.func,
    };
    PlainGrid.defaultProps = {
        cellWidth: 100,
    };
    PlainGrid = __decorate([
        GridWrap
    ], PlainGrid);
    return PlainGrid;
}(PureComponent));
export default PlainGrid;
