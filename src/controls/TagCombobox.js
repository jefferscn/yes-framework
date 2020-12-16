import React, { PureComponent } from 'react';
import { ComboboxWrap } from 'yes-intf';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Tag } from 'antd-mobile';

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

const WrapTag = ({ onChange, title, value, selected }) => {
    const onValueChange = () => {
        onChange(value);
    }
    return <Tag selected={selected} onChange={onValueChange}>{title}</Tag>
}

class TagCombobox extends PureComponent {
    static defaultProps = {
    }
    onValueChange = (v) => {
        this.props.onChange && this.props.onChange(v);
    }
    render() {
        const { items, displayValue, placeholder, value,
            style, layoutStyles, textStyles } = this.props;

        const data = items.map((item) => {
            return {
                value: '' + item.get('value'),
                label: item.get('caption')
            }
        });
        return (
            <View style={[styles.container, layoutStyles, style]}>
                {
                    data.map(item => <WrapTag selected={value == item.value} onChange={this.onValueChange} value={item.value} title={item.label} />)
                }
            </View>
        );
    }
}

export default ComboboxWrap(TagCombobox);
