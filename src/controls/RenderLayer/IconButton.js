import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import AwesomefontIcon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    directionRow: {
        flexDirection: 'row',
    },
    directionColumn: {
        flexDirection: 'column',
    },
    textStyle: {
        color: '#008cd7',
    },
});

export default class Button extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    static defaultProps = {
        direction: 'row',
    }
    render() {
        const { icon, title, style, textStyle, iconStyle, onPress, direction } = this.props;
        let iconElement = null;
        if(icon) {
            if(typeof icon === 'string') {
                iconElement = <AwesomefontIcon name={icon} style={iconStyle} />;
            } else {
                iconElement = this.context.createElement(icon);
            }
        }
        let titleElement = null;
        if(title) {
            if(typeof title ==='string') {
                titleElement = <Text style={[styles.textStyle,textStyle]}>{title}</Text>;
            } else {
                titleElement = this.context.createElement(title);
            }
        }
        return (
            <TouchableHighlight onPress={onPress} style={[{flex:1}, style]}>
                <View style={[styles.container, direction==='row'?styles.directionRow: styles.directionColumn]}>
                    {
                        iconElement
                    }
                    {
                        titleElement
                    }
                </View>
            </TouchableHighlight>
        )
    }
}
