import React, { Component } from 'react';
import Select from './ListSelect';
import YIGOControl from './YIGO';

export default Select((context, props) => {
    const billform = context.getBillForm();
    if (!billform) {
        return null;
    }
    let list = props.store.context.getComponents();
    // if(props.yigoid) {
    //     const cmp = context.getContextComponent(props.yigoid);
    //     if(cmp.tagName==='listview') {
    //         list = cmp.getAllColumnEditors();
    //     }
    // }
    let data = [];
    Object.values(list).forEach((item) => {
        //这里需要对radiobutton控件进行一下变形
        //radiobutton会有多个控件但只记录isGroupHead=true的那个
        if(item.tagName==='radiobutton') {
            if(item.metaObj.isGroupHead) {
                data.push({
                    key: item.key,
                    category: item.tagName,
                    caption: item.metaObj.groupKey,
                })
            }
            return;
        }
        data.push({
            key: item.key,
            category: item.tagName,
            caption: item.caption || item.key,
        });
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
