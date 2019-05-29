import React, { Component } from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { observable, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Element from '../../../src/template/Element';
import PropTypes from 'prop-types';
import CellLayoutEditor from '../Editor/CellLayoutEditor';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import beautify from "json-beautify";
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';

let SelectableList = makeSelectable(List);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    design: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const editor = [
    {
        type: 'Text',
        key: 'key',
        caption: '唯一标识',
    },
    {
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
        type: 'RouteSelect',
        key: 'tabs',
        caption: '界面选择',
        visibleEqual: {
            relateId: ['type'],
            value: ['tab'],
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
    },
]

@inject('store')
@observer
class RouteList extends Component {
    @observable selectedIndex = -1;
    @observable meta = this.props.meta;
    onChange = (event, index) => {
        this.selectedIndex = index;
        this.props.store.selectControl(this.meta[index], editor);
    }
    addItem = () => {
        return this.props.addRoute && this.props.addRoute();
    }
    render() {
        return (
            <SelectableList
                style={{ width: 375 }}
                value={this.selectedIndex}
                onChange={this.onChange}
            >
                {
                    this.props.meta.map((item, index) => {
                        return (
                            <ListItem
                                value={index}
                                primaryText={item.path}
                                secondaryText={item.type}
                                style={{ zIndex: 0 }}
                                rightIcon={item.isRoot ? <ActionGrade /> : null}
                            />
                        );
                    })
                }
                <TouchableOpacity onPress={this.addItem} >
                    <View style={styles.design}>
                        <AwesomeFontIcon name="plus" />
                    </View>
                </TouchableOpacity>
            </SelectableList>
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
    refreshFrame = ()=> {
        this.frame && this.frame.contentWindow.location.reload();
    }
    addRoute = () => {
        this.meta.push({
            key: '',
            path: '',
            type: 'control',
            control: {},
            tabs: [],
        });
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
            <RouteList addRoute={this.addRoute} meta={this.meta} />
            <View>
                <CellLayoutEditor />
            </View>
        </View>);
    }
}

export default RouteViewer;
