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
import { Carousel, Card } from 'antd-mobile';
import { Text } from 'yes-comp-react-native-web';
import { GridRowWrap as gridRowWrap, GridWrap } from 'yes-intf';
var YIGOCard = gridRowWrap(Card);
var CardCarouselGrid = /** @class */ (function (_super) {
    __extends(CardCarouselGrid, _super);
    function CardCarouselGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardCarouselGrid.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, titleField = _a.titleField, contentField = _a.contentField, extraField = _a.extraField, actions = _a.actions, thumbField = _a.thumbField;
        var titleElement = titleField ? (React.createElement(Text, { yigoid: titleField })) : null;
        var contentElement = contentField ? (React.createElement(Text, { yigoid: contentField })) : null;
        var extraElement = extraField ? (React.createElement(Text, { yigoid: extraField })) : null;
        if (!data) {
            return null;
        }
        return (React.createElement(Carousel, { autoplay: true, infinite: true, frameOverflow: "visible" }, data.map(function (item, index) {
            return (React.createElement(YIGOCard, { rowIndex: index, gridId: _this.props.yigoid },
                React.createElement(Card.Header, { title: titleElement, extra: extraElement }),
                React.createElement(Card.Body, null, contentElement)));
        })));
    };
    return CardCarouselGrid;
}(PureComponent));
export default GridWrap(CardCarouselGrid);
