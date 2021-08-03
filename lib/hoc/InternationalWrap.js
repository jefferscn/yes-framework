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
import React, { PureComponent } from 'react';
import { intlShape } from 'react-intl';
export default (function (BaseClass) {
    var _a;
    return _a = /** @class */ (function (_super) {
            __extends(InternationSupportClass, _super);
            function InternationSupportClass() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.formatMessage = function (msg) {
                    if (msg) {
                        return _this.context.intl ? _this.context.intl.formatMessage({ id: msg }) : msg;
                    }
                    return msg;
                };
                return _this;
            }
            InternationSupportClass.prototype.render = function () {
                return (React.createElement(BaseClass, __assign({ formatMessage: this.formatMessage }, this.props)));
            };
            return InternationSupportClass;
        }(PureComponent)),
        _a.contextTypes = {
            intl: intlShape,
        },
        _a;
});
