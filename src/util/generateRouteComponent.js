import React, { Component } from 'react';
import TemplateView from '../TemplateView';
import { YIUI, cacheSystem } from 'yes-core';
import { BillFormStore } from 'yes';
import { Components, Util } from 'yes-platform'; // eslint-disable-line
import confirm from 'yes-platform/dist/util/confirm';

const { BillForm, OperationBar } = Components;

export default (entry) => {
    return class RouteComponent extends Component {
        static navigationOptions = ({ navigation }) => {
            return {
                headerTitle: entry.title,
                tabBarLabel: entry.title,
                headerRight: (
                    entry.oid === 'new' ?
                        ((navigation.state.params && navigation.state.params.oid) ?
                            <BillForm
                                formKey={entry.formKey}
                                oid={(navigation.state.params && navigation.state.params.oid) || entry.oid || -1}
                                status={entry.status || 'EDIT'}
                            >
                                <OperationBar />
                            </BillForm> : null) :
                        <BillForm
                            formKey={entry.formKey}
                            oid={entry.oid || -1}
                            status={entry.status || 'EDIT'}
                        >
                            <OperationBar />
                        </BillForm>
                ),
                headerStyle: {
                    // backgroundColor: '#2196f3',
                },
            };
        };

        state = {
            oid: entry.oid,
        }

        isNew() {
            return this.state.oid === 'new';
        }

        async componentWillMount() {
            if (this.isNew()) {
                const data = await YIUI.DocService.newDocument(entry.formKey);
                const newOid = await YIUI.RemoteService.applyNewOID();
                data.oid = newOid;
                data.state = YIUI.DocType.NEW;
                const key = `${entry.formKey}.${newOid}`;
                await cacheSystem.current.FormDataCache.put(key, {
                    key,
                    data,
                });
                this.setState({
                    oid: newOid,
                });
                // History.push(`card/YES/${entry.formKey}/${newOid}/NEW`);
                this.props.navigation.setParams({
                    oid: newOid,
                });
                YIUI.GlobalMessageBus.on('updateview', async (formKey, oid) => {
                    if (formKey === entry.formKey && oid === this.state.oid) {
                        await confirm('message', 'Save Complete!', 'OK');
                    }
                });
            }
        }

        componentWillUnmount() {
            YIUI.GlobalMessageBus.removeListener('updateview');// 这里有问题
        }

        render() {
            if (this.isNew()) { // 如果是新增单据，则需要在本控件中请求一个新的Document，放到cache中，以保持
                return null;                // Navigation中引用的单据额一致
            }
            return (
                <TemplateView
                    formKey={entry.formKey}
                    oid={this.state.oid || -1}
                    status={entry.status || 'EDIT'}
                />
            );
        }
    };
};
