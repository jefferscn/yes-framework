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
// export { default as default } from './IconFont';
import React from 'react';
import Element from '../template/Element';
export default (function (props) {
    var meta = {
        type: 'element',
        elementType: 'IconFont',
        elementProps: __assign({}, props)
    };
    return React.createElement(Element, { meta: meta });
});
