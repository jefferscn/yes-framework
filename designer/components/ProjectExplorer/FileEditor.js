import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import MonacoEditor from 'react-monaco-editor';
import { observable, action } from 'mobx';
import View from '../View';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import BillformViewer from './BillformViewer';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';
import { FILE_TYPE } from '../../mobx-store/AppState';
import ProjectViewer from './ProjectCfgView';
import RouteViewer from './RouteView';
import LoginViewer from './LoginView';

const styles = StyleSheet.create({
    toolbarItem: {
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
        if (file && !file.loaded && !file.isDirectory) {
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
        if (currentEditFile) {
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
        let editor =
            <MonacoEditor
                language="javascript"
                theme="vs-dark"
                value={text}
                ref={(ref) => this.editor = ref}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount}
            />;
        if (file && fileType === 'form') {
            const formKey = store.selectedFormKey;
            editor = (<BillformViewer
                formKey={formKey} />);
        }
        if (file && file.type === FILE_TYPE.LOGINCFG) {//登陆界面
            editor = (
                <LoginViewer />
            )
        }
        if (file && file.type === FILE_TYPE.PROJECTCFG) {//项目配置
            editor = (
                <ProjectViewer
                />
            );
        }
        if (file && file.type === FILE_TYPE.ROUTECFG) {//路由配置
            editor = (
                <RouteViewer />
            );
        }

        if(!file || file.isDirectory) {
            return null;
        }
        return <View style={containerStyle}>
                <Toolbar>
                    <ToolbarGroup>
                        <AwesomeFontIcon style={styles.toolbarItem} name="save" onPress={this.save} />
                        {dirty ? <AwesomeFontIcon style={styles.toolbarItem} name="send" onPress={this.deploy} /> : null}
                        <AwesomeFontIcon style={styles.toolbarItem} name="refresh" onPress={this.refresh} />
                    </ToolbarGroup>
                </Toolbar>
                {editor}
            </View>;
    }
}