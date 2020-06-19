import React, { PureComponent } from 'react';
import ActionButton from './ActionButton';
import { openForm, openModal } from '../util/navigateUtil';

export default class OpenFormActionButton extends PureComponent {
    static defaultProps = {
        status: 'EDIT',
        modal: false,
    }
    openForm = () => {
        const { formKey, oid, status, modal } = this.props;
        if (modal) {
            openModal(formKey, oid, status);
            return;
        } 
        openForm(formKey, oid, status);
    }
    render() {
        const { style } = this.props;
        return (
            <ActionButton onPress={this.openForm} style={style} />
        )
    }
}
