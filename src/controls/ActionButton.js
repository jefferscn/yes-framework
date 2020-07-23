import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196f3',
        borderRadius: '50%',
    },
    icon: {
        color: 'white',
    }
});

export default class ActionButton extends PureComponent {
    render() {
        const { style } = this.props;
        return (
            <TouchableOpacity style={[styles.container, style]} onPress={this.props.onPress} >
                {/* <View style={[styles.container, style]}> */}
                    <Icon name='plus' style={styles.icon} />
                {/* </View> */}
            </TouchableOpacity>
        )
    }
}
