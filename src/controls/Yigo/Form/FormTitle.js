import React, { PureComponent } from 'react';
import { FormInfo } from 'yes-comp-react-native-web'; // eslint-disable-line
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        height: 24,
        marginTop: 13,
        marginBottom: 13,
        marginLeft: 13,
        display: 'flex',
        alignItems: 'center',
    }
})

export default ({ style, containerStyle }) => {
    return (
        <FormInfo.FormCaption
            containerStyle={[styles.container, containerStyle]}
            style={[styles.text, style]}
        />
    );
};
