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
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AppDispatcher, DynamicControl } from 'yes';
import { internationalWrap } from 'yes-intf';
import PropTypes from 'prop-types';
import './ListWithQuery';
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
    }
});
var ListTemplate = /** @class */ (function (_super) {
    __extends(ListTemplate, _super);
    function ListTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            refreshing: false,
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
        return _this;
    }
    ListTemplate.prototype.render = function () {
        return this.buildChildren();
    };
    ListTemplate.prototype.componentDidMount = function () {
        var _this = this;
        var events = this.props.events;
        if (events) {
            this.dispatcherId = AppDispatcher.register(function (action) {
                var event = events[action.type];
                if (event) {
                    if (event.type === 'button') {
                        setTimeout(function () {
                            _this.context.onControlClick(event.yigoid);
                        }, 0);
                        return;
                    }
                    if (event.type === 'opt') {
                        setTimeout(function () {
                            _this.context.doOpt(event.yigoid);
                        }, 0);
                        return;
                    }
                }
            });
        }
    };
    ListTemplate.prototype.componentWillUnmount = function () {
        this.dispatcherId && AppDispatcher.unregister(this.dispatcherId);
    };
    ListTemplate.prototype.buildChildren = function () {
        var _a = this.props, searchBar = _a.searchBar, filterBlock = _a.filterBlock, list = _a.list, action = _a.action, formStatus = _a.formStatus, error = _a.error, errorMsg = _a.errorMsg, contentStyle = _a.contentStyle, busying = _a.busying;
        //reloading状态下不显示加载状态
        // if(formStatus!=='ok' || formStatus!=='reloading') {
        //     return (
        //     )
        // }
        var listEle = this.context.createElement(list, {
            onRefresh: this.onRefresh,
            refreshing: this.state.refreshing,
        });
        var foot = this.context.createElement(this.props.foot);
        var head = this.context.createElement(this.props.head);
        var actionButton = this.context.createElement(action);
        if (!React.isValidElement(listEle)) {
            listEle = React.createElement(DynamicControl, __assign({ designPositionBase: true, yigoid: list, debugStyle: { flex: 1 }, layoutStyles: { flex: 1 }, style: { flex: 1, marginLeft: 12 } }, this.context.getControlProps(list)));
            // listEle = this.context.createElement(list);
        }
        return (React.createElement(View, { style: { flex: 1, backgroundColor: 'white' } },
            this.context.createElement(head),
            filterBlock ? this.context.createElement(filterBlock, { formStatus: formStatus }) : null,
            React.createElement(View, { style: [{ flex: 1 }, contentStyle] },
                busying ? React.createElement(View, { style: styles.mask },
                    React.createElement(ActivityIndicator, null)) : null,
                listEle),
            foot,
            actionButton));
    };
    ListTemplate.contextTypes = {
        createElement: PropTypes.func,
        onControlClick: PropTypes.func,
        getControlProps: PropTypes.func,
        doOpt: PropTypes.func,
    };
    return ListTemplate;
}(PureComponent));
var ListWithNavigation = internationalWrap(ListTemplate);
ListWithNavigation.caption = "单据列表模板";
defaultTemplateMapping.reg('list', ListWithNavigation);
export default ListWithNavigation;
