import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import Element from '../template/Element';

const styles = StyleSheet.create({
    container: {

    }
});
export default class ColumnView extends PureComponent {
    render() {
        const { style, items } = this.props;
        return (
            <View style={[styles.container, style]}>
                {
                    items.map(item=><Element meta={item}/>)
                }
            </View>
        )
    }
}
