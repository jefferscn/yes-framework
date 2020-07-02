import React, { Component } from 'react';
// import { Button } from 'react-native-material-ui';
// eslint-disable-next-line import/no-unresolved
import { Platform, StyleSheet, View, TextInput, Text, Image, Button, ImageBackground } from 'react-native';
import { LoginWrap as loginWrap } from 'yes'; // eslint-disable-line
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginBG from '../res/login_bg.png';

const styles = StyleSheet.create({
    textinput: {
        height: 40,
        borderColor: 'black',
        borderBottomWidth: 1,
        borderBottomColor: '#8a8a8a',
        marginBottom: 20,
        paddingLeft: 50,
    },
    main: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    main_1: {
        flexBasis: '38%',
    },
    main_2: {
        flex: 1,
        backgroundColor: 'white',
    },
    login: {
        position: 'absolute',
        width: '100%',
        padding: 20,
        top: -100,
    },
    logininner: {
        paddingTop: 40,
        paddingRight: 20,
        paddingBottom: 80,
        paddingLeft: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        boxShadow: '0 5px 5px #888888',
    },
    icon: {
        position: 'absolute',
        fontSize: 20,
        left: 12,
        top: 10,
        color: 'skyblue',
    },
    loginText: {
        paddingBottom: 40,
        paddingLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 20,
        margin: 20,
        overflow: 'hidden',
    },
    sysText: {
        position: 'absolute',
        top: -150,
        color: 'white',
        fontSize: 24,
        width: '100%',
        textAlign: 'center',
    }
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
            corp: '000',
            userTextInputBottomBorderColor: '#8a8a8a',
            passwordTextInputBottomBorderColor: '#8a8a8a',
            loginType: 'userAccount',
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
    changeLoginType = (loginType) => {
        this.setState({
            loginType,
        })
    }
    render() {
        const userTextInputStyle = [styles.textinput, {
            borderBottomColor: this.state.userTextInputBottomBorderColor,
        }];
        const passwordTextInputStyle = [styles.textinput, {
            borderBottomColor: this.state.passwordTextInputBottomBorderColor,
        }];
        return (
            <View style={styles.main}>
                <View style={styles.main_1}>
                    <ImageBackground style={{flex:1}} source={LoginBG} />
                </View>
                <View style={styles.main_2}>
                    <Text style={styles.sysText}>欢迎登录</Text>
                    <View style={styles.login}>
                        <View style={styles.logininner}>
                            <View>
                                <Text style={styles.loginText}>登录</Text>
                            </View>
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
                                <Icon name="user-circle" style={styles.icon} />
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
                                <Icon name="lock" style={styles.icon} />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    raised
                                    primary
                                    style={styles.button}
                                    title="登录"
                                    onPress={this.handleClickLogin}
                                >登录</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
        return (
            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                }}
            >
                {this.state.loginType === 'userAccount' ? <View
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
                                title="登录"
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
                </View> : null}
            </View>
        );
    }
}
// Login.propTypes = propTypes.Login;
export default loginWrap(Login);
