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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { GridRowWrap } from 'yes-intf';
var styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headRight: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    footLeft: {
        flexDirection: 'row',
    },
    footRight: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    content: {
        paddingLeft: 12,
        paddingRight: 12,
    },
    header: {
        height: 30,
        paddingLeft: 12,
        paddingRight: 12,
        flexDirection: 'row',
    },
    footer: {
        height: 43,
        paddingLeft: 12,
        paddingRight: 12,
        alignItems: 'center',
        flexDirection: 'row',
    },
    seperator: {
        height: 1,
        backgroundColor: '#DEDEDE'
    },
});
var GridRow = /** @class */ (function (_super) {
    __extends(GridRow, _super);
    function GridRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridRow.prototype.render = function () {
        var _this = this;
        var _a = this.props, headLeft = _a.headLeft, headRight = _a.headRight, footLeft = _a.footLeft, actions = _a.actions, footRight = _a.footRight, showSeperator = _a.showSeperator, seperatorStyle = _a.seperatorStyle, content = _a.content, style = _a.style, headStyle = _a.headStyle, contentStyle = _a.contentStyle, footStyle = _a.footStyle;
        return (React.createElement(TouchableOpacity, { onPress: this.props.onPress },
            React.createElement(View, { style: [styles.container, style] },
                (headLeft || headRight) ? React.createElement(View, { style: [styles.header, headStyle] },
                    React.createElement(View, { style: styles.headLeft }, headLeft ? headLeft.map(function (item) { return _this.context.createElement(item); }) : null),
                    React.createElement(View, { style: styles.headRight }, headRight ? headRight.map(function (item) { return _this.context.createElement(item); }) : null)) : null,
                React.createElement(View, { style: [styles.content, contentStyle] }, this.context.createElement(content)),
                (footLeft || footRight) ? React.createElement(View, { style: [styles.footer, footStyle] },
                    React.createElement(View, { style: styles.footLeft }, footLeft ? footLeft.map(function (item) { return _this.context.createElement(item); }) : null),
                    React.createElement(View, { style: styles.footRight }, footRight ? footRight.map(function (item) { return _this.context.createElement(item); }) : null)) : null,
                showSeperator ? React.createElement(View, { style: [styles.seperator, seperatorStyle] }) : null)));
    };
    GridRow.defaultProps = {
        showSeperator: false
    };
    GridRow.contextTypes = {
        createElement: PropTypes.func,
    };
    GridRow = __decorate([
        GridRowWrap
    ], GridRow);
    return GridRow;
}(PureComponent));
export default GridRow;
