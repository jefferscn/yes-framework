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
import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';
import PropTypes from 'prop-types';
var styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    }
});
var NormalTemplate = /** @class */ (function (_super) {
    __extends(NormalTemplate, _super);
    function NormalTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NormalTemplate.prototype.render = function () {
        return this.buildChildren();
    };
    NormalTemplate.prototype.buildChildren = function () {
        var _a = this.props, items = _a.items, action = _a.action, error = _a.error, errorMsg = _a.errorMsg, formStatus = _a.formStatus;
        // const form = this.context.getBillForm();
        // if (form) {
        var actionButton = this.context.createElement(action);
        var foot = this.context.createElement(this.props.foot);
        var head = this.context.createElement(this.props.head);
        if (error) {
            return (React.createElement(View, { style: styles.container },
                head,
                React.createElement(View, { style: styles.errorContainer },
                    React.createElement(Text, null, errorMsg.message))));
        }
        if (formStatus === 'ok') {
            if (this.props.foot || this.props.head) {
                return (React.createElement(View, { style: styles.container },
                    head,
                    React.createElement(View, { style: styles.container },
                        React.createElement(ScrollView, null,
                            React.createElement(CellLayoutTemplate, { items: items })),
                        actionButton),
                    foot));
            }
            return (React.createElement(View, { style: styles.container },
                React.createElement(ScrollView, null,
                    React.createElement(CellLayoutTemplate, { items: items })),
                actionButton));
        }
        return (React.createElement(View, { style: styles.container },
            head,
            React.createElement(View, { style: styles.errorContainer },
                React.createElement(ActivityIndicator, { size: "large", color: "cadetblue" }))));
    };
    NormalTemplate.contextTypes = {
        createElement: PropTypes.func,
        getBillForm: PropTypes.func,
    };
    return NormalTemplate;
}(PureComponent));
var WrappedNormalTemplate = getMappedComponentHOC(NormalTemplate);
defaultTemplateMapping.reg('normal', WrappedNormalTemplate);
export default WrappedNormalTemplate;
