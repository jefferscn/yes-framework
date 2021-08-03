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
import { View, StyleSheet, Text, ActivityIndicator, ImageBackground } from 'react-native';
import defaultTemplateMapping from '../defaultTemplateMapping';
import Element from '../Element';
import AutofitScrollView from '../../controls/Container/AutofitScrollView';
import PropTypes from 'prop-types';
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    topBackground: {
        position: 'absolute',
        top: -1,
        left: 0,
        right: 0,
        height: 200,
    },
    paddingBottom: {
        paddingBottom: 20,
    },
    mask: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(245,245,245,0.5)',
    }
});
var defaultHeader = {
    "type": "element",
    "elementType": "Header",
    "elementProps": {
        "canBack": true,
        "titleElement": {
            "type": "element",
            "elementType": "FormTitle",
            "elementProps": {
                "containerStyle": {
                    "alignItems": "center",
                    "justifyContent": "center"
                }
            }
        }
    }
};
var AutoTemplate = /** @class */ (function (_super) {
    __extends(AutoTemplate, _super);
    function AutoTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoTemplate.prototype.render = function () {
        var _a = this.props, items = _a.items, action = _a.action, error = _a.error, errorMsg = _a.errorMsg, formStatus = _a.formStatus, containerStyle = _a.containerStyle, backgroundImg = _a.backgroundImg;
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
        return (React.createElement(View, { style: styles.container },
            backgroundImg ? React.createElement(ImageBackground, { style: styles.topBackground, source: backgroundImg }) : null,
            head,
            React.createElement(View, { style: [styles.container, containerStyle] },
                React.createElement(AutofitScrollView, { style: styles.paddingBottom },
                    (formStatus && formStatus != 'ok') ?
                        React.createElement(View, { style: styles.mask },
                            React.createElement(ActivityIndicator, null)) : null,
                    items.map(function (item) {
                        return React.createElement(Element, { meta: item });
                    })),
                actionButton),
            foot));
    };
    AutoTemplate.contextTypes = {
        createElement: PropTypes.func,
    };
    AutoTemplate.defaultProps = {
        head: defaultHeader,
    };
    return AutoTemplate;
}(PureComponent));
defaultTemplateMapping.reg('auto', AutoTemplate);
export default AutoTemplate;
