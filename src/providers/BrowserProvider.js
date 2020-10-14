import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, ImagePicker } from 'antd-mobile';
import { showModal } from '../SiblingMgr';
import Compressor from 'compressorjs';

class ImageSelect extends PureComponent {
    onClose = () => {
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
        getPosition: PropTypes.func,
        getCurrentAddress: PropTypes.func,
    }

    static contentTypes = {
        getPositionString: PropTypes.func,
    }

    state = {
        imagePickerVisible: false,
    }

    getChildContext() {
        return {
            getPicture: this.getPicture,
            getPosition: this.getPosition,
            getCurrentAddress: this.getCurrentAddress,
        };
    }

    getPosition = async () => {
        const options= {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: 10000,
        }
        return new Promise((resolve, reject) => {
            const onLocateSuccess = (position) => {
                resolve(position.coords);
            };

            const onLocateError = (err) => {
                reject(err)
            };
            navigator.geolocation.getCurrentPosition(onLocateSuccess, onLocateError, options);
        });
    }

    getCurrentAddress = async () => {
        const position = await this.getPosition();
        const address = await this.contenxt.getPositionString({ lng: position.longitude, lat: position.latitude });
        return address;
    }

    getPicture = (cameraDirection, quality = 50, targetWidth = 1000,) => {
        return new Promise((resolve, reject) => {
            const onFileChange = (files) => {
                if (files.length === 0) {
                    reject('empty');
                    closeModal();
                    return;
                }
                new Compressor(files[0].file, {
                    quality: quality / 100,
                    maxWidth: targetWidth,
                    success(result) {
                        resolve({
                            file: result,
                            name: result.name,
                        });
                    },
                    error(err) {
                        reject(err);
                    }
                });
                // resolve({
                //     file: files[0].file,
                //     name: files[0].file.name,
                // });
                closeModal();
            }
            const onFail = (ex) => {
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
