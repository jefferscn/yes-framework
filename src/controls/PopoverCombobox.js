import React, { PureComponent } from 'react';
import { ComboboxWrap } from 'yes-intf';
import { Popover } from 'antd-mobile';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        paddingLeft:16,
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

class PopoverCombobox extends PureComponent {
    onValueChange = (v) => {
       this.props.onChange  && this.props.onChange(v.props.value);
       this.props.onChangePopupState(false);
    }
    onVisibleChange=(visible)=> {
        this.props.onChangePopupState && this.props.onChangePopupState(visible);
    }
    render() {
        const { showPopup, items, displayValue, placeholder } = this.props;
        return (
            <Popover
                visible={showPopup}
                onVisibleChange={this.onVisibleChange}
                onSelect={this.onValueChange}
                placement="bottom"
                overlay={
                    items.map((item)=><Item key={item.get('value')} value={item.get('value')}>{item.get('caption')}</Item>)
                }
            >
                <View style={[styles.item, styles.segementCombobox]}>
                    <Text style={styles.text}>{displayValue || placeholder || ""}</Text>
                    <Icon name="angle-down" size={16} />
                </View>
            </Popover>
        );
    }
}

export default ComboboxWrap(PopoverCombobox);
