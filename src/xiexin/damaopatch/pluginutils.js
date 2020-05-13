import { wx, wxPlatform } from "yes-platform";
import { isCordova, isWeixin, isBrowser } from "yes/dist/components/Env";
import { AppDispatcher, Util } from "yes";

export default class PuginUtil {

    static gpsLocate = async (showAddress) => {
        if (isCordova()) {
            const result = await Cordova.gpsLocate(showAddress);
            return result;
        }

        if (isBrowser()) {
            const result = await Browser.gpsLocate(showAddress);
            return result;
        }
        return Promise.reject('Current platform not support GPS Locate!');
    }

    static scanBarcode = async (scanTypes, prompt, showFlipCameraButton, showTorchButton, torchOn, resultDisplayDuration) => {
        if (isWeixin()) {
            return await Weixin.scanBarcode(scanTypes);
        }
        if (isCordova()) {
            return await Cordova.scanBarcode(scanTypes, prompt, showFlipCameraButton, showTorchButton, torchOn, resultDisplayDuration);
        }
        return Promise.reject('Current platform not support QRScan!');
    }
    static takePhoto = async () => {
        if (isWeixin()) {
            return await Weixin.takePhoto();
        }
        if (isCordova()) {
            const result = await Cordova.openCordovaCamera(Camera.PictureSourceType.CAMERA);
            return result;
        }
        return Promise.reject('Current platform not support Take Photo!');
    }
    static selectPhoto = async (isOnlyPicture, types) => {
        console.log('Do Select Photo!')
        if (isWeixin()) {
            return await Weixin.selectPhoto(isOnlyPicture);
        }
        if (isCordova()) {
            const cordovaMediaType = isOnlyPicture ? Camera.MediaType.PICTURE : Camera.MediaType.ALLMEDIA;
            const result = await Cordova.openCordovaCamera(Camera.PictureSourceType.PHOTOLIBRARY, cordovaMediaType);
            return result;
        }
        if (isBrowser()) {
            return await Browser.selectPhoto(isOnlyPicture, types);
        }
        return Promise.reject('Current platform not support Select Photo!');
    }
    static download = async (url, isOpen, fileName) => {
        if (isCordova()) {
            await Cordova.download(url, isOpen, fileName);
        }
        if (isBrowser() && url) {
            window.open(url, '_blank');
        }
    }
    static attachmentPreview = (file) => {
        if (isCordova()) {
            Cordova.attachmentPreview(file);
        }
    }
}


const loadBaiduMap = () => {
    return new Promise(function (resolve, reject) {
        global._initBaiduMap = function () {
            resolve(global.BMap);
        }
        const script = document.createElement("script");
        script.src = "https://api.map.baidu.com/api?v=2.0&ak=fSDn0wEEkKVVunWlh1GqyMoU&callback=_initBaiduMap";
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

const searchAddress = (locationPoint, resolve) => {
    const getLocation = new BMap.Geocoder();
    const [lng, lat] = locationPoint.split(',');
    const point = new BMap.Point(lng, lat);
    getLocation.getLocation(point, function (rs) {
        const addComp = rs.addressComponents;
        const addr = [];
        if (addComp.province != addComp.city) {
            addr.push(addComp.province);
        }
        addr.push(addComp.city, addComp.district, addComp.street, addComp.streetNumber);
        resolve(addr.join(''));
    });
};

class Browser {
    static gpsLocate = (showAddress) => {
        return new Promise(function (resolve, reject) {
            const locate = () => {
                if (!global.baiduGeolocation) {
                    global.baiduGeolocation = new BMap.Geolocation();
                    global.baiduGeolocation.enableSDKLocation();
                }
                global.baiduGeolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        const locationString = [r.point.lng, r.point.lat].join();
                        if (showAddress) {
                            searchAddress(locationString, resolve);
                        } else {
                            resolve(locationString);
                        }
                    } else {
                        resove(this.getStatus());
                    }
                }, { enableHighAccuracy: true });
            }

            if (!global.BMap) {
                loadBaiduMap().then(() => {
                    locate();
                }, (error) => {
                    reject(error);
                });
            } else {
                locate();
            }
        });
    }
    static selectPhoto = (isOnlyPicture, types) => {

        return new Promise((resolve, reject) => {
            const fi = document.createElement('input');
            fi.type = 'file';
            if (isOnlyPicture) {
                if (types) {
                    fi.accept = types.join(',');
                } else {
                    fi.accept = 'image/*';
                }
            }
            fi.onchange = (event) => {
                console.log(`on change ${fi.value}`);
                if (fi.value == '') {
                    return;
                }
                const files = fi.files;
                console.log(fi.files);
                resolve(files && files.length > 0 ? files : undefined);
            };
            fi.click();
        });
    }
}
class Weixin {
    static takePhoto = async () => {
        return await wxPlatform.takePhoto();
    }
    static selectPhoto = async () => {
        return await wxPlatform.selectPhoto();
    }
    static scanBarcode = (scanTypes) => {
        if (!scanTypes || scanTypes.length == 0) {
            scanTypes = ["qrCode", "barCode"];
        }
        return new Promise(function (resolve, reject) {
            wx.scanQRCode({
                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: scanTypes, // 可以指定扫二维码还是一维码，默认二者都有
                success: (res) => {
                    const resultStr = res.resultStr;
                    resolve(resultStr);
                },
                fail: (err) => {
                    reject(err);
                },
            });
        });
    }
}

const mineTypes = [
    { ext: 'doc', minetype: 'application/msword' },
    { ext: 'docx', minetype: 'application/msword' },
    { ext: 'ppt', minetype: 'application/vnd.ms-powerpoint' },
    { ext: 'pptx', minetype: 'application/vnd.ms-powerpoint' },
    { ext: 'xls', minetype: 'application/vnd.ms-excel' },
    { ext: 'xlsx', minetype: 'application/vnd.ms-excel' },
    { ext: 'rtf', minetype: 'application/rtf' },
    { ext: 'pdf', minetype: 'application/pdf' },
    { ext: 'txt', minetype: 'text/plain' },
    { ext: 'png', minetype: 'image/png' },
    { ext: 'jpg', minetype: 'image/jpeg' },
    { ext: 'jpeg', minetype: 'image/jpeg' },
    { ext: 'apk', minetype: 'application/vnd.android.package-archive' },
];

const getMineType = (file) => {
    if (!file)
        return null;
    const minetype = mineTypes.find(function (item) {
        return file.endsWith(item.ext);
    });
    return minetype ? minetype.minetype : '*/*';
};
// const isChineseChar = (str) => {
//     const reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
//     return reg.test(str);
// }

class Cordova {
    static gpsLocate = (showAddress) => {
        return new Promise(function (resolve, reject) {
            const locate = () => {
                if ((typeof device != 'undefined' && device.platform == 'Android') || (typeof device != 'undefined' && device.platform == 'Tizen')) {
                    //百度 定位SDK
                    baidu_location.getCurrentPosition(androidSuccessCallback, androidFailedCallback);
                } else {
                    //plugin自带
                    navigator.geolocation.getCurrentPosition(onLocateSuccess, onLocateError);
                }
            };

            const androidSuccessCallback = (locationJson) => {
                const locationString = [locationJson.coords.longitude, locationJson.coords.latitude].join();
                if (showAddress) {
                    searchAddress(locationString, resolve);
                } else {
                    resolve(locationString);
                }
            };

            const androidFailedCallback = function (err) {
                reject('定位失败')
            };

            const translateCallback = (points) => {
                if (!points.points) {
                    resolve('');
                }
                const point = points.points[0];
                if (point) {
                    const locationString = [point.lng, point.lat].join();
                    if (showAddress) {
                        searchAddress(locationString, resolve);
                    } else {
                        resolve(locationString);
                    }
                }
            };

            const onLocateSuccess = (position) => {
                //GPS坐标
                const lng = position.coords.longitude;
                const lat = position.coords.latitude;
                //原是坐标转百度坐标
                const gpsPoint = new BMap.Point(lng, lat);
                const convertor = new BMap.Convertor();
                convertor.translate([gpsPoint], 1, 5, translateCallback);
            };

            const onLocateError = function () {
                reject('定位失败');
            };

            if (!global.BMap) {
                loadBaiduMap().then(() => {
                    locate();
                }, (error) => {
                    reject(error);
                });
            } else {
                locate();
            }
        });
    }

    static scanBarcode = (scanTypes, prompt, showFlipCameraButton, showTorchButton, torchOn, resultDisplayDuration) => {
        let options = {
            'prompt': prompt,
            'showFlipCameraButton': showFlipCameraButton,
            'torchOn': torchOn,
            'showTorchButton': showTorchButton,
            'resultDisplayDuration': resultDisplayDuration
        };
        if (scanTypes && scanTypes.length > 0) {
            options.formats = scanTypes.join(',');
        }
        return new Promise(function (resolve, reject) {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    if (!result.cancelled) {
                        resolve(result.text);
                    }
                },
                function (error) {
                    reject(error);
                },
                options
            );
        });
    }
    static attachmentPreview = (file) => {
        return new Promise((resolve, reject) => {
            const timestamp = Date.parse(new Date());
            const fileName = timestamp + '.' + file.name.split('.').slice(-1).toString();
            const onError = function (error) {
                console.log(error);
                reject(error);
            }
            const onGetFileSuccess = (fileEntry) => {
                fileEntry.createWriter(function (fileWriter) {

                    fileWriter.onwrite = function () {
                        console.log("Successful file write...");
                        resolve();
                        const minetype = getMineType(fileName);
                        cordova.plugins.fileOpener2.open(
                            fileEntry.toURL(),
                            minetype
                        );
                    };

                    fileWriter.onerror = function (e) {
                        console.log("Failed file write: " + e.toString());
                        fileEntry.remove();
                    };

                    fileWriter.write(file);
                });
            }
            const onFileSystemSuccess = function (fileSystem) {
                let fs = null;
                if (cordova.platformId === "android") {
                    fs = fileSystem;
                } else {
                    fs = fileSystem.root;
                }
                fs.getFile(fileName, { create: true, exclusive: false }, onGetFileSuccess, onError);
            };
            if (cordova.platformId === "android") {
                window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, onFileSystemSuccess, onError);
            } else {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onError);
            }
        })
    }
    static openCordovaCamera = (sourceType, mediaType) => {
        mediaType = mediaType || Camera.MediaType.ALLMEDIA;
        if (sourceType === Camera.PictureSourceType.CAMERA) {
            mediaType = Camera.MediaType.PICTURE;
        }
        const options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: sourceType,
            mediaType: mediaType,
            allowEdit: false,
            saveToPhotoAlbum: false,
            correctOrientation: true
        }
        console.log(`Do OpenCordovaCamera! ${sourceType} ${options}`)

        return new Promise((resolve, reject) => {

            const onError = (error) => {
                console.error('文件处理错误！')
                if (error !== 'Camera cancelled.' && error !== 'no image selected' && error !== 'Selection cancelled.' && error !== 'has no access to assets') {
                    reject(error);
                } else {
                    resolve(undefined);
                }
            }

            const onGetFileSuccess = (file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    let blob = new Blob([e.target.result], { type: file.type });
                    blob.name = file.name;
                    resolve([{ isReaded: true, file: blob }])
                }
                reader.onerror = onError;
                reader.readAsArrayBuffer(file)
            }

            const onFileSystemSuccess = (entry) => {
                console.error('解析文件地址成功！');
                if (!entry) {
                    resolve();
                }
                entry.file(onGetFileSuccess, onError);
            }
            const onCameraPictureSuccess = (imageUri) => {
                if (!imageUri) {
                    resolve();
                }
                if (imageUri && imageUri.indexOf('://') == -1) {
                    imageUri = `file://${imageUri}`;
                }
                window.resolveLocalFileSystemURL(imageUri, onFileSystemSuccess, onError);
            }

            navigator.camera.getPicture(onCameraPictureSuccess, onError, options);
        });
    }
    static download = (url, isOpen = false, fileName) => new Promise((resolve, reject) => {
        url = decodeURIComponent(url);
        var name = fileName || url;
        var timestamp = Date.parse(new Date());
        var newname = timestamp + '.' + name.split('.').slice(-1).toString();
        var onFileSystemSuccess = function (fileSystem) {
            var fs = null;
            if (cordova.platformId == "android") {
                fs = fileSystem;
            } else {
                fs = fileSystem.root;
            }
            fs.getFile(newname, { create: true, exclusive: false },
                function gotFileEntry(fileEntry) {
                    fileEntry.remove();
                    var ft = new FileTransfer();
                    var uri = url;
                    ft.download(uri, fileEntry.nativeURL, function (entry) {
                        if (!isOpen) {
                            resolve();
                            return;
                        }
                        try {
                            var minetype = getMineType(newname);
                            cordova.plugins.fileOpener2.open(
                                entry.toURL(),
                                minetype
                            );
                            resolve();
                        } catch (e) {
                            reject(e);
                        }
                    }, function (error) {
                        console.log(error);
                        reject(error);
                    }, false);
                })
        }
        var onError = function (error) {
            console.log(error);
            reject(error);
        }
        if (cordova.platformId == "android") {
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, onFileSystemSuccess, onError);
        } else {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onError);
        }
    });
}


AppDispatcher.register((action) => {
    switch (action.type) {
        case 'attachmentPreview':
            console.info('attachmentPreview action！')
            const file = action.file;
            if (!file) {
                return;
            }
            setTimeout(() => {
                Util.safeExec(async () => {
                    await PuginUtil.attachmentPreview(file);
                });
            }, 0);
            break;
        default:
    }
});