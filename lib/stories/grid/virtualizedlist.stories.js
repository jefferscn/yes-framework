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
import React from "react";
import { VirtualizedList, Text } from "react-native";
import StoryWrapper from '../StoryWrapper';
var data = [];
for (var i = 0; i < 10001; i++) {
    data.push(i);
}
var VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: 300,
};
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getItemLayout = function (item, index) {
            return {
                length: 40,
                offset: 40 * index,
                index: index,
            };
        };
        return _this;
    }
    App.prototype.render = function () {
        return (React.createElement(VirtualizedList, { data: data, viewabilityConfig: VIEWABILITY_CONFIG, getItem: function (data, index) { return data[index]; }, getItemCount: function (data) { return data.length; }, keyExtractor: function (item) { return String(item); }, windowSize: 12, initialNumToRender: 20, getItemLayout: this.getItemLayout, renderItem: function (_a) {
                var item = _a.item;
                return (React.createElement(Text, { style: {
                        height: 40,
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                        backgroundColor: item % 2 === 0 ? "white" : "hsl(0, 0%, 92%)"
                    } }, item));
            } }));
    };
    return App;
}(React.Component));
export default {
    title: 'yes-framework/grid/VirtualizedList',
    component: App,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(App, __assign({}, args)))); };
export var Base = Template.bind({});
