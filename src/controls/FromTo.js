import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    datepicker: {
        maxWidth: 150,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
    },
    text: {
        justifyContent: 'center',
        padding: 6,
    }
});

export default class FromTo extends PureComponent {
    render() {
        const { style, fromId, toId, linkText, linkIcon, linkComp,
            fromPlaceholder, toPlaceholder
        } = this.props;
        return (
            <View style={[styles.container, style]}>
                <DatePicker placeholder={fromPlaceholder} textStyles={styles.text} layoutStyles={styles.datepicker} yigoid={fromId} />
                <Icon name="minus" />
                <DatePicker placeholder={toPlaceholder} textStyles={styles.text} layoutStyles={styles.datepicker} yigoid={toId} />
            </View>
        )        
    }
}
