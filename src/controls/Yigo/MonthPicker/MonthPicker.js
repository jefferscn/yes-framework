import React, { PureComponent } from 'react';
import { TriggerControlWrap } from 'yes-comp-react-native-web';
import { ControlWrap } from 'yes-intf';
import Popup from 'rmc-picker/es/Popup';
import { PickerView } from 'antd-mobile';

const buildYearData = (startYear, endYear) => {
    const result = [];
    for (let year = startYear; year <= endYear; year++) {
        result.push({
            value: year,
            label: year + '',
        });
    }
    return result;
};

const yearData = buildYearData(1900, 2050);
const monthData = buildYearData(1, 12);

const data = [
    yearData,
    monthData,
];

class PickerView1 extends PureComponent {
    state = {
        value: this.props.value,
    }
    getValue = () => {
        return this.state.value;
    }
    onChange = (v)=> {
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

class MonthPicker extends PureComponent {
    handleCloseModal = () => {
        if (!this.props.disabled && !this.props.inline) {
            this.props.onChangePopupState(false);
        }
    }
    handleDateChange = ([year, month]) => {
        this.props.onChange(year* 100 + month);
        this.handleCloseModal();
    }
    render() {
        const { onlyDate, modalVisible, controlState, inline, value } = this.props;
        const dt = new Date();
        let v= [dt.getFullYear(), dt.getMonth() + 1];
        if(value) {
            v= [Math.floor(value/100), value-Math.floor(value/100)* 100] 
        }
        if (inline) {
            return <PickerView1
                data={data}
                title="选择月份`"
                cols={2}
                cascade={false}
                value={v}
                onPickerChange={this.handleDateChange}
            />;
        }
        const picker = (
            <PickerView1
                data={data}
                cols={2}
                cascade={false}
                value={v}
                title="选择月份"
            />
        );
        return (
            <Popup
                picker={picker}
                visible={modalVisible}
                date={value}
                placeholder="选择月份"
                // onPickerChange={this.handleDateChange}
                onOk={this.handleDateChange}
                onDismiss={this.handleCloseModal}
            />
        );
    }
}

export default ControlWrap(TriggerControlWrap(MonthPicker));
