import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
const alert = Modal.alert;
const showAlert = () => {
    const alertInstance = alert('提示', '重要属性被修改，需要刷新之后才能启用，直接刷新？', [
        { text: 'Cancel', onPress: () => {
            alertInstance.close();
        }, style: 'default' },
        {
            text: 'OK', onPress: () => {
                window.location.reload();
            }
        },
    ]);
};

export default (filePath, needReload = false) => {
    return (Comp) => {
        @inject('store')
        @observer
        class FileAccessWrap extends Component {
            @observable project;
            @observable data;
            async componentWillMount() {
                this.project = await this.props.store.project.getProjectFile(this.props.filePath || filePath);
                // this.project = await this.props.store.projectConfig; 
                if (this.project && !this.project.loaded) {
                    await this.project.reloadContent();
                    this.data = JSON.parse(this.project.content);
                }
            }

            commitChange = () => {
                this.project.commitContent(JSON.stringify(this.data));
                this.project.save();
                if (needReload) {
                    showAlert()
                }
            }

            rollbackChange = () => {
                this.data = JSON.parse(this.project.content);
            }

            render() {
                if (!this.data) {
                    return null;
                }
                return (<Comp
                    data={this.data}
                    commitChange={this.commitChange}
                    rollbackChange={this.rollbackChange}
                    {...this.props}
                />);
            }
        }
        return FileAccessWrap;
    }
};
