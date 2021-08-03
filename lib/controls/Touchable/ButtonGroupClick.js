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
import PropTypes from 'prop-types';
import { ActionSheet } from 'antd-mobile';
import { History } from 'yes-web';
import { BackHandler } from 'yes-intf';
import VisibleRelated from '../Visible/VisibleRelated';
var ButtonGroupClick = /** @class */ (function (_super) {
    __extends(ButtonGroupClick, _super);
    function ButtonGroupClick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onButtonClick = function (index) {
            var buttonKey = _this.props.buttonKey;
            var item = buttonKey[index];
            _this.backHandler();
            if (item) {
                _this.context.onControlClick(item.key);
            }
        };
        _this.controlClick = function () {
            var buttonKey = _this.props.buttonKey;
            if (Array.isArray(buttonKey)) {
                var items = buttonKey.map(function (item) { return item.text; });
                items.push('取消');
                ActionSheet.showActionSheetWithOptions({
                    options: items,
                    cancelButtonIndex: items.length - 1,
                    message: null,
                    maskClosable: false,
                }, _this.onButtonClick);
                History.push("#ActionSheet", false);
                _this.backHandler = BackHandler.addPreEventListener(function () {
                    ActionSheet.close();
                    _this.backHandler();
                    return false;
                });
                return;
            }
            _this.context.onControlClick(buttonKey);
        };
        return _this;
    }
    ButtonGroupClick.prototype.render = function () {
        var _a = this.props, element = _a.element, children = _a.children, buttonKey = _a.buttonKey;
        var child = this.context.createElement(element || children);
        if (Array.isArray(buttonKey)) {
            //如果buttonKey是一个数组，则直接渲染
            return React.cloneElement(child, {
                onPress: this.controlClick,
            });
        }
        else {
            return React.createElement(VisibleRelated, { yigoid: buttonKey }, React.cloneElement(child, {
                onPress: this.controlClick,
            }));
        }
    };
    ButtonGroupClick.contextTypes = {
        onControlClick: PropTypes.func,
        createElement: PropTypes.func,
    };
    return ButtonGroupClick;
}(PureComponent));
export default ButtonGroupClick;
