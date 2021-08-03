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
import React, { PureComponent } from 'react';
import WxImageViewer from 'react-wx-images-viewer';
import { GridWrap } from 'yes-intf';
var GridImageViewer = /** @class */ (function (_super) {
    __extends(GridImageViewer, _super);
    function GridImageViewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridImageViewer.prototype.render = function () {
        var data = this.props.data;
        if (!data) {
            return null;
        }
        return (React.createElement(WxImageViewer, { onClose: this.viewerClose, zIndex: 1000, urls: [displayValue], index: 0 }));
    };
    return GridImageViewer;
}(PureComponent));
export default GridWrap(GridImageViewer);
