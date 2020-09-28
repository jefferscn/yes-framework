import React, { PureComponent } from 'react';
import AutoTemplate from 'yes-framework/template/AutoTemplate';
import meta from '../config/billforms/FSSC_TrainTicketBooks';
import { Modal } from 'antd-mobile';

export default class FSSC_TrainTicketBooks extends PureComponent {
    render() {
        return (<Modal
            visible={true}
            maskStyle={{ zIndex: 899 }}
            wrapClassName="fullscreen"
            maskClosable={false}
        >
            <AutoTemplate {...meta} {...this.props} />
        </Modal>);
    }
}
