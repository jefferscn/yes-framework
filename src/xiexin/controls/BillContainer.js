import React, { PureComponent } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';

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
    },
    error: {
        height: 50,
        background: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default ({ children, busying, error, errorMsg }) => {
    const onPress = ()=> {
        const { reload } = this.props;
        reload && reload();
    }
    return (
        <View>
            {
                error ? 
                <View style={styles.error}>
                    <TouchableOpacity onPress={onPress}>
                        <Text>加载失败，点击重试</Text>
                    </TouchableOpacity>
                </View>: null
            }
            {busying ?
                <View style={styles.mask}>
                    <ActivityIndicator />
                </View> : null
            }
            {
                error? null: children
            }
        </View>
    )
}
