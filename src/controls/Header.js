import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { withNavigation } from 'react-navigation';
// import { HeaderBackButton } from 'react-navigation';
import { History } from 'yes-web';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
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
    }
});



class Header extends PureComponent {
    static defaultProps = {
        titleMode: 'flex',//flex=使用 flex布局，absolute=使用absolute布局
        canBack: true,
        mode: 'dark',
    }
    static contextTypes = {
        createElement: PropTypes.func,
        getTopPadding: PropTypes.func,
    }
    createLeftElement = () => {
        if (this.props.leftElement) {
            return this.props.leftElement;
        }
        if (this.props.canBack) {
            return <HeadBackButton iconStyle={this.props.mode === 'light' ? styles.lightMode : null} onPress={this.props.backHandler} />;
        }
        return null;
    }
    createTitleElement = () => {
        if (this.props.titleElement) {
            return this.context.createElement(this.props.titleElement);
        }
        if (this.props.title) {
            return <HeadTitle style={[this.props.titleMode === 'flex' ? styles.flexTitle : styles.absoluteTitle,
            this.props.titleStyle]} title={this.props.title}
                textStyle={[
                    this.props.mode === 'light' ? styles.lightMode : null,
                ]}
            />;
        }
        return null;
    }
    createRightElement = () => {
        if (this.props.rightElement) {
            return this.context.createElement(this.props.rightElement);
            // return this.props.rightElement;
        }
        return null;
    }
    getPaddingStyle = () => {
        let topPadding = 0;
        if (this.context.getTopPadding) {
            topPadding = this.context.getTopPadding();
        }
        return {
            paddingTop: topPadding,
        }
    }
    render() {
        return (
            <View style={[styles.header, this.getPaddingStyle(), this.props.headerStyle]}>
                {this.createLeftElement()}
                {this.createTitleElement()}
                {this.createRightElement()}
            </View>
        )
    }
}

class HeaderBackButton extends PureComponent {
    render() {
        const { onPress, style, iconStyle } = this.props;
        return (
            <TouchableOpacity style={{zIndex: 1}} onPress={onPress} >
                <View style={[styles.headerBack, style]}>
                    <Icon style={[styles.icon, iconStyle]} size={24} name="angle-left" />
                </View>
            </TouchableOpacity>
        )
    }
}

// @withNavigation
class HeadBackButton extends PureComponent {
    static contextTypes = {
        getBillForm: PropTypes.func,
    }
    onPress = () => {
        // this.props.navigation.goBack(null);
        if (this.props.onPress) {
            this.props.onPress();
            return;
        }
        History.goBack();
    }
    render() {
        return (
            <HeaderBackButton {...this.props} onPress={this.onPress} />
        )
    }
}

class HeadTitle extends PureComponent {
    static defaultProps = {

    }
    render() {
        return (
            <View style={[styles.title, this.props.style]}>
                <Text style={this.props.textStyle}>{this.props.title}</Text>
            </View>
        )
    }
}

Object.assign(Header, {
    HeadBackButton,
    HeadTitle,
});

export default Header;
