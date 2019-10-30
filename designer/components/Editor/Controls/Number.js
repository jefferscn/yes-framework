import React, { Component } from 'react';
// import Toggle from 'material-ui/Toggle';
import { InputNumber } from 'antd';
import { View } from 'react-native';

export default class NumberEditor extends Component {
    static defaultProps = {
        onChange: function(){},
        min: 1,
        max: 1000,
    }
    onChange = (newValue)=> {
        this.props.onChange(newValue);
    }
    render() {
        const { value } = this.props;
        return (
            <View style={{flex:1}}>
                <InputNumber size="large" min={this.props.min} max={this.props.max} defaultValue={value} onChange={this.onChange} />
            </View>
        )
    }
}
