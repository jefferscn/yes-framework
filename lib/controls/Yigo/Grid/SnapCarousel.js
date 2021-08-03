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
import { ListComponents } from 'yes-comp-react-native-web';
import { View, StyleSheet } from 'react-native';
import { GridRowWrap as gridRowWrap, GridWrap } from 'yes-intf';
import Carousel from 'react-native-snap-carousel';
var ListImage = ListComponents.ListImage, ListText = ListComponents.ListText;
var Row = gridRowWrap(View);
var styles = StyleSheet.create({
    title: {
        position: 'absolute',
        bottom: 5,
        left: 10,
        color: 'black'
    }
});
var SnapCarousel = /** @class */ (function (_super) {
    __extends(SnapCarousel, _super);
    function SnapCarousel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderItem = function (_a) {
            var item = _a.item, index = _a.index;
            var _b = _this.props, style = _b.style, imageColumn = _b.imageColumn, textColumn = _b.textColumn;
            return (React.createElement(Row, { rowIndex: index, style: style },
                React.createElement(ListImage, { source: "", needThumbnail: _this.props.needThumbnail, w: _this.props.w, h: _this.props.h, yigoid: imageColumn, style: style }),
                textColumn ? React.createElement(ListText, { style: styles.title, yigoid: textColumn }) : null));
        };
        return _this;
    }
    SnapCarousel.prototype.render = function () {
        var _a = this.props, data = _a.data, style = _a.style;
        if (!data) {
            return React.createElement(View, { style: style });
        }
        return (React.createElement(Carousel, { data: data.toJS(), renderItem: this.renderItem, sliderWidth: 375, itemWidth: 350, useScrollView: true, enableMomentum: false }));
    };
    SnapCarousel.defaultProps = {
        needThumbnail: false,
        height: 150,
    };
    return SnapCarousel;
}(PureComponent));
export default GridWrap(SnapCarousel);
