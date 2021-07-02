import React from 'react';
import { ImagePicker } from 'antd-mobile';

export default ({style, onPress}) => {
    return (
        <ImagePicker
            style={style}
            length="1"
            files={[]}
            onAddImageClick={onPress}
        />
    )
}
