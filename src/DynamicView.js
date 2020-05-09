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
            const newOid = await YIUI.RemoteService.applyNewOID();
            // data.oid = newOid;
            // data.state = YIUI.DocType.NEW;
            // const paras = FormParas[this.props.navigation.state.params.metaKey];
            // const key = `${this.props.navigation.state.params.metaKey}.${newOid}`;
            // const form = await BillformStore.createDummyForm(key);
            // if (paras) {
            //     form.form.paras.map = Object.assign(form.form.paras.map, paras.paras);
            // }
            this.setState({
                oid: newOid,
                // document: data,
            });
            // History.push(`card/YES/${entry.formKey}/${newOid}/NEW`);
            // props.navigation.setParams({
            //     oid: newOid,
            // });
        } else {
            this.setState({
                oid: props.navigation.state.params.id,
            })
        }
        // else {
        //     this.setState({
        //         oid: props.navigation.state.params.id,
        //     });
        // }
    }

    isNew(props) {
        return props.navigation.state.params.id === 'new';
    }

    render() {
        if(this.state.oid==='new') {
            return null;
        }
        const params = FormParas[this.props.navigation.state.params.metaKey];
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
