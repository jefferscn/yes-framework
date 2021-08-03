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
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { History } from 'yes-web';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
var styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
    },
    headerLight: {
        backgroundColor: 'black',
    },
    headerDark: {
        backgroundColor: 'white',
    },
    absoluteTitle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerBack: {
        margin: 13,
        zIndex: 1,
    },
    icon: {
        width: 24,
        textAlign: 'center',
    },
    lightMode: {
        color: 'white',
    },
    textStyle: {
        marginTop: 13,
        marginBottom: 13,
        marginLeft: 13,
        height: 24,
        display: 'flex',
        alignItems: 'center',
    },
    transparent: {
        backgroundColor: 'transparent',
    }
});
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.createLeftElement = function () {
            if (_this.props.leftElement) {
                return _this.props.leftElement;
            }
            if (_this.props.canBack) {
                return React.createElement(HeadBackButton, { iconStyle: _this.props.mode === 'light' ? styles.lightMode : null, onPress: _this.props.backHandler });
            }
            return null;
        };
        _this.createTitleElement = function () {
            if (_this.props.titleElement) {
                return _this.context.createElement(_this.props.titleElement, {
                    mode: _this.props.mode,
                });
            }
            if (_this.props.title) {
                return React.createElement(HeadTitle, { style: [_this.props.titleMode === 'flex' ? styles.flexTitle : styles.absoluteTitle,
                        _this.props.titleStyle], title: _this.props.title, textStyle: [
                        _this.props.mode === 'light' ? styles.lightMode : null, _this.props.textStyle
                    ] });
            }
            return null;
        };
        _this.createRightElement = function () {
            if (_this.props.rightElement) {
                return _this.context.createElement(_this.props.rightElement);
                // return this.props.rightElement;
            }
            return null;
        };
        _this.getPaddingStyle = function () {
            var topPadding = 0;
            if (_this.context.getTopPadding) {
                topPadding = _this.context.getTopPadding();
            }
            return {
                paddingTop: topPadding,
            };
        };
        return _this;
    }
    Header.prototype.render = function () {
        return (React.createElement(View, { style: [styles.header, this.getPaddingStyle(),
                this.props.mode === 'light' ? styles.headerLight : styles.headerDark,
                this.props.transparent ? styles.transparent : null,
                this.props.headerStyle] },
            this.createLeftElement(),
            this.createTitleElement(),
            this.createRightElement()));
    };
    Header.propTypes = {
        titleMode: PropTypes.oneOf(['flex', 'absolute']),
        mode: PropTypes.oneOf(['dark', 'light']),
        title: PropTypes.string,
        titleElement: PropTypes.shape({
            type: PropTypes.oneOf(['element']),
            elementType: PropTypes.string,
            elementProps: PropTypes.object,
        }),
    };
    Header.defaultProps = {
        titleMode: 'flex',
        canBack: true,
        mode: 'dark',
        transparent: false,
    };
    Header.contextTypes = {
        createElement: PropTypes.func,
        getTopPadding: PropTypes.func,
    };
    return Header;
}(PureComponent));
var HeaderBackButton = /** @class */ (function (_super) {
    __extends(HeaderBackButton, _super);
    function HeaderBackButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderBackButton.prototype.render = function () {
        var _a = this.props, onPress = _a.onPress, style = _a.style, iconStyle = _a.iconStyle;
        return (React.createElement(TouchableOpacity, { style: { zIndex: 1 }, onPress: onPress },
            React.createElement(View, { style: [styles.headerBack, style] },
                React.createElement(Icon, { style: [styles.icon, iconStyle], size: 24, name: "angle-left" }))));
    };
    return HeaderBackButton;
}(PureComponent));
// @withNavigation
var HeadBackButton = /** @class */ (function (_super) {
    __extends(HeadBackButton, _super);
    function HeadBackButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPress = function () {
            // this.props.navigation.goBack(null);
            if (_this.props.onPress) {
                _this.props.onPress();
                return;
            }
            History.goBack();
        };
        return _this;
    }
    HeadBackButton.prototype.render = function () {
        return (React.createElement(HeaderBackButton, __assign({}, this.props, { onPress: this.onPress })));
    };
    HeadBackButton.contextTypes = {
        getBillForm: PropTypes.func,
    };
    return HeadBackButton;
}(PureComponent));
var HeadTitle = /** @class */ (function (_super) {
    __extends(HeadTitle, _super);
    function HeadTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeadTitle.prototype.render = function () {
        return (React.createElement(View, { style: [styles.title, this.props.style] },
            React.createElement(Text, { style: [styles.textStyle, this.props.textStyle] }, this.props.title)));
    };
    HeadTitle.defaultProps = {};
    return HeadTitle;
}(PureComponent));
Object.assign(Header, {
    HeadBackButton: HeadBackButton,
    HeadTitle: HeadTitle,
});
export default Header;
