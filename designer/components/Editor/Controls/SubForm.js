import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Controls from '../../../../src/config/control';
import PropTypes from 'prop-types';
import { Section } from 'react-native-tableview-simple';
import { CellLayoutEditorCell } from '../CellLayoutEditor';

@observer
class SubFormEditor extends Component {
    static contextTypes = {
        getValue: PropTypes.func,
    }
    static childContextTypes = {
        getValue: PropTypes.func,
        setValue: PropTypes.func,
    }
    @observable data = this.props.value;
    getChildContext() {
        return {
            getValue: this.getValue,
            setValue: this.setValue,
        }
    }
    getValue = (key) => {
        if(!this.data) {
            // setTimeout(()=>this.props.onChange(this.buildDefaultValue()),0);
            // this.props.onChange(this.buildDefaultValue());
            return null;
        }
        return this.data[key];
    }
    buildDefaultValue = ()=> {
        const { onChange, control, meta } = this.props;
        let selectedControl = meta.control;
        if (typeof control === 'string') {
            selectedControl = Controls[control];
        } 
        if (!selectedControl) {
            return null;
        }
        return selectedControl.defaultEditorValue || {};
    }
    componentWillReceiveProps(props) {
        this.data = props.value;
        if(!this.data) {
            this.props.onChange(this.buildDefaultValue());
        }
    }
    componentWillMount() {
        if(!this.data) {
            this.props.onChange(this.buildDefaultValue());
        }
    }
    setValue = (key, value) => {
        if(!this.data) {
            // setTimeout(()=>this.props.onChange(this.buildDefaultValue()),0);
            return;
        }
        this.data[key] = value;
    }
    render() {
        const { onChange, control, meta, ...otherProps } = this.props;
        let selectedControl = meta.control;
        if (typeof control === 'string') {
            selectedControl = Controls[control];
        } 
        if (!selectedControl) {
            return null;
        }
        if (!selectedControl.editor) {
            return null;
        }
        return (
            <Section header={control || meta.key } >
                {
                    selectedControl.editor.map((item) =>
                        <CellLayoutEditorCell meta={item} {...otherProps} />
                    )
                }
            </Section>
        )
    }
}

SubFormEditor.prototype.isGroup = true;

export default SubFormEditor;
