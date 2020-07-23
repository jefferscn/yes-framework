import React, { PureComponent } from 'react';
import { List } from 'antd-mobile';
import PropTypes from 'prop-types';

const { Item } = List;

export default class AntdListItem extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    render() {
        const { extra, title, className } = this.props;
        return <Item 
            className={className}
            extra={this.context.createElement(extra)}
        >{title}</Item>
    }
}
