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
import { GridWrap } from 'yes-intf';
import { withDetail } from 'yes-comp-react-native-web';
import ActionButton from '../../controls/ActionButton';
var GridActionButton = /** @class */ (function (_super) {
    __extends(GridActionButton, _super);
    function GridActionButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridActionButton.prototype.render = function () {
        var _a = this.props, editable = _a.editable, style = _a.style;
        return editable ? (React.createElement(ActionButton, { onPress: this.props.addNewRow, style: style })) : null;
    };
    GridActionButton = __decorate([
        GridWrap,
        withDetail
    ], GridActionButton);
    return GridActionButton;
}(PureComponent));
export default GridActionButton;
