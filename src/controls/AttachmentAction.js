import React, { PureComponent } from 'react';
import { ImagePicker } from 'antd-mobile';
import { attachmentActionWrap } from 'yes-intf';

class AttachmentAction extends PureComponent {
    onAddImage = (files)=> {
        this.props.addAttachment(files[0].file);
    }
    render() {
        const { style } = this.props;
        return (
            <ImagePicker
                style={style}
                length="1"
                files={[]}
                onChange={this.onAddImage}
            />
        )
    }
}

export default attachmentActionWrap(AttachmentAction);
