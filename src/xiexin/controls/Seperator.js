import React from 'react';
import { View, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    rowSeperator: {
        width: 1,
        backgroundColor: 'lightgrey',
    },
    colSeperator: {
        height: 1,
        backgroundColor: 'lightgrey',
    }
}) 
export default ({type, style})=> {
    const seperatorStyles = [];
    if(type==='row') {
        seperatorStyles.push(styles.rowSeperator);
    } else {
        seperatorStyles.push(styles.colSeperator);
    }
    seperatorStyles.push(style);
    return <View style={seperatorStyles} />
}
