import React, { Component } from 'react';
import Select from './ListSelect';
import YIGOControl from './YIGO';

export default Select((context, props) => {
    const billform = context.getBillForm();
    if (!billform) {
        return null;
    }
    const list = billform.form.getComponentList();
    let data = Object.values(list).map((item) => {
        return {
            key: item.key,
            category: item.tagName,
            caption: item.caption || item.key,
        };
    });

    //只显示支持的控件
    if(!props.meta.showAll) {
        data = data.filter((item)=> YIGOControl.supportControlTypes.includes(item.category));
    }

    if (props.meta.controlType) {
        data = data.filter((item) => item.category=== props.meta.controlType);
    }
    return data;
}, true);
