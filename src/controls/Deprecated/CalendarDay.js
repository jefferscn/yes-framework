import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    weekday: {
        flex: 1,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    'status-1': {

    },
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
export default class CalenarDay extends Component {
    static contextTypes = {
        getOwner: PropTypes.func,
    }
    shouldComponentUpdate(nextProps, nextState) {
        const nextData = nextProps.events;
        const data = this.props.events;
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
        for (let i = 0; i < data.length; i++) {
            if (data[i] !== nextData[i]) {
                return false; j
            }
        }
        return true;
    }
    getDayStatus = (events) => {
        if (!events) {
            return "-1";
        }
        const owner = this.context.getOwner();
        for (let i = 0; i < events.length; i++) {
            var v = owner.getValueByKey(events[i].rowIndex);
            if (v !== "2") {
                return v;
            }
        }
        return "2";
    }
    getDayStyle = (events) => {
        let status = this.getDayStatus(events);
        return styles[`status${status}`];
    }
    onPress = () => {
        this.props.onSelect(this.props.day, this.props.events);
    }
    render() {
        const { day, events, selected } = this.props;
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={[styles.weekday, this.getDayStyle(events), selected?style.selectStyle: null]}>
                    <Text>{day ? day.day : ''}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}