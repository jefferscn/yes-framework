import React, { PureComponent } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgb(211,211,211,0.5)',
    }
})
export default ({ children, busying }) => {
    return (
        <View>
            {busying ?
                <View style={styles.mask}>
                    <ActivityIndicator />
                </View> : null}
            {
                children
            }
        </View>
    )
}
