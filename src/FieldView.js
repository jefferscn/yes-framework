import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'yes-platform'; // eslint-disable-line
// import billform from './billform';
import billform from './config/billform';
import controls from './config/control.js';
import { YIUI } from 'yes-core';
import { WorkitemWrap as workitemWrap, DynamicControl } from 'yes';

const { BillForm, LoadingComp, FormInfo } = Components;
const WorkitemBill = workitemWrap(BillForm, LoadingComp);

export default class FieldView extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <WorkitemBill workitemId={navigation.state.params.wid}>
                <FormInfo.FieldCaption style={{ fontSize: 20 }} yigoid={navigation.state.params.field} />
            </WorkitemBill>,
            headerStyle: {
                // backgroundColor: '#2196f3',
            },
        };
    };

    static propTypes = {
        navigation: PropTypes.object,
    };

    state = {
        loading: true,
    }

    async componentWillMount() {
        const workitemInfo = await YIUI.BPMService.loadWorkitemInfo(this.props.navigation.state.params.wid);
        if (workitemInfo) {
            this.setState({
                loading: false,
                workitemInfo,
            });
        }
    }

    render() {
        if (this.state.loading) {
            return <LoadingComp />;
        }
        let formKey = this.state.workitemInfo.FormKey;
        const oid = this.state.workitemInfo.OID ? this.state.workitemInfo.OID : -1;
        const expVals = {};
        expVals[YIUI.BPMConstants.WORKITEM_INFO] = this.state.workitemInfo;

        let extraProps;
        // 支持反向模版
        extraProps = billform.default;
        if (billform[formKey]) {
            extraProps = Object.assign(extraProps, billform[formKey]);
        }

        if (this.state.workitemInfo.TemplateKey) {
            formKey = `${formKey}|${this.state.workitemInfo.TemplateKey}`;
        }
        const fieldProps = extraProps.controls[this.props.navigation.state.params.field];

        this.calculateElement(fieldProps);

        return (
            <BillForm
                formKey={formKey}
                oid={oid}
                status={'VIEW'}
                expVals={expVals}
            >
                <DynamicControl yigoid={this.props.navigation.state.params.field} {...fieldProps} />
            </BillForm>);
    }

    calculateElement(props) {
        if (props.control && typeof props.control === 'string') {
            props['control'] = controls[props.control];
        }
        for (const key in props) {
            const ele = props[key];
            if (ele.type === 'element') {
                const Control = controls[ele.elementType];
                props[key] = <Control {...ele.elementProps} />;
            }
        }
    }
}
