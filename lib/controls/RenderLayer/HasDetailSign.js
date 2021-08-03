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
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var styles = StyleSheet.create({
    arrow: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        display: 'flex',
        width: 20,
        color: 'rgba(0,0,0,0.6)',
    },
});
var HasDetailSign = /** @class */ (function (_super) {
    __extends(HasDetailSign, _super);
    function HasDetailSign() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HasDetailSign.prototype.render = function () {
        return React.createElement(Icon, { style: styles.arrow, name: "chevron-right" });
    };
    return HasDetailSign;
}(PureComponent));
export default HasDetailSign;
