import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import IconFont from '../font';

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
        return (
            <View style={[styles.container]}>
                <IconFont name='icon-icon_add' style={styles.icon} onPress={this.props.onPress} />
            </View>
        )
    }
}
