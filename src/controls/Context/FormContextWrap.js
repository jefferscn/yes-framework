import React, { useContext } from 'react';
import FormContext from 'yes-framework/context/FormContext';

export default (Comp) => {
    return ({ contextKey, ...otherProps }) => {
        const { contextValues, changeValue } = useContext(FormContext);
        const onChange = (v) => {
            changeValue(contextKey, v);
        }
        return (
            <Comp {...otherProps} onChange={onChange} value={contextValues ? contextValues[contextKey] : null} />
        )
    }
}
