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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
import PropTypes from 'prop-types';
export function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical, zeroExtend = options && options.zeroExtend, v1parts = v1.split('.'), v2parts = v2.split('.');
    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }
    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }
    if (zeroExtend) {
        while (v1parts.length < v2parts.length)
            v1parts.push("0");
        while (v2parts.length < v1parts.length)
            v2parts.push("0");
    }
    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }
    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }
        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }
    if (v1parts.length != v2parts.length) {
        return -1;
    }
    return 0;
}
export default (function (Comp) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(AppStatusWrap, _super);
            function AppStatusWrap() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = {
                    currentVersion: '',
                    fetching: false,
                    latestVersion: '',
                    canUpdakte: false,
                    platform: 'browser',
                };
                _this.updateVersion = function () { return __awaiter(_this, void 0, void 0, function () {
                    var currentVersion, appInfo, platform, result, canUpdate;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(this.context.getVersion && this.context.checkLatestVersion)) return [3 /*break*/, 3];
                                this.setState({
                                    fetching: true,
                                });
                                return [4 /*yield*/, this.context.getVersion()];
                            case 1:
                                currentVersion = _a.sent();
                                this.setState({
                                    currentVersion: currentVersion,
                                });
                                return [4 /*yield*/, this.context.checkLatestVersion()];
                            case 2:
                                appInfo = _a.sent();
                                platform = this.context.getPlatform();
                                if (appInfo) {
                                    result = versionCompare(appInfo.Version, currentVersion);
                                    canUpdate = result > 0;
                                    this.setState({
                                        fetching: false,
                                        latestVersion: appInfo.Version,
                                        url: appInfo.Url,
                                        platform: platform,
                                        canUpdate: canUpdate,
                                    });
                                }
                                else {
                                    this.setState({
                                        fetching: false,
                                    });
                                }
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                return _this;
            }
            AppStatusWrap.prototype.render = function () {
                return React.createElement(Comp, __assign({ updateVersion: this.updateVersion }, this.state, this.props));
            };
            return AppStatusWrap;
        }(PureComponent)),
        _a.contextTypes = {
            getVersion: PropTypes.func,
            checkLatestVersion: PropTypes.func,
            getPlatform: PropTypes.func,
        },
        _a;
});
