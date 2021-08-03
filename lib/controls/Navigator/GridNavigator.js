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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { PureComponent, useEffect, useRef, memo } from 'react';
import { View, StyleSheet, Text, ScrollView, Animated, TouchableHighlight, PanResponder, LayoutAnimation, TouchableOpacity, Dimensions, } from 'react-native';
import IconFont from '../../font';
import { Modal, WhiteSpace } from 'antd-mobile';
import Header from '../Container/Header';
// import util from '../util';
// import { showModal } from 'yes-framework/SiblingMgr';
import { openForm, openModal } from '../../util/navigateUtil';
import PropTypes from 'prop-types';
import { Svr } from 'yes-core';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import { History } from 'yes-web';
import { Util, BackHandler } from 'yes-intf';
import getHistory from 'yes-intf/dist/history';
import Global from 'global';
// import Animated, { withSpring, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
var styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F7F7F7',
    },
    headImg: {
        height: 200,
    },
    entry: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 34,
    },
    entryText: {},
    entryList: {
        flexDirection: 'row',
        backgroundColor: 'white',
        flexWrap: 'wrap',
    },
    entryStyle: {
        justifyContent: 'center',
        height: 80,
    },
    container: {},
    favoriteLine: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 2,
        paddingBottom: 2,
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
    },
    favoriteList: {
        flexDirection: 'row',
        flex: 1,
        paddingLet: 8,
    },
    favoriteLineTextLeft: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
    },
    favoriteLineTextRight: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16,
        paddingLeft: 8,
    },
    smallIcon: {
        paddingLeft: 4,
    },
    button: {
        color: '#00bfff',
    },
    favoritePanel: {
    // paddingTop: 12,
    },
    categoryPanel: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    categoryPanelTitle: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 12,
        paddingLeft: 12,
        backgroundColor: '#fff',
    },
    removeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: 'cornflowerblue',
    },
    todolistview: {
        backgroundColor: 'white',
    },
    todolistviewheader: {
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 12,
    },
    todolistviewtitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    todolistviewcontent: {
        flexDirection: 'row',
        height: 40,
    },
    todolistviewitem: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 12,
    },
    todolistviewitemcontent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    todolistviewicon: {
        color: '#2598F3',
        fontSize: 20,
        paddingRight: 6,
    },
    todolistviewitembadge: {
        color: '#E02020',
        fontSize: 21,
    },
    todolistviewitemtext: {
        paddingRight: 6,
        color: '#666666',
    },
});
var openUrl = function (service) { return __awaiter(void 0, void 0, void 0, function () {
    var data, dt, result, ref;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    service: "InvokeUnsafeService",
                    extSvrName: service,
                    cmd: "InvokeExtService",
                };
                return [4 /*yield*/, Svr.Request.getData(data)];
            case 1:
                dt = _a.sent();
                result = JSON.parse(dt);
                if (!result.result) {
                    alert(result.msg);
                    return [2 /*return*/];
                }
                if (Global.cordova) {
                    if (Global.cordova.platformId != "android") {
                        StatusBar.hide();
                    }
                }
                ref = open(result.data, '_blank', 'location=no,footer=yes,closebuttoncaption=返回,hidenavigationbuttons=yes,lefttoright=yes');
                ref.addEventListener('exit', function () {
                    if (cordova) {
                        if (cordova.platformId != "android") {
                            StatusBar.show();
                        }
                    }
                });
                ref.addEventListener('message', function (params) {
                    if (params.data.msgType === 'close') {
                        ref.close();
                        ref = null;
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
var Entry = /** @class */ (function (_super) {
    __extends(Entry, _super);
    function Entry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPress = function () {
            _this.props.onPress && _this.props.onPress(_this.props.entry);
        };
        _this.onRemove = function () {
        };
        return _this;
    }
    Entry.prototype.render = function () {
        var _a = this.props, icon = _a.icon, text = _a.text, entry = _a.entry, containerStyle = _a.containerStyle, removable = _a.removable, iconStyle = _a.iconStyle, textStyle = _a.textStyle, iconSize = _a.iconSize, editing = _a.editing, selected = _a.selected;
        return (React.createElement(TouchableOpacity, { style: containerStyle, onPress: this.onPress },
            React.createElement(View, { style: [styles.entry] },
                (editing && selected) ? React.createElement(TouchableHighlight, { style: styles.removeButton },
                    React.createElement(AwesomeFontIcon, { name: "check", color: "white" })) : null,
                removable ? React.createElement(TouchableHighlight, { style: styles.removeButton, onPress: this.onRemove },
                    React.createElement(AwesomeFontIcon, { name: "times", color: "white" })) : null,
                React.createElement(IconFont, { name: icon, size: iconSize, style: [iconStyle], color: entry.color || "#008CD7" }),
                React.createElement(Text, { style: [styles.entryText, textStyle] }, text))));
    };
    Entry.defaultProps = {
        removable: false,
        editing: false,
    };
    return Entry;
}(PureComponent));
var DragableEntry = memo(function (props) {
    var getPosition = function () {
        var column = props.column, position = props.position, width = props.width, height = props.height;
        return {
            x: (position % column) * width,
            y: Math.floor(position / column) * height,
        };
    };
    var onRemove = function () {
        props.onRemove && props.onRemove(props.entry);
    };
    var icon = props.icon, text = props.text, entry = props.entry, containerStyle = props.containerStyle, removable = props.removable, translate = props.translate, iconStyle = props.iconStyle, textStyle = props.textStyle, iconSize = props.iconSize, position = props.position, width = props.width, height = props.height, column = props.column;
    // const translateXY = useSharedValue({
    //     x: 0,
    //     y: 0,
    // });
    var translateXY = useRef(new Animated.ValueXY()).current;
    var posStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
    };
    useEffect(function () {
        if (props.translate) {
            translateXY.setValue(props.translate);
            return;
        }
        var calcPos = getPosition();
        Animated.spring(translateXY, {
            toValue: calcPos,
            duration: 500,
        }).start();
    }, [translate, position, width, height, column]);
    // const animatedStyle = useAnimatedStyle(() => {
    //     console.log(translateXY.value);
    //     return {
    //         transform: [
    //             {
    //                 translateX: translateXY.value.x,
    //             },
    //             {
    //                 translateY: translateXY.value.y,
    //             }
    //         ]
    //     };
    // });
    return (React.createElement(Animated.View, { style: [styles.entry, containerStyle, posStyle, {
                transform: translateXY.getTranslateTransform(),
            }] },
        removable ? React.createElement(TouchableHighlight, { style: styles.removeButton, onPress: onRemove },
            React.createElement(AwesomeFontIcon, { name: "times", color: "white" })) : null,
        React.createElement(IconFont, { name: icon, size: iconSize, style: [iconStyle], color: entry.color || "#008CD7" }),
        React.createElement(Text, { style: [styles.entryText, textStyle] }, text)));
});
var FavoriteLine = /** @class */ (function (_super) {
    __extends(FavoriteLine, _super);
    function FavoriteLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            editing: false,
        };
        _this.onPress = function () {
            _this.setState({
                editing: !_this.state.editing,
            }, function () {
                _this.props.changeEditStatus(_this.state.editing);
            });
        };
        _this.onRemove = function (entry) {
            _this.props.changeSelected(entry, false);
        };
        return _this;
    }
    FavoriteLine.prototype.render = function () {
        var _a = this.props, list = _a.list, column = _a.column;
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.favoriteLine },
                React.createElement(Text, { style: styles.favoriteLineTextLeft }, "\u5E38\u7528\u529F\u80FD"),
                React.createElement(ScrollView, { style: [{ flex: 1, flexDirection: 'row' }], horizontal: true }, list.map(function (item) {
                    return (item.category != "system") ? React.createElement(IconFont, { color: item.color, style: styles.smallIcon, name: item.icon, size: 30 }) : null;
                })),
                React.createElement(TouchableHighlight, { style: styles.favoriteLineTextRight, onPress: this.onPress },
                    React.createElement(Text, { style: styles.button }, this.state.editing ? '保存' : '编辑'))),
            this.state.editing ?
                React.createElement(DragableEntryList, { onRemove: this.onRemove, selectedList: list, editing: this.state.editing, iconSize: 34, column: column, iconStyle: styles.icon, entryStyle: styles.entryStyle, changeLocation: this.props.changeLocation }) : null));
    };
    return FavoriteLine;
}(PureComponent));
var DragableEntryList = /** @class */ (function (_super) {
    __extends(DragableEntryList, _super);
    function DragableEntryList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dragging: false,
            dragX: 0,
            dragY: 0,
            dragEntry: null,
        };
        _this.onRemove = function (entry) {
            _this.props.onRemove(entry);
        };
        _this.calcIndex = function (nativeEvent) {
            var column = _this.props.column;
            var width = Dimensions.get('window').width;
            var height = width / column;
            var pageX = nativeEvent.pageX, locationY = nativeEvent.locationY;
            var leftIndex = Math.floor((pageX * column) / width); // 根据坐标Y获取当前所在的行
            var topIndex = Math.floor((locationY) / height); // 根据坐标X获取当前所在的列    
            console.log("x=" + leftIndex + ";y=" + topIndex);
            var index = topIndex * column + leftIndex;
            return index;
        };
        _this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: function () { return true; },
            onPanResponderGrant: function (evt, gestureState) {
                var column = _this.props.column;
                var index = _this.calcIndex(evt.nativeEvent);
                var top = Math.floor(index / _this.props.column);
                var left = index % _this.props.column;
                if (_this.props.selectedList.length <= index) {
                    return;
                }
                var dragItem = _this.props.selectedList[index];
                var width = Dimensions.get('window').width;
                var height = width / column;
                _this.setState({
                    dragging: true,
                    dragIndex: index,
                    dragEntry: dragItem,
                    dragX: left * width / column,
                    dragY: top * height,
                    dragXOrigin: left * width / column,
                    dragYOrigin: top * height,
                });
            },
            onPanResponderMove: function (evt, gestureState) {
                if (!_this.state.dragging) {
                    return;
                }
                var index = _this.calcIndex(evt.nativeEvent);
                if (index !== _this.state.dragIndex) { //需要交换两个Entry
                    if (!(index < 0 || index >= _this.props.selectedList.length)) {
                        _this.props.changeLocation(index, _this.state.dragIndex);
                    }
                }
                _this.setState({
                    dragX: _this.state.dragXOrigin + gestureState.dx,
                    dragY: _this.state.dragYOrigin + gestureState.dy,
                });
            },
            onPanResponderRelease: function () {
                _this.setState({
                    dragging: false,
                });
            }
        });
        _this.calcDragStyle = function () {
            return {
                position: 'absolute',
                top: _this.state.dragY,
                left: _this.state.dragX,
                transform: [{ scale: 1.1 }],
                borderWidth: 1,
                borderStyle: 'dotted',
                backgroundColor: 'aliceblue',
            };
        };
        return _this;
    }
    DragableEntryList.prototype.UNSAFE_componentWillUpdate = function (props) {
        var _this = this;
        if (this.state.dragging && this.state.dragEntry) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            var dragIndex = props.selectedList.findIndex(function (item) { return item.key === _this.state.dragEntry.key; });
            this.setState({
                dragIndex: dragIndex
            });
        }
        // LayoutAnimation.spring();
    };
    DragableEntryList.prototype.render = function () {
        var _this = this;
        var _a = this.props, entryStyle = _a.entryStyle, iconSize = _a.iconSize, iconStyle = _a.iconStyle, selectedList = _a.selectedList, column = _a.column;
        var width = Dimensions.get('window').width;
        var WIDTH = width / column;
        var HEIGHT = WIDTH;
        var dragEntry = this.state.dragEntry;
        var dragStyle = this.calcDragStyle();
        return (React.createElement(View, __assign({ style: [styles.entryList, {
                    height: HEIGHT * Math.ceil(selectedList.length / this.props.column),
                }] }, this.panResponder.panHandlers),
            selectedList.map(function (item, index) {
                return React.createElement(DragableEntry
                // panHandler={this.panResponder.panHandlers}
                , { 
                    // panHandler={this.panResponder.panHandlers}
                    key: item.key, position: index, icon: item.icon, text: item.text, iconSize: iconSize, iconStyle: iconStyle, width: WIDTH, height: HEIGHT, column: column, removable: true, entry: item, onRemove: _this.onRemove, containerStyle: [entryStyle] });
            }),
            (this.state.dragging && dragEntry) ? React.createElement(DragableEntry, { key: "drag_" + this.state.dragEntry.key, icon: dragEntry.icon, text: dragEntry.text, iconSize: iconSize, width: WIDTH, height: HEIGHT, iconStyle: iconStyle, removable: false, entry: dragEntry, translate: {
                    x: this.state.dragX,
                    y: this.state.dragY,
                }, containerStyle: [entryStyle, dragStyle] }) : null));
    };
    DragableEntryList.defaultProps = {
        column: 4,
        iconSize: 50,
    };
    DragableEntryList.contextTypes = {
        getTopPadding: PropTypes.func,
    };
    return DragableEntryList;
}(PureComponent));
;
var FavoriteCategoryPanel = /** @class */ (function (_super) {
    __extends(FavoriteCategoryPanel, _super);
    function FavoriteCategoryPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onEntryPress = function (entry) {
            if (_this.props.editing) {
                _this.props.changeSelected(entry, !_this.isEntrySelected(entry));
            }
        };
        _this.isEntrySelected = function (entry) {
            return _this.props.selectedList.some(function (item) { return entry.key === item.key; });
        };
        return _this;
    }
    FavoriteCategoryPanel.prototype.render = function () {
        var _this = this;
        var _a = this.props, title = _a.title, items = _a.items, entryStyle = _a.entryStyle, iconSize = _a.iconSize, column = _a.column;
        var entryWidth = {
            width: 100 / column + "%",
        };
        return (React.createElement(View, { style: styles.categoryPanel },
            React.createElement(View, { style: styles.categoryPanelTitle },
                React.createElement(Text, null, title)),
            React.createElement(View, { style: styles.entryList }, items.map(function (item) {
                return React.createElement(Entry, { editing: _this.props.editing, selected: _this.isEntrySelected(item), key: item.key, icon: item.icon, text: item.text, iconSize: iconSize, entry: item, onPress: function () { return _this.onEntryPress(item); }, containerStyle: [entryWidth, entryStyle] });
            }))));
    };
    FavoriteCategoryPanel.defaultProps = {
        column: 4,
        iconSize: 50,
    };
    return FavoriteCategoryPanel;
}(PureComponent));
var FavoritePanel = /** @class */ (function (_super) {
    __extends(FavoritePanel, _super);
    function FavoritePanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.groupData = function (list) {
            var data = list.reduce(function (total, item) {
                if (!total[item.category]) {
                    total[item.category] = [];
                }
                total[item.category].push(item);
                return total;
            }, {});
            return data;
        };
        _this.state = {
            data: _this.groupData(_this.props.list),
        };
        return _this;
    }
    FavoritePanel.prototype.componentWillReceiveProps = function (props) {
        this.setState({
            data: this.groupData(props.list),
        });
    };
    FavoritePanel.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(WhiteSpace, { size: "md" }),
            React.createElement(ScrollView, { style: styles.favoritePanel }, Object.keys(this.state.data).map(function (category) {
                if (category === 'system') {
                    return null;
                }
                return (React.createElement(FavoriteCategoryPanel, { editing: _this.props.editing, title: category, changeSelected: _this.props.changeSelected, selectedList: _this.props.selectedList, items: _this.state.data[category], entryStyle: styles.entryStyle }));
            }))));
    };
    return FavoritePanel;
}(PureComponent));
var EntryListManager = /** @class */ (function (_super) {
    __extends(EntryListManager, _super);
    function EntryListManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            editing: false,
            selectedList: _this.props.selectedList,
        };
        _this.changeEditStatus = function (edit) {
            _this.setState({
                editing: edit,
            });
        };
        _this.changeLocation = function (indexA, indexB) {
            var list = _this.state.selectedList;
            var tmp = list[indexA];
            list[indexA] = list[indexB];
            list[indexB] = tmp;
            _this.setState({
                selectedList: __spreadArray([], list),
            });
            _this.props.onChange(_this.state.selectedList);
        };
        _this.changeSelected = function (item, selected) {
            if (selected) {
                if (!_this.state.selectedList.some(function (itm) { return itm.key === item.key; })) {
                    _this.setState({
                        selectedList: __spreadArray(__spreadArray([], _this.state.selectedList), [item]),
                    }, function () {
                        _this.props.onChange(_this.state.selectedList);
                    });
                }
            }
            else {
                var index = _this.state.selectedList.findIndex(function (itm) { return itm.key === item.key; });
                if (index >= 0) {
                    _this.state.selectedList.splice(index, 1);
                    _this.setState({
                        selectedList: __spreadArray([], _this.state.selectedList),
                    }, function () {
                        _this.props.onChange(_this.state.selectedList);
                    });
                }
            }
        };
        return _this;
    }
    EntryListManager.prototype.render = function () {
        return (React.createElement(View, { style: { flex: 1, backgroundColor: '#e9e9e9' } },
            React.createElement(Header, { headerStyle: { backgroundColor: 'white' }, title: "\u5168\u90E8\u5E94\u7528", canBack: true, backHandler: this.props.onClose }),
            React.createElement(FavoriteLine, { changeEditStatus: this.changeEditStatus, list: this.state.selectedList, editing: this.state.editing, column: this.props.column, changeSelected: this.changeSelected, changeLocation: this.changeLocation }),
            React.createElement(FavoritePanel, { list: this.props.list, selectedList: this.state.selectedList, changeSelected: this.changeSelected, editing: this.state.editing })));
    };
    return EntryListManager;
}(PureComponent));
var EntryList = /** @class */ (function (_super) {
    __extends(EntryList, _super);
    function EntryList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getSelectedList = function () {
            var _a = _this.props, allList = _a.allList, selectedList = _a.selectedList;
            return allList.filter(function (item) { return selectedList.includes(item.key); });
        };
        _this.state = {
            editing: false,
            selectedList: _this.getSelectedList(),
        };
        _this.closeManager = function () {
            _this.setState({
                editing: false,
            });
            _this.backHandler && _this.backHandler();
            delete _this.backHandler;
        };
        _this.onChange = function (list) {
            _this.setState({
                selectedList: list,
            });
            var saveList = list.map(function (item) { return item.key; });
            _this.props.onChange && _this.props.onChange(saveList);
        };
        _this.moreEntry = {
            key: 'more',
            icon: 'icon-more',
            text: '更多',
            category: 'system',
            favorite: true,
            color: '#FD9B00'
        };
        _this.onEntryPress = function (entry) {
            if (entry.key === 'more') { //用户点击更多
                _this.setState({
                    editing: true,
                });
                if (getHistory()) {
                    getHistory().push('#GridNavigator_popup');
                }
                _this.backHandler = BackHandler.addPreEventListener(function () {
                    _this.closeManager();
                });
                return;
            }
            if (entry.type === 'thirdpart') {
                Util.safeExec(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, openUrl(entry.service)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return;
            }
            if (entry.formKey) {
                if (entry.modal) {
                    openModal(entry.formKey, entry.oid, 'EDIT');
                }
                else {
                    openForm(entry.formKey, entry.oid, 'EDIT');
                }
            }
            if (entry.path) {
                History.push(entry.path);
            }
        };
        return _this;
    }
    EntryList.prototype.componentWillMount = function () {
        this.backHandler && this.backHandler();
    };
    EntryList.prototype.render = function () {
        var _this = this;
        var _a = this.props, entryStyle = _a.entryStyle, iconSize = _a.iconSize, iconStyle = _a.iconStyle, column = _a.column, _b = _a.editable, editable = _b === void 0 ? false : _b;
        var entryWidth = {
            width: 100 / column + "%",
        };
        return (React.createElement(View, { style: styles.entryList },
            this.state.selectedList.map(function (item) {
                return React.createElement(Entry, { key: item.key, icon: item.icon, text: item.text, iconSize: iconSize, iconStyle: iconStyle, entry: item, onPress: _this.onEntryPress, containerStyle: [entryWidth, entryStyle] });
            }),
            editable ? React.createElement(Entry, { key: this.moreEntry.key, icon: this.moreEntry.icon, text: this.moreEntry.text, iconSize: iconSize, iconStyle: iconStyle, entry: this.moreEntry, onPress: this.onEntryPress, containerStyle: [entryWidth, entryStyle] }) : null,
            this.state.editing ? React.createElement(Modal, { maskStyle: { zIndex: 899 }, wrapClassName: "fullscreen", visible: true, transparent: false },
                React.createElement(EntryListManager, { selectedList: this.state.selectedList, onClose: this.closeManager, list: this.props.allList, onChange: this.onChange, column: column })) : null));
    };
    EntryList.defaultProps = {
        column: 4,
        iconSize: 50,
    };
    EntryList.contextTypes = {
        getTopPadding: PropTypes.func,
    };
    return EntryList;
}(PureComponent));
export default EntryList;
;
