import React, { PureComponent } from 'react';
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import defaultTemplateMapping from '../defaultTemplateMapping';
import Element from '../Element';
// import CustomControls from '../../config/control.js';

// class CustomTemplate extends PureComponent {
//     render() {
//         const { control } = this.props;
//         const Control = CustomControls[control];
//         return <Control {...this.props} />;
//     }
// }

const CustomTemplate = (props) => {
    const meta = {
        type: 'element',
        elementType: props.control,
        elementProps: {
            ...props
        }
    }
    return <Element meta={meta} />
}

const WrappedNormalTemplate = getMappedComponentHOC(CustomTemplate);
defaultTemplateMapping.reg('custom', WrappedNormalTemplate);
export default WrappedNormalTemplate;
