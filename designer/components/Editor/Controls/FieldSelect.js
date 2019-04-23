import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { View } from 'react-native';
import { BillformStore, Util } from 'yes';
import { SearchBar } from 'antd-mobile';
import SelectField from 'material-ui/SelectField';

@inject('store')
@observer
class FieldSelect extends Component {
    @observable filter = this.props.filter;
    @observable type = this.props.type;
    async componentWillMount() {
        const { store } = this.props;
        const formKey = store.selectedFormKey;
        const oid = store.formIds[formKey];
        const key = Util.buildFormKey(formKey, oid);
        const billform = BillformStore.getForm(key);
        this.setState({
            compList: billform.getCompList(),
            filteredList: billform.getFilterList(this.filter, this.type),
        });
    }
    onFilterChange=(value)=> {
        this.filter = value;
        this.setState({
            filteredList: this.getFilterList(value, this.type),
        })
    }

    getFilterList(filter, type) {
        const compList = this.state.compList;
        return compList.filter((comp) => {
            if(type) {
                if(comp.tagName!==type){
                    return false;
                }
            }
            if(filter) {
                const reg = new RegExp(filter);
                return reg.test(comp.key) || reg.test(comp.caption);
            }
            return true;
        });
    }
    // onSubmitFilter=()=>{

    // }
    render() {
        const { value } = this.props;
        return (
            <View>
                <View>
                    <SearchBar 
                        placeholder="搜索" 
                        value={this.filter} 
                        onChange={this.onFilterChange}
                        // onSubmit={this.onSubmitFilter}
                        // onBlur={}
                        // onClear={} 
                        />
                    <SelectField value={this.type} onChange={this.onTypeChange}>
                    </SelectField> 
                </View>
                <View>
                </View>
            </View>
        )
    }
}

export default FieldSelect;
