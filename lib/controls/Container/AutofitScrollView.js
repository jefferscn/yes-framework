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
import { ScrollView } from 'react-native';
var AutofitScrollView = /** @class */ (function (_super) {
    __extends(AutofitScrollView, _super);
    function AutofitScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onLayout = function (e) {
            if (!document.activeElement || !_this.scrollNode) {
                return;
            }
            if (!_this.scrollNode.contains(document.activeElement)) {
                return;
            }
            var scrollRect = _this.scrollNode.getBoundingClientRect();
            var inputRect = document.activeElement.getBoundingClientRect();
            var scrollTop = _this.scrollNode.scrollTop;
            if (scrollRect.top > inputRect.top) { //在可视范围的上方，需要向下滚动一下
                _this.scrollNode.scrollTop = scrollTop - scrollRect.top + inputRect.top;
                return;
            }
            if (scrollRect.top + scrollRect.height < inputRect.top) {
                _this.scrollNode.scrollTop = inputRect.height + scrollTop + inputRect.top - scrollRect.top - scrollRect.height;
                return;
            }
        };
        _this.ref = function (ref) {
            _this.scrollRef = ref;
            if (!ref) {
                _this.scrollNode = null;
                return;
            }
            _this.scrollNode = _this.scrollRef.getScrollableNode();
        };
        return _this;
    }
    AutofitScrollView.prototype.render = function () {
        var _a = this.props, children = _a.children, style = _a.style;
        return (React.createElement(ScrollView, { style: style, ref: this.ref, onLayout: this.onLayout }, children));
    };
    return AutofitScrollView;
}(PureComponent));
export default AutofitScrollView;
