import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import MonacoEditor from 'react-monaco-editor';
import { observable, action } from 'mobx';
import View from '../View';
import Icon from '../Icon';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import BillformViewer from './BillformViewer';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    toolbarItem : {
        fontSize: 29,
        paddingRight: 16,
    }
});

@inject('store')
@observer
export default class FileEditor extends Component {
    onChange = () => {

    }
    editorDidMount = () => {
        const { store } = this.props;
        const file = store.selected;
        if (file && !file.loaded) {
            file.reloadContent();
        }
    }
    componentWillReceiveProps(props) {
        const { store } = props;
        const file = store.selected;
        if (file && !file.loaded && !file.isDirectory) {
            file.reloadContent();
        }
    }
    onWindowResize = () => {
        this.editor && this.editor.editor.layout();
    }
    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }
    save = () => {
        const currentEditFile = this.props.store.selected;
        currentEditFile.commitContent(this.editor.editor.getModel().getValue());
    }
    deploy = () => {
        const currentEditFile = this.props.store.selected;
        if(currentEditFile) {
            currentEditFile.save();
        }
    }
    refresh = () => {

    }
    render() {
        const { containerStyle, store } = this.props;
        const { selected: file, fileType } = store;
        const text = file ? file.content : '';
        const dirty = file ? file.dirty : false;
        const options = {
            selectOnLineNumbers: true
        };
        if (file && fileType === 'form') {
            const meta = JSON.parse(text);
            const formKey = store.selectedFormKey;
            return (<BillformViewer
                meta={meta}
                formKey={formKey} />);
        }
        return <View style={containerStyle}>
            <Toolbar>
                <ToolbarGroup>
                    <AwesomeFontIcon style={styles.toolbarItem} name="save" onPress={this.save} />
                    {dirty ? <AwesomeFontIcon style={styles.toolbarItem} name="send" onPress={this.deploy} /> : null}
                    <AwesomeFontIcon style={styles.toolbarItem} name="refresh" onPress={this.refresh} />
                </ToolbarGroup>
            </Toolbar>
            <MonacoEditor
                language="javascript"
                theme="vs-dark"
                value={text}
                ref={(ref) => this.editor = ref}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
            /></View>;
    }
}