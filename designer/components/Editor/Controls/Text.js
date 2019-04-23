import React, { Component } from 'react'
import { TextField } from 'material-ui';

export default class TextEditor extends Component {
    static defaultProps = {
        onChange: function(){}
    }
    onChange = (e, newValue)=> {
        this.props.onChange(newValue);
    }
    render() {
        const { value, disabled } = this.props;
        return (
            <TextField disabled={disabled} value = {value || ''} onChange={this.onChange} />
        )
    }
}
