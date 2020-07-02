import React, { PureComponent } from 'react';
import { ComboboxWrap } from 'yes-intf';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 48,
        backgroundColor: 'white',
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#008CD7',
        fontSize: 16,
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
        fontWeight: 'bold',
    },
    segementComboboxItemSelected1: {
        backgroundColor: "#800080",
    }
});

class SegementComboboxItem extends PureComponent {
    onPress = ()=> {
        this.props.onPress && this.props.onPress(this.props.value);
    }
    render() {
        const { title, selected } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={[styles.segementComboboxItem]}>
                    <Text style={[styles.segementComboboxText, selected?styles.segementComboboxItemSelected:null]}>{title}</Text>
                    <View style={[styles.indicator, selected?styles.segementComboboxItemSelected1:null]} />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

class SegementCombobox extends PureComponent {
    onValueChange = (v) => {
       this.props.onChange  && this.props.onChange(v);
    }
    render() {
        const { items, style, value } = this.props;
        return (
            <View style={[styles.segementCombobox, style]}>
                {
                    items.map((item)=><SegementComboboxItem 
                        title={item.get('caption')}
                        value={item.get('value')}
                        onPress={this.onValueChange}
                        selected={value===""? false: value==item.get('value')}
                    />)
                }
            </View>
        );
    }
}

export default ComboboxWrap(SegementCombobox);
