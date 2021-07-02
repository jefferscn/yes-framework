import React, { PureComponent } from 'react';
import { Svr } from 'yes-core';
import { ControlWrap } from 'yes-intf';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

@ControlWrap
export default class AttachmentTextImage extends PureComponent {
    static contextTypes ={
        getBillForm: PropTypes,
    }
    render() {
        const billform = this.context.getBillForm();
        if(!billform) {
            return null;
        }
        const formKey = billform.form.formKey;
        const { displayValue, style } = this.props;
        const url = `${Svr.SvrMgr.AttachURL}?path=${displayValue}&formKey=${formKey}&service=DownloadImage&mode=2`;
        return (
            <Image src ={url} style={style} />
        )
    }
}