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
import React from 'react';
import { internationalWrap, getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
// import { TabView } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import TabView from './TabView';
import CellLayoutTemplate from './CellLayoutTemplate';
// import TabView from './TabView;
var CellLayout = getMappedComponentHOC(CellLayoutTemplate);
// const { TabView, TextGrid } = Components;
var TabViewTemplate = /** @class */ (function (_super) {
    __extends(TabViewTemplate, _super);
    function TabViewTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formatMessage = function (msg) {
            return _this.props.formatMessage ? _this.props.formatMessage(msg) : msg;
        };
        _this.renderScene = function (_a) {
            var route = _a.route;
            return (React.createElement(CellLayout, __assign({ items: route.items, layoutType: route.layoutType }, route)));
        };
        return _this;
    }
    TabViewTemplate.prototype.componentWillMount = function () {
        var _this = this;
        var routes = this.props.itemList.map(function (item, index) { return (__assign({ key: item.key || index, title: _this.formatMessage(item.caption) }, item)); });
        this.setState({
            routes: routes,
            loading: false,
        });
    };
    return TabViewTemplate;
}(TabView));
export default internationalWrap(TabViewTemplate);
