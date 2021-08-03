var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActionSheet, Modal } from 'antd-mobile';
import { History } from 'yes-platform';
import { BackHandler } from 'yes';
import Compressor from 'compressorjs';
import path from 'path';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native-web';
import { Update } from '../export';
import { versionCompare } from '../hoc/AppStatusWrap';
var mineTypes = [{ ext: 'doc', minetype: 'application/msword' },
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
var getMineType = function (file) {
    if (!file)
        return null;
    var minetype = mineTypes.find(function (item) {
        return file.endsWith(item.ext);
    });
    return minetype ? minetype.minetype : '*/*';
};
function isChineseChar(str) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
}
var downloadFile = function (_url, fileName) {
    return new Promise(function (resolve, reject) {
        var onFileSystemSuccess = function (fileSystem) {
            var fs = null;
            if (cordova.platformId === "android") {
                fs = fileSystem;
            }
            else {
                fs = fileSystem.root;
            }
            fs.getFile(fileName, { create: true, exclusive: false }, function gotFileEntry(fileEntry) {
                fileEntry.remove();
                var ft = new FileTransfer();
                var uri = _url;
                if (isChineseChar(_url)) {
                    uri = encodeURI(_url);
                }
                ft.download(uri, fileEntry.nativeURL, function (entry) {
                    var minetype = getMineType(fileName);
                    resolve();
                    cordova.plugins.fileOpener2.open(entry.toURL(), minetype);
                }, function (error) {
                    reject(error.code);
                }, true);
            }, function (error) { return reject(error.getMessage()); });
        };
        var onError = function (error) {
            reject(error);
        };
        if (!cordova) {
            reject(fileName + " has not been supported!");
        }
        if (cordova.platformId === "android") {
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, onFileSystemSuccess, onError);
        }
        else {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onError);
        }
    });
};
var CordovaProvider = /** @class */ (function (_super) {
    __extends(CordovaProvider, _super);
    function CordovaProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            modalVisible: false,
            platform: device.platform.toLowerCase(),
            packageUrl: null,
        };
        _this.openFile = function (url, fileName) {
            downloadFile(url, fileName);
        };
        _this.getPlatform = function () {
            var platform = device.platform.toLowerCase();
            return platform;
        };
        _this.barcodeScan = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (cordova && cordova.plugins.barcodeScanner) {
                            cordova.plugins.barcodeScanner.scan(function (result) {
                                if (result.cancelled) {
                                    reject('cancelled');
                                }
                                else {
                                    resolve(result.text);
                                }
                            }, function (error) {
                                reject(error);
                            }, {
                                showTorchButton: true
                            });
                        }
                        else {
                            reject('cordova plugin missing');
                        }
                    })];
            });
        }); };
        _this.checkLatestVersion = function () { return __awaiter(_this, void 0, void 0, function () {
            var packageName, platform, checkUpdateUrl, response, result, platformData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cordova.getAppVersion.getPackageName()];
                    case 1:
                        packageName = _a.sent();
                        platform = device.platform.toLowerCase();
                        checkUpdateUrl = "https://dev.bokesoft.com/erpmobile/checkupdate/" + packageName;
                        return [4 /*yield*/, fetch(checkUpdateUrl, {
                                method: 'GET',
                            })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        result = _a.sent();
                        platformData = result[platform];
                        return [2 /*return*/, platformData];
                }
            });
        }); };
        _this.getVersion = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cordova.getAppVersion.getVersionNumber()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.getTopPadding = function () {
            if (device.platform.toLowerCase() === 'android') {
                return _this.props.overlayWebview ? 20 : 0;
            }
            return 20;
        };
        _this.getPosition = function () {
            return new Promise(function (resolve, reject) {
                var androidSuccessCallback = function (locationJson) {
                    // var locationString = [locationJson.coords.longitude, locationJson.coords.latitude].join();
                    resolve(locationJson.coords);
                };
                var androidFailedCallback = function (err) {
                    reject(err);
                };
                var onLocateSuccess = function (position) {
                    resolve(position.coords);
                    // //GPS坐标
                    // var lng = position.coords.longitude;
                    // var lat = position.coords.latitude;
                    // //原是坐标转百度坐标
                    // var gpsPoint = new BMap.Point(lng, lat);
                    // var convertor = new BMap.Convertor();
                    // convertor.translate([gpsPoint], 1, 5, this.translateCallback.createDelegate(this));     //真实经纬度转成百度坐标
                };
                var onLocateError = function (err) {
                    reject(err);
                };
                if ((typeof device !== 'undefined' && device.platform === 'Android') || (typeof device !== 'undefined' && device.platform === 'Tizen')) {
                    //百度 定位SDK
                    baidu_location.getCurrentPosition(androidSuccessCallback, androidFailedCallback);
                }
                else {
                    //plugin自带
                    navigator.geolocation.getCurrentPosition(onLocateSuccess, onLocateError);
                }
            });
        };
        _this.getCurrentAddress = function () { return __awaiter(_this, void 0, void 0, function () {
            var position, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPosition()];
                    case 1:
                        position = _a.sent();
                        return [4 /*yield*/, this.contenxt.getPositionString({ lng: position.longitude, lat: position.latitude })];
                    case 2:
                        address = _a.sent();
                        return [2 /*return*/, address];
                }
            });
        }); };
        _this.getPictures = function () {
            return new Promise(function (resolve, reject) {
                var loadFile = function (imageURI) {
                    return new Promise(function (res, rej) {
                        window.resolveLocalFileSystemURL(imageURI, function (fileEntry) {
                            fileEntry.file(function (file) {
                                var reader = new FileReader();
                                reader.onloadend = function (e) {
                                    var fileName = path.basename(decodeURIComponent(imageURI));
                                    fileName = fileName.replace(":", "_");
                                    var mimeType = file.type;
                                    if (!mimeType) {
                                        var extName = path.extname(decodeURIComponent(imageURI)).toLowerCase();
                                        if (extName === '.jpg' || extName === '.jpeg') {
                                            mimeType = "image/jpeg";
                                        }
                                        if (extName === '.png') {
                                            mimeType = "image/png";
                                        }
                                    }
                                    if (mimeType) {
                                        var ext = path.extname(decodeURIComponent(imageURI)).toLowerCase();
                                        if (!ext) {
                                            if (mimeType === 'image/jpeg') {
                                                ext = ".jpg";
                                            }
                                            if (mimeType === 'image/png') {
                                                ext = ".png";
                                            }
                                            fileName = "" + fileName + ext;
                                        }
                                    }
                                    var theFile = new Blob([e.target.result], { type: mimeType });
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
                            }, function (e) {
                                rej(e);
                            });
                        }, function (e) {
                            rej(e);
                        });
                    });
                };
                ImagePicker.getPictures(function (result) {
                    return __awaiter(this, void 0, void 0, function () {
                        var images, _i, _a, image, _b, _c, ex_1;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    images = [];
                                    console.log(result);
                                    _d.label = 1;
                                case 1:
                                    _d.trys.push([1, 6, , 7]);
                                    _i = 0, _a = result.images;
                                    _d.label = 2;
                                case 2:
                                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                                    image = _a[_i];
                                    _c = (_b = images).push;
                                    return [4 /*yield*/, loadFile(image.uri)];
                                case 3:
                                    _c.apply(_b, [_d.sent()]);
                                    _d.label = 4;
                                case 4:
                                    _i++;
                                    return [3 /*break*/, 2];
                                case 5: return [3 /*break*/, 7];
                                case 6:
                                    ex_1 = _d.sent();
                                    reject(ex_1);
                                    return [3 /*break*/, 7];
                                case 7:
                                    resolve(images);
                                    return [2 /*return*/];
                            }
                        });
                    });
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
            });
        };
        _this.getPicture = function (cameraDirection, quality, targetWidth, multi) {
            if (cameraDirection === void 0) { cameraDirection = Camera.Direction.BACK; }
            if (quality === void 0) { quality = 50; }
            if (targetWidth === void 0) { targetWidth = 1000; }
            if (multi === void 0) { multi = false; }
            return new Promise(function (resolve, reject) {
                var onFileSelect = function (imageURI) {
                    console.log(imageURI);
                    ActionSheet.close();
                    _this.backHandler();
                    window.resolveLocalFileSystemURL(imageURI, function (fileEntry) {
                        fileEntry.file(function (file) {
                            var reader = new FileReader();
                            reader.onloadend = function (e) {
                                var fileName = path.basename(decodeURIComponent(file.localURL));
                                fileName = fileName.replace(":", "_");
                                var mimeType = file.type;
                                if (!mimeType) {
                                    var extName = path.extname(decodeURIComponent(file.localURL)).toLowerCase();
                                    if (extName === '.jpg' || extName === '.jpeg') {
                                        mimeType = "image/jpeg";
                                    }
                                    if (extName === '.png') {
                                        mimeType = "image/png";
                                    }
                                }
                                if (mimeType) {
                                    var ext = path.extname(decodeURIComponent(file.localURL)).toLowerCase();
                                    if (!ext) {
                                        if (mimeType === 'image/jpeg') {
                                            ext = ".jpg";
                                        }
                                        if (mimeType === 'image/png') {
                                            ext = ".png";
                                        }
                                        fileName = "" + fileName + ext;
                                    }
                                }
                                var theFile = new Blob([e.target.result], { type: mimeType });
                                try {
                                    new Compressor(theFile, {
                                        quality: quality / 100,
                                        maxWidth: targetWidth,
                                        success: function (result) {
                                            result.name = fileName;
                                            resolve(multi ? [{
                                                    file: result,
                                                    name: fileName,
                                                }] : {
                                                file: result,
                                                name: fileName,
                                            });
                                        },
                                        error: function (err) {
                                            reject(err);
                                        }
                                    });
                                }
                                catch (ex) {
                                    reject(ex.message);
                                }
                            };
                            reader.readAsArrayBuffer(file);
                        }, function (e) {
                            reject(e);
                        });
                    }, function (e) {
                        reject(e);
                    });
                    // }
                };
                var onSelectFileError = function (message) {
                    ActionSheet.close();
                    _this.backHandler();
                    reject('usercancel');
                };
                var onActionSheetPress = function (index) { return __awaiter(_this, void 0, void 0, function () {
                    var cameraOptions, _a, ex_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                cameraOptions = {
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
                                if (!(index === 1)) return [3 /*break*/, 6];
                                if (!multi) return [3 /*break*/, 5];
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 3, , 4]);
                                _a = resolve;
                                return [4 /*yield*/, this.getPictures()];
                            case 2:
                                _a.apply(void 0, [_b.sent()]);
                                return [3 /*break*/, 4];
                            case 3:
                                ex_2 = _b.sent();
                                reject(ex_2);
                                return [3 /*break*/, 4];
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                if (device.platform == 'iOS') {
                                    cameraOptions['correctOrientation'] = true;
                                }
                                ;
                                if (!targetWidth) {
                                    delete cameraOptions.targetWidth;
                                }
                                cameraOptions['sourceType'] = Camera.PictureSourceType.PHOTOLIBRARY;
                                navigator.camera.getPicture(onFileSelect, onSelectFileError, cameraOptions);
                                _b.label = 6;
                            case 6:
                                if (index === 2) {
                                    ActionSheet.close();
                                    this.backHandler();
                                    reject('usercancel');
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                ActionSheet.showActionSheetWithOptions({
                    options: _this.BUTTONS,
                    cancelButtonIndex: _this.BUTTONS.length - 1,
                    message: null,
                    maskClosable: false,
                }, onActionSheetPress);
                History.push("#ActionSheet", false);
                _this.backHandler = BackHandler.addPreEventListener(function () {
                    ActionSheet.close();
                    _this.backHandler();
                    reject('usercancel');
                });
            });
        };
        _this.checkUpdate = function () { return __awaiter(_this, void 0, void 0, function () {
            var latestVersionData, latestVersion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkLatestVersion()];
                    case 1:
                        latestVersionData = _a.sent();
                        if (latestVersionData) {
                            latestVersion = latestVersionData.Version;
                            if (versionCompare(latestVersion, this.currentVersion) > 0 && versionCompare(latestVersion, this.latestCheckVersion) > 0) {
                                this.latestCheckVersion = latestVersion;
                                this.notifyUpdate(latestVersionData.Url, latestVersion);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.notifyUpdate = function (url, version) {
            _this.setState({
                packageUrl: url,
                modalVisible: true,
                version: version,
            });
        };
        _this.BUTTONS = ['拍照', '相册', '取消'];
        _this.onUpdateClose = function () {
            _this.setState({
                modalVisible: false,
            });
        };
        return _this;
    }
    CordovaProvider.prototype.getChildContext = function () {
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
            openFile: this.openFile,
        };
    };
    CordovaProvider.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.props.checkUpdate) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getVersion()];
                    case 1:
                        _a.currentVersion = _b.sent();
                        this.latestCheckVersion = this.currentVersion;
                        this.updateTimer = setInterval(this.checkUpdate, 1000 * 120);
                        _b.label = 2;
                    case 2:
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
                        }
                        else {
                            document.body.classList.add('android');
                        }
                        if (device.platform.toLowerCase() === 'android') {
                            //如果是Andnroid需要模拟一个键盘的div
                            window.addEventListener('native.keyboardshow', function (e) {
                                document.body.style.height = document.body.clientHeight - e.keyboardHeight;
                                // document.getElementById('keyboard').style.height = e.keyboardHeight;
                            });
                            window.addEventListener('native.keyboardhide', function (e) {
                                document.body.style.height = null;
                                // document.getElementById('keyboard').style.height = 0;
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CordovaProvider.prototype.componentWillMount = function () {
        clearInterval(this.updateTimer);
    };
    CordovaProvider.prototype.render = function () {
        var children = this.props.children;
        if (!this.props.checkUpdate) {
            return children;
        }
        return React.createElement(View, { style: styles.container },
            children,
            React.createElement(Modal, { visible: this.state.modalVisible, popup: true, animationType: "slide-up", transparent: true, maskClosable: true, onClose: this.onClose, title: "\u53D1\u73B0\u65B0\u7248\u672C(" + this.state.version + ")", 
                // footer={acts}
                afterClose: this.onClose },
                React.createElement(View, { style: [{ maxHeight: 200 }] },
                    React.createElement(Text, null, "\u662F\u5426\u9A6C\u4E0A\u66F4\u65B0?"),
                    React.createElement(View, { style: styles.foot },
                        React.createElement(TouchableHighlight, { style: [styles.button, styles.cancel], onPress: this.onUpdateClose },
                            React.createElement(Text, { style: styles.cancelText }, "\u53D6\u6D88")),
                        React.createElement(Update, { url: this.state.packageUrl, titleStyle: styles.okText, platform: this.state.platform, style: [styles.button, styles.ok], title: "\u66F4\u65B0" })))));
    };
    CordovaProvider.childContextTypes = {
        getPicture: PropTypes.func,
        getPictures: PropTypes.func,
        getPosition: PropTypes.func,
        getCurrentAddress: PropTypes.func,
        getTopPadding: PropTypes.func,
        getVersion: PropTypes.func,
        getPlatform: PropTypes.func,
        checkLatestVersion: PropTypes.func,
        barcodeScan: PropTypes.func,
        openFile: PropTypes.func,
    };
    CordovaProvider.contentTypes = {
        getPositionString: PropTypes.func,
    };
    CordovaProvider.defaultProps = {
        checkUpdate: true,
    };
    return CordovaProvider;
}(Component));
export default CordovaProvider;
var styles = StyleSheet.create({
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
    cancelText: {},
    okText: {
        color: 'white',
    },
});
