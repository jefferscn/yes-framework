import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider, propTypes } from "mobx-react";
import DesignerStore from './designerstore';
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
        getControl: PropTypes.func,
        getAllControls: PropTypes.func,
        getAllTemplates: PropTypes.func,
        getIconComponent: PropTypes.func,
        getIconData: PropTypes.func,
    }

    getChildContext() {
        return {
            isDesignMode: this.isDesignMode,
            selectControl: this.selectControl,
            deployMeta: this.deployMeta,
            getControl: this.getRegisteredControl,
            getAllControls: this.getRegisteredControls,
            getAllTemplates: this.getAllTemplates,
            getIconComponent: this.getIconComponent,
            getIconData: this.getIconData,
        };
    }

    getIconComponent= ()=> {
        return this.props.iconComponent;
    }

    getIconData = ()=> {
        return this.props.iconData;
    }
    
    getAllTemplates = () => {
        return this.props.templates;
    }

    getRegisteredControl =(key)=> {
        return this.props.controls[key];
    }

    getRegisteredControls=()=> {
        return this.props.controls;
    }

    isDesignMode = () => true

    selectControl = (control, props, meta, defaultValue) => {
        store.selectControl(control, props, meta, defaultValue);
    }

    deployMeta = (meta)=> {
        window.parent.postMessage({
            type: 'deploymeta',
            meta,
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
