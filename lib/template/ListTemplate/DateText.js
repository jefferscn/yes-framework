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
import { Components } from 'yes-platform';
import { Text } from 'react-native';
import { ControlWrap as controlWrap } from 'yes';
var View = Components.View;
import dateformat from 'dateformat';
var DateText = /** @class */ (function (_super) {
    __extends(DateText, _super);
    function DateText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateText.prototype.render = function () {
        var v = this.props.controlState.get('value');
        var t = new Date(v);
        var year = t.getYear();
        var currentYear = (new Date()).getYear();
        var formatOfDate = 'yy-mm-dd';
        if (year === currentYear) {
            formatOfDate = 'mm-dd';
        }
        var formatOfTime = 'HH:MM';
        return (React.createElement(View, { style: {
                paddingRight: 16,
                color: '#c5c5c5',
                width: 80,
                alignItems: 'flex-end',
                justifyContent: 'center',
            } },
            React.createElement(Text, null, v ? dateformat(t, formatOfDate) : ''),
            React.createElement(Text, null, v ? dateformat(t, formatOfTime) : '')));
    };
    return DateText;
}(PureComponent));
export default controlWrap(DateText);
