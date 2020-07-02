import React, { PureComponent } from 'react';
import { Modal } from 'antd-mobile';
import AttachmentList from '../../controls/AttachmentList';

export default class FSSC_TrainTicketBooks extends PureComponent {
    onRequestClose = ()=> {
        this.props.onClose && this.props.onClose();
    }
    render() {
        return (<Modal
            visible={true}
            maskStyle={{ zIndex: 899 }}
            transparent
            wrapClassName="fullscreen transparent"
            maskClosable={false}
        >
            <AttachmentList 
                inline
                onRequestClose={this.onRequestClose}
                filePath="SingleBillPictures"
                fileName="SingleBillPictures"
                yigoid="Grid1" />
        </Modal>);
    }
}
