import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActionSheet, Modal } from 'antd-mobile';
import { History } from 'yes-platform';
import { BackHandler } from 'yes';
import Compressor from 'compressorjs';
import path from 'path';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native-web';
import { Update } from '../export';
import { versionCompare } from 'yes-framework/hoc/AppStatusWrap';

export default class CordovaProvider extends Component {
    static childContextTypes = {
        getPicture: PropTypes.func,
        getPictures: PropTypes.func,
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

    static defaultProps = {
        checkUpdate: true,
    }

    state = {
        modalVisible: false,
        platform: device.platform.toLowerCase(),
        packageUrl: null,
    }

    getChildContext() {
        return {
            getPicture: this.getPicture,
            getPictures: this.getPictures,
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
            if (cordova && cordova.plugins.barcodeScanner) {
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

    getPictures = () => {
        return new Promise((resolve, reject) => {
            const loadFile = (imageURI) => {
                return new Promise((res, rej) => {
                    window.resolveLocalFileSystemURL(imageURI, (fileEntry) => {
                        fileEntry.file((file) => {
                            const reader = new FileReader();
                            reader.onloadend = function (e) {
                                let fileName = path.basename(decodeURIComponent(imageURI));
                                fileName = fileName.replace(":", "_");
                                let mimeType = file.type;
                                if (!mimeType) {
                                    const extName = path.extname(decodeURIComponent(imageURI)).toLowerCase();
                                    if (extName === '.jpg' || extName === '.jpeg') {
                                        mimeType = "image/jpeg";
                                    }
                                    if (extName === '.png') {
                                        mimeType = "image/png"
                                    }
                                }
                                if (mimeType) {
                                    let ext = path.extname(decodeURIComponent(imageURI)).toLowerCase();
                                    if (!ext) {
                                        if (mimeType === 'image/jpeg') {
                                            ext = ".jpg";
                                        }
                                        if (mimeType === 'image/png') {
                                            ext = ".png";
                                        }
                                        fileName = `${fileName}${ext}`;
                                    }
                                }
                                const theFile = new Blob([e.target.result], { type: mimeType });
                                theFile.name = fileName;
                                console.log(fileName);
                                console.log(mimeType);
                                res({
                                    file: theFile,
                                    name: fileName,
                                });
                            };
                            reader.readAsArrayBuffer(file);
                            // res(file);
                        }, (e) => {
                            rej(e);
                        });
                    }, (e) => {
                        rej(e);
                    });
                })
            };
            ImagePicker.getPictures(async function (result) {
                const images = [];
                console.log(result);
                try {
                    for (let image of result.images) {
                        images.push(await loadFile(image.uri));
                    }
                } catch (ex) {
                    reject(ex);
                }
                resolve(images);
            }, function (err) {
                if (err === '已取消') {
                    reject('usercancel');
                    return;
                }
                reject(err);
            }, {
                maximumImagesCount: 9,
                width: 1920,
                height: 1440,
                quality: 70
            });
        })
    }

    getPicture = (cameraDirection = Camera.Direction.BACK, quality = 50, targetWidth = 1000, multi = false) => {
        return new Promise((resolve, reject) => {
            const onFileSelect = (imageURI) => {
                console.log(imageURI);
                ActionSheet.close();
                this.backHandler();
                window.resolveLocalFileSystemURL(imageURI, (fileEntry) => {
                    fileEntry.file((file) => {
                        const reader = new FileReader();
                        reader.onloadend = function (e) {
                            let fileName = path.basename(decodeURIComponent(file.localURL));
                            fileName = fileName.replace(":", "_");
                            let mimeType = file.type;
                            if (!mimeType) {
                                const extName = path.extname(decodeURIComponent(file.localURL)).toLowerCase();
                                if (extName === '.jpg' || extName === '.jpeg') {
                                    mimeType = "image/jpeg";
                                }
                                if (extName === '.png') {
                                    mimeType = "image/png"
                                }
                            }
                            if (mimeType) {
                                let ext = path.extname(decodeURIComponent(file.localURL)).toLowerCase();
                                if (!ext) {
                                    if (mimeType === 'image/jpeg') {
                                        ext = ".jpg";
                                    }
                                    if (mimeType === 'image/png') {
                                        ext = ".png";
                                    }
                                    fileName = `${fileName}${ext}`;
                                }
                            }
                            const theFile = new Blob([e.target.result], { type: mimeType });
                            try {
                                new Compressor(theFile, {
                                    quality: quality / 100,
                                    maxWidth: targetWidth,
                                    success(result) {
                                        result.name = fileName;
                                        resolve(multi ? [{
                                            file: result,
                                            name: fileName,
                                        }] : {
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
            const onActionSheetPress = async (index) => {
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
                    if (multi) {
                        try {
                            resolve(await this.getPictures());
                        } catch (ex) {
                            reject(ex);
                        }
                    } else {
                        if (device.platform == 'iOS') {
                            cameraOptions['correctOrientation'] = true;
                        };
                        if (!targetWidth) {
                            delete cameraOptions.targetWidth;
                        }
                        cameraOptions['sourceType'] = Camera.PictureSourceType.PHOTOLIBRARY;
                        navigator.camera.getPicture(onFileSelect, onSelectFileError, cameraOptions);
                    }
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

    checkUpdate = async () => {
        const latestVersionData = await this.checkLatestVersion();
        if (latestVersionData) {
            const latestVersion = latestVersionData.Version;
            if (versionCompare(latestVersion, this.currentVersion) > 0 && versionCompare(latestVersion, this.latestCheckVersion) > 0) {
                this.latestCheckVersion = latestVersion;
                this.notifyUpdate(latestVersionData.Url, latestVersion);
            }
        }
    }

    notifyUpdate = (url, version) => {
        this.setState({
            packageUrl: url,
            modalVisible: true,
            version,
        });
    }

    async componentDidMount() {
        if (this.props.checkUpdate) {
            this.currentVersion = await this.getVersion();
            this.latestCheckVersion = this.currentVersion;
            this.updateTimer = setInterval(this.checkUpdate, 1000 * 120);
        }
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
                document.body.style.height = null;
                // document.getElementById('keyboard').style.height = 0;
            });
        }
    }

    componentWillMount() {
        clearInterval(this.updateTimer);
    }

    BUTTONS = ['拍照', '相册', '取消'];

    onUpdateClose = () => {
        this.setState({
            modalVisible: false,
        });
    }

    render() {
        const { children } = this.props;
        if(!this.props.checkUpdate) {
            return children;
        }
        return <View style={styles.container}>
            {children}
            <Modal
                visible={this.state.modalVisible}
                popup
                animationType={"slide-up"}
                transparent
                maskClosable={true}
                onClose={this.onClose}
                title={`发现新版本(${this.state.version})`}
                // footer={acts}
                afterClose={this.onClose}
            >
                <View style={[{ maxHeight: 200 }]}>
                    <Text>是否马上更新?</Text>
                    <View style={styles.foot}>
                        <TouchableHighlight style={[styles.button, styles.cancel]} onPress={this.onUpdateClose}>
                            <Text style={styles.cancelText}>取消</Text>
                        </TouchableHighlight>
                        <Update url={this.state.packageUrl} titleStyle={styles.okText} platform={this.state.platform}
                            style={[styles.button, styles.ok]} title="更新" />
                    </View>
                </View>
            </Modal>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    foot: {
        marginTop: 12,
        height: 36,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancel: {
        backgroundColor: '#f5f5f5',
    },
    ok: {
        backgroundColor: 'blue',
    },
    cancelText: {

    },
    okText: {
        color: 'white',
    },
});
