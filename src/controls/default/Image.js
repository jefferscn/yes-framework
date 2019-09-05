import React, { Component } from "react";
import { ImagePicker } from 'antd-mobile';
import { ControlWrap } from 'yes';
import PropTypes from 'prop-types';

@ControlWrap
class YESImage extends Component {
    static contextTypes = {
        getPicture: PropTypes.func,
    }
    onImageChange = async (files) => {
        if (files.length === 0) {
            this.props.onChange('');
            return;
        }
        try {
            const result = await this.props.uploadImage(files[0].file);
            this.props.onChange(result);
        } catch (ex) {
            console.log(ex);
        }
    }

    onImageAddClick = async (e) => {
        e.preventDefault();
        if (!this.context.getPicture) {
            return;
        }
        try {
            const file = await this.context.getPicture();
            const result = await this.props.uploadImage(file.file, file.name);
            this.props.onChange(result);
        } catch (ex) {
            console.log(ex);
        }
    }

    onSelectFail = () => {

    }

    render() {
        const files = [];
        if (this.props.displayValue) {
            files.push({
                url: `'${this.props.displayValue}'`,
            });
        }
        return (
            <ImagePicker
                length="1"
                selectable={files.length === 0}
                files={files}
                onAddImageClick={this.context.getPicture ? this.onImageAddClick : null}
                onChange={this.onImageChange}
                onFail={this.onSelectFail}
            />
        )
    }
}
YESImage.category = 'yigo';
YESImage.detailType = 'image';
YESImage.key = 'AntImage';

export default YESImage;
