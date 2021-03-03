import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import ListText from 'yes-framework/controls/Yigo/Text/ListText';

const styles = StyleSheet.create({
    container: {
    },
    row: {
        paddingBottom: 8,
    }
});

export default class TextList extends PureComponent {
    render() {
        const { items, template, style, rowStyle } = this.props;
        return (
            <View style={[styles.container, style]}>
                {
                    items.map((item) => {
                        return (
                            <ListText style={[styles.row, rowStyle]} template={template} yigoid={item.key || item} />
                        )
                    })
                }
            </View>
        )
    }
}
