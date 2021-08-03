import React from 'react';
import FormContext from '../../context/FormContext';
import Element from '../../template/Element';

const ContextValueVisible = ({ children, element, contextKey, value }) => {
    const { contextValues } = React.useContext(FormContext);
    if (contextValues && contextValues[contextKey]==value) {
        return element ? <Element meta={element} /> : children;
    }
    return null;
}

export default ContextValueVisible 
