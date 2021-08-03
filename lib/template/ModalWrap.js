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
// import NormalTemplate from '../../template/NormalTemplate';
// import meta from '../config/billforms/FSSC_TrainTicketBooks.json';
import { Modal } from 'antd-mobile';
export default (function (Template) {
    var ModalWrap = /** @class */ (function (_super) {
        __extends(ModalWrap, _super);
        function ModalWrap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ModalWrap.prototype.render = function () {
            return (React.createElement(Modal, { visible: true, maskStyle: { zIndex: 899 }, wrapClassName: "fullscreen", maskClosable: false },
                React.createElement(Template, __assign({}, this.props))));
        };
        return ModalWrap;
    }(PureComponent));
    return ModalWrap;
});
