import React, { PureComponent } from 'react';
import { Modal } from 'antd-mobile';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import GridView from 'yes-framework/controls/GridView';

export default class ExpenseAccountBillImport extends PureComponent {
    static contextTypes = {
        getPicture: PropTypes.func,
        getBillForm: PropTypes.func,
        uploadImage: PropTypes.func,
        onValueChange: PropTypes.func,
        onControlClick: PropTypes.func,
    }
    onClose = () => {
        this.props.onClose && this.props.onClose();
    }
    onCancel = () => {
        this.props.onClose && this.props.onClose();
    }
    render() {
        return (<Modal
            visible={true}
            popup={true}
            animationType={'slide-up'}
            transparent
            maskClosable={false}
            // onClose={this.onClose}
            title="出差申请单导入"
            footer={[{
                text: '取消',
                onPress: this.onCancel,
            }]}
        // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        // afterClose={this.onClose}
        >
            <View style={[{ maxHeight: 300 }]}>
                <GridView
                    yigoid="Grid1"
                    useBodyScroll={true}
                    showArrow={false}
                    primaryKey="NO_LV"
                    secondKey={["Region"]}
                    clickMode="dblclick"
                    hideAction={true}
                    tertiaryKey={["PersonnelID_LV"]}
                />
            </View>
        </Modal>);
    }
}

