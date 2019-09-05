import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { openForm } from '../../util/navigateUtil';

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 1,
    }
})

export default class Home extends Component {
    onPress = ()=> {
        openForm('TSL_ToDoList', -1, 'EDIT');
    }
    render() {
        return (
            <View style={styles.view}>
                <Text>Home</Text>
                <Button onPress={this.onPress} />
            </View>
        )
    }
}

Home.category = 'template';
Home.key = 'Home';

if (module.hot) {
    module.hot.accept();
}