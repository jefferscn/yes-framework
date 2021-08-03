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
import React, { PureComponent } from 'react';
import { GridWrap, GridRowWrap as gridRowWrap, MetaBillFormWrap } from 'yes-intf';
import { SectionList, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import ListViewItem from '../../Container/ListViewItem';
import { ListComponents, withDetail } from 'yes-comp-react-native-web';
var ListText = ListComponents.ListText;
var defaultMapFunction = {
    date: function (v) {
        return v.toLocaleDateString();
    }
};
var DefaultSectionComponent = /** @class */ (function (_super) {
    __extends(DefaultSectionComponent, _super);
    function DefaultSectionComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultSectionComponent.prototype.render = function () {
        var section = this.props.section;
        return React.createElement(Text, { style: styles.sectionHeader }, section.sectionValue);
    };
    return DefaultSectionComponent;
}(PureComponent));
var SectionListGrid = /** @class */ (function (_super) {
    __extends(SectionListGrid, _super);
    function SectionListGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
            return React.createElement(View, { style: [{ flexDirection: 'row', overflow: 'hidden' }, _this.props.style.firstline] }, el);
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
                        var tmp = _this.context.createElement(item);
                        if (tmp.$$typeof) {
                            el.push(tmp);
                        }
                        else {
                            el.push(React.createElement(ListText, __assign({ style: [styles.secondaryText] }, tmp)));
                        }
                    }
                });
                return React.createElement(View, { style: { flexDirection: 'row' } }, el);
            }
            return null;
        };
        _this.centerComp = !_this.props.centerElement ? (React.createElement(View, { style: [{ flex: 1 }, _this.props.style.centerStyle] },
            _this.generatePrimaryELement(),
            _this.generateSecondaryElement(),
            _this.generateTertiaryElement())) : _this.context.createElement(_this.props.centerElement);
        _this.NewListItem = gridRowWrap(ListViewItem, ActivityIndicator, _this.props.yigoid);
        _this.state = {
            sectionColumn: _this.props.sectionColumn,
            sections: [],
            data: null,
            loadingMore: false,
        };
        _this.onClick = function (rowIndex) {
            if (_this.props.onClick) {
                _this.props.onClick(rowIndex);
            }
        };
        _this.renderItem = function (_a) {
            var item = _a.item;
            var rowIndex = item.rowIndex;
            var NewListItem = _this.NewListItem;
            return (React.createElement(NewListItem, { centerElement: _this.centerComp, rightElement: _this.context.createElement(_this.props.rightElement), containerView: _this.context.createElement(_this.props.rowContainer), containerStyle: [styles.rowStyle, _this.props.rowStyle], onPress: function () { return _this.onClick(rowIndex); }, divider: _this.props.divider, dividerStyle: _this.props.dividerStyle, rowIndex: rowIndex, showArrow: _this.props.showArrow, leftElement: _this.context.createElement(_this.props.leftElement), detailElement: _this.context.createElement(_this.props.detailElement) }));
        };
        _this.renderSectionHeader = function (_a) {
            var section = _a.section;
            if (_this.props.SectionHeader) {
                return _this.context.createElement(_this.props.SectionHeader, {
                    section: section,
                });
            }
            return React.createElement(DefaultSectionComponent, { section: section });
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
        _this.renderListFooter = function () {
            if (!_this.props.onRefresh) {
                return null;
            }
            return !_this.props.hasMore ?
                (React.createElement(View, { style: styles.foot },
                    React.createElement(Text, null, "\u6CA1\u6709\u66F4\u591A\u6570\u636E"))) : (_this.state.loadingMore ? (React.createElement(View, { style: styles.foot },
                React.createElement(ActivityIndicator, null))) : null);
        };
        /**
         * 提前计算当前所有数据项目的位置，用于在多数据的时候完成部分渲染
         * @param {sections值} data
         * @param {包含头的位置} index
         */
        _this.getItemLayout = function (data, index) {
            // console.log(data);
            // console.log(index);
            return {
                index: index,
            };
        };
        return _this;
    }
    SectionListGrid.getDerivedStateFromProps = function (nextProps, prevState) {
        var data = nextProps.controlState.getIn(['dataModel', 'data']);
        if (data !== prevState.data) {
            var sections = [];
            var columns = nextProps.controlState.getIn(['dataModel', 'colModel', 'columns']);
            if (!columns) {
                return null;
            }
            var sectionColumnIndex = columns.findIndex(function (item) { return item.get('key') === prevState.sectionColumn; });
            var sectionKey = null;
            var section = {};
            for (var i = 0; i < data.size; i++) {
                var sectionValue = null;
                if (nextProps.storybook) {
                    sectionValue = data.getIn([i, prevState.sectionColumn]);
                }
                else {
                    sectionValue = data.getIn([i, 'data', sectionColumnIndex, 0]);
                }
                if (nextProps.mapFun) {
                    var mapFunc = defaultMapFunction[nextProps.mapFun] || nextProps.mapFun;
                    sectionValue = mapFunc(sectionValue);
                }
                if (sectionKey != sectionValue) {
                    section = {
                        data: [],
                        rowIndex: i,
                        sectionValue: sectionValue,
                    };
                    sections.push(section);
                    sectionKey = sectionValue;
                }
                section.data.push({
                    data: data.getIn([i, 'data']),
                    rowIndex: i,
                });
            }
            return {
                sections: sections,
                data: data,
            };
        }
        return null;
    };
    SectionListGrid.prototype.render = function () {
        return React.createElement(SectionList, { renderItem: this.renderItem, renderSectionHeader: this.renderSectionHeader, sections: this.state.sections, stickySectionHeadersEnabled: true, getItemLayout: this.getItemLayout, onEndReached: this.onEndReached, ListFooterComponent: this.renderListFooter });
    };
    SectionListGrid.contextTypes = {
        createElement: PropTypes.func,
        getOwner: PropTypes.func,
    };
    SectionListGrid.defaultProps = {
        style: {},
        showArrow: true,
        divider: true,
        useBodyScroll: false,
        hideAction: false,
        removeable: true,
        removeType: 'normal',
        storybook: false, //专门用于storybook
    };
    SectionListGrid = __decorate([
        MetaBillFormWrap,
        GridWrap,
        withDetail
    ], SectionListGrid);
    return SectionListGrid;
}(PureComponent));
export default SectionListGrid;
var styles = StyleSheet.create({
    sectionHeader: {
        padding: 10,
        backgroundColor: 'aliceblue',
    },
    rowStyle: {
        padding: 12,
    },
    center: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1,
        flexBasis: 'auto',
        // overflow: 'hidden',
    },
    head: {
        flexDirection: 'row',
        paddingLeft: 12,
        height: 35,
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
        // paddingTop: 8,
        // paddingLeft: 4,
        fontSize: 14,
        fontWeight: 'bold',
    },
    secondaryText: {
        // paddingTop: 4,
        paddingLeft: 2,
        // paddingBottom: 4,
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
    },
    extraStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
