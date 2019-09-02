import React, { Component } from 'react';
// import Toggle from 'material-ui/Toggle';
import { Switch } from 'antd';
import { View } from 'react-native';

export default class ToggleEditor extends Component {
    static defaultProps = {
        onChange: function(){}
    }
    onChange = (newValue)=> {
        this.props.onChange(newValue);
    }
    render() {
        const { value } = this.props;
        return (
            <View style={{flex:1}}>
                <Switch defaultChecked = {value} onChange={this.onChange} />
            </View>
        )
    }
}