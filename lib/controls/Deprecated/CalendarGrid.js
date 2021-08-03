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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { PureComponent, Component } from 'react';
import { GridWrap, internationalWrap } from 'yes-intf';
import { View, StyleSheet, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import { withDetail } from 'yes-comp-react-native-web';
var styles = StyleSheet.create({
    weekrow: {
        flexDirection: 'row',
        flexBasis: 'auto',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    container: {
        flexDirection: 'column',
        flexBasis: 'auto'
    },
    weekday: {
        flex: 1,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    }
});
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 产生月份数据
         */
        _this.genMonthData = function (year, month) {
            var dayCount = _this.getCountDays(year, month);
            var data = [];
            var week = [];
            for (var i = 0; i < dayCount; i++) {
                var date = new Date(year, month, i + 1);
                if (date.getDay() === 0) {
                    if (week.length > 0) {
                        data.push(week);
                    }
                    week = [];
                }
                week.push({
                    date: date,
                    week: date.getDay(),
                    day: date.getDate(),
                });
            }
            if (week.length > 0) {
                data.push(week);
            }
            return data;
        };
        _this.state = {
            data: _this.genMonthData(_this.props.year, _this.props.month),
            events: _this.props.events,
        };
        _this.renderDay = function (day) {
            if (_this.props.renderDay) {
                return _this.props.renderDay(day, _this.props.onSelect);
            }
            return (React.createElement(View, { style: [styles.weekday] },
                React.createElement(Text, null, day ? day.day : '')));
        };
        _this.renderWeekCaption = function () {
            return (React.createElement(View, { style: [styles.weekrow, _this.props.captionRowStyle] },
                React.createElement(Text, { style: [styles.weekday] }, _this.props.format("Sun")),
                React.createElement(Text, { style: [styles.weekday] }, _this.props.format("Mon")),
                React.createElement(Text, { style: [styles.weekday] }, _this.props.format("Tue")),
                React.createElement(Text, { style: [styles.weekday] }, _this.props.format("Web")),
                React.createElement(Text, { style: [styles.weekday] }, _this.props.format("Tur")),
                React.createElement(Text, { style: [styles.weekday] }, _this.props.format("Fir")),
                React.createElement(Text, { style: [styles.weekday] }, _this.props.format("Sat"))));
        };
        _this.renderWeekDays = function (week) {
            var weeks = [0, 1, 2, 3, 4, 5, 6];
            var weekDays = week.map(function (d) {
                return d.week;
            });
            return (React.createElement(View, { style: [styles.weekrow, _this.props.weekRowStyle] }, weeks.map(function (day) {
                if (weekDays.includes(day)) {
                    return _this.renderDay(week[weekDays.indexOf(day)]);
                }
                return _this.renderDay(null);
            })));
        };
        _this.renderWeekView = function () {
            return (React.createElement(View, { style: [styles.container] }, _this.state.data.map(function (week) {
                return _this.renderWeekDays(week);
            })));
        };
        return _this;
    }
    Calendar.prototype.getCountDays = function (year, month) {
        var curDate = new Date(year, month, 1);
        var curMonth = curDate.getMonth();
        curDate.setMonth(curMonth + 1);
        curDate.setDate(0);
        return curDate.getDate();
    };
    Calendar.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({
            data: this.genMonthData(nextProps.year, nextProps.month)
        });
    };
    Calendar.prototype.render = function () {
        // const { events, year, month } = this.props;
        return (React.createElement(View, { style: [styles.container] },
            this.renderWeekCaption(),
            this.renderWeekView()));
    };
    return Calendar;
}(PureComponent));
var CalenarDay = /** @class */ (function (_super) {
    __extends(CalenarDay, _super);
    function CalenarDay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalenarDay.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var nextData = nextProps.events;
        var data = this.props.events;
        if (this.props.day != nextProps.day) {
            return false;
        }
        if (!data && !nextData) {
            return true;
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
        var _a = this.props, day = _a.day, events = _a.events;
        return (React.createElement(View, { style: [styles.weekday] },
            React.createElement(Text, null, day ? day.day : '')));
    };
    return CalenarDay;
}(Component));
var CalendarGrid = /** @class */ (function (_super) {
    __extends(CalendarGrid, _super);
    function CalendarGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.genDayEvents = function (props) {
            if (props.data) {
                var owner_1 = _this.context.getOwner();
                var data_1 = {};
                props.data.reduce(function (total, v, index) {
                    var dt = owner_1.getValueByKey(index, props.dateField);
                    var dtKey = dt.toDateString();
                    if (!data_1[dtKey]) {
                        data_1[dtKey] = [];
                    }
                    var dtEvents = data_1[dtKey];
                    dtEvents.push({
                        rowIndex: index,
                        data: v,
                    });
                }, data_1);
                return data_1;
            }
            return null;
        };
        _this.state = {
            data: _this.genDayEvents(_this.props)
        };
        _this.renderDay = function (day, onSelect) {
            // const owner = this.context.getOwner();
            // const Day = this.prop.DayComp || CalendarDay;
            if (day && _this.state.data) {
                // const date = owner.getValueByKey(0, this.props.dateField);
                var dtKey = day.date.toDateString();
                var events = _this.state.data[dtKey];
                return _this.props.DayElement ? React.cloneElement(_this.props.DayElement, {
                    events: events,
                    day: day,
                    onSelect: onSelect,
                    selected: day === _this.state.day,
                }) : React.createElement(CalenarDay, { key: day.day, events: events, day: day, onSelect: onSelect });
            }
            return _this.props.DayElement ? React.cloneElement(_this.props.DayElement, {
                day: day
            }) : React.createElement(CalenarDay, { day: day });
        };
        _this.getDate = function (row) {
            var owner = _this.context.getOwner();
            var date = owner.getValueByKey(row, _this.props.dateField);
            return date;
        };
        _this.onSelect = function (day, events) {
            _this.setState({
                day: day,
                events: events
            });
        };
        _this.renderRow = function (rowIndex) {
            return _this.props.rowElement ?
                React.cloneElement(_this.props.rowElement, {
                    rowIndex: rowIndex,
                    gridId: _this.props.yigoid,
                    onClick: _this.props.onClick,
                }) : null;
        };
        _this.addNewRow = function () { return __awaiter(_this, void 0, void 0, function () {
            var defaultValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        defaultValue = {};
                        defaultValue[this.props.dateField] = this.state.day.date;
                        return [4 /*yield*/, this.props.addNewRow(defaultValue)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    CalendarGrid.prototype.componentWillReceiveProps = function (nextProps) {
        var newState = {
            data: this.genDayEvents(nextProps)
        };
        if (this.state.day) {
            newState.events = newState.data[this.state.day.date.toDateString()];
        }
        this.setState(newState);
    };
    CalendarGrid.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, dateField = _a.dateField, controlState = _a.controlState, disabled = _a.disabled, titleElement = _a.titleElement;
        var editable = controlState.get('editable') && !disabled;
        var year = null, month = null;
        if (data && data.size > 0) {
            var owner = this.context.getOwner();
            var date = owner.getValueByKey(0, this.props.dateField);
            year = date.getFullYear();
            month = date.getMonth();
        }
        return (React.createElement(View, null,
            React.createElement(View, null,
                React.createElement(Text, null, year + "-" + month)),
            React.createElement(Calendar, __assign({ format: this.props.formatMessage, dateField: dateField, year: year, renderDay: this.renderDay, month: month, getDate: this.getDate, events: data, onSelect: this.onSelect }, this.props)),
            React.createElement(View, null,
                this.state.events ? this.state.events.map(function (event) {
                    return _this.renderRow(event.rowIndex);
                }) : null,
                editable ? React.createElement(Button, { onPress: this.addNewRow }) : null)));
    };
    CalendarGrid.contextTypes = {
        getOwner: PropTypes.func,
    };
    return CalendarGrid;
}(PureComponent));
export default GridWrap(withDetail(internationalWrap(CalendarGrid)));
// export default Calendar;
