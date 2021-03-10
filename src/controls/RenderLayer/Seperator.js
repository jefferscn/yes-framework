import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ver: {

    }
});
export default ({ weight=8, direction="hor", color='transparent' })=> {
    const weightStyle=direction==='hor'?{
        width: weight,
        height: '100%',
    }: {
        height: weight,
        width: '100%',
    };
    return <View
        style={[direction==='ver'?styles.ver:styles.hor,
            weightStyle,
            {
                backgroundColor: color
            } 
        ]}
    />
}