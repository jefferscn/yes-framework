import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { HeaderBackButton } from 'react-navigation';
import Element, { isElementNull } from '../template/Element';
import designable from '../../designer/utils/designable';
import { observer } from 'mobx-react';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
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

const defaultValue = {
    canBack: true,
    title: '',
    titleElement: Element.defaultValue,
    leftElement: Element.defaultValue,
    rightElement: Element.defaultValue,
}
const editor = [
    {
        type: 'Toggle',
        key: 'canBack',
        caption: '是否显示返回',
    },
    {
        type: 'Text',
        key: 'title',
        caption: '抬头',
    }, {
        type: 'SubForm',
        key: 'titleElement',
        isGroup: true,
        control: Element,
    }
]
@designable(defaultValue, editor)
@observer
class Header extends PureComponent {
    static defaultProps = {
        titleMode: 'flex',//flex=使用 flex布局，absolute=使用absolute布局
        canBack: true,
    }
    createLeftElement = () => {
        if (!isElementNull(this.props.leftElement)) {
            return this.props.leftElement;
        }
        if (this.props.canBack) {
            return <HeadBackButton />;
        }
        return null;
    }
    createTitleElement = () => {
        if (!isElementNull(this.props.titleElement)) {
            return <Element meta = {this.props.titleElement} />;
        }
        if (this.props.title) {
            return <HeadTitle style={[this.props.titleMode === 'flex' ? styles.flexTitle : styles.absoluteTitle, this.props.titleStyle]} title={this.props.title} />;
        }
        return null;
    }
    createRightElement = () => {
        if (!isElementNull(this.props.rightElement)) {
            return <Element meta = {this.props.rightElement} />;
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

Header.category = 'template';

export default Header;
