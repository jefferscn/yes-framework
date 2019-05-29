import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import { View } from 'react-native';
import MenuItem from 'material-ui/MenuItem';

export default class ComboboxEditor extends Component {
    static defaultProps = {
        onChange: function(){}
    }
    onChange = (e, index, payload)=> {
        this.props.onChange(payload);
    }
    render() {
        const { value, meta } = this.props;
        const { items } = meta;
        return (
            <View style={{flex:1}}>
                <SelectField value = {value} onChange = {this.onChange}>
                    {
                        items.map((item)=><MenuItem value={item.key} primaryText={item.text}></MenuItem>)
                    }
                </SelectField>
            </View>
        )
    }
}
