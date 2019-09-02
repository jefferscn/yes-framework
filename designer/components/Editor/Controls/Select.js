import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Modal, Text, View, Button, StyleSheet } from 'react-native';
import { Icon } from 'antd';
// import ContentClear from 'material-ui/svg-icons/content/clear';

const styles = StyleSheet.create({
    filter: {
        flexDirection: 'row',
    }
});
@observer
export default class BaseSelect extends Component {
    @observable modalShow = false;

    onPress = () => {
        this.modalShow = true;
    }

    closeModal = () => {
        this.modalShow = false;
    }

    onConfirm = () => {
        this.closeModal();
    }

    onCancel = () => {
        this.closeModal();
    }

    clearValue = (e) => {
        this.props.onChange(null);
        e.stopPropagation();
    }

    renderModalContent() {
        return null;
    }

    renderDisplay() {
        return this.props.value;
    }

    render() {
        return <View style={this.props.style}>
            <View onClick={this.onPress} style={{ flexDirection: 'row' }}>
                <Text style={{ display: 'flex', alignItems: 'center', flex: 1 }}>{this.renderDisplay()}</Text>
                <Icon type="delete" onClick={this.clearValue} />
            </View>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.modalShow}
                onRequestClose={this.closeModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 500, backgroundColor: 'lightgrey' }}>
                        {this.renderModalContent()}
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Button
                                    onPress={this.onConfirm}
                                    title="确定"
                                /></View>
                            <View style={{ flex: 1 }}>
                                <Button
                                    onPress={this.onCancel}
                                    title="取消"
                                /></View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    }
}
