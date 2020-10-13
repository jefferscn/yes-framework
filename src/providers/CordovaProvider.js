import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActionSheet } from 'antd-mobile';
import { History } from 'yes-platform';
import { BackHandler } from 'yes';
import Compressor from 'compressorjs';
import path from 'path';

export default class CordovaProvider extends Component {
    static childContextTypes = {
        getPicture: PropTypes.func,
        getPosition: PropTypes.func,
        getCurrentAddress: PropTypes.func,
        getTopPadding: PropTypes.func,
        getVersion: PropTypes.func,
        getPlatform: PropTypes.func,
        checkLatestVersion: PropTypes.func,
        barcodeScan: PropTypes.func,
    }

    static contentTypes = {
        getPositionString: PropTypes.func,
    }

    getChildContext() {
        return {
            getPicture: this.getPicture,
            getPosition: this.getPosition,
            getCurrentAddress: this.getCurrentAddress,
            getTopPadding: this.getTopPadding,
            getVersion: this.getVersion,
            checkLatestVersion: this.checkLatestVersion,
            getPlatform: this.getPlatform,
            barcodeScan: this.barcodeScan,
        };
    }

    getPlatform = () => {
        const platform = device.platform.toLowerCase();
        return platform;
    }

    barcodeScan = async () => {
        return new Promise((resolve, reject) => {
            if (cordova && cordova.plguins.barcodeScanner) {
                cordova.plugins.barcodeScanner.scan((result) => {
                    if (result.cancelled) {
                        reject('cancelled');
                    } else {
                        resolve(result.text);
                    }
                }, (error) => {
                    reject(error);
                }, {
                    showTorchButton: true
                });
            } else {
                reject('cordova plugin missing');
            }
        });
    }

    checkLatestVersion = async () => {
        const packageName = await cordova.getAppVersion.getPackageName();
        const platform = device.platform.toLowerCase();
        var checkUpdateUrl = `https://dev.bokesoft.com/erpmobile/checkupdate/${packageName}`;
        const response = await fetch(checkUpdateUrl, {
            method: 'GET',
        });
        const result = await response.json();
        const platformData = result[platform];
        return platformData;
    }

    getVersion = async () => {
        return await cordova.getAppVersion.getVersionNumber();
    }

    getTopPadding = () => {
        if (device.platform.toLowerCase() === 'android') {
            return this.props.overlayWebview ? 20 : 0;
        }
        return 20;
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

    getCurrentAddress = async () => {
        const position = await this.getPosition();
        const address = await this.contenxt.getPositionString({ lng: position.longitude, lat: position.latitude });
        return address;
    }

    getPicture = (cameraDirection = Camera.Direction.BACK, quality = 50, targetWidth = 1000,) => {
        return new Promise((resolve, reject) => {
            const onFileSelect = (imageURI) => {
                // if (imageURI.startsWith('content://')) {
                //     resolveLocalFileSystemURL(imageURI,
                //         (fileEntry)=>{
                //         },
                //         (e)=>console.log(e))
                // } else {
                ActionSheet.close();
                this.backHandler();
                window.resolveLocalFileSystemURL(imageURI, (fileEntry) => {
                    fileEntry.file((file) => {
                        //file.localURL
                        const reader = new FileReader();
                        reader.onloadend = function (e) {
                            const fileName = path.basename(file.localURL);
                            let mimeType = file.type;
                            if (!mimeType) {
                                const extName = path.extname(file.localURL).toLowerCase();
                                if (extName === '.jpg' || extName === '.jpeg') {
                                    mimeType = "image/jpeg";
                                }
                                if (extName === '.png') {
                                    mimeType = "image/png"
                                }
                            }
                            const theFile = new Blob([e.target.result], { type: mimeType });
                            try {
                                new Compressor(theFile, {
                                    quality: quality / 100,
                                    maxWidth: targetWidth,
                                    success(result) {
                                        resolve({
                                            file: result,
                                            name: fileName,
                                        });
                                    },
                                    error(err) {
                                        reject(err);
                                    }
                                });
                            } catch (ex) {
                                reject(ex.message);
                            }
                        };
                        reader.readAsArrayBuffer(file);
                    }, (e) => {
                        reject(e);
                    });
                }, (e) => {
                    reject(e);
                });
                // }
            };
            const onSelectFileError = (message) => {
                ActionSheet.close();
                this.backHandler();
                reject('usercancel');
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
                    if (!targetWidth) {
                        delete cameraOptions.targetWidth;
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
                reject('usercancel');
            });
        });
    }

    componentDidMount() {
        if (this.props.overlayWebview) {
            StatusBar.overlaysWebView(true);
        }
        if (this.props.statusbarStyle) {
            switch (this.props.statusbarStyle) {
                case 'black':
                    StatusBar.styleLightContent();
                    break;
                default:
                    StatusBar.styleDefault();
            }
        }
        if (device.platform == 'iOS') {
            document.body.classList.add('ios');
        } else {
            document.body.classList.add('android');
        }

        if (device.platform.toLowerCase() === 'android') {
            //如果是Andnroid需要模拟一个键盘的div
            window.addEventListener('native.keyboardshow', (e) => {
                document.body.style.height = document.body.clientHeight - e.keyboardHeight;
                // document.getElementById('keyboard').style.height = e.keyboardHeight;
            });
            window.addEventListener('native.keyboardhide', (e) => {
                document.body.style.height = 'auto';
                // document.getElementById('keyboard').style.height = 0;
            });
        }
    }

    BUTTONS = ['拍照', '相册', '取消'];

    render() {
        const { children } = this.props;
        return children;
    }
}
