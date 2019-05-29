import React, { Component } from 'react';
import defaultTemplateMapping from '../../../../src/template/defaultTemplateMapping';
import ComboboxEditor from './Combobox';

export default class TemplateSelect extends Component {
    onChange = (key)=> {
        this.props.onChange && this.props.onChange(key);
    }
    render() {
        const items = [];
        for (var entry of defaultTemplateMapping.data.entries()) {
            items.push({
                key: entry[0],
                text: entry[1].caption,
            })
        }
        const meta = {
            items,
        }
        return (
            <ComboboxEditor value={this.props.value} meta={meta} onChange={this.onChange} />
        )
    }
}
