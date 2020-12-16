import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Components } from 'yes-comp-react-native-web'; // eslint-disable-line
import TemplateView from './TemplateView';
import { YIUI, closeform } from 'yes-core';
import { AppDispatcher, WorkitemWrap as workitemWrap } from 'yes';
import { Modal } from 'antd-mobile';
import { internationalWrap } from 'yes-intf';

const { LoadingComp } = Components;

class WorkitemView extends PureComponent {
    static propTypes = {
        navigation: PropTypes.object,
    };

    state = {
        loading: true,
    }

    formatMessage = (msg) => {
        if (msg) {
            return this.props.formatMessage? this.props.formatMessage(msg) : msg;
        }
        return msg;
    }
    async componentWillMount() {
        try {
            const entry = 
            // const workitemInfo = await YIUI.BPMService.loadWorkitemInfo(this.props.navigation.state.params.wid);
            // if (workitemInfo) {
            //     const expVals = {};
            //     expVals[YIUI.BPMConstants.WORKITEM_INFO] = workitemInfo;
            //     // InteractionManager.runAfterInteractions(() =>
            //     setTimeout(() =>
            //         this.setState({
            //             loading: false,
            //             expVals,
            //         }), 400);
            // }
        } catch (ex) {
            Modal.alert(this.formatMessage('错误'), this.formatMessage('加载流程信息失败'), [{ text: 'OK', onPress: () => AppDispatcher.dispatch(closeform()) }]);
        }
    }

    render() {
        if (this.state.loading) {
            return <LoadingComp />;
        }
        let formKey = this.state.expVals.WorkitemInfo.FormKey;
        if (this.state.expVals.WorkitemInfo.TemplateKey) {
            formKey = `${formKey}|${this.state.expVals.WorkitemInfo.TemplateKey}`;
        }
        const oid = this.state.expVals.WorkitemInfo.OID ? this.state.expVals.WorkitemInfo.OID : -1;
        let status = 'DEFAULT';
        const expVals = this.state.expVals;
        if (this.state.expVals.WorkitemInfo.State === 1 && this.props.navigation.state.params.loadInfo === 'true') {
            if (this.state.expVals.WorkitemInfo.IgnoreFormState) {
                status = 'EDIT';
            }
        } else {
            expVals[YIUI.BPMKeys.WORKITEM_INFO] = null;
        }
        return (<TemplateView
            formKey={formKey}
            oid={oid}
            field={this.props.navigation.state.params.field}
            status={status}
            expVals={expVals}
        />);
    }
}

export default internationalWrap(WorkitemView);
