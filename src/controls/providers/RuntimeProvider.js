import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * 提供运行时环境下的全局context服务
 */
export default class DesignerProvider extends Component {
    static childContextTypes = {
        isDesignMode: PropTypes.func,
        getControl: PropTypes.func,
    }

    getChildContext() {
        return {
            isDesignMode: this.isDesignMode,
            getControl: this.getRegisteredControl,
        };
    }

    getRegisteredControl =(key)=> {
        return this.props.controls[key];
    }

    isDesignMode = () => false  

    render() {
        return (
            this.props.children
        )
    }
}
