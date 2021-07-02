import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { internationalWrap } from 'yes-intf';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

@internationalWrap
export default class Home extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text>欢迎</Text>
            </View> 
        )
    }
}
