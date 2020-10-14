import React, { PureComponent } from 'react';
import { ImagePicker } from 'antd-mobile';
import { attachmentActionWrap, Util } from 'yes-intf';
import Compressor from 'compressorjs';
import PropTypes from 'prop-types';

class AttachmentAction extends PureComponent {
    static contextTypes = {
        getPicture: PropTypes.func,
    }
    onImageAddClick = async (e) => {
        e.preventDefault();
        if (!this.context.getPicture) {
            return;
        }
        try {
            const file = await this.context.getPicture();
            // const result = await this.props.uploadImage(file.file, file.name);
            // this.props.onChange(result);
            // this.onAddImage([file]);
            await this.props.addAttachment(file.file);
        } catch (ex) {
            console.log(ex);
        }
    }
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
                onAddImageClick={this.context.getPicture ? this.onImageAddClick : null}
                onChange={this.onAddImage}
            />
        )
    }
}

export default attachmentActionWrap(AttachmentAction);
