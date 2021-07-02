import React, { PureComponent, useState, useEffect, memo } from 'react';
import { ComboboxWrap } from 'yes-intf';
import { View, StyleSheet } from 'react-native';
import { Tag } from 'antd-mobile';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // height: 48,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

const WrapTag = memo(({ onChange, title, value, selected }) => {
    const onValueChange = () => {
        onChange(value);
    }
    return <Tag style={{ marginTop: 2, marginBottom: 2 }} selected={selected} onChange={onValueChange}>{title}</Tag>
});

class TagCombobox extends PureComponent {
    static defaultProps = {
    }
    onValueChange = (v) => {
        this.props.onChange && this.props.onChange(v);
    }
    render() {
        const { items, value, style, layoutStyles } = this.props;

        const data = items.map((item) => {
            return {
                value: '' + item.get('value'),
                label: item.get('caption')
            }
        });
        return (
            <View style={[styles.container, layoutStyles, style]}>
                {
                    data.map(item => <WrapTag key={item.value} selected={value == item.value} onChange={this.onValueChange} value={item.value} title={item.label} />)
                }
            </View>
        );
    }
}

export default ComboboxWrap(TagCombobox);
