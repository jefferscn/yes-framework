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
import React, { Component } from "react";
import { ControlWrap } from 'yes';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    text: {
        paddingTop: 9,
        paddingBottom: 9,
        display: 'flex',
        alignItems: 'center',
    }
});
var GpsText = /** @class */ (function (_super) {
    __extends(GpsText, _super);
    function GpsText() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loading: false,
            error: false,
            errorMsg: '',
        };
        _this.locate = function () { return __awaiter(_this, void 0, void 0, function () {
            var pos, address, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        if (!(this.props.mode === 'gps')) return [3 /*break*/, 3];
                        if (!this.context.getPosition) return [3 /*break*/, 2];
                        this.setState({
                            loading: true,
                        });
                        return [4 /*yield*/, this.context.getPosition()];
                    case 1:
                        pos = _a.sent();
                        this.setState({
                            loading: false,
                        });
                        this.props.onChange([pos.longitude, pos.latetude].join(','));
                        _a.label = 2;
                    case 2: return [3 /*break*/, 5];
                    case 3:
                        if (!this.context.getCurrentAddress) return [3 /*break*/, 5];
                        this.setState({
                            loading: true,
                        });
                        return [4 /*yield*/, this.context.getCurrentAddress()];
                    case 4:
                        address = _a.sent();
                        this.setState({
                            loading: false,
                        });
                        this.props.onChange(address.address);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_1 = _a.sent();
                        this.setState({
                            error: true,
                            errorMsg: ex_1.message || ex_1,
                            loading: false,
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    GpsText.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.autoLocation) return [3 /*break*/, 1];
                        this.timer = setInterval(this.locate, this.props.autoInterval);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.locate()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GpsText.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.autoInterval !== this.props.autoInterval ||
            prevProps.autoLocation !== this.props.autoLocation) {
            if (this.timer) {
                clearInterval(this.timer);
            }
            if (this.props.autoLocation) {
                this.timer = setInterval(this.locate, this.props.autoInterval);
            }
            if (!this.state.loading) {
                this.locate();
            }
        }
    };
    GpsText.prototype.componentWillUnmount = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    GpsText.prototype.render = function () {
        return (React.createElement(View, { style: [styles.container, this.props.layoutStyles, this.props.style] },
            React.createElement(Text, { style: [styles.text, this.props.textStyles] }, this.state.error ? this.state.errorMsg : this.props.displayValue),
            this.state.loading ? React.createElement(ActivityIndicator, null) : null));
    };
    GpsText.defaultProps = {
        autoLocation: false,
        autoInterval: 20 * 1000,
        mode: 'gps',
    };
    GpsText.contextTypes = {
        getPosition: PropTypes.func,
        getCurrentAddress: PropTypes.func,
    };
    return GpsText;
}(Component));
export default ControlWrap(GpsText);
