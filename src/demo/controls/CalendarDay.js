import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    weekday: {
        flex: 1,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
    },
    'status-1': {
        backgroundColor: 'white',
        color: 'black'
    },
    status0: {
        backgroundColor: '#f44336',
        color: 'white',
    },
    status1: {
        backgroundColor: '#F9A825',
        color: 'white',
    },
    status2: {
        backgroundColor: '#1565C0',
        color: 'white',
    },
    selectStyle: {
        borderWidth: 2,
        borderColor: 'green',
        borderStyle: 'solid',
    },
    badge: {
        position: 'absolute',
        right: 2,
        top: 2,
        color: 'white',
        fontSize: 9,
    },
    icon: {
        color: 'green',
        position: 'absolute',
        right: 2,
        bottom: 2,
        fontSize: 14,
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
            var v = owner.getValueByKey(events[i].rowIndex, 'confirmStatus');
            if(!v) {
                return 0;
            }
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
    getBadgeText = () => {
        const { events } = this.props;
        if(!events) {
            return '';
        }
        let result = "1";
        let txt = "";
        const owner = this.context.getOwner();
        for (let i = 0; i < events.length; i++) {
            var v = owner.getValueByKey(events[i].rowIndex, 'WorkNature');
            if(v> result) {
                result = v;
            }
        }
        result = result + '';
        switch(result)  {
            case "1":
                txt = "";
                break;
            case "2": 
                txt= "加";
                break;
            case "3": 
                txt= "假";
                break;
        }
        return txt;
    }
    onPress = () => {
        this.props.onSelect(this.props.day, this.props.events);
    }
    render() {
        const { day, events, selected } = this.props;
        const dayStyle = this.getDayStyle(events);
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={[styles.weekday, dayStyle]}>
                    <Text style={dayStyle}>{day ? day.day : ''}</Text>
                    <Text style={styles.badge}>{this.getBadgeText()}</Text>
                    {
                        selected? <Icon name="check" style={styles.icon} />: null
                    }
                </View>
            </TouchableWithoutFeedback>
        );
    }
}