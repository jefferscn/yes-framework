import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
    container: {
    }
})
export default class CellLayoutList extends PureComponent {
    render() {
        const { style } =this.props;
        return (<View style={[styles.container, style]}>
            
        </View>);
    }
}