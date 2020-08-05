import React, { PureComponent } from 'react';
import NormalTemplate from 'yes-framework/template/NormalTemplate';
import meta from '../config/billforms/FSSC_TrainTicketBooks.json';
import { Modal } from 'antd-mobile';

export default class FSSC_TrainTicketBooks extends PureComponent {
    render() {
        return (<Modal
            visible={true}
            maskStyle={{ zIndex: 899 }}
            wrapClassName="fullscreen"
            maskClosable={false}
        >
            <NormalTemplate {...meta} {...this.props} />
        </Modal>);
    }
}
