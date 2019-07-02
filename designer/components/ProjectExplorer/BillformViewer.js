import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { observable, action } from 'mobx';
import View from '../View';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

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
        this.props.store.setFormId(this.props.formKey, this.tempOid);
        this.frame && this.frame.contentWindow.location.reload();
    }

    componentWillReceiveProps(props) {
        if (this.props.formKey !== props.formKey) {
            const oid = this.props.store.formIds[props.formKey];
            this.tempOid = this.props.store.formIds[props.formKey];
        }
    }

    componentDidUpdate() {
        this.frame && this.frame.contentWindow.location.reload();
    }

    render() {
        const oid = this.props.store.formIds[this.props.formKey];
        return (
            <View style={{ flex: 1 }}>
                <View style={{flexDirection: 'row'}}>
                    <SelectField
                        floatingLabelText="Form Status"
                        value={this.status}
                        onChange={this.changeStatus}
                    >
                        <MenuItem value={'NORMAL'} primaryText="NORMAL" />
                        <MenuItem value={'EDIT'} primaryText="EDIT" />
                        <MenuItem value={'NEW'} primaryText="NEW" />
                    </SelectField>
                    <TextField floatingLabelText="单据ID" type='text' value={oid} onChange={this.changeOID} />
                    <FlatButton onClick={this.submitChange} label="刷新" />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 800, height: 667 }}>
                        {
                            oid ? <iframe
                                ref={(ref) => this.frame = ref}
                                src={`/designer#card/YES/${this.props.formKey}/${oid}/${this.status}`}
                                width="800"
                                height="667"
                            /> : null
                        }
                    </View>
                </View>
            </View>
        )
    }
}
