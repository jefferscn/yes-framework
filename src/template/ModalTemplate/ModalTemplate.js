import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { Modal } from 'antd-mobile';
import defaultTemplateMapping from '../defaultTemplateMapping';
import PropTypes from 'prop-types';
import Element from '../Element';
import { Util } from 'yes-web';

// const { width, height } = Dimensions.get('window');

// const maxHeight = height * 0.7;
const styles = StyleSheet.create({
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(211,211,211,0.5)',
    }
});
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
        maxHeight: Dimensions.get('window').height * 0.7,
        busyingAction: null,
    }
    onActionPress = async (action) => {
        if (this.props.busying) {
            return;
        }
        // const act = this.props.actions.find((item) => this.props.formatMessage(item.caption) === action);
        this.setState({
            busyingAction: action,
        });
        try {
            await this.context.onControlClick(action);
            if (this.props.autoClose) {
                this.setState({
                    modalVisible: false,
                })
            }
        } catch (ex) {
            Util.alert('错误', ex.message);
        } finally {
            this.setState({
                busyingAction: null,
            });
        }
    }
    onClose = () => {
        this.props.onClose && this.props.onClose();
    }
    render() {
        // const actions = this.props.actions.map((item) => this.props.formatMessage(item.caption));
        const { title, content, popup, animationType, actions, formStatus, style, busying } = this.props;
        const acts = actions ? actions.map((action) => {
            return {
                text: action.text,
                onPress: () => this.onActionPress(action.yigoid),
            }
        }) : undefined;
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
                    <View style={[{ maxHeight: this.state.maxHeight }, style]}>
                        <Element meta={content} />
                        {
                            busying ? <View style={styles.mask}><ActivityIndicator size="small" /></View> : null
                        }
                    </View> :
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
