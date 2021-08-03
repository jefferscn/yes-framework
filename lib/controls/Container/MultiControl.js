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
import { StyleSheet, View } from 'react-native';
import { Text } from 'yes-platform';
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        lineHeight: 24,
        paddingBottom: 6,
    },
});
var MultiControl = /** @class */ (function (_super) {
    __extends(MultiControl, _super);
    function MultiControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiControl.prototype.render = function () {
        return (React.createElement(View, { style: [styles.container, this.props.containerStyle] },
            React.createElement(Text, { yigoid: this.props.from, layoutStyles: { flex: 2, flexBasis: 0 }, textStyles: { flex: 0 } }),
            React.createElement(Text, { layoutStyles: { justifyContent: 'flex-start', paddingLeft: 10, flex: 1, flexBasis: 0 }, yigoid: this.props.to }),
            this.props.third ? React.createElement(Text, { layoutStyles: { justifyContent: 'flex-start', paddingLeft: 10, flex: 1, flexBasis: 0 }, yigoid: this.props.third }) : null));
    };
    return MultiControl;
}(PureComponent));
export default MultiControl;
