import React, { Component } from 'react';
// import { Button } from 'react-native-material-ui';
// eslint-disable-next-line import/no-unresolved
import { Platform, StyleSheet, View, TextInput, Text, Image, Button } from 'react-native';
import { propTypes, LoginWrap as loginWrap } from 'yes'; // eslint-disable-line

const styles = StyleSheet.create({
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
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            corp:'000',
            userTextInputBottomBorderColor: '#8a8a8a',
            passwordTextInputBottomBorderColor: '#8a8a8a',
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClickLogin = this.handleClickLogin.bind(this);
        this.onUserFocus = this.onUserFocus.bind(this);
        this.onUserBlur = this.onUserBlur.bind(this);
        this.onPasswordFocus = this.onPasswordFocus.bind(this);
        this.onPasswordBlur = this.onPasswordBlur.bind(this);
    }
    onPasswordBlur() {
        this.setState({
            passwordTextInputBottomBorderColor: '#8a8a8a',
        });
    }
    onPasswordFocus() {
        this.setState({
            passwordTextInputBottomBorderColor: 'rgb(33, 150, 243)',
        });
    }
    onUserFocus() {
        this.setState({
            userTextInputBottomBorderColor: 'rgb(33, 150, 243)',
        });
    }
    onUserBlur() {
        this.setState({
            userTextInputBottomBorderColor: '#8a8a8a',
        });
    }
    handleUserChange(v) {
        this.setState({ user: v });
    }
    handlePasswordChange(v) {
        this.setState({ password: v });
    }
    handleClickLogin() {
        this.props.handleClickLogin(
            `${this.state.corp}_${this.state.user}`, 
            this.state.password,
            {
                OrgCode: this.state.corp,
            });
    }
    render() {
        const userTextInputStyle = [styles.textinput, {
            borderBottomColor: this.state.userTextInputBottomBorderColor,
        }];
        const passwordTextInputStyle = [styles.textinput, {
            borderBottomColor: this.state.passwordTextInputBottomBorderColor,
        }];
        return (
            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                }}
            >
                <Image
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: '100%',
                    }}
                    source={this.props.bgImage}
                    resizeMode="cover"
                >
                </Image>

                <View
                    style={{
                        flex: 1,
                        // justifyContent: 'center',
                        paddingLeft: 40,
                        paddingRight: 40,
                        backgroundColor: 'rgba(255,255,255,.8)',
                        paddingTop: 36,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        {/* icon和tooltip*/}
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: 40,
                                flexShrink: 10,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    source={this.props.logoImage}
                                    style={{
                                        height: 50,
                                        width: 50,
                                        alignSelf: 'stretch',
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 24,
                                    margin: 18,
                                }}
                            >{this.props.tooltip}</Text>
                        </View>
                        {/* form*/}
                        <View
                            style={{
                                flexShrink: 0,
                            }}
                        >
                            <View>
                                <TextInput
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={this.state.user}
                                    autoCorrect={false}
                                    style={userTextInputStyle}
                                    placeholder="用户名"
                                    onChangeText={this.handleUserChange}
                                    onFocus={this.onUserFocus}
                                    onBlur={this.onUserBlur}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View>
                                <TextInput
                                    value={this.state.password}
                                    secureTextEntry
                                    keyboardType="numeric"
                                    style={passwordTextInputStyle}
                                    placeholder="密码"
                                    onChangeText={this.handlePasswordChange}
                                    onFocus={this.onPasswordFocus}
                                    onBlur={this.onPasswordBlur}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <Button
                                raised
                                primary
                                text="登录"
                                onPress={this.handleClickLogin}
                            >登录</Button>
                        </View>
                    </View>
                    <View
                        style={{
                            paddingBottom: 36,
                            paddingTop: 36,
                            flexShrink: 0,
                        }}
                    >
                        <Text
                            style={{
                                color: 'gray',
                                textAlign: 'center',
                            }}
                        >{this.props.companyName}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
// Login.propTypes = propTypes.Login;
export default loginWrap(Login);
