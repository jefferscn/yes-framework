import React, { PureComponent } from 'react';
import { NavBar, Modal } from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableHighlight, ScrollView, ActivityIndicator, Text } from 'react-native';
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
        flexDirection: 'row',
        backgroundColor: 'aliceblue',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
    },
    content: {
        flex: 1
    },
    dictitem: {
        flexDirection: 'row',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        alignItems: 'center',
    },
    dictitemtext: {
        textAlign: 'left',
        flex: 1,
    },
    dictitemcheck: {
        width: 30,
        color: 'blueviolet',
    },
    content: {
        flex: 1,
    },
    crumbtext: {
        color: 'rgb(33, 150, 243)',
    },
    confirm: {
        fontSize: 24,
        color: 'white',
    },
});

const DictCrumb = ({ item, onPress }) => {
    const onPress_ = () => {
        onPress && onPress(item);
    }
    return (
        <TouchableHighlight onPress={onPress_}>
            <View style={styles.crumb}>
                <Text style={styles.crumbtext}>{item.Name}</Text>
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
        const { path } = this.props;
        return (
            <View style={styles.crumbs}>
                {
                    path.map((item) => <DictCrumb item={item} onPress={this.props.onPress} />)
                }
            </View>
        )
    }
}

const DictItem = ({ item, onPress, checked }) => {
    const { NodeType } = item;
    const onDictItemPress = () => {
        onPress && onPress(item);
    }
    return (
        <TouchableHighlight onPress={onDictItemPress}>
            <View style={styles.dictitem}>
                {
                    checked ? <Icon name="check" style={styles.dictitemcheck} /> : null
                }
                <Text style={styles.dictitemtext}>{item.Name}</Text>
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
        const { items, onDictItemSelect, value } = this.props;
        if (!items) {
            return null;
        }
        return <View style={styles.dictitemlist}>
            {
                items.map((item) =>
                    <DictItem checked={item.oid == value} item={item} onPress={onDictItemSelect} />
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
        path: [],
        value: this.props.value,
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
        this.setState({
            loading: true,
        });
        try {
            if (value) {
                //如果有初始值
                //1.读取当前value对应的字典项目的父路径
                const result = await getParentPath(value);
                const path = [];
                // let selectedItem = null;
                //2.加载路径上的所有数据
                for (let item of result[0]) {
                    let itm = item;
                    if (itm.oid == "0") {
                        itm = {
                            oid: "0",
                            itemKey: this.props.itemKey,
                            Name: this.props.caption,
                            NodeType: 1,
                        };
                    } else {
                        itm = this.plainData[itm.oid];
                    }
                    await this.loadChildren(itm);
                    path.push(itm);
                }
                //3.更新state信息
                this.setState({
                    path,
                });
            } else {
                //如果没有初始值，则直接读取根节点数据
                const item = { oid: "0", itemKey: this.props.itemKey, Name: this.props.caption, NodeType: 1 }
                await this.loadChildren(item);
                this.setState({
                    path: [item],
                });

            }
        } catch (ex) {

        } finally {
            this.setState({
                loading: false,
            });
        }
    }
    onSelectItem = async (item) => {
        if (item.NodeType === 1) {//非叶子节点
            if (this.state.path.includes(item)) {//如果选中项目在当前的路径中
                const idx = this.state.path.indexOf(item);
                this.setState({
                    path: this.state.path.slice(0, idx+1),
                });
            } else {//不在当前路径中，则是在当前路径下继续下行一个层次
                this.setState({
                    loading: true,
                });
                try {
                    if(!item.children) {
                        await this.loadChildren(item);
                    }
                    this.setState({
                        path: [...this.state.path, item],
                    });
                } catch (ex) {

                } finally {
                    this.setState({
                        loading: false
                    });
                }
            }
        } else {//叶子节点
            this.setState({
                value: item.oid,
            });
        }
    }
    submitChange= ()=> {
        this.props.onChange(this.state.value);
        this.closeModal();
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
        const { path } = this.state;
        const selectedItem = path.length > 0 ? path[path.length - 1] : null;
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
                        icon={<Icon name="chevron-left" />}
                        onLeftClick={this.closeModal}
                    >
                        {caption}
                    </NavBar>
                    <View
                        style={styles.content}
                    >
                        <DictCrumbs path={this.state.path} root={caption} onPress={this.onSelectItem} />
                        <ScrollView style={styles.content}>
                            {
                                (isVirtual || this.state.loading) ? <ActivityIndicator /> : null
                            }
                            {
                                <DictItemList
                                    items={selectedItem ? selectedItem.children : null}
                                    onDictItemSelect={this.onSelectItem}
                                    value={this.state.value}
                                />
                            }
                        </ScrollView>
                    </View>
                    <NavBar 
                        rightContent={<TouchableHighlight onPress={this.submitChange}><Icon style={styles.confirm} name="check"/></TouchableHighlight>}
                    />
                </View>
            </Modal>
        );
    }
}
