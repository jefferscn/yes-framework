import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { observable, action } from 'mobx';
import TemplateView from '../../../src/TemplateView';
import View from '../View';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import CellLayoutEditor from '../Editor/CellLayoutEditor';

@inject('store')
@observer
export default class BillformViewer extends Component {
    // @observable oid = null;
    tempOid = null;
    @observable status = 'NORMAL';
    @action
    changeStatus = (event, index, value) => {
        this.status = value;
    }
    @action
    changeOID = (event, value) => {
        this.tempOid = value;
    }
    @action
    submitChange = () => {
        // this.oid = this.tempOid;
        this.props.store.setFormId(this.props.formKey, this.tempOid);
    }
    componentWillReceiveProps(props) {
        if (this.props.formKey !== props.formKey) {
            const oid = this.props.store.formIds[props.formKey];
            this.tempOid = this.props.store.formIds[props.formKey];
        }
    }
    render() {
        const oid = this.props.store.formIds[this.props.formKey];
        return (
            <View style={{ flex: 1 }}>
                <SelectField
                    floatingLabelText="Form Status"
                    value={this.status}
                    onChange={this.changeStatus}
                >
                    <MenuItem value={'NORMAL'} primaryText="NORMAL" />
                    <MenuItem value={'EDIT'} primaryText="EDIT" />
                    <MenuItem value={'NEW'} primaryText="NEW" />
                </SelectField>
                <TextField type='text' value={oid} onChange={this.changeOID} />
                <FlatButton onClick={this.submitChange} label="刷新" />
                <View style={{flexDirection:'row'}}>
                    <View style={{ width: 375, height: 667 }}>
                        {oid ? <TemplateView
                            navigation={{}}
                            designMode
                            meta={this.props.meta}
                            formKey={this.props.formKey}
                            oid={oid}
                            status={this.status} /> : null}
                    </View>
                    <CellLayoutEditor  />
                </View>
            </View>
        )
    }
}
