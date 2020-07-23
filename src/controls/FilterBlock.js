import React, { PureComponent } from 'react';
// import SegementCombobox from '../../controls/SegementCombobox';
import Element from '../template/Element';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, Button } from 'react-native';
import { Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import CellLayoutTemplate from '../template/TabTemplate/CellLayoutTemplate';

class FilterButton extends PureComponent {
    static contextTypes = {
        onControlClick: PropTypes.func,
        onValueChange: PropTypes.func,
    }
    static defaultProps = {
        showModal: false,
    }
    state = {
        showModal: this.props.showModal,
    }
    onClose = () => {
        this.setState({
            showModal: false,
        })
    }
    showModal = () => {
        this.setState({
            showModal: true,
        })
    }
    onClearCondition = () => {
        this.props.items.forEach((item) => {
            if (typeof item === 'string') {
                this.context.onValueChange(item, null);
            }
        })
    }
    onQuery = () => {
        this.context.onControlClick(this.props.queryButton);
        this.setState({
            showModal: false,
        })
    }
    render() {
        const { style, items } = this.props;
        return (<View style={[styles.filterButton]}>
            <Icon onPress={this.showModal} name="filter" size="16" />
            <Modal
                popup
                visible={this.state.showModal}
                onClose={this.onClose}
                animationType="slide-up"
            >
                <View style={styles.condition}>
                    <View></View>
                    <CellLayoutTemplate items={items} />
                    <View style={styles.action}>
                        <View style={styles.button}>
                            <Button title="重置" style={styles.inverseButton} onPress={this.onClearCondition}></Button>
                        </View>
                        <View style={styles.seperator1}></View>
                        <View style={styles.button}>
                            <Button title="查询" onPress={this.onQuery}></Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>)
    }
}
/**
 * 用于显示流水单据的查询模块
 */
export default class FilterBlock extends PureComponent {
    static contextTypes = {
        onControlClick: PropTypes.func,
        onValueChange: PropTypes.func,
    }
    static defaultProps = {
        hasMore: false,
    }
    onConditionChange = (yigoid, v) => {
        const { queryButton } = this.props;
        if (queryButton) {
            this.context.onControlClick(queryButton);
        }
    }
    async componentWillReceiveProps(props) {
        if (props.formStatus === 'ok' && this.props.formStatus !== 'ok') {
            const { defaultValue, queryButton } = props;
            if (defaultValue) {
                for (let key in defaultValue) {
                    await this.context.onValueChange(key, defaultValue[key]);
                }
                await this.context.onControlClick(queryButton);
            }
        }
    }
    render() {
        const { filterItems, comboboxId, hasMore, moreItems, queryButton, style } = this.props;
        return (
            <View style={[styles.container, style]}>
                <View style={styles.filterContainer}>
                    {
                        filterItems.map(item => <Element onChange={this.onConditionChange} meta={item} />)
                    }
                </View>
                {/* <SegementCombobox onChange={this.onComboboxChange} style={{ flex: 1 }} yigoid={comboboxId} /> */}
                {
                    hasMore ? <View style={styles.seperator} /> : null
                }
                {
                    hasMore ? <FilterButton items={moreItems} queryButton={queryButton} /> : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    action: {
        flexDirection: 'row',
    },
    button: {
        // color: '#2196f3',
        // borderWidth: 1,
        // borderColor: '#2196f3',
        // backgroundColor: 'white',
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        // boxShadow: 'inset 1px -4px 4px lightgrey',
    },
    filterContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    seperator: {
        width: 1,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 10,
        marginBottom: 10,
    },
    seperator1: {
        width: 10
    },
    filterButton: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    condition: {
        padding: 16,
    },
})