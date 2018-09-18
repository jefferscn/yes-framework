import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';
import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';
import { DynamicBillForm } from 'yes-platform';
import internationalWrap from '../../controls/InternationalWrap';
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved

class ModalTemplateForm extends DynamicBillForm {
    onActionPress = (action) => {
        const act = this.props.actions.find((item) => this.props.formatMessage(item.caption) === action);
        this.onControlClick(act.key);
    }

    buildChildren() {
        const actions = this.props.actions.map((item) => this.props.formatMessage(item.caption));
        return (
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 24, paddingRight: 24 }}>
                <Dialog fullWidth style={{ container: { width: '100%' } }}>
                    <Dialog.Title><Text>{this.props.formatMessage(this.props.title)}</Text></Dialog.Title>
                    <Dialog.Content>
                        <CellLayoutTemplate
                            items={this.props.items}
                            {...this.props}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <DialogDefaultActions
                            actions={actions}
                            onActionPress={this.onActionPress}
                        />
                    </Dialog.Actions>
                </Dialog>
            </View>
        );
    }
}

const WrappedModalTemplate = getMappedComponentHOC(internationalWrap(ModalTemplateForm));
defaultTemplateMapping.reg('modal', WrappedModalTemplate);
export default WrappedModalTemplate;
