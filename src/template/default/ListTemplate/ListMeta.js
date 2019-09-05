import { observable, action } from 'mobx';
import BaseMeta from '../BaseMeta';
import uuid from 'uuid';
// import Controls from 'yes-designer/components/Editor/Controls';

// const { Text } = Controls;
class SearchBar {
    @observable textField;
    @observable queryButton;
    constructor(data) {
        if (data) {
            this.textField = data.textField;
            this.queryButton = data.queryButton;
        }
    }
    static editor = [
        {
            type: 'ControlSelect',
            key: 'textField',
            caption: '查詢文本控件',
            controlType: 'texteditor',
        },
        {
            type: 'ControlSelect',
            key: 'queryButton',
            caption: '查询按钮控件',
            controlType: 'button',
        },
    ];
}

export default class ListMeta extends BaseMeta {
    id;
    formTemplate = "list";
    @observable list;
    @observable searchBar;
    constructor(data) {
        super(data);
        this.list = data.list;
        this.searchBar = new SearchBar(data.searchBar);
    }
    static editor = [
        {
            type: 'Text',
            key: 'list',
            caption: '列表控件',
        },
    ];
}
