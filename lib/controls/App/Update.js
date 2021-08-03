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
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'antd-mobile';
var Update = /** @class */ (function (_super) {
    __extends(Update, _super);
    function Update() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            updating: false,
            percent: 0,
        };
        _this.updateAndroid = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, url, onPress, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, url = _a.url, onPress = _a.onPress;
                        onPress && onPress();
                        if (this.state.updating) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            updating: true,
                        });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this._updateAndroid(url)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        ex_1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.setState({
                            updating: false,
                        });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    Update.prototype._updateAndroid = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (fs) {
                //创建文件
                fs.getFile('android.apk', { create: true }, function (fileEntry) {
                    _this.download(fileEntry, url).catch(reject);
                }, reject);
            }, reject);
        });
    };
    Update.prototype.download = function (fileEntry, url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var ft = new FileTransfer();
            var fileURL = fileEntry.toURL();
            //监听下载进度
            ft.onprogress = function (e) {
                console.info(e);
                if (e.lengthComputable) {
                    var percent = (e.loaded / e.total) * 100;
                    // changeMsg('downloading package ' + percent.toFixed(2) + '%');
                    _this.setState({
                        percent: percent.toFixed(2),
                    });
                }
            };
            ft.download(url, fileURL, function (entry) {
                cordova.plugins.fileOpener2.open(entry.toURL(), 'application/vnd.android.package-archive', {
                    error: function (da) {
                        console.log(da);
                        reject();
                    },
                    success: function (data) {
                        resolve();
                    }
                });
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    };
    Update.prototype.render = function () {
        var _a = this.props, title = _a.title, url = _a.url, platform = _a.platform, style = _a.style, titleStyle = _a.titleStyle;
        if (platform === 'android') {
            return (React.createElement(View, { style: style },
                React.createElement(TouchableOpacity, { onPress: this.updateAndroid },
                    React.createElement(View, null,
                        React.createElement(Text, { style: titleStyle }, title))),
                this.state.updating ? React.createElement(ActivityIndicator, { toast: true, text: "\u4E0B\u8F7D\u4E2D(" + this.state.percent + "%)" }) : null));
        }
        return React.createElement("a", { href: url, style: StyleSheet.flatten([{ display: 'flex' }, style, titleStyle]), className: "dialog-btn" }, title);
    };
    return Update;
}(PureComponent));
export default Update;
