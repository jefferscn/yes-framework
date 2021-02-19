import React, { PureComponent } from 'react';
import { GridWrap, GridRowWrap, ControlWrap, BackHandler, Util } from 'yes-intf';
import { Image, StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import WxImageViewer from 'react-wx-images-viewer';
// import AttachmentAction from './AttachmentAction';
import { Svr } from 'yes-core';
import Element from '../template/Element';
import { History } from 'yes-web';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableHighlight } from 'react-native-web';
import { util } from '../project';

const mineTypes = [{ ext: 'doc', minetype: 'application/msword' },
{ ext: 'docx', minetype: 'application/msword' },
{ ext: 'pdf', minetype: 'application/pdf' },
{ ext: 'ppt', minetype: 'application/vnd.ms-powerpoint' },
{ ext: 'xls', minetype: 'application/vnd.ms-excel' },
{ ext: 'xlsx', minetype: 'application/vnd.ms-excel' },
{ ext: 'rtf', minetype: 'application/rtf' },
{ ext: 'txt', minetype: 'text/plain' },
{ ext: 'png', minetype: 'image/png' },
{ ext: 'jpg', minetype: 'image/jpeg' },
{ ext: 'jpeg', minetype: 'image/jpeg' },
{ ext: 'apk', minetype: 'application/vnd.android.package-archive' },
];

const getMineType = function (file) {
    if (!file)
        return null;
    var minetype = mineTypes.find(function (item) {
        return file.endsWith(item.ext);
    });
    return minetype ? minetype.minetype : '*/*';
};

const getFileName = function (_url) {
    const txt = _url.split('/').pop();
    var timestamp = Date.parse(new Date());
    var newname = timestamp + '.' + txt.split('.').slice(-1).toString();
    return newname;
};

function isChineseChar(str) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
}

const downloadFile = function (_url, fileName) {
    return new Promise((resolve, reject) => {
        // const fileName = getFileName(_url);
        var onFileSystemSuccess = function (fileSystem) {
            var fs = null;
            if (cordova.platformId === "android") {
                fs = fileSystem;
            } else {
                fs = fileSystem.root;
            }
            fs.getFile(
                fileName, { create: true, exclusive: false },
                function gotFileEntry(fileEntry) {
                    fileEntry.remove();
                    var ft = new FileTransfer();

                    var uri = _url;
                    if (isChineseChar(_url)) {
                        uri = encodeURI(_url);
                    }
                    ft.download(uri, fileEntry.nativeURL, function (entry) {
                        var minetype = getMineType(fileName);
                        resolve();
                        cordova.plugins.fileOpener2.open(
                            entry.toURL(),
                            minetype
                        );
                    }, function (error) {
                        reject(error.getMessage());
                    },
                        false);
                }, (error) => reject(error.getMessage()));
        };
        var onError = function (error) {
            reject(error);
        }
        if (!cordova) {
            reject(`${fileName} has not been supported!`);
        }
        if (cordova.platformId === "android") {
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, onFileSystemSuccess, onError);
        } else {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onError);
        }
    })
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 12,
    },
    title: {
        paddingLeft: 16,
        paddingTop: 8,
        paddingBottom: 8,
        height: 35,
    },
    noattach: {
        backgroundColor: 'white',
        height: 40,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
    item: {
        width: '33%',
        paddingRight: 12,
        paddingBottom: 12,
        height: 100,
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 10,
    },
    fileTypeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fileTypeIcon: {
        fontSize: 40,
    },
});

@ControlWrap
class AttachmentFile extends PureComponent {
    static contextTypes = {
        getBillForm: PropTypes.func,
    }
    buildThumbnail = (url) => {
        if (Util.buildThumbnailUrl) {
            return Util.buildThumbnailUrl(url, 100, 100);
        }
        return url
    }
    isImage = () => {
        const { fileType } = this.props;
        const tmp = fileType ? fileType.toLowerCase() : "";
        return tmp === 'jpg' || tmp === 'png' || tmp === 'jpeg';
    }
    getFileTypeIcon = (type) => {
        let result = 'file';
        switch (type) {
            case 'pdf':
                result = "file-pdf-o";
                break;
            case 'xls':
            case 'xlsx':
                result = 'file-excel-o';
                break;
            case 'doc':
            case 'docx':
                result = 'file-word-o';
                break;
            case 'ppt':
                result = 'file-powerpoint-o';
                break;
        }
        return result;
    }
    openFile = () => {
        const { displayValue, yigoAttachment } = this.props;
        const billform = this.context.getBillForm();
        const formKey = billform.form.formKey;
        const file = yigoAttachment ? `${Svr.SvrMgr.AttachURL}?path=${displayValue}&formKey=${formKey}&service=DownloadAttachment&mode=2` : displayValue;
        Util.safeExec(async () => await downloadFile(file, getFileName(displayValue)));
    }
    render() {
        const { displayValue, fileType, style, yigoAttachment } = this.props;
        if (this.isImage()) {
            if (yigoAttachment) {
                const billform = this.context.getBillForm();
                const formKey = billform.form.formKey;
                const url = this.buildThumbnail(`${Svr.SvrMgr.AttachURL}?path=${displayValue}&formKey=${formKey}&service=DownloadImage&mode=2`);
                return (
                    <Image source={url} style={[styles.image, style]} />
                )
            } else {
                return (
                    <Image source={displayValue} style={[styles.image, style]} />
                )
            }
        }
        return (
            <TouchableHighlight onPress={this.openFile} style={styles.fileTypeContainer}>
                {/* <Text>{fileType}</Text> */}
                <Icon style={styles.fileTypeIcon} name={this.getFileTypeIcon(fileType)} />
            </TouchableHighlight>
        )
    }
}

@GridRowWrap
class AttachmentItem extends PureComponent {
    static defaultProps = {
        removable: false,
        fileType: null,
        url: null,
        yigoAttachment: true,
    }
    onRemove = () => {
        this.props.remove && this.props.remove();
    }
    onPress = () => {
        this.props.onPress && this.props.onPress(this.props.rowIndex);
    }
    render() {
        const { removable, fileUrl, fileType, style, yigoAttachment } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={[styles.item, style]}>
                    <AttachmentFile yigoAttachment={yigoAttachment} fileType={fileType} yigoid={fileUrl} />
                    {removable ? <TouchableWithoutFeedback onPress={this.onRemove}>
                        <Icon name="times" size={20} style={styles.icon} />
                    </TouchableWithoutFeedback> : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

class AttachmentList extends PureComponent {
    static contextTypes = {
        getOwner: PropTypes.func,
        getBillForm: PropTypes.func,
    }
    static defaultProps = {
        removable: true,
        yigoAttachment: true,
        multiSelect: true,
    }
    state = {
        showPreview: false,
    }
    onViewerClose = () => {
        if (this.props.inline) {
            this.props.onRequestClose && this.props.onRequestClose();
            return;
        }
        this.setState({
            showPreview: false,
        });
        this.backHandler && this.backHandler();
    }
    onViewerOpen = (index) => {
        this.setState({
            showPreview: true,
            index,
        });
        History.push(`#AttachmentList_modal`);
        this.backHandler = BackHandler.addPreEventListener(() => {
            // this.backHandler();
            this.onViewerClose();
        })
    }
    render() {
        const { data, fileName, filePath, isVirtual, title, multiSelect,
            containerStyle, removable, editable, inline, yigoAttachment,
        } = this.props;
        const grid = this.context.getOwner();
        if (!grid) {
            return null;
        }
        const actionMeta = {
            type: 'element',
            elementType: 'AttachmentAction',
            elementProps: {
                style: {
                    width: 85,
                    display: 'inline-block',
                },
                multiSelect,
            }
        };
        const billform = this.context.getBillForm();
        const formKey = billform.form.formKey;
        // const filePathIndex = grid.getCellIndexByKey(filePath);
        // const fileNameIndex = grid.getCellIndexByKey(fileName);
        let files = [];
        data.forEach((item, index) => {
            const path = grid.getValueByKey(index, filePath);
            if (yigoAttachment) {
                // const path = item.getIn(['data', filePathIndex, 0]);
                files.push(`${Svr.SvrMgr.AttachURL}?path=${path}&formKey=${formKey}&service=DownloadImage&mode=2`);
            } else {
                files.push(path);
            }
        });
        if (inline) {
            if (files.length > 0) {
                return (<WxImageViewer
                    onClose={this.onViewerClose}
                    zIndex={1000}
                    urls={files}
                    index={0}
                />);
            }
            return (
                <TouchableWithoutFeedback onPress={this.onViewerClose}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.noattach}>{billform.form.formLoaded ? '没有附件,点击关闭' : '数据加载中...'}</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        return (
            <View style={this.props.style}>
                {title ? <View >
                    <Text style={[styles.title]} >{title}</Text>
                </View> : null}
                <View style={[styles.container, containerStyle]}>
                    {
                        data.map((item, index) => {
                            // const fn = item.getIn(['data', fileNameIndex, 0]);
                            const fn = grid.getValueByKey(index, fileName);
                            const fnArray = fn.split('.');
                            const fileType = fnArray.length > 1 ? fnArray[fnArray.length - 1] : null;
                            return (<AttachmentItem
                                yigoAttachment={yigoAttachment}
                                rowIndex={index}
                                removable={removable && editable}
                                fileType={fileType}
                                fileUrl={filePath}
                                onPress={this.onViewerOpen}
                            />);
                        })
                    }
                    {
                        this.state.showPreview ? <WxImageViewer
                            onClose={this.onViewerClose}
                            zIndex={1000}
                            crossorigin="use-credentials"
                            urls={files}
                            index={this.state.index} /> : null
                    }
                    {
                        editable ? <Element meta={actionMeta} /> : null
                    }
                </View>
            </View>
        )
    }
}

export default GridWrap(AttachmentList);
