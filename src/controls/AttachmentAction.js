import React, { PureComponent } from 'react';
import { ImagePicker } from 'antd-mobile';
import { attachmentActionWrap, Util } from 'yes-intf';
import Compressor from 'compressorjs';

class AttachmentAction extends PureComponent {
    onAddImage = (files) => {
        Util.safeExec(async () => {
            const compress = new Promise((resolve, reject) => {
                new Compressor(files[0].file, {
                    quality: 100,
                    maxWidth: 1000,
                    success(result) {
                        resolve({
                            file: result,
                            name: files[0].file.name,
                        });
                    },
                    error(err) {
                        reject(err);
                    }
                });
            });
            const f = await compress;
            await this.props.addAttachment(f.file);
        });
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
