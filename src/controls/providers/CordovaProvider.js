import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActionSheet } from 'antd-mobile';
import { History } from 'yes-platform';
import { BackHandler } from 'yes';

export default class CordovaProvider extends Component {
    static childContextTypes = {
        getPicture: PropTypes.func,
        getPosition: PropTypes.func,
        getCurrentAddress: PropTypes.func,
    }

    static contentTypes = {
        getPositionString: PropTypes.func,
    }

    getChildContext() {
        return {
            getPicture: this.getPicture,
            getPosition: this.getPosition,
            getCurrentAddress: this.getCurrentAddress,
        };
    }

    getPosition = () => {
        return new Promise((resolve, reject) => {
            const androidSuccessCallback = (locationJson) => {
                // var locationString = [locationJson.coords.longitude, locationJson.coords.latitude].join();
                resolve(locationJson.coords);
            };

            const androidFailedCallback = (err) => {
                reject(err);
            };

            const onLocateSuccess = (position) => {
                resolve(position.coords);
                // //GPS坐标
                // var lng = position.coords.longitude;
                // var lat = position.coords.latitude;
                // //原是坐标转百度坐标
                // var gpsPoint = new BMap.Point(lng, lat);
                // var convertor = new BMap.Convertor();
                // convertor.translate([gpsPoint], 1, 5, this.translateCallback.createDelegate(this));     //真实经纬度转成百度坐标
            };

            const onLocateError = (err) => {
                reject(err)
            };

            if ((typeof device !== 'undefined' && device.platform === 'Android') || (typeof device !== 'undefined' && device.platform === 'Tizen')) {
                //百度 定位SDK
                baidu_location.getCurrentPosition(androidSuccessCallback, androidFailedCallback);
            } else {
                //plugin自带
                navigator.geolocation.getCurrentPosition(onLocateSuccess, onLocateError);
            }
        });
    }

    getCurrentAddress= async () => {
        const position = await this.getPosition();
        const address = await this.contenxt.getPositionString({ lng: position.longitude, lat: position.latitude });
        return address;
    }

    getPicture = (cameraDirection = Camera.Direction.BACK, quality = 50, targetWidth = 500, ) => {
        return new Promise((resolve, reject) => {
            const onFileSelect = (imageURI) => {
                if (imageURI.startsWith('content://')) {

                } else {
                    window.resolveLocalFileSystemURL(imageURI, (fileEntry) => {
                        fileEntry.file((file) => {
                            const reader = new FileReader();
                            reader.onloadend = function (e) {
                                const theFile = new Blob([e.target.result], { type: 'image/jpeg' });
                                resolve({
                                    file: theFile,
                                    name: file.name,
                                });
                            };
                            reader.readAsArrayBuffer(file);
                        }, (e) => {
                            reject(e);
                        });
                    }, (e) => {
                        reject(e);
                    });
                }
            };
            const onSelectFileError = (message) => {
                reject(message);
            };
            const onActionSheetPress = (index) => {
                const cameraOptions = {
                    destinationType: Camera.DestinationType.FILE_URI,
                    encodingType: Camera.EncodingType.JPEG,
                };
                if (index === 0) {
                    cameraOptions['quality'] = quality;
                    cameraOptions['targetWidth'] = targetWidth;
                    cameraOptions['cameraDirection'] = cameraDirection;
                    cameraOptions['correctOrientation'] = true;
                    cameraOptions['sourceType'] = Camera.PictureSourceType.CAMERA;
                    navigator.camera.getPicture(onFileSelect, onSelectFileError, cameraOptions);
                }
                if (index === 1) {
                    if (device.platform == 'iOS') {
                        cameraOptions['correctOrientation'] = true;
                    };
                    if (camera.targetWidth) {
                        delete galleryOptions.targetWidth;
                    }
                    cameraOptions['sourceType'] = Camera.PictureSourceType.PHOTOLIBRARY;
                    navigator.camera.getPicture(onFileSelect, onSelectFileError, cameraOptions);
                }
                if (index === 2) {
                    ActionSheet.close();
                    this.backHandler();
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
                reject('cancel');
            });
        });
    }

    BUTTONS = ['拍照', '相册', '取消'];

    render() {
        const { children } = this.props;
        return children;
    }
}
