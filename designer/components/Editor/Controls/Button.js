import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import PropTypes from 'prop-types';

export default class DesignButton extends Component {
    static contextTypes = {
        getValue: PropTypes.func,
    }
    onClick=()=> {
        const { script } = this.props.meta;
        script.apply(this, [this.context]);
    }
    render() {
        const { caption } = this.props.meta;
        return (
            <Button onClick ={this.onClick}>{caption}</Button>
        )
    }
}
