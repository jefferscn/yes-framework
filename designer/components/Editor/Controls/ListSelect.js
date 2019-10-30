import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable, action, runInAction } from 'mobx';
import { Modal, Text, View, ScrollView, ListView, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-material-ui';
// import SelectField from 'material-ui/SelectField';
import { Icon, Select } from 'antd';
// import MenuItem from 'material-ui/MenuItem';
// import { Select } from 'antd';

const { Option } = Select;
// import ContentClear from 'material-ui/svg-icons/content/clear';

const styles = StyleSheet.create({
    filter: {
        flexDirection: 'row',
    }
});
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
    isRowSelected = (key) => {
        if (this.props.multiSelect) {
            return this.data.includes(key);
        }
        return key == this.data;
    }
    renderRow = (rowData) => {
        const key = rowData.key;
        return (
            <ListItem
                centerElement={rowData.caption}
                rightElement={this.isRowSelected(key) ? 'done' : <View style={{ minHeight: 48 }} />}
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
        if (props.value) {
            this.dirtyRows = [].concat(this.props.value, props.value);
        } else {
            if (props.value) {
                this.dirtyRows = [].concat(this.dirtyRows, props.value);
            }
        }
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

export default (getItemsList, showCategorySelect = false, showDetailSelect = false) => {
    @inject('store')
    @observer
    class BaseSelect extends Component {
        static contextTypes = {
            getBillForm: PropTypes.func,
            getContextComponent: PropTypes.func,
            getControl: PropTypes.func,
            getAllControls: PropTypes.func,
            getComponents: PropTypes.func,
        }

        defaultProps = {
            controlType: null,
            multiSelect: false,
            showCategorySelect: false,
            showDetailSelect: false,
        }
        @observable modalShow = false;
        @observable items = null;
        @observable categories = null;
        @observable details = null;
        @observable selectedCategory = this.props.category;
        @observable selectedDetailType = this.props.detailType;
        @observable selectableDetails = null;
        @observable selectableItems = null;
        @action
        getItemList = async (props) => {
            this.items = await getItemsList(this.context, props);
            const tmp = this.items.reduce((total, item) => {
                (item.category && !total.categories.includes(item.category)) && total.categories.push(item.category);
                (item.detailType && !total.details.includes(item.detailType)) && total.details.push({ category: item.category, detailType: item.detailType });
                return total;
            }, { categories: [], details: [] });
            runInAction(() => {
                this.categories = tmp.categories;
                this.details = tmp.details;
                // if (showCategorySelect) {
                //     if (!this.categories.includes(this.selectedCategory)) {
                //         this.selectedCategory = null;
                //     } else {
                //         this.selectedCategory = this.props.category || this.categories[0];
                //     }
                // }
                // if (showDetailSelect) {
                //     if (!this.selectedCategory.includes(this.selectedDetailType)) {
                //         this.selectedDetailType = null;
                //     } else {
                //         this.selectedDetailType = this.props.detailType || this.selectableDetails[0];
                //     }
                // }
                if (showCategorySelect && this.categories.length > 0) {
                    this.selectCategory(this.selectedCategory || this.props.category || this.categories[0]);
                    if (showDetailSelect && this.selectableDetails.length > 0) {
                        this.selectDetail(this.selectedDetailType || this.props.detailType || this.selectableDetails[0]);
                    }
                } else {
                    this.selectableItems = this.items;
                }
            });
        }

        handleValueChange = (key, caption) => {
            if (!this.props.multiSelect) {
                this.props.onChange(key);
                this.modalShow = false;
            }
        }

        selectCategory = (category) => {
            if (!this.categories.includes(category)) {
                return;
            }
            this.selectedCategory = category;
            this.selectableDetails = this.details.filter((item) => {
                return item.category === category;
            });
            this.selectableItems = this.items.filter((item) => {
                return item.category === category;
            })
        }

        selectDetail = (detail) => {
            if (!this.selectableDetails.includes(detail)) {
                return;
            }
            this.selectedDetailType = detail;
            this.selectableItems = this.items.filter((item) => {
                return item.category === this.category && item.detailType === detail;
            })
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
            this.getItemList(this.props);
        }

        componentWillReceiveProps(props) {
            this.getItemList(props);
        }

        buildSelectField = (items, value, onChange) => {
            if (!items) {
                return null;
            }
            return (<Select dropdownStyle={{ zIndex: 9999 }} defaultValue={value} style={{ width: 120 }} onChange={onChange}>
                {
                    items.map((item) => <Option value={item}>{item}</Option>)
                }
            </Select>);
        }

        clearValue = (e) => {
            this.props.onChange(null);
            e.stopPropagation();
        }

        render() {
            // const data = this.getItemList();
            return <View style={this.props.style}>
                <View onClick={this.onPress} style={{ flexDirection: 'row' }}>
                    <Text style={{ display: 'flex', alignItems: 'center', flex: 1 }}>{this.props.value}</Text>
                    <Icon type="delete" onClick={this.clearValue} />
                </View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.items ? this.modalShow : false}
                    onRequestClose={this.closeModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 500, height: '80%', backgroundColor: 'lightgrey' }}>
                            {(showCategorySelect || showDetailSelect) ? <View style={styles.filter}>
                                {showCategorySelect ? this.buildSelectField(this.categories, this.selectedCategory, this.selectCategory) : null}
                                {showDetailSelect ? this.buildSelectField(this.selectableDetails, this.selectedDetailType, this.selectDetail) : null}
                            </View> : null
                            }
                            <ScrollView style={{ flex: 1 }}>
                                <ListViewBasics
                                    items={this.selectableItems}
                                    multiSelect={this.props.multiSelect}
                                    handleValueChange={this.handleValueChange}
                                    value={this.props.value}
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
                        </View>
                    </View>
                </Modal>
            </View>
        }
    }
    return BaseSelect;
}
