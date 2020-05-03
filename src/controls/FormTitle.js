import React, { PureComponent } from 'react';
import { FormInfo } from 'yes-comp-react-native-web'; // eslint-disable-line

class FormTitle extends PureComponent {
    render() {
        return (
            <FormInfo.FormCaption containerStyle = {this.props.containerStyle} style={{ fontSize: 20 }} />
        );
    }
}

export default FormTitle;
