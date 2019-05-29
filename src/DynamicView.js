import React, { Component } from 'react';
import TemplateView from './TemplateView';
import { YIUI, cacheSystem } from 'yes-core';
import { BillformStore } from 'yes';
import FormParas from './FormPara';

export default class RouteComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
        };
    };

    state = {
        oid: this.props.navigation.state.params.id,
    }

    async componentWillMount() {
        if (this.isNew()) {
            const data = await YIUI.DocService.newDocument(this.props.navigation.state.params.metaKey);
            if (!data) {
                this.setState({
                    withoutData: true,
                });
                return;
            }
            const currentForm = await BillformStore.getBillForm(`${this.props.navigation.state.params.metaKey}.new`);
            if (currentForm) {
                this.setState({
                    withoutData: true,
                });
                return;
            }
            const newOid = await YIUI.RemoteService.applyNewOID();
            data.oid = newOid;
            data.state = YIUI.DocType.NEW;
            const paras = FormParas[this.props.navigation.state.params.metaKey];
            const key = `${this.props.navigation.state.params.metaKey}.${newOid}`;
            await cacheSystem.current.FormDataCache.put(key, {
                key,
                data,
            });
            const form = await BillformStore.createDummyForm(key);
            form.form.paras.map = Object.assign(form.form.paras.map, paras.paras);
            this.setState({
                oid: newOid,
            });
            // History.push(`card/YES/${entry.formKey}/${newOid}/NEW`);
            this.props.navigation.setParams({
                oid: newOid,
            });
            YIUI.GlobalMessageBus.on('updateview', async (formKey, oid) => {
                if (formKey === this.props.navigation.state.params.metaKey && oid === this.state.oid) {
                    // await confirm('message', 'Save Complete!', 'OK');
                }
            });
        }
    }

    componentWillUnmount() {
        YIUI.GlobalMessageBus.removeListener('updateview');// 这里有问题
    }
    isNew() {
        return this.state.oid === 'new';
    }

    render() {
        if (this.isNew() && !this.state.withoutData) { // 如果是新增单据，则需要在本控件中请求一个新的Document，放到cache中，以保持
            return null;                // Navigation中引用的单据额一致
        }
        return (
            <TemplateView
                formKey={this.props.navigation.state.params.metaKey}
                oid={this.state.oid || -1}
                status={this.props.navigation.state.params.status || 'EDIT'}
                {...this.props}
            />
        );
    }
}
