var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import StoryWrapper from '../StoryWrapper';
import GridNavigator from '../../controls/Navigator/GridNavigator';
export default {
    title: 'yes-framework/navigator/Grid',
    component: GridNavigator,
};
var selectedList = ['shenqingdan', 'jiekuandan', 'baoxiaodan'];
var allList = [{
        key: 'shenqingdan',
        icon: 'icon-chuchashenqingdan',
        text: '申请单',
        category: '单据类型',
        favorite: true,
        formKey: 'FSSC_AccountCollectionView',
        oid: '-1',
        color: '#BBDEFB'
    }, {
        key: 'jiekuandan',
        icon: 'icon-jiekuandan',
        text: '借款单',
        category: '单据类型',
        path: 'jhkd',
        favorite: true,
        color: '#90CAF9'
    }, {
        key: 'baoxiaodan',
        icon: 'icon-wodebaoxiaodan',
        text: '报销单',
        category: '单据类型',
        formKey: 'FSSC_HospitalityReimbursementView',
        oid: "-1",
        favorite: true,
        color: '#63B5F6'
    }, {
        key: 'zhangben',
        icon: 'icon-myaccount',
        text: '账本',
        category: '记录消费',
        formKey: 'FSSC_BooksQuery',
        oid: "-1",
        favorite: true,
        color: '#42A5F5'
    }, {
        key: 'fapiao',
        icon: 'icon-fapiao',
        text: '发票',
        category: '记录消费',
        formKey: 'FSSC_InvoiceEntry',
        oid: "-1",
        modal: true,
        favorite: true,
        color: '#2196F3'
    }, {
        key: 'baobiao',
        icon: 'icon-baobiao',
        text: '报表',
        category: '其他',
        favorite: false,
        color: '#1E88E5'
    }, {
        key: 'shanglv',
        icon: 'icon-ly',
        text: '同程',
        category: '其他',
        type: 'thirdpart',
        service: 'CityTourPhoneLoginService',
        favorite: true,
        color: '#1976D2'
    }];
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(GridNavigator, __assign({}, args)))); };
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    editable: true,
    allList: allList,
    selectedList: selectedList,
    column: 5,
};
