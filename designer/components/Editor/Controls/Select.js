import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Modal, Text, View, ScrollView, ListView, Button, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-material-ui';

@observer
class ListViewBasics extends Component {
    static propTypes = {
        items: PropTypes.object,
        handleValueChange: PropTypes.func,
    };
    dirtyRows = [];
    @observable data = this.props.value
    handleItemPress(e, rowData) {
        if (this.props.multiSelect) {
            if (this.data.includes(rowData.key)) {
                this.data = this.data.reduce((total, item) => {
                    if (item != rowData.key) {
                        total.push(item);
                    }
                }, []);
            } else {
                this.data.push(rowData.key);
            }
        } else {
            this.props.handleValueChange(rowData.key, rowData.caption);
        }
    }
    renderRow = (rowData) => {
        const key = rowData.key;
        return (
            <ListItem
                centerElement={rowData.caption}
                rightElement={this.props.value && this.props.value.includes(key) ? 'done' : <View style={{ minHeight: 48 }} />}
                onPress={(e) => this.handleItemPress(e, rowData)}
                onRightElementPress={(e) => this.handleItemPress(e, rowData)}
                divider
            />
        );
    };
    componentWillMount() {
        if (this.props.value) {
            this.dirtyRows = this.props.value;
        }
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                const result = r1 !== r2 || this.dirtyRows.includes('' + r1.oid) || this.dirtyRows.includes('' + r2.oid)
                return result;
            },
        });
        let dataSource;
        if (this.props.items) {
            dataSource = ds.cloneWithRows(this.props.items);
        } else {
            dataSource = ds.cloneWithRows([]);
        }
        this.setState({
            dataSource,
        });
    }
    componentWillReceiveProps(props, contet) {
        this.data = props.value;
        this.dirtyRows = Array.concat(this.props.value, props.value);
        let dataSource = this.state.dataSource;

        if (props.items) {
            dataSource = dataSource.cloneWithRows(props.items);
        } else {
            dataSource = dataSource.cloneWithRows([]);
        }
        this.setState({
            dataSource,
            items: props.items,
        });
    }
    render() {
        return (
            <View style={this.props.style}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            </View>
        );
    }
}

export default (getItemsList) => {
    @inject('store')
    @observer
    class BaseSelect extends Component {
        static contextTypes = {
            getBillForm: PropTypes.func,
        }

        defaultProps = {
            controlType: null,
            multiSelect: false,
        }
        @observable modalShow = false;
        @observable items = null;
        getItemList = async () => {
            this.items = await getItemsList(this.context, this.props);
        }

        handleValueChange = (key, caption) => {
            if (!this.props.multiSelect) {
                this.props.onChange(key);
                this.modalShow = false;
            }
        }

        onPress = () => {
            this.modalShow = true;
        }

        closeModal = () => {
            this.modalShow = false;
        }

        getDisplayValue = () => {
            const val = this.props.value;
            if (val) {
                if (typeof val === 'string') {
                    return val;
                }
                if (Array.isArray(val)) {
                    return val.join(',');
                }
            }
            return null;
        }

        onConfirm = () => {
            this.closeModal();
        }

        onCancel = () => {
            if (this.props.multiSelect) {
                this.props.onChange(this.data);
            }
            this.closeModal();
        }

        componentWillMount() {
            this.getItemList();
        }

        // componentWillUpdate() {
        //     this.getItemList();
        // }

        render() {
            // const data = this.getItemList();
            return <View onClick={this.onPress} style={this.props.style}>
                <Text>{this.props.value}</Text>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.items ? this.modalShow : false}
                    onRequestClose={this.closeModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 500, height: '80%' }}>
                            <ScrollView style={{ flex: 1 }}>
                                <ListViewBasics
                                    items={this.items}
                                    multiSelect={this.props.multiSelect}
                                    handleValueChange={this.handleValueChange}
                                    value={this.data}
                                />
                            </ScrollView>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        onPress={this.onConfirm}
                                        title="确定"
                                    /></View>
                                <View style={{ flex: 1 }}>
                                    <Button
                                        onPress={this.onCancel}
                                        title="取消"
                                    /></View>
                            </View>
                        </View></View>
                </Modal>
            </View>
        }
    }
    return BaseSelect;
}
