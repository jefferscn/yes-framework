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
import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
var styles = StyleSheet.create({
    weekday: {
        flex: 1,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    'status-1': {},
    status0: {
        backgroundColor: 'red',
    },
    status1: {
        backgroundColor: 'yellow',
    },
    status2: {
        backgroundColor: 'green',
    },
    selectStyle: {
        borderWidth: 2,
        borderColor: 'green',
        borderStyle: 'solid',
    },
});
var CalenarDay = /** @class */ (function (_super) {
    __extends(CalenarDay, _super);
    function CalenarDay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getDayStatus = function (events) {
            if (!events) {
                return "-1";
            }
            var owner = _this.context.getOwner();
            for (var i = 0; i < events.length; i++) {
                var v = owner.getValueByKey(events[i].rowIndex);
                if (v !== "2") {
                    return v;
                }
            }
            return "2";
        };
        _this.getDayStyle = function (events) {
            var status = _this.getDayStatus(events);
            return styles["status" + status];
        };
        _this.onPress = function () {
            _this.props.onSelect(_this.props.day, _this.props.events);
        };
        return _this;
    }
    CalenarDay.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var nextData = nextProps.events;
        var data = this.props.events;
        if (this.props.day != nextProps.day) {
            return true;
        }
        if (!data && !nextData) {
            return false;
        }
        if (!data || !nextData) {
            return true;
        }
        if (data.length !== nextData.length) {
            return false;
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i] !== nextData[i]) {
                return false;
                j;
            }
        }
        return true;
    };
    CalenarDay.prototype.render = function () {
        var _a = this.props, day = _a.day, events = _a.events, selected = _a.selected;
        return (React.createElement(TouchableWithoutFeedback, { onPress: this.onPress },
            React.createElement(View, { style: [styles.weekday, this.getDayStyle(events), selected ? style.selectStyle : null] },
                React.createElement(Text, null, day ? day.day : ''))));
    };
    CalenarDay.contextTypes = {
        getOwner: PropTypes.func,
    };
    return CalenarDay;
}(Component));
export default CalenarDay;
