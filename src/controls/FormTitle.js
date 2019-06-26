import React, { PureComponent } from 'react';
import { FormInfo } from 'yes-platform'; // eslint-disable-line

class FormTitle extends PureComponent {
    render() {
        return (
            <FormInfo.FormCaption containerStyle = {this.props.containerStyle} style={{ fontSize: 20 }} />
        );
    }
}

export default FormTitle;
