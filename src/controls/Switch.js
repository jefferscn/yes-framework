import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import { Switch } from 'antd-mobile';
import { View } from 'react-native';

@ControlWrap
export default class AntSwtich extends PureComponent {
    onChange = (checked)=> {
        this.props.onChange && this.props.onChange(checked);
    } 
    render() {
        const { layoutStyles, value, disabled } = this.props;
        return (
            <View style={layoutStyles}>
                <Switch
                    disabled = {disabled}
                    checked = {value}
                    onChange = {this.onChange}
                />
            </View>
        )
    }
}
