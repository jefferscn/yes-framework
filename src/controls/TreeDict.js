import React, { PureComponent } from 'react';
import { NavBar, Icon, SearchBar, Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';

const styles = StyleSheet.create({
    crumb: {
        flexDirection: 'row',
    }
});

const DictCrumb = ({ item, onPress }) => {
    onPress = () => {
        this.props.onPress && this.props.onPress(this.props.item);
    }
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.crubm}>
                <Text>{item.text}</Text>
                <Text>/</Text>
            </View>
        </TouchableHighlight>
    )
}
/**
 * 用于显示当前选择的项目的路径
 */
class DictCrumbs extends PureComponent {
    render() {
        const { root, path } = this.props;
        return (
            <View style={styles.crumbs}>
                {
                    path.map((item) => <DictCrumb text={item} onPress={this.props.onPress} />)
                }
            </View>
        )
    }
}

export default class TreeDict extends PureComponent {
    state = {
        data: [],
        loading: false,
        loadingItem: null,
        path: [],
    }
    async loadChildren(item) {
        const { loadChildren } = this.props;
        return await loadChildren(item.oid);
    }
    closeModal = () => {
        this.props.onChangePopupState(false);
    };
    goto = (path) => {

    }
    render() {
        const { inline, modalVisible, isVirtual } = this.props;
        //如果是内联模式则不需要显示一个模态控件
        if (inline) {
            return null;
        }
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                maskClosable={false}
                visible={modalVisible}
                onClose={this.closeModal}
            >
                <View
                    style={styles.modal}
                >
                    <NavBar
                        className={needTopPadding ? 'nav-toppadding' : ''}
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={this.closeModal}
                        rightContent={rightElement}
                    >
                        {caption}
                    </NavBar>
                    <View
                        style={styles.content}
                    >
                        <DictCrumbs path={this.state.path} root={''} />
                        <View>
                            {
                                (isVirtual || this.state.loading) ? <ActivityIndicator /> : null
                            } 
                        </View> 
                    </View>
                </View>
            </Modal>
        );
    }
}
