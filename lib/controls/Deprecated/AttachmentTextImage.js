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
import React, { PureComponent } from 'react';
import { Svr } from 'yes-core';
import { ControlWrap } from 'yes-intf';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
var AttachmentTextImage = /** @class */ (function (_super) {
    __extends(AttachmentTextImage, _super);
    function AttachmentTextImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AttachmentTextImage.prototype.render = function () {
        var billform = this.context.getBillForm();
        if (!billform) {
            return null;
        }
        var formKey = billform.form.formKey;
        var _a = this.props, displayValue = _a.displayValue, style = _a.style;
        var url = Svr.SvrMgr.AttachURL + "?path=" + displayValue + "&formKey=" + formKey + "&service=DownloadImage&mode=2";
        return (React.createElement(Image, { src: url, style: style }));
    };
    AttachmentTextImage.contextTypes = {
        getBillForm: PropTypes,
    };
    AttachmentTextImage = __decorate([
        ControlWrap
    ], AttachmentTextImage);
    return AttachmentTextImage;
}(PureComponent));
export default AttachmentTextImage;
