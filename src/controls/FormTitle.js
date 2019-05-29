import React, { PureComponent } from 'react';
import { FormInfo } from 'yes-platform'; // eslint-disable-line
import designable from '../../designer/utils/designable';

class FormTitle extends PureComponent {
    render() {
        return (
            <FormInfo.FormCaption containerStyle = {this.props.containerStyle} style={{ fontSize: 20 }} />
        );
    }
}

FormTitle.category = 'template';
FormTitle.detail = 'header_title';

export default FormTitle;
