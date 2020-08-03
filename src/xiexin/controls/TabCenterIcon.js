import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TotalAdd from './TotalAdd';
import Util from '../util';

const styles = StyleSheet.create({
    outer: {
        width: 50,
        height: 50,
        display: 'flex',
        position: 'absolute',
        top: -20,
        left: '50%',
        transform: 'translateX(-25px)',
    },
    container: {
        backgroundColor: '#108ee9',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
    }
});
export default class TabCenterIcon extends PureComponent {
    onPress = () => {
        Util.showModal(
            <TotalAdd />
        )
    }
    render() {
        return <TouchableOpacity onPress={this.onPress} style={styles.outer}>
            <View style={styles.container}>
                <Icon name="plus" size={20} color={"white"} />
            </View>
        </TouchableOpacity>
    }
}
