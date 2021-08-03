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
import React, { Component } from 'react';
// import { Button } from 'react-native-material-ui';
// eslint-disable-next-line import/no-unresolved
import { Platform, StyleSheet, View, TextInput, Text, Image, Button } from 'react-native';
import { LoginWrap as loginWrap } from 'yes'; // eslint-disable-line
var styles = StyleSheet.create({
    textinput: {
        height: 40,
        borderColor: 'black',
        borderBottomWidth: 1,
        borderBottomColor: '#8a8a8a',
        marginBottom: 20,
    },
});
if (Platform.OS === 'web') {
    styles.textinput = [styles.textinput, {
            outlineColor: 'transparent',
        }];
}
;
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.changeLoginType = function (loginType) {
            _this.setState({
                loginType: loginType,
            });
        };
        _this.state = {
            user: '',
            password: '',
            corp: '000',
            userTextInputBottomBorderColor: '#8a8a8a',
            passwordTextInputBottomBorderColor: '#8a8a8a',
            loginType: 'userAccount',
        };
        _this.handleUserChange = _this.handleUserChange.bind(_this);
        _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
        _this.handleClickLogin = _this.handleClickLogin.bind(_this);
        _this.onUserFocus = _this.onUserFocus.bind(_this);
        _this.onUserBlur = _this.onUserBlur.bind(_this);
        _this.onPasswordFocus = _this.onPasswordFocus.bind(_this);
        _this.onPasswordBlur = _this.onPasswordBlur.bind(_this);
        return _this;
    }
    Login.prototype.onPasswordBlur = function () {
        this.setState({
            passwordTextInputBottomBorderColor: '#8a8a8a',
        });
    };
    Login.prototype.onPasswordFocus = function () {
        this.setState({
            passwordTextInputBottomBorderColor: 'rgb(33, 150, 243)',
        });
    };
    Login.prototype.onUserFocus = function () {
        this.setState({
            userTextInputBottomBorderColor: 'rgb(33, 150, 243)',
        });
    };
    Login.prototype.onUserBlur = function () {
        this.setState({
            userTextInputBottomBorderColor: '#8a8a8a',
        });
    };
    Login.prototype.handleUserChange = function (v) {
        this.setState({ user: v });
    };
    Login.prototype.handlePasswordChange = function (v) {
        this.setState({ password: v });
    };
    Login.prototype.handleClickLogin = function () {
        this.props.handleClickLogin(this.state.user, this.state.password, {
        // OrgCode: this.state.corp,
        });
    };
    Login.prototype.render = function () {
        var userTextInputStyle = [styles.textinput, {
                borderBottomColor: this.state.userTextInputBottomBorderColor,
            }];
        var passwordTextInputStyle = [styles.textinput, {
                borderBottomColor: this.state.passwordTextInputBottomBorderColor,
            }];
        return (React.createElement(View, { style: {
                flex: 1,
                flexGrow: 1,
            } },
            this.props.bgImage ? React.createElement(Image, { style: {
                    flex: 1,
                    flexDirection: 'row',
                    width: '100%',
                }, source: this.props.bgImage, resizeMode: "cover" }) : null,
            this.state.loginType === 'userAccount' ? React.createElement(View, { style: {
                    flex: 1,
                    // justifyContent: 'center',
                    paddingLeft: 40,
                    paddingRight: 40,
                    backgroundColor: 'rgba(255,255,255,.8)',
                    paddingTop: 36,
                } },
                React.createElement(View, { style: {
                        flex: 1,
                        justifyContent: 'center',
                    } },
                    React.createElement(View, { style: {
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 40,
                            flexShrink: 10,
                        } },
                        React.createElement(View, { style: {
                                flexDirection: 'row',
                                justifyContent: 'center',
                            } },
                            React.createElement(Image, { source: this.props.logoImage, style: {
                                    height: 50,
                                    width: 50,
                                    alignSelf: 'stretch',
                                } })),
                        React.createElement(Text, { style: {
                                textAlign: 'center',
                                fontSize: 24,
                                margin: 18,
                            } }, this.props.tooltip)),
                    React.createElement(View, { style: {
                            flexShrink: 0,
                        } },
                        React.createElement(View, null,
                            React.createElement(TextInput, { keyboardType: "email-address", autoCapitalize: "none", value: this.state.user, autoCorrect: false, style: userTextInputStyle, placeholder: "\u7528\u6237\u540D", onChangeText: this.handleUserChange, onFocus: this.onUserFocus, onBlur: this.onUserBlur, underlineColorAndroid: "transparent" })),
                        React.createElement(View, null,
                            React.createElement(TextInput, { value: this.state.password, secureTextEntry: true, keyboardType: "numeric", style: passwordTextInputStyle, placeholder: "\u5BC6\u7801", onChangeText: this.handlePasswordChange, onFocus: this.onPasswordFocus, onBlur: this.onPasswordBlur, underlineColorAndroid: "transparent" })),
                        React.createElement(Button, { raised: true, primary: true, title: "\u767B\u5F55", onPress: this.handleClickLogin }))),
                React.createElement(View, { style: {
                        paddingBottom: 36,
                        paddingTop: 36,
                        flexShrink: 0,
                    } },
                    React.createElement(Text, { style: {
                            color: 'gray',
                            textAlign: 'center',
                        } }, this.props.companyName))) : null,
            this.state.loginType === 'phone' ? React.createElement(View, null) : null));
    };
    return Login;
}(Component));
// Login.propTypes = propTypes.Login;
export default loginWrap(Login);
