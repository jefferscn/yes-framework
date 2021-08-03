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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
// import { TableView, Section } from 'react-native-tableview-simple';
import { List } from 'antd-mobile';
import { Components } from 'yes-comp-react-native-web'; // eslint-disable-line import/no-unresolved
import { DynamicControl, controlVisibleWrapper, notEmptyVisibleWrapper, equalVisibleWrapper, internationalWrap } from 'yes'; // eslint-disable-line import/no-unresolved
// import internationalWrap from '../../controls/InternationalWrap';
var ScrollView = Components.ScrollView, Layout = Components.Layout;
var CellLayout = Layout.CellLayout;
var styles = {
    textStyle: {
        color: 'gray',
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        justifyContent: 'flex-end',
        display: 'flex',
        fontSize: 12,
    },
    contentStyle: {
        maxWidth: 110,
        textAlign: 'right',
    },
    textContainerStyle: {
        flexBasis: 0,
    },
    accessoryStyle: {
        paddingLeft: 15,
        flexBasis: 'auto',
        justifyContent: 'center',
    },
    defaultLayout: {
        minHeight: 30,
        textAlign: 'left',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    defaultText: {
        textAlign: 'left',
    },
    labelRight: {
        textAlign: 'right',
        justifyContent: 'flex-end',
    },
    labelLeft: {
        textAlign: 'left',
        justifyContent: 'flex-start',
    },
    labelMiddle: {
        textAlign: 'center',
        justifyContent: 'center',
    },
    labelVAlignTop: {
        alignItems: 'flex-start',
    },
    labelVAlignMiddle: {
        alignItems: 'center',
    },
    labelVAlignBottom: {
        alignItems: 'flex-end',
    }
};
var RelatedSection = controlVisibleWrapper(List);
var NotEmptyRelatedSection = notEmptyVisibleWrapper(List);
var EqualSection = equalVisibleWrapper(List);
var RelatedCell = controlVisibleWrapper(DynamicControl);
var NotEmptyRelatedCell = notEmptyVisibleWrapper(DynamicControl);
var EqualCell = equalVisibleWrapper(DynamicControl);
var CellLayoutTemplate = /** @class */ (function (_super) {
    __extends(CellLayoutTemplate, _super);
    function CellLayoutTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getControlProps = function (key) {
            if (_this.context.getControlProps) {
                return _this.context.getControlProps(key);
            }
            return {};
        };
        _this.getLabelStyle = function () {
            var _a = _this.props, labelAlign = _a.labelAlign, labelVAlign = _a.labelVAlign, titleStyle = _a.titleStyle;
            return [styles.textStyle,
                labelAlign === 'left' ? styles.labelLeft : (labelAlign === 'middle' ? styles.labelMiddle : styles.labelRight),
                labelVAlign === 'top' ? styles.labelVAlignTop : (labelVAlign === 'middle' ? styles.labelVAlignMiddle : styles.labelVAlignBottom),
                titleStyle];
        };
        _this.getContentTextStyle = function (item) {
            var _a = _this.props, contentAlign = _a.contentAlign, contentTextStyle = _a.contentTextStyle;
            return [contentAlign === 'left' ? styles.labelLeft : (contentAlign === 'middle' ? styles.labelMiddle : styles.labelRight),
                contentTextStyle, item.textStyle];
        };
        _this.getContentLayoutStyle = function (item) {
            var _a = _this.props, contentAlign = _a.contentAlign, contentLayoutStyle = _a.contentLayoutStyle;
            return [contentAlign === 'left' ? styles.labelLeft : (contentAlign === 'middle' ? styles.labelMiddle : styles.labelRight),
                contentLayoutStyle, item.layoutStyle];
        };
        _this.renderItem = function (item) {
            var _a = _this.props, layoutStyle = _a.layoutStyle, textStyle = _a.textStyle;
            var S = DynamicControl;
            var extraProps = {};
            if (item.visibleNotEmpty) {
                S = NotEmptyRelatedCell;
                extraProps.relatedId = item.visibleNotEmpty;
            }
            if (item.visibleRelation) {
                S = RelatedCell;
                extraProps.relatedId = item.visibleRelation;
            }
            if (item.visibleEqual) {
                S = EqualCell;
                extraProps.relatedId = item.visibleEqual.yigoid;
                extraProps.value = item.visibleEqual.value;
            }
            if (item.type === 'element') {
                return _this.context.createElement(item, {
                    layout: _this.getLayout(item),
                    // contentContainerStyle: { justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' },
                    textStyles: _this.getContentTextStyle(item),
                    layoutStyles: _this.getContentLayoutStyle(item),
                });
            }
            if (typeof item === 'object') {
                Object.assign(extraProps, item);
            }
            return (React.createElement(S, __assign({ key: item.key || item, yigoid: item.key || item, isCustomLayout: true, 
                // disabled={true}
                // contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
                showLabel: false, 
                // hideWhenEmptyValue
                textStyles: _this.getContentTextStyle(item), layoutStyles: _this.getContentLayoutStyle(item), layout: _this.getLayout(item) }, extraProps, _this.getControlProps(item.key || item))));
        };
        return _this;
    }
    CellLayoutTemplate.prototype.renderSection = function (section) {
        var _this = this;
        var S = List;
        var extraProps = {};
        if (section.visibleNotEmpty) {
            S = NotEmptyRelatedSection;
            extraProps.relatedId = section.visibleNotEmpty;
        }
        if (section.visibleRelation) {
            S = RelatedSection;
            extraProps.relatedId = section.visibleRelation;
        }
        if (section.visibleEqual) {
            S = EqualSection;
            extraProps.relatedId = section.visibleEqual.yigoid;
            extraProps.value = section.visibleEqual.value;
        }
        return (React.createElement(S, __assign({}, extraProps, { renderHeader: function () { return _this.props.formatMessage(section.caption); }, hideSeparator: true }), section.items.map(function (item) {
            if (item.type === 'element') {
                return _this.context.createElement(item, {
                    layout: _this.getLayout(item),
                    // contentContainerStyle: { justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' },
                    textStyles: _this.getContentTextStyle(item),
                    layoutStyles: _this.getContentLayoutStyle(item),
                });
            }
            return (React.createElement(DynamicControl, __assign({ key: item.key || item, yigoid: item.key || item, isCustomLayout: true, showLabel: false, 
                // disabled={true}
                // contentContainerStyle={{ justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
                // hideWhenEmptyValue
                textStyles: _this.getContentTextStyle(item), layoutStyles: _this.getContentLayoutStyle(item), layout: _this.getLayout(item, section.contentStyle) }, _this.getControlProps(item.key || item))));
        })));
    };
    CellLayoutTemplate.prototype.getLayout = function (item, contentStyle) {
        var titleStyle = this.props.titleStyle;
        if (this.props.getLayout) {
            return this.props.getLayout(item);
        }
        if (!item.layoutType || item.layoutType === 'cell') {
            return React.createElement(CellLayout, { contentStyle: [styles.contentStyle, contentStyle], titleStyle: [this.getLabelStyle(), item.labelStyle], divider: true, title: item.caption ? this.props.formatMessage(item.caption) : '', style: styles.accessoryStyle });
        }
        if (!item.layoutType || item.layoutType === 'control') {
            return null;
        }
        return null;
    };
    CellLayoutTemplate.prototype.render = function () {
        var _this = this;
        var style = this.props.style;
        if (this.props.isGrid) {
            return (React.createElement(View, { style: { flex: 1 } },
                React.createElement(DynamicControl, __assign({ key: this.props.grid, yigoid: this.props.grid, isCustomLayout: true }, this.getControlProps(this.props.grid)))));
        }
        return (
        // <ScrollView>
        React.createElement(List, { style: StyleSheet.flatten(style) }, this.props.items.map(function (section) {
            return (section.isGroup ? _this.renderSection(section) :
                section.items ?
                    section.items.map(function (item) {
                        return _this.renderItem(item);
                    }) : _this.renderItem(section));
        }))
        // </ScrollView>
        );
    };
    CellLayoutTemplate.propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            tagName: PropTypes.string,
            key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            caption: PropTypes.string,
        })),
        labelAlign: PropTypes.oneOf(['left', 'right', 'middle']),
        labelVAlign: PropTypes.oneOf(['top', 'middle', 'bottom']),
        contentAlign: PropTypes.oneOf(['left', 'right', 'middle']),
    };
    CellLayoutTemplate.contextTypes = {
        getControlProps: PropTypes.func,
        createElement: PropTypes.func,
    };
    CellLayoutTemplate.defaultProps = {
        labelAlign: 'left',
        contentAlign: 'right',
        labelVAlign: 'middle',
    };
    CellLayoutTemplate = __decorate([
        internationalWrap
    ], CellLayoutTemplate);
    return CellLayoutTemplate;
}(Component));
CellLayoutTemplate.displayName = "CellLayoutTemplate";
export default CellLayoutTemplate;
