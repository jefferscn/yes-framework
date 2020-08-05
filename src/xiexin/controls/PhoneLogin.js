import React, { PureComponent } from 'react';
// import { Button } from 'react-native-material-ui';
// eslint-disable-next-line import/no-unresolved
import { Platform, StyleSheet, View, TextInput, Text, Image, Button, TouchableHighlight } from 'react-native';
import { propTypes, LoginWrap as loginWrap } from 'yes'; // eslint-disable-line
import projectCfg from '../config/project.json';
import { originFetch } from 'yes-framework/util/fakeFetch';

const styles = StyleSheet.create({
    textinput: {
        height: 40,
        borderColor: 'black',
        borderBottomWidth: 1,
        borderBottomColor: '#8a8a8a',
        // marginBottom: 20,
        flex: 1,
    },
    loginTypeList: {
        flexDirection: 'row',
    },
    img: {
        width: 100,
        height: 40,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    }
});
if (Platform.OS === 'web') {
    styles.textinput = [styles.textinput, {
        outlineColor: 'transparent',
    }];
}

class CheckValidCode extends PureComponent {
    componentWillMount() {
        this.setState({
            url: this.props.generateImg(),
        });
    }
    changeImage = () => {
        this.setState({
            url: this.props.generateImg(),
        })
    }
    handleCodeChange = (v) => {
        this.props.onChange && this.props.onChange(v);
    }
    render() {
        return (
            <View style={styles.row}>
                <TextInput
                    placeholder="输入验证码"
                    style={styles.textinput}
                    onChangeText={this.handleCodeChange}
                />
                <TouchableHighlight onPress={this.changeImage}>
                    <Image style={styles.img} source={this.state.url} />
                </TouchableHighlight>
            </View>
        )
    }
}

@loginWrap
class YIGOLoginBlock extends PureComponent {
    state = {
        user: '',
        password: '',
        corp: '000',
    }
    handleUserChange = (v) => {
        this.setState({
            user: v,
        })
    }
    handlePasswordChange = (v) => {
        this.setState({
            password: v,
        })
    }
    handleClickLogin = () => {
        this.props.handleClickLogin && this.props.handleClickLogin(
            `${this.state.corp}_${this.state.user}`,
            this.state.password,
            {
                OrgCode: this.state.corp,
            });
    }
    render() {
        return (
            <View
                style={{
                    flexShrink: 0,
                }}
            >
                <View style={styles.row}>
                    <TextInput
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={this.state.user}
                        autoCorrect={false}
                        style={styles.textinput}
                        placeholder="用户名"
                        onChangeText={this.handleUserChange}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.row}>
                    <TextInput
                        value={this.state.password}
                        secureTextEntry
                        style={styles.textinput}
                        keyboardType="numeric"
                        placeholder="密码"
                        onChangeText={this.handlePasswordChange}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <Button
                    raised
                    primary
                    text="登录"
                    onPress={this.handleClickLogin}
                    title="登录"
                >登录</Button>
            </View>
        )
    }
}

class PhoneLoginBlock extends PureComponent {
    state = {
        phoneNumber: '',
        validCode: '',
        smsCode: '',
        sending: false,
    }
    onValidCodeChange = (v) => {
        this.setState({
            validCode: v,
        })
    }
    handlePhoneChange = (v) => {
        this.setState({
            phoneNumber: v,
        })
    }
    handleClickLogin = () => {
        // this.props.handleClickLogin && this.props.handleClickLogin(
        //     `${this.state.corp}_${this.state.user}`,
        //     this.state.password,
        //     {
        //         OrgCode: this.state.corp,
        //     });
    }
    handleSMSCodeChange = (v) => {
        this.setState({
            smsCode: v,
        })
    }
    startTimer = () => {
        this.setState({
            waitSeconds: 60
        });
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            if(this.state.waitSeconds ===0 ) {
                this.setState({
                    sending: false,
                });
                clearTimeout(this.timer);
                this.timer = null;
                return;
            }
            this.setState({
                waitSeconds: this.state.waitSeconds - 1,
            });
        }, 1000);
    }
    sendSMS = async () => {
        if (this.props.sendSMS) {
            try {
                await this.props.sendSMS(this.state.validCode, this.state.phoneNumber);
                this.setState({
                    sending: true,
                    sendWait: 60,
                });
                this.startTimer();
            } catch (ex) {
                alert(ex);
            }
        }
    }
    render() {
        return (
            <View
                style={{
                    flexShrink: 0,
                }}
            >
                <View style={styles.row}>
                    <TextInput
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={this.state.phoneNumber}
                        autoCorrect={false}
                        style={styles.textinput}
                        placeholder="手机号"
                        onChangeText={this.handlePhoneChange}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <CheckValidCode onChange={this.onValidCodeChange} generateImg={this.props.generateImg} />
                <View style={styles.row}>
                    <TextInput
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={this.state.smsCode}
                        style={styles.textinput}
                        autoCorrect={false}
                        placeholder="短信随机码"
                        onChangeText={this.handleSMSCodeChange}
                        underlineColorAndroid="transparent"
                    />
                    <Button title="获取验证码" onPress={this.sendSMS} />
                </View>
                <Button
                    raised
                    primary
                    text="登录"
                    onPress={this.handleClickLogin}
                    title="登录"
                >登录</Button>
            </View>
        )
    }
}

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            corp: '000',
            userTextInputBottomBorderColor: '#8a8a8a',
            passwordTextInputBottomBorderColor: '#8a8a8a',
            loginType: 'account',
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
    changeLoginType = (type) => {
        this.setState({
            loginType: type,
        })
    }
    generateImg = () => {
        return projectCfg.serverPath +
            "/captcha/pic/get?scene=1002&timeoutMs=60000&random=" +
            Math.random();
    }
    handlePhoneChange = (v) => {
        this.setState({
            phoneNumber: v,
        })
    }
    onValidCodeChange = (v) => {
        this.setState({
            validCode: v,
        });
    }
    sendSMS = async (validCode, phoneNumber) => {
        if (validCode) {
            const data = {
                imgCode: validCode,
                mobilePhoneKey: phoneNumber,
                scene: "1002",
            }
            const url = `${projectCfg.serverPath}/portal/supplier/pub/reggetverifi`;
            const response = await originFetch(url, {
                method: "post",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!result.success) {
                throw result.error;
            }
        }
    }
    phoneLogin = async(validCode, phoneNumber, smsCode)=> {
        if (validCode) {
            const data = {
                imgCode: validCode,
                mobilePhoneKey: phoneNumber,
                smsCode: smsCode,
                validateType: 1,
            }
            const url = `${projectCfg.serverPath}/portal/login`;
            const response = await originFetch(url, {
                method: "post",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!result.success) {
                throw result.error;
            }
        }
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexGrow: 1,
                }}
            >
                {
                    this.props.bgImage ? <Image
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            width: '100%',
                        }}
                        source={this.props.bgImage}
                        resizeMode="cover"
                    /> : null
                }
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
                        {
                            this.state.loginType === 'account' ? <YIGOLoginBlock /> : null
                        }
                        {
                            this.state.loginType === 'phone' ?
                                <PhoneLoginBlock
                                    sendSMS={this.sendSMS}
                                    generateImg={this.generateImg}
                                /> : null
                        }
                    </View>
                    <View style={styles.loginTypeList}>
                        {this.state.loginType != 'phone' ? <Button title="手机登录" onPress={() => this.changeLoginType('phone')} /> : null}
                        {this.state.loginType !== 'account' ? <Button title="账号登录" onPress={() => this.changeLoginType('account')} /> : null}
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
            </View >
        );
    }
}
// Login.propTypes = propTypes.Login;
export default loginWrap(Login);
