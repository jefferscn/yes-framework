import React, { Component } from 'react';
import Select from './ListSelect';

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

    if (props.meta.controlType) {
        data = data.filter((item) => item.category=== props.meta.controlType);
    }
    return data;
}, true);
