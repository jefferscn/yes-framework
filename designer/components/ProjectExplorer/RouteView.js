import React, { Component } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { observable, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { List, ListItem } from 'material-ui/List';
import Element from '../Framework/Element';
import PropTypes from 'prop-types';
import CellLayoutEditor from '../Editor/CellLayoutEditor';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentClear from 'material-ui/svg-icons/content/clear';
import beautify from "json-beautify";
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';

// let SelectableList = makeSelectable(List);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    design: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red',
        backgroundColor: 'lightgray',
    },
    addPage: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'green',
        backgroundColor: 'lightgreen',
    }
});

const editor = [{
        type: 'Text',
        key: 'key',
        caption: '名称',
    }, {
        type: 'Combobox',
        key: 'type',
        caption: '类型',
        items: [
            {
                key: 'control',
                text: 'React控件',
            }, {
                key: 'tab',
                text: '多页',
            }, {
                key: 'billform',
                text: 'YIGO单据',
            }
        ],
    }, {
        type: 'Text',
        key: 'path',
        caption: '路径',
        visibleEqual: {
            relateId: ['tabScreen'],
            value: [false],
        },
    }, {
        type: 'Toggle',
        key: 'isRoot',
        caption: '是否根路由'
    }, {
        type: 'SubForm',
        key: 'control',
        isGroup: true,
        visibleEqual: {
            relateId: ['type'],
            value: ['control'],
        },
        control: Element
    }, {
        type: 'Combobox',
        key: 'tabPosition',
        caption: 'Tab位置',
        items: [
            {
                key: 'top',
                text: '屏幕上方',
            }, {
                key: 'bottom',
                text: '屏幕下方',
            }
        ],
        visibleEqual: {
            relateId: ['type'],
            value: ['tab'],
        },
    }, {
        type: 'Toggle',
        key: 'showIcon',
        caption: '是否显示图标',
        visibleEqual: {
            relateId: ['type'],
            value: ['tab'],
        },
    }, {
        type: 'Toggle',
        key: 'showLabel',
        caption: '是否显示文本',
        visibleEqual: {
            relateId: ['type'],
            value: ['tab'],
        },
    },{
        type: 'Color',
        key: 'indicatorColor',
        caption: '指示条颜色',
        visibleEqual: {
            relateId: ['type'],
            value: ['tab'],
        },
    }, {
        type: 'Color',
        key: 'backgroundColor',
        caption: '背景色',
        visibleEqual: {
            relateId: ['type'],
            value: ['tab'],
        },
    }, {
        type: 'Color',
        key: 'activeTintColor',
        caption: '活动页前景色',
        visibleEqual: {
            relateId: ['type'],
            value: ['tab'],
        },
    }, {
        type: 'Color',
        key: 'inactiveTintColor',
        caption: '非活动页前景色',
        visibleEqual: {
            relateId: ['type'],
            value: ['tab'],
        },
    }, {
        type: 'Icon',
        key: 'icon',
        caption: '图标',
        visibleEqual: {
            relateId: ['type'],
            value: ['tab'],
        },
        visibleEqual: {
            relateId: ['tabScreen'],
            value: [true],
        },
    }, {
        type: 'Text',
        key: 'label',
        caption: 'Tab文本',
        visibleEqual: {
            relateId: ['tabScreen'],
            value: [true],
        },
    }, {
        type: 'Text',
        key: 'formKey',
        caption: 'Yigo单据Key',
        visibleEqual: {
            relateId: ['type'],
            value: ['billform'],
        },
    }, {
        type: 'Text',
        key: 'oid',
        caption: 'Yigo单据oid',
        visibleEqual: {
            relateId: ['type'],
            value: ['billform'],
        },
    }, {
        type: 'Combobox',
        key: 'status',
        caption: '单据状态',
        items: [
            {
                key: 'NORMAL',
                text: 'NORMAL',
            }, {
                key: 'EDIT',
                text: 'EDIT',
            }, {
                key: 'NEW',
                text: 'NEW',
            }
        ],
        visibleEqual: {
            relateId: ['type'],
            value: ['billform'],
        },
    }, {
        type: 'Button',
        caption: '打开单据',
        hideTitle: true,
        script: function(context) {
            window.parent.postMessage({
                type: 'Open',
                formKey: context.getValue('formKey'),
                oid: context.getValue('oid'),
                status: context.getValue('status'),
            })
        },
        visibleEqual: {
            relateId: ['type'],
            value: ['billform'],
        },
    },
]

@inject('store')
@observer
class RouteList extends Component {
    @observable selectedIndex = -1;
    @observable meta = this.props.meta;
    selectItem = (item) => {
        this.props.store.selectControl(item, editor);
    }
    addItem = () => {
        return this.props.addRoute && this.props.addRoute();
    }
    addChildItem = (item) => {
        return this.props.addPage && this.props.addPage(item);
    }
    renderTabPage = (level) => (item, index) => {
        if (item.type === 'tab') {
            return (
                <ListItem
                    onClick = {()=>this.selectItem(item)}
                    value={index}
                    primaryText={item.key}
                    leftIcon={<ContentClear onClick={() => this.props.removeRoute(index)} />}
                    secondaryText={<p><span>类型：{item.type}</span><br /><span>是否根路由：{item.isRoot?'是':'否'}</span></p>}
                    secondaryTextLines={2}
                    style={{ zIndex: 0 }}
                    nestedItems={[...item.tabs.map(this.renderTabPage(level+1)), <TouchableOpacity onPress={() => this.addChildItem(item)} >
                        <View style={styles.addPage}>
                            <AwesomeFontIcon name="plus" />
                        </View>
                    </TouchableOpacity>]}
                    rightIcon={item.isRoot ? <ActionGrade /> : null}
                />
            );
        }
        return (
            <ListItem
                value={index}
                onClick = {()=>this.selectItem(item)}
                primaryText={item.key}
                leftIcon={<ContentClear onClick={() => this.props.removeRoute(index)} />}
                secondaryText={<p><span>类型：{item.type}</span><br /><span>是否根路由：{item.isRoot?'是':'否'}</span></p>}
                secondaryTextLines={2}
                style={{ zIndex: 0 }}
                rightIcon={item.isRoot ? <ActionGrade /> : null}
            />
        );
    }
    renderItem = (item, index) => {
        if (item.type === 'tab') {
            return (
                <ListItem
                    value={index}
                    onClick = {()=>this.selectItem(item)}
                    primaryText={item.key}
                    leftIcon={<ContentClear onClick={() => this.props.removeRoute(index)} />}
                    secondaryText={<p><span>类型：{item.type}</span><br /><span>是否根路由：{item.isRoot?'是':'否'}</span></p>}
                    secondaryTextLines={2}
                    style={{ zIndex: 0 }}
                    nestedItems={[...item.tabs.map(this.renderTabPage(0)), <TouchableOpacity onPress={() => this.addChildItem(item)} >
                        <View style={styles.addPage}>
                            <AwesomeFontIcon name="plus" />
                        </View>
                    </TouchableOpacity>]}
                />
            );
        }
        return (
            <ListItem
                onClick = {()=>this.selectItem(item)}
                value={index}
                primaryText={item.key}
                leftIcon={<ContentClear onClick={() => this.props.removeRoute(index)} />}
                secondaryText={<p><span>类型：{item.type}</span><br /><span>是否根路由：{item.isRoot?'是':'否'}</span></p>}
                secondaryTextLines={2}
                style={{ zIndex: 0 }}
            />
        );
    }
    render() {
        return (
            <List
                style={{ width: 375 }}
                value={this.selectedIndex}
                onChange={this.onChange}
            >
                {
                    this.props.meta.map(this.renderItem)
                }
                <TouchableOpacity onPress={this.addItem} >
                    <View style={styles.design}>
                        <AwesomeFontIcon name="plus" />
                    </View>
                </TouchableOpacity>
            </List>
        )
    }
}

@inject('store')
@observer
class RouteViewer extends Component {
    @observable meta = null;
    @observable loading = true;
    static childContextTypes = {
        onMetaChange: PropTypes.func,
    }
    getChildContext() {
        return {
            onMetaChange: this.onMetaChange,
        }
    }
    onMetaChange = () => {
        const { selected } = this.props.store;
        selected.commitContent(beautify(toJS(this.meta), null, 4, 100));
    }
    refreshFrame = () => {
        this.frame && this.frame.contentWindow.location.reload();
    }
    addPage = (item) => {
        item && item.tabs.push({
            key: '',
            tabScreen: true,
            path: '',
            type: 'control',
            control: {},
            tabs: [],
        });

    }
    addRoute = () => {
        this.meta.push({
            key: '',
            tabScreen: false,
            path: '',
            type: 'control',
            control: {},
            tabs: [],
        });
    }
    removeRoute = (index) => {
        this.meta.splice(index, 1);
    }
    async componentDidMount() {
        try {
            if (!this.props.store.selected.loaded) {
                await this.props.store.selected.reloadContent();
            }
            this.meta = JSON.parse(this.props.store.selected.content);
            this.loading = false;
        } catch (ex) {
            console.log(ex);
        }
    }
    componentWillUnmount() {
        if (this.frame) {
            this.frame.parentNode.removeChild(this.frame);
        }
    }
    render() {
        if (this.loading) {
            return null;
        }
        return (<View style={styles.container}>
            <View>
                <iframe
                    ref={(ref) => this.frame = ref}
                    src={`/designer`}
                    width="375"
                    height="667"
                />
                <Button
                    onPress={this.refreshFrame}
                    title="刷新"
                />
            </View>
            <RouteList addRoute={this.addRoute} addPage={this.addPage} removeRoute={this.removeRoute} meta={this.meta} />
            <View>
                <CellLayoutEditor store={this.props.store} />
            </View>
        </View>);
    }
}

export default RouteViewer;
