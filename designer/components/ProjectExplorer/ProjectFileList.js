import React, { Component } from 'react';
import { observer } from "mobx-react";
import View from '../View';
import ProjectFile from './ProjectFile';
// import Popover from 'material-ui/Popover';
// import Menu from 'material-ui/Menu';
// import MenuItem from 'material-ui/MenuItem';
// import Delete from 'material-ui/svg-icons/action/delete';
// import PlaylistAdd from 'material-ui/svg-icons/av/playlist-add';
// import NoteAdd from 'material-ui/svg-icons/action/note-add';
// import Extension from 'material-ui/svg-icons/action/extension';
import { observable } from 'mobx';
import { FILE_TYPE } from '../../mobx-store/AppState';

@observer
export default class ProjectFileList extends Component {
    @observable popoverShow = false;
    @observable x = 0;
    @observable y = 0;
    @observable anchor = null;

    dummyAnchorEl = {
        offsetWidth: 0,
        offsetHeight: 0,
        getBoundingClientRect: () => {
            return {
                top: this.y,
                left: this.x,
            }
        },
    }

    onContextMenu = (e) => {
        e.preventDefault();
        // alert('contextmenu');
        this.x = e.clientX;
        this.y = e.clientY;
        const { file } = this.props;
        if (file) {
            const isDirectory = file.isDirectory;
            const type = file.type;
            const reserve = file.reserve;
            if (!(reserve && !isDirectory)) {
                this.popoverShow = true;
            }
        }
    }

    componentDidMount() {
        this.ref.addEventListener('contextmenu', this.onContextMenu);
    }
    onPopoverClose = () => {
        this.popoverShow = false;
    }
    componentWillUnmount() {
        this.ref.removeEventListener('contextmenu', this.onContextMenu);
    }
    addDir = () => {

    }
    addBillForm = () => {

    }
    addControl = () => {

    }
    remove = () => {

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
                {
                    project.files.map((file) =>
                        <ProjectFile file={file} level={1} />
                    )
                }
                {/* <Popover
                    anchorEl={this.dummyAnchorEl}
                    open={this.popoverShow}
                    onRequestClose={this.onPopoverClose}
                >
                    <Menu>
                        {isDirectory ? <MenuItem primaryText="新增目录" leftIcon={<PlaylistAdd />} onClick={this.addDir} /> : null}
                        {(type === FILE_TYPE.BILLFORM) ? <MenuItem primaryText="新增单据" leftIcon={<NoteAdd />} onClick={this.addBillForm} /> : null}
                        {(type === FILE_TYPE.CONTROL && isDirectory) ? <MenuItem primaryText="新增控件" leftIcon={<Extension />} onClick={this.addControl} /> : null}
                        {reserve ? null : <MenuItem primaryText="删除" leftIcon={<Delete />} onClick={this.remove} />}
                    </Menu>
                </Popover> */}
            </View>
        );
    }
}