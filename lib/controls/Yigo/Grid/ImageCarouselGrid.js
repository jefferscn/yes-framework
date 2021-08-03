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
import Carousel from 'nuka-carousel';
import { ListComponents } from 'yes-comp-react-native-web';
import { View, StyleSheet } from 'react-native';
import { GridRowWrap as gridRowWrap, GridWrap } from 'yes-intf';
var ListImage = ListComponents.ListImage, ListText = ListComponents.ListText;
var Row = gridRowWrap(View);
var styles = StyleSheet.create({
    title: {
        position: 'absolute',
        bottom: 5,
        left: 10,
        color: 'white'
    }
});
var ImageCarouselGrid = /** @class */ (function (_super) {
    __extends(ImageCarouselGrid, _super);
    function ImageCarouselGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageCarouselGrid.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, imageColumn = _a.imageColumn, textColumn = _a.textColumn, style = _a.style, height = _a.height;
        if (!data) {
            return React.createElement(View, { style: style });
        }
        return (React.createElement(Carousel, { autoplay: true, height: height, wrapAround: true, initialSlideHeight: height, withoutControls: true }, data.map(function (item, index) {
            return (React.createElement(Row, { rowIndex: index, style: style },
                React.createElement(ListImage, { needThumbnail: _this.props.needThumbnail, w: _this.props.w, h: _this.props.h, yigoid: imageColumn, style: style }),
                textColumn ? React.createElement(ListText, { style: styles.title, yigoid: textColumn }) : null));
        })));
    };
    ImageCarouselGrid.defaultProps = {
        needThumbnail: false,
        height: 150,
    };
    return ImageCarouselGrid;
}(PureComponent));
export default GridWrap(ImageCarouselGrid);
