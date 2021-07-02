import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    arrow: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        display: 'flex',
        width: 20,
        color: 'rgba(0,0,0,0.6)',
    },
});
export default class HasDetailSign extends PureComponent {
    render() {
        return <Icon style={styles.arrow} name="chevron-right" />;
    }
}
