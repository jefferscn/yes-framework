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
import { attachmentActionWrap } from 'yes-intf';
import PropTypes from 'prop-types';
var AttachmentAddClick = /** @class */ (function (_super) {
    __extends(AttachmentAddClick, _super);
    function AttachmentAddClick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPress = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var file, ex_1, files, _i, files_1, file, ex_2, file, ex_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (!!this.props.multiSelect) return [3 /*break*/, 7];
                        if (!this.context.getPicture) {
                            return [2 /*return*/];
                        }
                        this.context.startWorking();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, this.context.getPicture()];
                    case 2:
                        file = _a.sent();
                        return [4 /*yield*/, this.props.addAttachment(file.file)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        ex_1 = _a.sent();
                        console.log(ex_1);
                        return [3 /*break*/, 6];
                    case 5:
                        this.context.endWorking();
                        return [7 /*endfinally*/];
                    case 6: return [3 /*break*/, 23];
                    case 7:
                        if (!this.context.getPictures) return [3 /*break*/, 17];
                        this.context.startWorking();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 14, 15, 16]);
                        return [4 /*yield*/, this.context.getPictures()];
                    case 9:
                        files = _a.sent();
                        _i = 0, files_1 = files;
                        _a.label = 10;
                    case 10:
                        if (!(_i < files_1.length)) return [3 /*break*/, 13];
                        file = files_1[_i];
                        return [4 /*yield*/, this.props.addAttachment(file.file)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        _i++;
                        return [3 /*break*/, 10];
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        ex_2 = _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        this.context.endWorking();
                        return [7 /*endfinally*/];
                    case 16: return [3 /*break*/, 23];
                    case 17:
                        if (!this.context.getPicture) return [3 /*break*/, 23];
                        this.context.startWorking();
                        _a.label = 18;
                    case 18:
                        _a.trys.push([18, 21, 22, 23]);
                        return [4 /*yield*/, this.context.getPicture()];
                    case 19:
                        file = _a.sent();
                        return [4 /*yield*/, this.props.addAttachment(file.file)];
                    case 20:
                        _a.sent();
                        return [3 /*break*/, 23];
                    case 21:
                        ex_3 = _a.sent();
                        console.log(ex_3);
                        return [3 /*break*/, 23];
                    case 22:
                        this.context.endWorking();
                        return [7 /*endfinally*/];
                    case 23: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    // onAddImage = (files) => {
    //     Util.safeExec(async () => {
    //         const compress = new Promise((resolve, reject) => {
    //             new Compressor(files[0].file, {
    //                 quality: 100,
    //                 maxWidth: 1000,
    //                 success(result) {
    //                     resolve({
    //                         file: result,
    //                         name: files[0].file.name,
    //                     });
    //                 },
    //                 error(err) {
    //                     reject(err);
    //                 }
    //             });
    //         });
    //         const f = await compress;
    //         await this.props.addAttachment(f.file);
    //     });
    // }
    AttachmentAddClick.prototype.render = function () {
        var _a = this.props, element = _a.element, children = _a.children;
        var child = this.context.createElement(element || children);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    };
    AttachmentAddClick.contextTypes = {
        getPicture: PropTypes.func,
        getPictures: PropTypes.func,
        startWorking: PropTypes.func,
        endWorking: PropTypes.func,
        createElement: PropTypes.func,
    };
    AttachmentAddClick.defaultProps = {
        multiSelect: false,
    };
    return AttachmentAddClick;
}(PureComponent));
export default attachmentActionWrap(AttachmentAddClick);
