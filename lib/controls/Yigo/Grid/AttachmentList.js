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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import React, { PureComponent } from 'react';
import { GridWrap, GridRowWrap, ControlWrap, BackHandler, Util } from 'yes-intf';
import { Image, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import WxImageViewer from 'react-wx-images-viewer';
import { Svr } from 'yes-core';
import Element from '../../../template/Element';
import { History } from 'yes-web';
import Icon from 'react-native-vector-icons/FontAwesome';
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
var getFileName = function (_url) {
    var txt = _url.split('/').pop();
    var timestamp = Date.parse(new Date());
    var newname = timestamp + '.' + txt.split('.').slice(-1).toString();
    return newname;
};
function isChineseChar(str) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
}
var downloadFile = function (_url, fileName) {
    return new Promise(function (resolve, reject) {
        // const fileName = getFileName(_url);
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
                    reject(error.getMessage());
                }, false);
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
var styles = StyleSheet.create({
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
var AttachmentFile = /** @class */ (function (_super) {
    __extends(AttachmentFile, _super);
    function AttachmentFile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buildThumbnail = function (url) {
            if (Util.buildThumbnailUrl) {
                return Util.buildThumbnailUrl(url, 100, 100);
            }
            return url;
        };
        _this.isImage = function () {
            var fileType = _this.props.fileType;
            var tmp = fileType ? fileType.toLowerCase() : "";
            return tmp === 'jpg' || tmp === 'png' || tmp === 'jpeg';
        };
        _this.getFileTypeIcon = function (type) {
            var result = 'file';
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
        };
        _this.openFile = function () {
            var _a = _this.props, displayValue = _a.displayValue, yigoAttachment = _a.yigoAttachment;
            var billform = _this.context.getBillForm();
            var formKey = billform.form.formKey;
            var file = yigoAttachment ? Svr.SvrMgr.AttachURL + "?path=" + displayValue + "&formKey=" + formKey + "&service=DownloadAttachment&mode=2" : displayValue;
            Util.safeExec(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, downloadFile(file, getFileName(displayValue))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); });
        };
        return _this;
    }
    AttachmentFile.prototype.render = function () {
        var _a = this.props, displayValue = _a.displayValue, fileType = _a.fileType, style = _a.style, yigoAttachment = _a.yigoAttachment;
        if (this.isImage()) {
            if (yigoAttachment) {
                var billform = this.context.getBillForm();
                var formKey = billform.form.formKey;
                var url = this.buildThumbnail(Svr.SvrMgr.AttachURL + "?path=" + displayValue + "&formKey=" + formKey + "&service=DownloadImage&mode=2");
                return (React.createElement(Image, { source: url, style: [styles.image, style] }));
            }
            else {
                return (React.createElement(Image, { source: displayValue, style: [styles.image, style] }));
            }
        }
        return (React.createElement(TouchableHighlight, { onPress: this.openFile, style: styles.fileTypeContainer },
            React.createElement(Icon, { style: styles.fileTypeIcon, name: this.getFileTypeIcon(fileType) })));
    };
    AttachmentFile.contextTypes = {
        getBillForm: PropTypes.func,
    };
    AttachmentFile = __decorate([
        ControlWrap
    ], AttachmentFile);
    return AttachmentFile;
}(PureComponent));
var AttachmentItem = /** @class */ (function (_super) {
    __extends(AttachmentItem, _super);
    function AttachmentItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onRemove = function () {
            _this.props.remove && _this.props.remove();
        };
        _this.onPress = function () {
            _this.props.onPress && _this.props.onPress(_this.props.rowIndex);
        };
        return _this;
    }
    AttachmentItem.prototype.render = function () {
        var _a = this.props, removable = _a.removable, fileUrl = _a.fileUrl, fileType = _a.fileType, style = _a.style, yigoAttachment = _a.yigoAttachment;
        return (React.createElement(TouchableWithoutFeedback, { onPress: this.onPress },
            React.createElement(View, { style: [styles.item, style] },
                React.createElement(AttachmentFile, { yigoAttachment: yigoAttachment, fileType: fileType, yigoid: fileUrl }),
                removable ? React.createElement(TouchableWithoutFeedback, { onPress: this.onRemove },
                    React.createElement(Icon, { name: "times", size: 20, style: styles.icon })) : null)));
    };
    AttachmentItem.defaultProps = {
        removable: false,
        fileType: null,
        url: null,
        yigoAttachment: true,
    };
    AttachmentItem = __decorate([
        GridRowWrap
    ], AttachmentItem);
    return AttachmentItem;
}(PureComponent));
var AttachmentList = /** @class */ (function (_super) {
    __extends(AttachmentList, _super);
    function AttachmentList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showPreview: false,
        };
        _this.onViewerClose = function () {
            if (_this.props.inline) {
                _this.props.onRequestClose && _this.props.onRequestClose();
                return;
            }
            _this.setState({
                showPreview: false,
            });
            _this.backHandler && _this.backHandler();
        };
        _this.onViewerOpen = function (index) {
            _this.setState({
                showPreview: true,
                index: index,
            });
            History.push("#AttachmentList_modal");
            _this.backHandler = BackHandler.addPreEventListener(function () {
                // this.backHandler();
                _this.onViewerClose();
            });
        };
        return _this;
    }
    AttachmentList.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, fileName = _a.fileName, filePath = _a.filePath, isVirtual = _a.isVirtual, title = _a.title, multiSelect = _a.multiSelect, containerStyle = _a.containerStyle, removable = _a.removable, editable = _a.editable, inline = _a.inline, yigoAttachment = _a.yigoAttachment;
        var grid = this.context.getOwner();
        if (!grid) {
            return null;
        }
        var actionMeta = {
            type: 'element',
            elementType: 'AttachmentAction',
            elementProps: {
                style: {
                    width: 85,
                    display: 'inline-block',
                },
                multiSelect: multiSelect,
            }
        };
        var billform = this.context.getBillForm();
        var formKey = billform.form.formKey;
        // const filePathIndex = grid.getCellIndexByKey(filePath);
        // const fileNameIndex = grid.getCellIndexByKey(fileName);
        var files = [];
        data.forEach(function (item, index) {
            var path = grid.getValueByKey(index, filePath);
            if (yigoAttachment) {
                // const path = item.getIn(['data', filePathIndex, 0]);
                files.push(Svr.SvrMgr.AttachURL + "?path=" + path + "&formKey=" + formKey + "&service=DownloadImage&mode=2");
            }
            else {
                files.push(path);
            }
        });
        if (inline) {
            if (files.length > 0) {
                return (React.createElement(WxImageViewer, { onClose: this.onViewerClose, zIndex: 1000, urls: files, index: 0 }));
            }
            return (React.createElement(TouchableWithoutFeedback, { onPress: this.onViewerClose },
                React.createElement(View, { style: { flex: 1, justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(Text, { style: styles.noattach }, billform.form.formLoaded ? '没有附件,点击关闭' : '数据加载中...'))));
        }
        return (React.createElement(View, { style: this.props.style },
            title ? React.createElement(View, null,
                React.createElement(Text, { style: [styles.title] }, title)) : null,
            React.createElement(View, { style: [styles.container, containerStyle] },
                data.map(function (item, index) {
                    // const fn = item.getIn(['data', fileNameIndex, 0]);
                    var fn = grid.getValueByKey(index, fileName);
                    var fnArray = fn.split('.');
                    var fileType = fnArray.length > 1 ? fnArray[fnArray.length - 1] : null;
                    return (React.createElement(AttachmentItem, { yigoAttachment: yigoAttachment, rowIndex: index, removable: removable && editable, fileType: fileType, fileUrl: filePath, onPress: _this.onViewerOpen }));
                }),
                this.state.showPreview ? React.createElement(WxImageViewer, { onClose: this.onViewerClose, zIndex: 1000, crossorigin: "use-credentials", urls: files, index: this.state.index }) : null,
                editable ? React.createElement(Element, { meta: actionMeta }) : null)));
    };
    AttachmentList.contextTypes = {
        getOwner: PropTypes.func,
        getBillForm: PropTypes.func,
    };
    AttachmentList.defaultProps = {
        removable: true,
        yigoAttachment: true,
        multiSelect: true,
    };
    return AttachmentList;
}(PureComponent));
export default GridWrap(AttachmentList);
