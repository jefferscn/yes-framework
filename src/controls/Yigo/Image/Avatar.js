import React from 'react';
import { ControlWrap } from 'yes';
import UserAvatar from 'react-native-user-avatar';

const Avatar = ({size = 50, displayValue, textField}) => {
    return (
        <UserAvatar size={size} name={""} src={displayValue} />
    ) 
};

export default ControlWrap(Avatar)
