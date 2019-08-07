import React, { Component } from 'react';
import { ScrollView } from 'yes-platform';
import { View, Text } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import {
    Cell,
    Section,
    TableView,
} from 'react-native-tableview-simple';
import Controls from './Controls';

// @inject('store')
@observer
export class VisibleEqual extends Component {
    render() {
        const { relateId, value } = this.props;
        let visible = true;
        if (Array.isArray(relateId)) {
            for (let i = 0; i < relateId.length; i++) {
                if (!(this.props.store.selectedControl && this.props.store.selectedControl[relateId[i]] === value[i])) {
                    visible = false;
                    break;
                }
            }
        } else {
            visible = this.props.store.selectedControl && this.props.store.selectedControl[relateId] == value;
        }
        if (visible) {
            return this.props.children;
        }
        return null;
    }
}

@observer
export class CellLayoutEditorCell extends Component {
    render() {
        const { meta, onChange, ...otherProps } = this.props;
        const { key, caption, type, disabled = false, visibleEqual, hideTitle = false } = this.props.meta;
        let Comp = type;
        if (typeof type === 'string') {
            Comp = Controls[type];
        }
        if (typeof Comp === 'function') {//如果直接是一个类，则直接用于渲染
            if (meta.isGroup) {
                if (visibleEqual) {
                    return (
                        <VisibleEqual store={this.props.store} {...visibleEqual}>
                            <Comp {...otherProps} onChange={onChange} disabled={disabled} meta={this.props.meta} controlId={key} />
                            {/* <Cell
                                title={caption}
                                isDisabled={disabled}
                                cellAccessoryView={<Comp style={{ flex: 2, alignSelf: 'stretch', flexBasis: 0, justifyContent: 'center' }} onChange={onChange} disabled={disabled} meta={this.props.meta} controlId={key} />}
                            /> */}
                        </VisibleEqual>
                    )
                }
                return (
                    <Comp {...otherProps} onChange={onChange} disabled={disabled} meta={this.props.meta} controlId={key} />
                );

            }
            if (visibleEqual) {
                if (hideTitle) {
                    return (<VisibleEqual store={this.props.store} {...visibleEqual}>
                        <Cell
                            title={caption}
                            isDisabled={disabled}
                            cellContentView={<Comp
                                {...otherProps}
                                style={{ flex: 2, alignSelf: 'stretch', flexBasis: 0, justifyContent: 'center' }} onChange={onChange} disabled={disabled} meta={this.props.meta} controlId={key} />}
                        />
                    </VisibleEqual>);
                }
                return (
                    <VisibleEqual store={this.props.store} {...visibleEqual}>
                        <Cell
                            title={caption}
                            isDisabled={disabled}
                            cellContentView={<View style={{ minWidth: 100, alignItems: 'center', justifyContent: 'center' }}><Text>{caption}</Text></View>}
                            cellAccessoryView={<Comp
                                {...otherProps}
                                style={{ flex: 2, alignSelf: 'stretch', flexBasis: 0, justifyContent: 'center' }} onChange={onChange} disabled={disabled} meta={this.props.meta} controlId={key} />}
                        />
                    </VisibleEqual>
                )
            }
            if (hideTitle) {
                return (<Cell
                    title={caption}
                    isDisabled={disabled}
                    cellContentView= {<Comp
                        {...otherProps}
                        style={{ flex: 2, alignSelf: 'stretch', flexBasis: 0, justifyContent: 'center' }} onChange={onChange} meta={this.props.meta} controlId={key} />}
                />);
            }
            return (<Cell
                title={caption}
                isDisabled={disabled}
                cellContentView={<View style={{ minWidth: 100, alignItems: 'center', justifyContent: 'center' }}><Text>{caption}</Text></View>}
                cellAccessoryView={<Comp
                    {...otherProps}
                    style={{ flex: 2, alignSelf: 'stretch', flexBasis: 0, justifyContent: 'center' }} onChange={onChange} meta={this.props.meta} controlId={key} />}
            />);
        }
        return null;
    }
}

// @inject('store')
@observer
class CellLayoutEditor extends Component {
    static childContextTypes = {
        getValue: PropTypes.func,
        setValue: PropTypes.func,
    }
    getChildContext() {
        return {
            getValue: this.getValue,
            setValue: this.setValue,
        }
    }
    getValue = (key) => {
        const { selectedControl } = this.props.store;
        if (!selectedControl) {
            // parentControl[]
        }
        return selectedControl[key];
    }
    setValue = (key, value) => {
        const { selectedControl } = this.props.store;
        selectedControl[key] = value;
    }
    buildDefaultValue = () => {
        const { control, meta } = this.props;
        let selectedControl = meta.control;
        if (typeof control === 'string') {
            selectedControl = Controls[control];
        }
        if (!selectedControl) {
            return null;
        }
        return selectedControl.defaultEditorValue || {};
    }
    render() {
        const { onChange, store} = this.props;
        const { meta, props } = store;
        if (!meta) {
            return null;
        }
        return (
            // <ScrollView style={{ maxWidth: 375, height: 667 }}>
            <ScrollView style={this.props.style}>
                <TableView>
                    {
                        meta.map((item) =>
                            <CellLayoutEditorCell store={store} onChange={onChange} meta={item} />
                        )
                    }
                </TableView>
            </ScrollView>
        )
    }
}

export default CellLayoutEditor;
