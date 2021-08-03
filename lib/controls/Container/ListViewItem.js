import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
var pressRetentionOffset = { top: 5, left: 5, right: 5, bottom: 5 };
export default (function (props) {
    var renderLeftElement = function () {
        return props.leftElement;
    };
    var renderCenterElement = function () {
        return props.centerElement;
    };
    var renderRightElement = function () {
        return props.rightElement;
    };
    var renderArrow = function () {
        return props.showArrow ? React.createElement(Icon, { style: styles.arrow, name: 'chevron-right' }) : null;
    };
    var renderExtra = function () {
        return props.extra || null;
    };
    var onPress = function () {
        props && props.onPress(props.rowIndex);
    };
    var renderDetail = function () {
        return props.detailElement;
    };
    var containerView = props.containerView;
    var container = null;
    if (props.detailElement) {
        if (containerView) {
            container = React.cloneElement(containerView, {
                style: [styles.container, props.containerStyle]
            }, [
                renderLeftElement(),
                renderCenterElement(),
                renderRightElement(),
                renderArrow(),
                renderExtra(),
            ]);
        }
        else {
            container = (React.createElement(View, { style: [styles.container, props.containerStyle] },
                renderLeftElement(),
                renderCenterElement(),
                renderRightElement(),
                renderArrow(),
                renderExtra()));
        }
        return (React.createElement(View, { style: [props.divider ? [styles.divider, props.dividerStyle] : {}] },
            React.createElement(TouchableOpacity, { onPress: onPress, pressRetentionOffset: pressRetentionOffset }, container),
            renderDetail()));
    }
    if (containerView) {
        container = React.cloneElement(containerView, {
            style: [styles.container, props.divider ? [styles.divider, props.dividerStyle] : {}, props.containerStyle]
        }, [
            renderLeftElement(),
            renderCenterElement(),
            renderRightElement(),
            renderArrow(),
            renderExtra(),
        ]);
    }
    else {
        container = (React.createElement(View, { style: [styles.container, props.divider ? [styles.divider, props.dividerStyle] : {}, props.containerStyle] },
            renderLeftElement(),
            renderCenterElement(),
            renderRightElement(),
            renderArrow(),
            renderExtra()));
    }
    return (React.createElement(TouchableOpacity, { onPress: onPress, pressRetentionOffset: pressRetentionOffset }, container));
});
var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    arrow: {
        alignItems: 'center',
        display: 'flex',
        color: 'rgba(0,0,0,0.6)',
    },
    centerStyle: {},
    primaryContainer: {},
    primaryText: {},
    secondaryContainer: {},
    secondaryText: {},
});
