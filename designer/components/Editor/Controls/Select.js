import React, { Component } from 'react';
import { inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Modal, Text, View, TouchableWithoutFeedback, ScrollView, ListView, Button, StyleSheet, ActivityIndicator } from 'react-native';
import ContentClear from 'material-ui/svg-icons/content/clear';

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
        return <View onClick={this.onPress} style={this.props.style}>
            <View style={{ flexDirection: 'row' }}><Text style={{ display: 'flex', alignItems: 'center', flex: 1 }}>{this.renderDisplay()}</Text><ContentClear onClick={this.clearValue} /></View>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={this.modalShow}
                onRequestClose={this.closeModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            </Modal>
        </View>
    }
}
