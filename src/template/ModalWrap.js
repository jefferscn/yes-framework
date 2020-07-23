import React, { PureComponent } from 'react';
// import NormalTemplate from '../../template/NormalTemplate';
// import meta from '../config/billforms/FSSC_TrainTicketBooks.json';
import { Modal } from 'antd-mobile';

export default (Template) => {
    class ModalWrap extends PureComponent {
        render() {
            return (<Modal
                visible={true}
                maskStyle={{ zIndex: 899 }}
                wrapClassName="fullscreen"
                maskClosable={false}
            >
                <Template {...this.props} />
            </Modal>);
        }
    }
    return ModalWrap;
}
