import projectCfg from '../config/project.json';
export const allList = [{
    key: 'shenqingdan',
    icon: 'icon-chuchashenqingdan',
    text: '申请单',
    category: '单据类型',
    favorite: true,
    formKey: 'FSSC_ExpenseAccountBillView',
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
}, ];

export function saveSelectedList(list) {
    localStorage.setItem(storageKey, JSON.stringify(list));
}

const storageKey = `${projectCfg.sessionKey}_selectedList`;
const tmp = localStorage.getItem(storageKey);

export let selectedList  =  [
    {
        key: 'shenqingdan',
        icon: 'icon-chuchashenqingdan',
        text: '申请单',
        category: '单据类型',
        favorite: true,
        formKey: 'FSSC_ExpenseAccountBillView',
        oid: '-1',
        color: '#008DF5'
    }, {
        key: 'jiekuandan',
        icon: 'icon-jiekuandan',
        text: '借款单',
        path: 'jhkd',
        category: '单据类型',
        favorite: true,
        color: '#F5A623'
    }, {
        key: 'baoxiaodan',
        icon: 'icon-wodebaoxiaodan',
        text: '报销单',
        category: '单据类型',
        formKey: 'FSSC_AllReimbursementView',
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
        color: '#49B7D9'
    }, {
        key: 'fapiao',
        icon: 'icon-fapiao',
        text: '发票',
        category: '记录消费',
        formKey: 'FSSC_InvoiceEntry',
        oid: "-1",
        modal: true,
        favorite: true,
        color: '#FF5337'
    }, {
        key: 'shanglv',
        icon: 'icon-ly',
        text: '同程',
        category: '其他',
        type: 'thirdpart',
        service: 'CityTourPhoneLoginService',
        favorite: true,
        color: '#35BEFB'
    }
];

if(tmp) {
    selectedList = JSON.parse(tmp);
}
