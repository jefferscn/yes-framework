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
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, StyleSheet } from 'react-native';
import { ControlWrap as controlWrap } from 'yes';
var View = Components.View;
var LeftIcon = /** @class */ (function (_super) {
    __extends(LeftIcon, _super);
    function LeftIcon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getSetting = function () {
            var icon;
            var text;
            var iconColor;
            var v = _this.props.controlState.get('value');
            switch (v) {
                case 'LeaveApplication_flow':
                    icon = 'clock-o';
                    text = '请假';
                    iconColor = '#ee5b47';
                    break;
                case 'SalesContractChina_flow':
                    icon = 'truck';
                    text = '销售合同';
                    iconColor = '#28a8d9';
                    break;
                default:
                    icon = 'pencil';
                    text = '默认';
                    iconColor = '';
            }
            return {
                icon: icon,
                text: text,
                iconColor: iconColor,
            };
        };
        _this.generateText = function (text) {
            var len = text.length;
            var v;
            switch (len) {
                case 4:
                    v = (React.createElement(View, null,
                        React.createElement(Text, null, text.slice(0, 2)),
                        React.createElement(Text, null, text.slice(2))));
                    break;
                default:
                    v = React.createElement(Text, null, text);
            }
            return v;
        };
        return _this;
    }
    LeftIcon.prototype.render = function () {
        var setting = this.getSetting();
        return (React.createElement(View, { style: styles.container },
            React.createElement(Icon, { name: setting.icon, size: 26, color: setting.iconColor }),
            this.generateText(setting.text)));
    };
    return LeftIcon;
}(PureComponent));
var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 50,
    },
});
export default controlWrap(LeftIcon);
