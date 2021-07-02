import React, { PureComponent } from 'react';
import { ComboboxWrap } from 'yes-intf';
import { Popover } from 'antd-mobile';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Popup from 'rmc-picker/es/Popup';
import { PickerView } from 'antd-mobile';

const { Item } = Popover;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // height: 48,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: 'center',
        flexDirection: 'row',
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
class PopoverCombobox extends PureComponent {
    static defaultProps = {
        type: 'popover',
    }
    onValueChange = (v) => {
        this.props.onChange && this.props.onChange(v[0]);
        this.props.onChangePopupState(false);
    }
    closeModal = () => {
        this.props.onChangePopupState(false);
    }
    showModal = () => {
        if (this.props.disabled) {
            return;
        }
        this.props.onChangePopupState(true);
    }
    render() {
        const { showPopup, items, displayValue, placeholder, type, value, inline,
            style, openTextStyle, openIconStyle, textStyle, layoutStyles, textStyles } = this.props;

        const data = items.map((item) => {
            return {
                value: '' + item.get('value'),
                label: item.get('caption')
            }
        });
        const picker = (
            <PickerView1
                data={data}
                cols={1}
                cascade={false}
                value={['' + value]}
                title={this.props.caption}
            />
        );
        if (inline) {
            return <PickerView
                data={data}
                cols={1}
                cascade={false}
                onChange={this.onValueChange}
                value={['' + value]}
                title={this.props.caption}
            />;
        }
        if (type === 'popover') {
            return (
                <Popover
                    visible={showPopup}
                    onVisibleChange={this.onVisibleChange}
                    onSelect={this.onValueChange}
                    placement="bottom"
                    overlay={
                        items.map((item) => <Item key={item.get('value')} value={item.get('value')}>{item.get('caption')}</Item>)
                    }
                >
                    <View style={[styles.item, styles.segementCombobox]}>
                        <Text style={styles.text}>{displayValue || placeholder || ""}</Text>
                        <Icon name="angle-down" size={16} />
                    </View>
                </Popover>
            );
        }
        return (
            <View style={[styles.container, layoutStyles, style]}>
                <TouchableOpacity onPress={this.showModal}>
                    <View style={styles.content}>
                        <Text placeholder={placeholder} style={[styles.text, textStyle, textStyles, this.props.showPopup ? openTextStyle : null]}>{displayValue || placeholder}</Text>
                        <Icon style={[styles.icon, this.props.showPopup ? openIconStyle : null]} name={this.props.showPopup ? "angle-up" : "angle-down"} size={16} />
                    </View>
                </TouchableOpacity>
                <Popup
                    // wrapStyle={{color: 'red'}}
                    className="ioslikepopup"
                    picker={picker}
                    visible={showPopup}
                    placeholder="选择月份"
                    onOk={this.onValueChange}
                    onDismiss={this.closeModal}
                    okText="确定"
                    dismissText="取消"
                />
            </View>
        );
    }
}

export default ComboboxWrap(PopoverCombobox);
