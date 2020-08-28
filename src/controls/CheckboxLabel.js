import React from 'react';
import { Text } from 'react-native';
import { ControlWrap } from 'yes-intf';

const CheckboxLabel = ({style, value, trueLabel, falseLabel }) => {
    const v = value?trueLabel:falseLabel;
    if(v==null) {
        return null; 
    }
    return <Text style={style}>{value?trueLabel:falseLabel}</Text>
}

export default ControlWrap(CheckboxLabel);
