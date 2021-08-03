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
import { ControlWrap } from 'yes-intf';
import PropTypes from 'prop-types';
var VisibleRelated = /** @class */ (function (_super) {
    __extends(VisibleRelated, _super);
    function VisibleRelated() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisibleRelated.prototype.render = function () {
        var _a = this.props, visible = _a.visible, children = _a.children, element = _a.element, isVirtual = _a.isVirtual;
        if (visible && !isVirtual) {
            return element ? this.context.createElement(element) : children;
        }
        return null;
    };
    VisibleRelated.contextTypes = {
        createElement: PropTypes.func,
    };
    return VisibleRelated;
}(PureComponent));
export default ControlWrap(VisibleRelated);
