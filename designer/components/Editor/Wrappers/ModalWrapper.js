import React, { Component } from 'react';
import { Modal, Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';

export default (tt)=>{
    return (Comp) => {
        @observer
        class ModalWrapper extends Component {
            onActionPress = (action)=> {
                if(action==='OK') {
                    this.props.commitChange();
                }
                if(action==='Cancel') {
                    this.props.rollbackChange();
                }
                this.props.close();
            }

            close =()=>{
                this.props.rollbackChange();
                this.props.close();
            }
            render() {
                const { title, visible, ...otherProps } = this.props;
                if(!visible) {
                    return null;
                }
                return (<Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={visible}
                    onRequestClose={this.close}
                >
                    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                        <Dialog style={{ container: { width: '600px' } }}>
                            <Dialog.Title><Text>{title || tt}</Text></Dialog.Title>
                            <Dialog.Content>
                                <Comp {...otherProps} />
                            </Dialog.Content>
                            <Dialog.Actions>
                                <DialogDefaultActions
                                    actions={['OK','Cancel']}
                                    onActionPress={this.onActionPress}
                                />
                            </Dialog.Actions>
                        </Dialog>
                        </View>
                </Modal>);
            }
        }
        return ModalWrapper;
    }
}
