import React, { PureComponent } from 'react';
import { attachmentActionWrap, Util } from 'yes-intf';
import Compressor from 'compressorjs';
import PropTypes from 'prop-types';

class AttachmentAddClick extends PureComponent {
    static contextTypes = {
        getPicture: PropTypes.func,
        getPictures: PropTypes.func,
        startWorking: PropTypes.func,
        endWorking: PropTypes.func,
        createElement: PropTypes.func,
    }
    static defaultProps = {
        multiSelect: false,
    }
    onPress = async (e) => {
        e.preventDefault();
        if (!this.props.multiSelect) {
            if (!this.context.getPicture) {
                return;
            }
            this.context.startWorking();
            try {
                const file = await this.context.getPicture();
                await this.props.addAttachment(file.file);
            } catch (ex) {
                console.log(ex);
            } finally {
                this.context.endWorking();
            }
        } else {
            if (this.context.getPictures) {
                this.context.startWorking();
                try {
                    const files = await this.context.getPictures();
                    for (let file of files) {
                        await this.props.addAttachment(file.file);
                    }
                } catch (ex) {

                } finally {
                    this.context.endWorking();
                }
            } else {
                if (this.context.getPicture) {
                    this.context.startWorking();
                    try {
                        const file = await this.context.getPicture();
                        await this.props.addAttachment(file.file);
                    } catch (ex) {
                        console.log(ex);
                    } finally {
                        this.context.endWorking();
                    }
                }
            }
        }
    }
    // onAddImage = (files) => {
    //     Util.safeExec(async () => {
    //         const compress = new Promise((resolve, reject) => {
    //             new Compressor(files[0].file, {
    //                 quality: 100,
    //                 maxWidth: 1000,
    //                 success(result) {
    //                     resolve({
    //                         file: result,
    //                         name: files[0].file.name,
    //                     });
    //                 },
    //                 error(err) {
    //                     reject(err);
    //                 }
    //             });
    //         });
    //         const f = await compress;
    //         await this.props.addAttachment(f.file);
    //     });
    // }
    render() {
        const { element, children } = this.props;
        const child = this.context.createElement(element || children);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    }
}

export default attachmentActionWrap(AttachmentAddClick);
