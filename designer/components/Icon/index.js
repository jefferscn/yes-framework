import React, { Component } from 'react';
import classNames from 'classnames';

export default class Icon extends Component {
    render() {
        const { name, style, className, ...others } = this.props;
        const cls = classNames({
            fa: true,
        }, name, className);
        return (
            <i className={cls} style={style} {...others} />
        );
    }
}