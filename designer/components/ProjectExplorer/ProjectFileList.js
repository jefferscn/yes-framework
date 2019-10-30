import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import View from '../View';
import { observable, action } from 'mobx';
import { Tree, Menu, Button, Upload, Modal } from 'antd';
import { FILE_TYPE } from '../../mobx-store/AppState';

const { TreeNode } = Tree;
const ButtonGroup = Button.Group;

@inject('store')
@observer
export default class ProjectFileList extends Component {
    @observable popoverShow = false;
    @observable x = 0;
    @observable y = 0;
    @observable popoverFile = null;

    onPopoverClose = () => {
        this.popoverShow = false;
    }

    addDir = () => {

    }
    addBillForm = () => {

    }
    addControl = () => {

    }
    remove = () => {

    }

    @action
    treeNodeonRightClick = (e) => {
        this.x = e.event.pageX;
        this.y = e.event.pageY;
        this.popoverFile = e.node.props.file;
        this.popoverShow = true;
    }

    onMenuClick = ({ item, key }) => {
        console.log(key);
    }

    renderPopover = () => {
        if (!this.popoverShow) {
            return null;
        }
        const showDelete = !this.popoverFile.reserve;
        if (!showDelete) {
            return null;
        }
        return (
            <Menu
                onClick={this.onMenuClick}>
                {showDelete ? <Menu.Item key='delete'>删除</Menu.Item> : null}
            </Menu>
        )
    }
    renderNode = (file) => {
        if (!file) {
            return null;
        }
        const { isDirectory, type, reserve } = file;
        if (isDirectory) {
            if (file.expand) {
                return <TreeNode title={file.name} key={file.path} file={file} isLeaf={false} >
                    {
                        file.children.map((child) => this.renderNode(child))
                    }
                </TreeNode>
            }
            return <TreeNode title={file.name} key={file.path} file={file} isLeaf={false} />
        }
        return <TreeNode title={file.name} file={file} key={file.path} isLeaf />
    }
    loadData = async (node) => {
        await node.props.file.toggleExpand();
    }
    onSelect = (keys, { node }) => {
        this.props.store.select(node.props.file);
    }
    importControl = () => {

    }
    onUploadStatusChange = (info) => {
        console.log(info);
        if (info.file.response) {
            if (!info.file.response.success) {
                this.errModal = Modal.error({
                    title: '引入错误',
                    maskClosable: false,
                    okCancel: false,
                    afterClose: () => {
                        if (this.errModal) {
                            this.errModal.destroy();
                            this.errModal = null;
                        }
                    },
                    content: info.file.response.error.code,
                    onOk: () => {
                        this.errModal.destroy();
                        this.errModal = null;
                    }
                });
            } else {
                this.errModal = Modal.error({
                    title: '信息',
                    maskClosable: false,
                    okCancel: false,
                    content: '引入成功',
                    afterClose: () => {
                        if (this.errModal) {
                            this.errModal.destroy();
                            this.errModal = null;
                        }
                    },
                    onOk: () => {
                        this.errModal.destroy();
                        this.errModal = null;
                    }
                });
            }
        }
    }
    render() {
        const { project, containerStyle, file } = this.props;
        let isDirectory = false
        let type = FILE_TYPE.BILLFORM;
        let reserve = true;
        if (file) {
            isDirectory = file.isDirectory;
            type = file.type;
            reserve = file.reserve;
        }
        return (
            <View
                ref={(ref) => this.ref = ref}
                style={containerStyle}>
                <View style={{ flex: 1 }}>
                    <Tree
                        showLine
                        loadData={this.loadData}
                        onSelect={this.onSelect}
                        onExpand={this.onExpand}
                        onRightClick={this.treeNodeonRightClick}
                    >
                        {
                            project.files.map((file) =>
                                this.renderNode(file)
                            )
                        }
                    </Tree>
                </View>
                <ButtonGroup style={{ display: 'flex', flexDirection: 'row' }}>
                    <Upload
                        name='file'
                        action='/file/import/control'
                        showUploadList={false}
                        onChange={this.onUploadStatusChange}
                    >
                        <Button type="primary" size="large" icon="cloud" />
                    </Upload>
                    <Upload
                        name='file'
                        action='/file/import/template'
                        showUploadList={false}
                        onChange={this.onUploadStatusChange}
                    >
                        <Button type="primary" size="large" icon="cloud-download" />
                    </Upload>
                </ButtonGroup>
            </View>
        );
    }
}