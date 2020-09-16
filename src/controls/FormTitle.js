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

class FormTitle extends PureComponent {
    render() {
        const { style } = this.props;
        return (
            <FormInfo.FormCaption 
                containerStyle = {[styles.container, this.props.containerStyle]} 
                style={[styles.text, style]} 
            />
        );
    }
}

export default FormTitle;
