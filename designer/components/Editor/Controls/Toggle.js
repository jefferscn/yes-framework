import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';
import { View } from 'react-native';

export default class ToggleEditor extends Component {
    static defaultProps = {
        onChange: function(){}
    }
    onChange = (e, newValue)=> {
        this.props.onChange(newValue);
    }
    render() {
        const { value } = this.props;
        return (
            <View style={{flex:1}}>
                <Toggle toggled= {value} onToggle={this.onChange} />
            </View>
        )
    }
}