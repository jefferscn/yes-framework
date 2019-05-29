import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from "mobx-react";
import DesignerStore from './DesignerStore';
import { toJS } from 'mobx';

const store = new DesignerStore();
/**
 * 提供设计模式下的环境
 */
export default class DesignerProvider extends Component {
    static childContextTypes = {
        isDesignMode: PropTypes.func,
        selectControl: PropTypes.func,
        deployMeta: PropTypes.func,
    }

    getChildContext() {
        return {
            isDesignMode: this.isDesignMode,
            selectControl: this.selectControl,
            deployMeta: this.deployMeta,
        };
    }
    isDesignMode = () => true

    selectControl = (control, props, meta, defaultValue) => {
        store.selectControl(control, props, meta, defaultValue);
    }

    deployMeta = (formKey, meta)=> {
        window.parent.postMessage({
            type: 'deploymeta',
            formKey,
            meta
        }, '/');
    }

    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        )
    }
}
