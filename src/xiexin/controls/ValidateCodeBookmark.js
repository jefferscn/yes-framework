import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import VisibleNotEqual from 'yes-framework/controls/VisibleNotEqual';
import ListText from 'yes-framework/controls/ListText';

const styles = StyleSheet.create({
    bookmark: {
        position: 'absolute',
        right: -4,
        height: 30,
        top: 30,
        width: 120,
        backgroundImage: 'linear-gradient(to right, #E9F3AB, #FCD225)',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    bookmarkText: {
        color: '#CA9300',
    },
    bookmarkCornor: {
        position: 'absolute',
        top: -4,
        right: 0,
        border: '2px solid #CCA34D',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
    }
});

export default class ValidateCodeBookmark extends PureComponent {
    render() {
        const { yigoid, emptyStr } = this.props;
        return (
            <VisibleNotEqual yigoid={yigoid} targetValue="10004">
                <View style={styles.bookmark}>
                    <ListText style={styles.bookmarkText} yigoid={yigoid} emptyStr={emptyStr} />
                    <View style={styles.bookmarkCornor}>
                    </View>
                </View>
            </VisibleNotEqual>
        )
    }
}
