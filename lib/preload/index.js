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
import { Linking } from 'react-native';
import { Svr } from 'yes-core';
var yigoPreload = function () { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = {
                    service: "GetPreLoadForm",
                };
                return [4 /*yield*/, Svr.Request.getData(params)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export default (function (Preload) {
    if (!Preload) {
        return;
    }
    var oldFunc = Linking.getInitialURL;
    /**
     * Preload
     *  condition   条件，只有在平台的preloadForm中出现的项目才会起作用，这里是一个path值
     *  force       是否无法关闭,默认不限制
     *  formKey     单据key
     *  status      单据状态
     *  oid         单据id
     */
    Linking.getInitialURL = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data_1, _b, preloadData, _c, ex_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 16, , 20]);
                    if (!!Preload) return [3 /*break*/, 4];
                    if (!oldFunc) return [3 /*break*/, 2];
                    return [4 /*yield*/, oldFunc()];
                case 1:
                    _a = _e.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = null;
                    _e.label = 3;
                case 3: return [2 /*return*/, _a];
                case 4:
                    data_1 = Preload;
                    if (!(typeof Preload === 'function')) return [3 /*break*/, 6];
                    return [4 /*yield*/, Preload()];
                case 5:
                    data_1 = _e.sent();
                    _e.label = 6;
                case 6:
                    if (!!data_1) return [3 /*break*/, 10];
                    if (!oldFunc) return [3 /*break*/, 8];
                    return [4 /*yield*/, oldFunc()];
                case 7:
                    _b = _e.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _b = null;
                    _e.label = 9;
                case 9: return [2 /*return*/, _b];
                case 10:
                    if (!data_1.condition) return [3 /*break*/, 15];
                    return [4 /*yield*/, yigoPreload()];
                case 11:
                    preloadData = _e.sent();
                    if (!preloadData) return [3 /*break*/, 15];
                    if (!!preloadData.find(function (item) { return item.path === data_1.condition; })) return [3 /*break*/, 15];
                    if (!oldFunc) return [3 /*break*/, 13];
                    return [4 /*yield*/, oldFunc()];
                case 12:
                    _c = _e.sent();
                    return [3 /*break*/, 14];
                case 13:
                    _c = null;
                    _e.label = 14;
                case 14: return [2 /*return*/, _c];
                case 15: return [2 /*return*/, "://card/YES/" + data_1.formKey + "/" + data_1.oid + "/" + data_1.status];
                case 16:
                    ex_1 = _e.sent();
                    if (!oldFunc) return [3 /*break*/, 18];
                    return [4 /*yield*/, oldFunc()];
                case 17:
                    _d = _e.sent();
                    return [3 /*break*/, 19];
                case 18:
                    _d = null;
                    _e.label = 19;
                case 19: return [2 /*return*/, _d];
                case 20: return [2 /*return*/];
            }
        });
    }); };
});
