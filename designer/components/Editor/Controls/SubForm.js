import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import PropTypes from 'prop-types';
import { Section } from 'react-native-tableview-simple';
import { CellLayoutEditorCell } from '../CellLayoutEditor';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    section: {
        paddingLeft: 10,
    },
    header: {
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'cadetblue',
        alignItems: 'center',
        color: 'white',
        flexDirection: 'row',
    },
    icon: {
        width: 20,
        height: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

@observer
class SubFormEditor extends Component {
    static contextTypes = {
        getValue: PropTypes.func,
        getControl: PropTypes.func,
    }
    static childContextTypes = {
        getValue: PropTypes.func,
        setValue: PropTypes.func,
    }
    @observable data = this.props.value;
    @observable hideChildren = false;
    getChildContext() {
        return {
            getValue: this.getValue,
            setValue: this.setValue,
        }
    }
    getValue = (key) => {
        if (!this.data) {
            // setTimeout(()=>this.props.onChange(this.buildDefaultValue()),0);
            // this.props.onChange(this.buildDefaultValue());
            return null;
        }
        return this.data[key];
    }
    buildDefaultValue = () => {
        const { onChange, control, meta } = this.props;
        let selectedControl = meta.control;
        if (typeof control === 'string') {
            selectedControl = this.context.getControl(control);
        }
        if (!selectedControl) {
            return null;
        }
        return selectedControl.defaultEditorValue || {};
    }
    componentWillReceiveProps(props) {
        this.data = props.value;
        if (!this.data) {
            this.props.onChange(this.buildDefaultValue());
        }
    }
    componentWillMount() {
        if (!this.data) {
            this.props.onChange(this.buildDefaultValue());
        }
    }
    setValue = (key, value) => {
        if (!this.data) {
            // setTimeout(()=>this.props.onChange(this.buildDefaultValue()),0);
            return;
        }
        this.data[key] = value;
    }
    toggleChildren = () => {
        this.hideChildren = !this.hideChildren;
    }
    renderHeader = (text) => {
        return <TouchableOpacity onPress={this.toggleChildren} style={styles.header}>
            <AwesomeFontIcon name={this.hideChildren ? "plus" : "minus"} style={styles.icon} />
            <Text>
                {text}
            </Text>
        </TouchableOpacity>
    }
    render() {
        const { onChange, control, meta, ...otherProps } = this.props;
        let selectedControl = meta.control;
        if (typeof control === 'string') {
            selectedControl = this.context.getControl(control);
        }
        if (!selectedControl) {
            return null;
        }
        if (!selectedControl.editor) {
            return null;
        }
        return (
            <Section headerComponent={this.renderHeader(control || meta.key)}>
                <View style={styles.section}>
                    {
                        this.hideChildren ? null :
                            selectedControl.editor.map((item) =>
                                <CellLayoutEditorCell meta={item} {...otherProps} />
                            )
                    }
                </View>
            </Section>
        )
    }
}

SubFormEditor.prototype.isGroup = true;

export default SubFormEditor;
