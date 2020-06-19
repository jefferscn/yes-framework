import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, ImagePicker } from 'antd-mobile';
import { showModal } from '../../SiblingMgr';
import { History } from 'yes-web';

class ImageSelect extends PureComponent {
    onClose = ()=> {
        this.props.onClose && this.props.onClose();
    }
    render() {
        return (<Modal
                    popup
                    transitionName={'slide-up'}
                    afterClose={this.onClose}
                >
                    <ImagePicker
                        length="1"
                        files={[]}
                        onChange={onFileChange}
                        onFail={onFail}
                />
                </Modal>);
    }
}
export default class BrowserProvider extends PureComponent {
    static childContextTypes = {
        getPicture: PropTypes.func,
    }

    state = {
        imagePickerVisible: false,
    }
    getChildContext() {
        return {
            getPicture: this.getPicture,
        };
    }

    getPicture = () => {
        return new Promise((resolve, reject) => {
            const onFileChange = (files)=> {
                if(files.length===0) {
                    reject('empty');
                    closeModal();
                    return;
                }
                resolve({
                    file: files[0].file,
                    name: files[0].file.name,
                });
                closeModal();
            }
            const onFail = (ex)=> {
                reject(ex);
            }
            const closeModal = showModal(
                <Modal
                    visible={true}
                    maskClosable={false}
                    popup
                    transitionName={'slide-up'}
                >
                    <ImagePicker
                        length="1"
                        files={[]}
                        onChange={onFileChange}
                        onFail={onFail}
                />
                </Modal>)

        })
    }

    render() {
        const { children } = this.props;
        return children;
    }
}
