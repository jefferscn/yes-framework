import React, { PureComponent, Component } from 'react';
import { GridWrap, internationalWrap, GridRowWrap } from 'yes-intf';
import { View, StyleSheet, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import { withDetail } from 'yes-comp-react-native-web';

const styles = StyleSheet.create({
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
})
class Calendar extends PureComponent {
    getCountDays(year, month) {
        var curDate = new Date(year, month, 1);
        var curMonth = curDate.getMonth();
        curDate.setMonth(curMonth + 1);
        curDate.setDate(0);
        return curDate.getDate();
    }
    /**
     * 产生月份数据
     */
    genMonthData = (year, month) => {
        const dayCount = this.getCountDays(year, month);
        const data = [];
        let week = [];
        for (let i = 0; i < dayCount; i++) {
            let date = new Date(year, month, i + 1);
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
    }
    state = {
        data: this.genMonthData(this.props.year, this.props.month),
        events: this.props.events,
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: this.genMonthData(nextProps.year, nextProps.month)
        })
    }
    renderDay = (day) => {
        if (this.props.renderDay) {
            return this.props.renderDay(day, this.props.onSelect);
        }
        return (
            <View style={[styles.weekday]}>
                <Text>{day ? day.day : ''}</Text>
            </View>
        )
    }
    renderWeekCaption = () => {
        return (
            <View style={[styles.weekrow, this.props.captionRowStyle]}>
                <Text style={[styles.weekday]}>{this.props.format("Sun")}</Text>
                <Text style={[styles.weekday]}>{this.props.format("Mon")}</Text>
                <Text style={[styles.weekday]}>{this.props.format("Tue")}</Text>
                <Text style={[styles.weekday]}>{this.props.format("Web")}</Text>
                <Text style={[styles.weekday]}>{this.props.format("Tur")}</Text>
                <Text style={[styles.weekday]}>{this.props.format("Fir")}</Text>
                <Text style={[styles.weekday]}>{this.props.format("Sat")}</Text>
            </View>
        );
    }
    renderWeekDays = (week) => {
        const weeks = [0, 1, 2, 3, 4, 5, 6];
        const weekDays = week.map((d) => {
            return d.week;
        });
        return (
            <View style={[styles.weekrow, this.props.weekRowStyle]}>
                {
                    weeks.map((day) => {
                        if (weekDays.includes(day)) {
                            return this.renderDay(week[weekDays.indexOf(day)]);
                        }
                        return this.renderDay(null);
                    })
                }
            </View>
        );
    }
    renderWeekView = () => {
        return (
            <View style={[styles.container]}>
                {
                    this.state.data.map((week) => {
                        return this.renderWeekDays(week);
                    })
                }
            </View>
        );
    }
    render() {
        // const { events, year, month } = this.props;
        return (
            <View style={[styles.container]}>
                {this.renderWeekCaption()}
                {this.renderWeekView()}
            </View>
        )
    }
}

class CalenarDay extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const nextData = nextProps.events;
        const data = this.props.events;
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
        for (let i = 0; i < data.length; i++) {
            if (data[i] !== nextData[i]) {
                return false; j
            }
        }
        return true;
    }
    render() {
        const { day, events } = this.props;
        return (
            <View style={[styles.weekday]}>
                <Text>{day ? day.day : ''}</Text>
            </View>
        );
    }
}

class CalendarGrid extends PureComponent {
    static contextTypes = {
        getOwner: PropTypes.func,
    }
    genDayEvents = (props) => {
        if (props.data) {
            const owner = this.context.getOwner();
            let data = {};
            props.data.reduce((total, v, index) => {
                const dt = owner.getValueByKey(index, props.dateField);
                const dtKey = dt.toDateString();
                if (!data[dtKey]) {
                    data[dtKey] = [];
                }
                const dtEvents = data[dtKey];
                dtEvents.push({
                    rowIndex: index,
                    data: v,
                });
            }, data)
            return data;
        }
        return null;
    }
    state = {
        data: this.genDayEvents(this.props)
    }
    componentWillReceiveProps(nextProps) {
        const newState = {
            data: this.genDayEvents(nextProps)
        };
        if(this.state.day) {
            newState.events = newState.data[this.state.day.date.toDateString()];
        }
        this.setState(newState);
    }
    renderDay = (day, onSelect) => {
        // const owner = this.context.getOwner();
        // const Day = this.prop.DayComp || CalendarDay;
        if (day && this.state.data) {
            // const date = owner.getValueByKey(0, this.props.dateField);
            const dtKey = day.date.toDateString();
            const events = this.state.data[dtKey];
            return this.props.DayElement ? React.cloneElement(this.props.DayElement, {
                events,
                day,
                onSelect,
                selected: day === this.state.day,
            }) : <CalenarDay key={day.day} events={events} day={day} onSelect={onSelect} />;
        }
        return this.props.DayElement ? React.cloneElement(this.props.DayElement, {
            day
        }) : <CalenarDay day={day} />;
    }
    getDate = (row) => {
        const owner = this.context.getOwner();
        const date = owner.getValueByKey(row, this.props.dateField);
        return date;
    }
    onSelect = (day, events) => {
        this.setState({
            day,
            events
        })
    }
    renderRow = (rowIndex) => {
        return this.props.rowElement? 
            React.cloneElement(this.props.rowElement, {
                rowIndex,
                gridId: this.props.yigoid,
                onClick: this.props.onClick,
            }) : null;
    }
    addNewRow = async ()=> {
        const defaultValue = {};
        defaultValue[this.props.dateField] =  this.state.day.date;
        await this.props.addNewRow(defaultValue);
    }
    render() {
        const { data, dateField, controlState, disabled, titleElement } = this.props;
        const editable = controlState.get('editable') && !disabled;
        let year = null, month = null;
        if (data && data.size > 0) {
            const owner = this.context.getOwner();
            const date = owner.getValueByKey(0, this.props.dateField);
            year = date.getFullYear();
            month = date.getMonth();
        }
        return (
            <View>
                <View>
                    <Text>{`${year}-${month}`}</Text> 
                </View>
                <Calendar
                    format={this.props.formatMessage}
                    dateField={dateField}
                    year={year}
                    renderDay={this.renderDay}
                    month={month}
                    getDate={this.getDate}
                    events={data}
                    onSelect={this.onSelect}
                    {...this.props}
                />
                <View>
                    {
                        this.state.events? this.state.events.map((event) => {
                            return this.renderRow(event.rowIndex);
                        }): null
                    }
                    {
                        editable?<Button onPress={this.addNewRow}></Button>: null
                    }
                </View>
            </View>
        );
    }
}

export default GridWrap(withDetail(internationalWrap(CalendarGrid)));
// export default Calendar;
