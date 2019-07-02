import React, { Component } from 'react';
import Select from './ListSelect';

export default Select((context, props) => {
    const billform = context.getBillForm();
    if (!billform) {
        return null;
    }
    // const list = billform.form.getComponentList();
    const list = billform.form.getComponent(props.yigoid);
    if(!list) {
        return null;
    }
    const data = list.columnInfo.map((item)=>{
        return {
            key: item.key,
            type: item.columnType,
            caption: item.caption || item.key
        };
    })
    // let data = Object.values(list).map((item) => {
    //     return {
    //         key: item.key,
    //         type: item.tagName,
    //         caption: item.caption || item.key
    //     };
    // });
    // if (props.meta.controlType) {
    //     data = data.filter((item) => item.type === props.meta.controlType);
    // }
    return data;
});
