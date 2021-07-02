import React, { PureComponent } from 'react';
import ImagePicker from '../RenderLayer/ImagePicker';
import AttachmentAddClick from '../Touchable/AttachmentAddClick';

export default class AttachmentAction extends PureComponent {
    render() {
        const { style, ...otherProps } = this.props;
        return (
            <AttachmentAddClick {...otherProps}>
                <ImagePicker style={style} />
            </AttachmentAddClick>
        )
    }
}
