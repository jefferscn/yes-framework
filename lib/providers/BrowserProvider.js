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
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, ImagePicker } from 'antd-mobile';
import { showModal } from '../SiblingMgr';
import Compressor from 'compressorjs';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native-web';
import { Update } from '../export';
var ImageSelect = /** @class */ (function (_super) {
    __extends(ImageSelect, _super);
    function ImageSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClose = function () {
            _this.props.onClose && _this.props.onClose();
        };
        return _this;
    }
    ImageSelect.prototype.render = function () {
        return (React.createElement(Modal, { popup: true, transitionName: 'slide-up', afterClose: this.onClose },
            React.createElement(ImagePicker, { length: "1", files: [], onChange: onFileChange, onFail: onFail })));
    };
    return ImageSelect;
}(PureComponent));
var BrowserProvider = /** @class */ (function (_super) {
    __extends(BrowserProvider, _super);
    function BrowserProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            imagePickerVisible: false,
        };
        _this.getPosition = function () { return __awaiter(_this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                options = {
                    enableHighAccuracy: false,
                    maximumAge: 0,
                    timeout: 10000,
                };
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var onLocateSuccess = function (position) {
                            resolve(position.coords);
                        };
                        var onLocateError = function (err) {
                            reject(err);
                        };
                        navigator.geolocation.getCurrentPosition(onLocateSuccess, onLocateError, options);
                    })];
            });
        }); };
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
        _this.getPicture = function (cameraDirection, quality, targetWidth) {
            if (quality === void 0) { quality = 50; }
            if (targetWidth === void 0) { targetWidth = 1000; }
            return new Promise(function (resolve, reject) {
                var onFileChange = function (files) {
                    if (files.length === 0) {
                        reject('empty');
                        closeModal();
                        return;
                    }
                    new Compressor(files[0].file, {
                        quality: quality / 100,
                        maxWidth: targetWidth,
                        success: function (result) {
                            resolve({
                                file: result,
                                name: result.name,
                            });
                        },
                        error: function (err) {
                            reject(err);
                        }
                    });
                    // resolve({
                    //     file: files[0].file,
                    //     name: files[0].file.name,
                    // });
                    closeModal();
                };
                var onFail = function (ex) {
                    reject(ex);
                };
                var closeModal = showModal(React.createElement(Modal, { visible: true, maskClosable: false, popup: true, transitionName: 'slide-up' },
                    React.createElement(ImagePicker, { length: "1", files: [], onChange: onFileChange, onFail: onFail })));
            });
        };
        _this.onClose = function () {
            _this.setState({
                modalVisible: false,
            });
        };
        _this.checkUpdate = function () {
            _this.setState({
                modalVisible: true,
            });
        };
        return _this;
    }
    BrowserProvider.prototype.getChildContext = function () {
        return {
            getPicture: this.getPicture,
            getPosition: this.getPosition,
            getCurrentAddress: this.getCurrentAddress,
        };
    };
    BrowserProvider.prototype.componentDidMount = function () {
        window.checkUpdate = this.checkUpdate;
    };
    BrowserProvider.prototype.componentWillUnmount = function () {
        delete window.checkUpdate;
    };
    BrowserProvider.prototype.render = function () {
        var children = this.props.children;
        if (!this.props.checkUpdate) {
            return children;
        }
        return React.createElement(View, { style: styles.container },
            children,
            React.createElement(Modal, { visible: this.state.modalVisible, popup: true, animationType: "slide-up", transparent: true, maskClosable: true, onClose: this.onClose, title: "发现新版本", 
                // footer={acts}
                afterClose: this.onClose },
                React.createElement(View, { style: [{ maxHeight: 200 }] },
                    React.createElement(Text, null, "\u662F\u5426\u9A6C\u4E0A\u66F4\u65B0?"),
                    React.createElement(View, { style: styles.foot },
                        React.createElement(TouchableHighlight, { style: [styles.button, styles.cancel], onPress: this.onClose },
                            React.createElement(Text, { style: styles.cancelText }, "\u53D6\u6D88")),
                        React.createElement(Update, { titleStyle: styles.okText, platform: "ios", style: [styles.button, styles.ok], title: "\u66F4\u65B0" })))));
        // return children;
    };
    BrowserProvider.childContextTypes = {
        getPicture: PropTypes.func,
        getPosition: PropTypes.func,
        getCurrentAddress: PropTypes.func,
    };
    BrowserProvider.contentTypes = {
        getPositionString: PropTypes.func,
    };
    return BrowserProvider;
}(PureComponent));
export default BrowserProvider;
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
