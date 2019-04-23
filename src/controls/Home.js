import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 1,
    }
})

export default class Home extends Component {
    render() {
        return (
            <View style={styles.view}>
                <Text>Home12</Text>
            </View>
        )
    }
}

if (module.hot) {
    module.hot.accept();
}