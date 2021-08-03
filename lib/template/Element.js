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
import PropTypes from 'prop-types';
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Element.prototype.render = function () {
        return this.context.createElement(this.props.meta, this.props);
    };
    Element.contextTypes = {
        createElement: PropTypes.func,
    };
    return Element;
}(PureComponent));
export default Element;
