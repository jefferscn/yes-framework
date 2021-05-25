import React from 'react';
import FormContext from 'yes-framework/context/FormContext';
import Element from 'yes-framework/template/Element';

const ContextValueVisible = ({ children, element, contextKey, value }) => {
    const { contextValues } = React.useContext(FormContext);
    if (contextValues && contextValues[contextKey]==value) {
        return element ? <Element meta={element} /> : children;
    }
    return null;
}

export default ContextValueVisible 
