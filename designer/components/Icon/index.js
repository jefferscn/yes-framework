import React, { Component } from 'react';
import { Icon as AntdIcon } from 'antd';

export default class Icon extends Component {
    render() {
        const { name, style, ...others } = this.props;
        return (
            <AntdIcon type={name} style={style} {...others} />
        );
    }
}