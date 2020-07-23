import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Modal } from 'antd-mobile';
import defaultTemplateMapping from '../defaultTemplateMapping';
import PropTypes from 'prop-types';
import Element from '../Element';

class ModalTemplateForm extends PureComponent {
    static contextTypes = {
        onControlClick: PropTypes.func,
    }
    static defaultProps = {
        popup: false,
        animationType: 'slide-up',
        autoClose: false,
    }
    state = {
        modalVisible: true,
    }
    onActionPress = (action) => {
        // const act = this.props.actions.find((item) => this.props.formatMessage(item.caption) === action);
        this.context.onControlClick(action);
        if (this.props.autoClose) {
            this.setState({
                modalVisible: false,
            })
        }
    }
    onClose = () => {
        this.props.onClose && this.props.onClose();
    }
    render() {
        // const actions = this.props.actions.map((item) => this.props.formatMessage(item.caption));
        const { title, content, popup, animationType, actions, formStatus, style } = this.props;
        const acts = actions ? actions.map((action) => {
            return {
                text: action.text,
                onPress: () => this.onActionPress(action.yigoid),
            }
        }): undefined;
        return (
            <Modal
                visible={this.state.modalVisible}
                popup={popup}
                animationType={animationType}
                transparent
                maskClosable={true}
                onClose={this.onClose}
                title={title}
                footer={acts}
                // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={this.onClose}
            >
                {formStatus === 'ok' ?
                    <View style={[{ maxHeight: 500 }, style]}><Element meta={content} /></View> :
                    <ActivityIndicator size="large" />
                }
            </Modal>
            // <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 24, paddingRight: 24 }}>
            //     <Dialog fullWidth style={{ container: { width: '100%' } }}>
            //         <Dialog.Title><Text>{this.props.formatMessage(this.props.title)}</Text></Dialog.Title>
            //         <Dialog.Content>
            //             <CellLayoutTemplate
            //                 items={this.props.items}
            //                 {...this.props}
            //             />
            //         </Dialog.Content>
            //         <Dialog.Actions>
            //             <DialogDefaultActions
            //                 actions={actions}
            //                 onActionPress={this.onActionPress}
            //             />
            //         </Dialog.Actions>
            //     </Dialog>
            // </View>
        );
    }
}

defaultTemplateMapping.reg('modal', ModalTemplateForm);
export default ModalTemplateForm;
