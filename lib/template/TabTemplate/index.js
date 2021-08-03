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
import React, { PureComponent } from 'react';
import { getMappedComponentHOC, internationalWrap } from 'yes'; // eslint-disable-line import/no-unresolved
import defaultTemplateMapping from '../defaultTemplateMapping';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Tabs } from 'antd-mobile';
import Element from '../Element';
var styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
    tab: {
        height: '100%',
    }
});
var TabTemplate = /** @class */ (function (_super) {
    __extends(TabTemplate, _super);
    function TabTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderTab = function (tab) {
            return React.createElement(View, { style: styles.tab }, tab.items.map(function (item) {
                return React.createElement(Element, { meta: item });
            }));
        };
        return _this;
    }
    TabTemplate.prototype.renderContent = function (tabs) {
        if (this.props.foot || this.props.head) {
            var foot = this.context.createElement(this.props.foot);
            var head = this.context.createElement(this.props.head);
            return (React.createElement(View, { style: styles.container },
                head,
                React.createElement(Tabs, __assign({ tabs: tabs, renderTabBar: function (props) { return React.createElement(Tabs.DefaultTabBar, __assign({}, props, { page: 3 })); } }, this.props), this.renderTab),
                foot));
        }
        return (React.createElement(Tabs, __assign({ tabs: tabs, renderTabBar: function (props) { return React.createElement(Tabs.DefaultTabBar, __assign({}, props, { page: 3 })); } }, this.props), this.renderTab));
    };
    TabTemplate.prototype.formatTabs = function (tabs) {
        return tabs;
    };
    TabTemplate.prototype.render = function () {
        var tabs = this.props.tabs;
        var newTabs = this.formatTabs(tabs);
        return this.renderContent(newTabs);
    };
    TabTemplate.contextTypes = {
        createElement: PropTypes.func,
    };
    return TabTemplate;
}(PureComponent));
var WrappedTabTemplate = getMappedComponentHOC(internationalWrap(TabTemplate));
defaultTemplateMapping.reg('tabs', WrappedTabTemplate);
export default WrappedTabTemplate;
