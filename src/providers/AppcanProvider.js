import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import { ActionSheet } from 'antd-mobile';
import { History } from 'yes-platform';
import { BackHandler } from 'yes';
import mimetype from 'mime-types';

function base64ToFile(base64, mimeType = 'application/pdf') {
    let bytes = window.atob(base64);
    let arrayBuffer = new ArrayBuffer(bytes.length);
    let intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < bytes.length; i++) {
        intArray[i] = bytes.charCodeAt(i)
    }
    let blob = new Blob([intArray], { type: mimeType });
    return blob;
}

export default class AppcanProvider extends PureComponent {
    static childContextTypes = {
        getPicture: PropTypes.func,
    }

    getChildContext() {
        return {
            getPicture: this.getPicture,
        };
    }

    getPicture = (cameraDirection, quality = 50, targetWidth = 1000,) => {
        return new Promise((resolve, reject) => {
            const onFileSelect = (imageURI) => {
                if (!imageURI) {
                    reject('user cancel');
                    return;
                }
                var file = uexFileMgr.open({
                    path: imageURI,
                    mode: 1,
                });
                const fileName = path.basename(imageURI);
                const mt = mimetype.lookup(fileName);
                uexFileMgr.readFile(file, -1, 1, function (error, data) {
                    if (!error) {
                        const f = base64ToFile(data, mt);
                        resolve({
                            file: f,
                            name: fileName,
                        });
                    } else {
                        reject(error);
                    }
                });
            };
            const onActionSheetPress = (index) => {
                ActionSheet.close();
                this.backHandler();
                if (index === 0) {
                    uexCamera.openInternal(0, quality, onFileSelect);
                }
                if (index === 1) {
                    uexFileMgr.explorer("", (err, filePath) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        onFileSelect(filePath);
                    });
                }
                if (index === 2) {
                    reject('usercancel');
                }
            };
            ActionSheet.showActionSheetWithOptions({
                options: this.BUTTONS,
                cancelButtonIndex: this.BUTTONS.length - 1,
                message: null,
                maskClosable: false,
            }, onActionSheetPress);
            History.push(`#ActionSheet`, false);
            this.backHandler = BackHandler.addPreEventListener(() => {
                ActionSheet.close();
                this.backHandler();
                reject('usercancel');
            });
        });
    }

    BUTTONS = ['拍照', '文件', '取消'];

    render() {
        const { children } = this.props;
        return children;
    }
}
