var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
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
var CustomTemplate = function (props) {
    var meta = {
        type: 'element',
        elementType: props.control,
        elementProps: __assign({}, props)
    };
    return React.createElement(Element, { meta: meta });
};
var WrappedNormalTemplate = getMappedComponentHOC(CustomTemplate);
defaultTemplateMapping.reg('custom', WrappedNormalTemplate);
export default WrappedNormalTemplate;
