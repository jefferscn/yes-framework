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
    }
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
        return fileType === 'jpg' || fileType === 'png' || fileType === 'jpeg';
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
            <View style={{ flex: 1 }}>
                <Text>{fileType}</Text>
            </View>
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
        const { data, fileName, filePath, isVirtual, title,
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
                }
            }
        };
        const billform = this.context.getBillForm();
        const formKey = billform.form.formKey;
        // const filePathIndex = grid.getCellIndexByKey(filePath);
        // const fileNameIndex = grid.getCellIndexByKey(fileName);
        const files = data.map((item, index) => {
            const path = grid.getValueByKey(index, filePath);
            if (yigoAttachment) {
                // const path = item.getIn(['data', filePathIndex, 0]);
                return `${Svr.SvrMgr.AttachURL}?path=${path}&formKey=${formKey}&service=DownloadImage&mode=2`
            } else {
                return path;
            }
        }).toJSON();
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
