import React, { Component } from 'react';
import TemplateView from './TemplateView';
import { YIUI, cacheSystem } from 'yes-core';
import { BillformStore } from 'yes';
import FormParas from './FormPara';

export default class RouteComponent extends Component {
    state = {
        oid: this.props.navigation.state.params.id,
    }

    async componentWillMount() {
        await this.processNewForm(this.props);
    }

    componentWillReceiveProps(props) {
        const params = props.navigation.state.params;
        const oldParams = this.props.navigation.state.params;
        if (params.metaKey !== oldParams.metaKey || params.id !== oldParams.id) {
            this.processNewForm(props);
        }
    }

    componentWillUnmount() {
        // YIUI.GlobalMessageBus.removeListener('updateview');// 这里有问题
    }

    processNewForm = async (props) => {
        if (this.isNew(props)) {
            const data = await YIUI.DocService.newDocument(props.navigation.state.params.metaKey);
            if (!data) {
                this.setState({
                    withoutData: true,
                });
                return;
            }
            const currentForm = await BillformStore.getBillForm(`${props.navigation.state.params.metaKey}.new`);
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
                document: data,
            });
            // History.push(`card/YES/${entry.formKey}/${newOid}/NEW`);
            props.navigation.setParams({
                oid: newOid,
            });
        } else {
            this.setState({
                oid: props.navigation.state.params.id,
            });
        }
    }

    isNew(props) {
        return props.navigation.state.params.id === 'new';
    }

    render() {
        if (this.isNew(this.props) && !this.state.withoutData) { // 如果是新增单据，则需要在本控件中请求一个新的Document，放到cache中，以保持
            return null;                // Navigation中引用的单据额一致
        }
        return (
            <TemplateView
                formKey={this.props.navigation.state.params.metaKey}
                oid={this.state.oid || -1}
                document={this.state.document}
                status={this.props.navigation.state.params.status || 'EDIT'}
            />
        );
    }
}
