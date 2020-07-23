import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Popover } from 'antd-mobile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MetaBillFormWrap } from 'yes-intf';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Popup from 'rmc-picker/es/Popup';
import { PickerView } from 'antd-mobile';
import { ScreenStackHeaderRightView } from 'react-native-screens';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 11,
    },
    icon: {
        paddingLeft: 7,
    }
});
/**
 * 在单据中包含起始时间和结束时间的情况下，模拟一个日期范围选择的功能
 * 当日，一周，一月，三月，半年，一年
 */
const items = [{
    label: '无限制',
    value: 'no limit'
}, {
    label: '当天',
    value: 'current day',
}, {
    label: '一周',
    value: 'last week',
}, {
    label: '一月',
    value: 'last month',
}, {
    label: '一季',
    value: 'last quarter',
}, {
    label: '半年',
    value: 'last half year',
}, {
    label: '一年',
    value: 'last year',
}];
class PickerView1 extends PureComponent {
    state = {
        value: this.props.value,
    }
    getValue = () => {
        return this.state.value;
    }
    onChange = (v) => {
        this.setState({
            value: v,
        });
    }
    render() {
        return (
            <PickerView {...this.props} onChange={this.onChange} value={this.state.value} />
        )
    }
}
@MetaBillFormWrap
export default class DateRangeSelect extends PureComponent {
    static contextTypes = {
        onValueChange: PropTypes.func,
        getContextComponent: PropTypes.func,
    }
    static defaultProps = {
        showIcon: true,
    }
    state = {
        showPopup: false,
        value: this.props.value,
        displayValue: this.getCaption(this.props.value),
    }
    getCaption(v) {
        const selectItem = items.find(item => item.value === v);
        if (selectItem) {
            return selectItem.label;
        }
        return '';
    }
    componentWillReceiveProps(props) {
        // if(props.formStatus==='ok' && this.props.formStatus!=='ok') {
        if (this.state.value) {
            this.requestChange(this.state.value);
        } else {
            const startDate = this.context.getContextComponent(this.props.startDateField);
            const endDate = this.context.getContextComponent(this.props.endDateField);
            const startV = startDate.getValue();
            const endV = endDate.getValue();
            if (!startV && !endV) {
                this.setState({
                    value: 'no limit',
                    displayValue: '无限制'
                });
                return;
            }
            const mStartV = moment(startV);
            const mEndV = moment(endV);
            const days = mEndV.diff(mStartV, 'days')
            if (days <= 1) {
                this.setState({
                    displayValue: '当天',
                    value: 'current day',
                });
            }
            if (days <= 7 && days >= 6) {
                this.setState({
                    displayValue: '一周',
                    value: 'last week',
                });
            }
            if (days <= 31 && days >= 28) {
                this.setState({
                    displayValue: '一月',
                    value: 'last month',
                });
            }
            if (days <= 93 && days >= 88) {
                this.setState({
                    displayValue: '一季',
                    value: 'last quarter',
                });
            }
            if (days <= 183 && days >= 180) {
                this.setState({
                    displayValue: '半年',
                    value: 'last half year',
                });
            }
            if (days <= 366 && days >= 360) {
                this.setState({
                    displayValue: '一年',
                    value: 'last year',
                });
            }
        }
        // }
    }
    componentWillMount() {
        if (this.props.status === 2) {
            if (this.state.value) {
                this.requestChange(this.state.value);
            } else {
                const startDate = this.context.getContextComponent(this.props.startDateField);
                const endDate = this.context.getContextComponent(this.props.endDateField);
                const startV = startDate.getValue();
                const endV = endDate.getValue();
                if (!startV && !endV) {
                    this.setState({
                        value: 'no limit',
                        displayValue: '无限制'
                    });
                    return;
                }
                const mStartV = moment(startV);
                const mEndV = moment(endV);
                const days = mEndV.diff(mStartV, 'days')
                if (days <= 1) {
                    this.setState({
                        displayValue: '当天',
                        value: 'current day',
                    });
                }
                if (days <= 7 && days >= 6) {
                    this.setState({
                        displayValue: '一周',
                        value: 'last week',
                    });
                }
                if (days <= 31 && days >= 28) {
                    this.setState({
                        displayValue: '一月',
                        value: 'last month',
                    });
                }
                if (days <= 93 && days >= 88) {
                    this.setState({
                        displayValue: '一季',
                        value: 'last quarter',
                    });
                }
                if (days <= 183 && days >= 180) {
                    this.setState({
                        displayValue: '半年',
                        value: 'last half year',
                    });
                }
                if (days <= 366 && days >= 360) {
                    this.setState({
                        displayValue: '一年',
                        value: 'last year',
                    });
                }
            }
        }
    }
    onVisibleChange = (visible) => {
        this.setState({
            showPopup: visible,
        })
    }
    requestChange = async (v) => {
        const { startDateField, endDateField } = this.props;
        let endDate = new Date();
        let startDate = endDate;
        const momentDate = moment(endDate);
        switch (v) {
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
            case 'no limit':
                startDate = null;
                endDate = null;
        }
        await this.context.onValueChange(startDateField, startDate);
        await this.context.onValueChange(endDateField, endDate);
        this.props.onChange && this.props.onChange();
    }
    onValueChange = async ([v]) => {
        await this.requestChange(v);
        this.setState({
            showPopup: false,
            value: v,
            displayValue: this.getCaption(v),
        });
    }
    render() {
        const { placeholder, openTextStyle, openIconStyle, style, showIcon } = this.props;
        const picker = (
            <PickerView1
                data={items}
                cols={1}
                cascade={false}
                value={[this.state.value]}
                title={this.props.caption}
            />
        );
        return (
            <View style={styles.container, style}>
                <TouchableOpacity onPress={() => this.onVisibleChange(true)}>
                    <View style={styles.content}>
                        <Text style={[styles.text, this.state.showPopup ? openTextStyle : null]}>{this.state.displayValue || placeholder}</Text>
                        {
                            showIcon ? <Icon
                                style={[styles.icon, this.state.showPopup ? openIconStyle : null]}
                                name={this.state.showPopup ? "angle-up" : "angle-down"} size={16} /> : null
                        }
                    </View>
                </TouchableOpacity>
                <Popup
                    className="ioslikepopup"
                    picker={picker}
                    visible={this.state.showPopup}
                    placeholder="选择月份"
                    onOk={this.onValueChange}
                    onDismiss={() => this.onVisibleChange(false)}
                    okText="确定"
                    dismissText="取消"
                />
            </View>
        );
    }
}
