import React from 'react';
import FormContext from '../../context/FormContext';
import Element from '../../template/Element';
var ContextValueVisible = function (_a) {
    var children = _a.children, element = _a.element, contextKey = _a.contextKey, value = _a.value;
    var contextValues = React.useContext(FormContext).contextValues;
    if (contextValues && contextValues[contextKey] == value) {
        return element ? React.createElement(Element, { meta: element }) : children;
    }
    return null;
};
export default ContextValueVisible;
