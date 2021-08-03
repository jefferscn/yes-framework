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
import { PureComponent } from 'react';
import { OperationWrap } from 'yes-intf';
var OperationExecTimer = /** @class */ (function (_super) {
    __extends(OperationExecTimer, _super);
    function OperationExecTimer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timerExec = function () {
            if (_this.props.controlState) {
                var items = _this.props.controlState.get('items');
                var opt = items.find(function (item) { return item.get('key') === _this.props.yigoid; });
                if (opt) {
                    var action = opt.get('action');
                    if (action) {
                        _this.props.onClick(action);
                    }
                }
            }
        };
        return _this;
    }
    OperationExecTimer.prototype.componentDidMount = function () {
        var ticks = this.props.ticks;
        this.timer = setInterval(this.timerExec, ticks);
    };
    OperationExecTimer.prototype.componentWillUnmount = function () {
        clearInterval(this.timer);
    };
    OperationExecTimer.prototype.render = function () {
        return null;
    };
    return OperationExecTimer;
}(PureComponent));
export default OperationWrap(OperationExecTimer);
