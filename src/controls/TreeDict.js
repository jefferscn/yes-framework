import React, { PureComponent } from 'react';
import { NavBar, Icon, Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableHighlight, ActivityIndicator, Text } from 'react-native';
import { DictWrap } from 'yes-intf';
import { TriggerControlWrap } from 'yes-comp-react-native-web';

const styles = StyleSheet.create({
    crumb: {
        flexDirection: 'row',
    },
    modal: {
        height: '100%',
    },
    crumbs: {
        height: 40,
        backgroundColor: 'aliceblue',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 12,
        paddingRight: 12,
    },
    content: {
        flex: 1
    },
});

const DictCrumb = ({ item, onPress }) => {
    onPress = () => {
        onPress && onPress(item);
    }
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.crumb}>
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
    onPressRoot = () => {
        this.props.onPress && this.props.onPress();
    }
    render() {
        const { root, path } = this.props;
        return (
            <View style={styles.crumbs}>
                <DictCrumb item={{ text: root }} onPress={this.props.onPress} />
                {
                    path.map((item) => <DictCrumb item={item} onPress={this.props.onPress} />)
                }
            </View>
        )
    }
}

const DictItem = ({ item, onPress }) => {
    const { NodeType } = item;
    const onDictItemPress = () => {
        onPress && onPress(item);
    }
    return (
        <TouchableHighlight onPress={onDictItemPress}>
            <View style={styles.dictitem}>
                <Text>{item.text}</Text>
                {
                    NodeType === 1 ? <Icon name="chevron-right" /> : null
                }
            </View>
        </TouchableHighlight>
    )
}
/**
 * 字典项目列表
 */
class DictItemList extends PureComponent {
    render() {
        const { items, onDictItemSelect } = this.props;
        <View style={styles.dictitemlist}>
            {
                items.map((item) =>
                    <DictItem item={item} onPress={onDictItemSelect} />
                )
            }
        </View>
    }
}

@DictWrap
@TriggerControlWrap
export default class TreeDict extends PureComponent {
    static contextTypes = {
        getTopPadding: PropTypes.func,
    }
    state = {
        data: null,
        loading: false,
        loadingItem: null,
        path: [{ oid: "0", itemKey: this.props.itemKey, caption: this.props.caption, NodeType: 1 }],
        selectedItem: { oid: "0", itemKey: this.props.itemKey, caption: this.props.caption, NodeType: 1 },
    }
    plainData = null
    async loadChildren(item) {
        const { loadChildren } = this.props;
        const result = await loadChildren(item.oid);
        item.children = result;
        const dt = {};
        result.forEach((itm) => {
            dt[itm.oid] = itm;
        });
        this.plainData = { ...this.plainData, ...dt };
    }
    closeModal = () => {
        this.props.onChangePopupState(false);
    }
    /**
     * 加载指定项目的父节点的所有数据
     */
    loadParent = (item) => {

    }
    /**
     * 需要根据输入的value值加载字典树数据
     */
    async componentDidMount() {
        const { value, getParentPath } = this.props;
        if (value) {
            //如果有初始值
            //1.读取当前value对应的字典项目的父路径
            const result = await getParentPath(value);
            const path = [];
            let selectedItem = null;
            //2.加载路径上的所有数据
            for (let item of result) {
                let itm = item;
                if (itm.oid === "0") {
                    itm = {
                        oid: "0",
                        itemKey: this.props.itemKey,
                        caption: this.props.caption,
                        NodeType: 1,
                    };
                }
                await this.loadChildren(itm);
            }
            selectedItem = path[path.length - 1];
            //3.更新state信息
            this.setState({
                path,
                selectedItem,
            });
        } else {
            //如果没有初始值，则直接读取根节点数据
        }
    }
    onSelectCrumb = (item) => {

    }
    render() {
        const { inline, modalVisible, isVirtual, caption } = this.props;
        //如果是内联模式则不需要显示一个模态控件
        if (inline) {
            return null;
        }
        let needTopPadding = false;
        if (this.context.getTopPadding && this.context.getTopPadding() > 0) {
            needTopPadding = true;
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
                    >
                        {caption}
                    </NavBar>
                    <View
                        style={styles.content}
                    >
                        <DictCrumbs path={this.state.path} root={caption} onPress={this.onSelectCrumb} />
                        <View style={styles.content}>
                            {
                                (isVirtual || this.state.loading) ? <ActivityIndicator /> : null
                            }
                            {

                            }
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
