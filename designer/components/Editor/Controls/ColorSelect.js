import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import { View, StyleSheet } from 'react-native';
import Select from './Select';
import { observer } from 'mobx-react';

const styles = StyleSheet.create({
    display: {
        width: 30,
        height: 30,
    }
})
@observer
export default class ColorSelect extends Select {
    static defaultProps = {
        onChange: function () { }
    }
    onChange = (color) => {
        this.props.onChange(color.hex);
    }
    renderDisplay() {
        const color = {
            backgroundColor: this.props.value,
        }
        return (
            <View style={[styles.display, color]}>
                
            </View>
        )
    }
    renderModalContent() {
        const { value, meta } = this.props;
        return (
            <SketchPicker
                color={value || ''}
                onChangeComplete={this.onChange}
            />
        )
    }
}
