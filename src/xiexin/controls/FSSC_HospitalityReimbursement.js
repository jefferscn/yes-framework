import React, { PureComponent } from 'react';
import VisibleEmpty from './VisibleEmpty';
// import TemplateView from '../../TemplateView';
import NormalTemplate from '../../template/NormalTemplate';
import ButtonClickAction from './ButtonClickAction';
import meta from '../config/billforms/FSSC_HospitalityReimbursement_view.json';

export default class HospitalityReimbursement extends PureComponent {
    render() {
        const { status } = this.props;
        if (status === 'NEW') {
            return (
                <VisibleEmpty yigoid='ApplicationFormCode'>
                    <ButtonClickAction yigoid="Button1" />
                </VisibleEmpty>
            )
        }
        return <NormalTemplate {...meta} />
    }
}