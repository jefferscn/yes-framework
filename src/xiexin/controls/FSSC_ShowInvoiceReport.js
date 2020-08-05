import React, { PureComponent } from 'react';
import { Modal } from 'antd-mobile';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import AttachmentList from 'yes-framework/controls/AttachmentList';

const styles = StyleSheet.create({
    error: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        backgroundColor: 'white',
    }
});
export default class FSSC_TrainTicketBooks extends PureComponent {
    onRequestClose = ()=> {
        this.props.onClose && this.props.onClose();
    }
    render() {
        const { error, errorMsg } = this.props;
        return (<Modal
            visible={true}
            maskStyle={{ zIndex: 899 }}
            transparent
            wrapClassName="fullscreen transparent"
            maskClosable={true}
            onClose={this.onRequestClose}
        >
            {
                error? <TouchableWithoutFeedback onPress={this.onRequestClose}><View style={styles.error}>
                    <Text style={styles.text}>{errorMsg.message}</Text>
                </View></TouchableWithoutFeedback>:
                <AttachmentList 
                    inline
                    onRequestClose={this.onRequestClose}
                    filePath="SingleBillPictures"
                    fileName="SingleBillPictures"
                    yigoid="Grid1" />
            }
        </Modal>);
    }
}
