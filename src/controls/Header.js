import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation';
import PropTypes from 'prop-types';

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
    }
});

class Header extends PureComponent {
    static defaultProps = {
        titleMode: 'flex',//flex=使用 flex布局，absolute=使用absolute布局
        canBack: true,
    }
    static contextTypes = {
        createElement: PropTypes.func,
    }
    createLeftElement = () => {
        if (this.props.leftElement) {
            return this.props.leftElement;
        }
        if (this.props.canBack) {
            return <HeadBackButton />;
        }
        return null;
    }
    createTitleElement = () => {
        if (this.props.titleElement) {
            return this.context.createElement(this.props.titleElement);
        }
        if (this.props.title) {
            return <HeadTitle style={[this.props.titleMode === 'flex' ? styles.flexTitle : styles.absoluteTitle, this.props.titleStyle]} title={this.props.title} />;
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
    render() {
        return (
            <View style={[styles.header, this.props.headerStyle]}>
                {this.createLeftElement()}
                {this.createTitleElement()}
                {this.createRightElement()}
            </View>
        )
    }
}

@withNavigation
class HeadBackButton extends PureComponent {
    onPress = () => {
        this.props.navigation.goBack(null);
    }
    render() {
        return (
            <HeaderBackButton onPress={this.onPress} />
        )
    }
}

class HeadTitle extends PureComponent {
    static defaultProps = {

    }
    render() {
        return (
            <View style={[styles.title, this.props.style]}><Text>{this.props.title}</Text></View>
        )
    }
}

Object.assign(Header, {
    HeadBackButton,
    HeadTitle,
});

export default withNavigation(Header);
