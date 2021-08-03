import React from 'react';
import { ImagePicker } from 'antd-mobile';
export default (function (_a) {
    var style = _a.style, onPress = _a.onPress;
    return (React.createElement(ImagePicker, { style: style, length: "1", files: [], onAddImageClick: onPress }));
});
