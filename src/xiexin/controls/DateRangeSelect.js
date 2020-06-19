import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MetaBillFormWrap } from 'yes-intf';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const { Item } = Popover;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: 'white',
    },
    item: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
    },
    text: {
        color: '#008CD7',
        fontSize: 16,
        paddingRight: 16,
    },
    seperator: {
        width: 1,
        borderColor: '#DCDCDC',
        borderWidth: 1,
        borderStyle: 'solid',
        marginTop: 10,
        marginBottom: 10,
    },
    segementCombobox: {
        flexDirection: 'row',
    },
    segementComboboxItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    segementComboboxText: {
        paddingTop: 12,
        paddingBottom: 10,
    },
    indicator: {
        width: 28,
        paddingTop: 5,
    },
    segementComboboxItemSelected: {
        color: "#800080",
    },
    segementComboboxItemSelected1: {
        backgroundColor: "#800080",
    },

});
/**
 * 在单据中包含起始时间和结束时间的情况下，模拟一个日期范围选择的功能
 * 当日，一周，一月，三月，半年，一年
 */
const items = [{
    text: '当天',
    key: 'current day',
},{
    text: '一周',
    key: 'last week',
},{
    text: '一月',
    key: 'last month',
},{
    text: '一季',
    key: 'last quarter',
},{
    text: '半年',
    key: 'last half year',
},{
    text: '一年',
    key: 'last year',
}];

@MetaBillFormWrap
export default class DateRangeSelect extends PureComponent {
    static contextTypes = {
        onValueChange: PropTypes.func,
    }
    static defaultProps = {
        value: 'last week',
    }
    state = {
        showPopup: false,
        value: this.props.value,
        displayValue: this.getCaption(this.props.value),
    }
    getCaption(v) {
        const selectItem = items.find(item=>item.key===v);
        if(selectItem) {
            return selectItem.text;
        }
        return '';
    }
    componentWillReceiveProps(props) {
        // if(props.formStatus==='ok' && this.props.formStatus!=='ok') {
            this.requestChange(this.state.value);
        // }
    }
    onVisibleChange = (visible)=> {
        this.setState({
            showPopup: visible,
        })
    }
    requestChange = async (v)=> {
        const { startDateField, endDateField } = this.props;
        const endDate = Date.now();
        let startDate = endDate;
        const momentDate = moment(endDate);
        switch(v) {
            case 'last week':
                momentDate.subtract(1, 'w');
                startDate = momentDate.toDate();
                break;
            case 'last month':
                momentDate.subtract(1, 'M');
                startDate = momentDate.toDate();
                break;
            case 'last quarter':
                momentDate.subtract(1, 'Q');
                startDate = momentDate.toDate();
                break;
            case 'last half year':
                momentDate.subtract(6, 'M');
                startDate = momentDate.toDate();
                break;
            case 'last year':
                momentDate.subtract(1, 'y');
                startDate = momentDate.toDate();
                break;
        }
        await this.context.onValueChange(startDateField, startDate);
        await this.context.onValueChange(endDateField, endDate);
        this.props.onChange();
    }
    onValueChange = async (node)=> {
        const v = node.props.value;
        const caption = node.props.caption;
        await this.requestChange(v);
        this.setState({
            showPopup: false,
            displayValue: caption,
        });
    }
    render() {
        const { placeholder } = this.props;
        return (
            <Popover
                visible={this.state.showPopup}
                onVisibleChange={this.onVisibleChange}
                onSelect={this.onValueChange}
                placement="bottom"
                overlay={
                    items.map((item)=><Item key={item.key} value={item.key} caption={item.text}>{item.text}</Item>)
                }
            >
                <View style={[styles.item, styles.segementCombobox]}>
                    <Text style={styles.text}>{this.state.displayValue || placeholder}</Text>
                    <Icon name={this.state.showPopup ? "angle-up": "angle-down"} size={16} />
                </View>
            </Popover>
        )
    }
}
