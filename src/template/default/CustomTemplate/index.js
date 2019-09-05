import React, { PureComponent } from 'react';
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import PropTypes from 'prop-types';

class CustomTemplate extends PureComponent {
    static contextTypes = {
        getControl: PropTypes.func,
    }
    render() {
        const { control } = this.props;
        const Control = this.context.getControl(control);
        if (control) {
            return <Control {...this.props} />;
        }
        return null;
    }
}

const WrappedNormalTemplate = getMappedComponentHOC(CustomTemplate);
WrappedNormalTemplate.key = "custom";
export default WrappedNormalTemplate;
