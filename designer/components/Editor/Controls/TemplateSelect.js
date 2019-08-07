import React, { Component } from 'react';
import ComboboxEditor from './Combobox';
import PropTypes from 'prop-types';

export default class TemplateSelect extends Component {
    static contextTypes = {
        getAllTemplates: PropTypes.func,
    }
    onChange = (key) => {
        this.props.onChange && this.props.onChange(key);
    }
    render() {
        const items = [];
        const defaultTemplateMapping = this.context.getAllTemplates();
        for (var entry of defaultTemplateMapping.data.entries()) {
            if (entry[1].caption) {
                items.push({
                    key: entry[0],
                    text: entry[1].caption,
                })
            }
        }
        const meta = {
            items,
        }
        return (
            <ComboboxEditor value={this.props.value} meta={meta} onChange={this.onChange} />
        )
    }
}
