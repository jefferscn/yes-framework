import React from 'react';
import { ControlWrap } from 'yes';
import UserAvatar from 'react-native-user-avatar';
var Avatar = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 50 : _b, displayValue = _a.displayValue, textField = _a.textField;
    return (React.createElement(UserAvatar, { size: size, name: "", src: displayValue }));
};
export default ControlWrap(Avatar);
