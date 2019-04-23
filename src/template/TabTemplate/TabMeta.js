import { observable, action } from 'mobx';
import BaseMeta from '../BaseMeta';
import uuid from 'uuid';
import Controls from '../../../designer/components/Editor/Controls';

const { Text, Toggle, Combobox } = Controls;

class VisibleEqual {
    @observable yigoId;
    @observable value;
    constructor(data) {
        if (typeof data === 'string') {
            this.yigoid = data;
        }
        if (typeof data === 'object') {
            this.yigoid = data.yigoId;
            this.value = data.value;
        }
    }
    static editor = [
        {
            type: 'field',
            caption: '控件标识',
            key: 'yigoId',
        }, {
            type: 'text',
            caption: '值',
            key: 'value,'
        }
    ]
}

class ControlItem {
    id;
    @observable key;
    @observable caption;
    @observable isGroup = false;
    @observable items = [];
    @observable layoutType = "cell";
    @observable visibleRelation = null;
    @observable visibleNotEmpty = null;
    @observable visibleEqual = null;
    constructor(data) {
        if (data.id) {
            this.id = data.id;
        } else {
            this.id = uuid.v4();
        }
        if (typeof data === 'string') {
            this.key = data;
        }
        if (typeof data === 'object') {
            this.key = data.key;
            this.caption = data.caption;
            this.isGroup = data.isGroup ? true : false;
            this.visibleRelation = data.visibleRelation;
            this.visibleNotEmpty = data.visibleNotEmpty;
            if (data.visibleEqual) {
                this.visibleEqual = new VisibleEqual(data.visibleEqual);
            }
            if (data.layoutType) {
                this.layoutType = data.layoutType;
            }
            if (this.isGroup) {
                if (data.items) {
                    for (const itm of data.items) {
                        this.items.push(new ControlItem(itm));
                    }
                }
            }
        }
    }
    static editor = [
        {
            type: Text,
            key: 'id',
            caption: '标识',
            disabled: true,
        },
        {
            type: Text,
            key: 'caption',
            caption: '抬头',
        },
        {
            type: Toggle,
            key: 'isGroup',
            caption: '是否分组',
            defaultValue: false,
        },
        {
            type: Combobox,
            key: 'layoutType',
            items: [{ key: 'cell', text: 'cell' }, { key: 'control', text: 'control' }],
            defaultValue: 'cell',
            caption: '元素类型',
            visibleEqual: {
                relateId: 'isGroup',
                value: false,
            },
        },
        {
            type: Text,
            key: 'key',
            caption: '控件',
            visibleEqual: {
                relateId: 'isGroup',
                value: false,
            },
        },
        // {
        //     type: 'field',
        //     key: 'visibleRelation',
        //     caption: '关联可见',
        // },{
        //     type: 'field',
        //     key: 'visibleNotEmpty',
        //     caption: '非空可见',
        // },{
        //     type: 'complex',
        //     key: 'visibleEqual',
        //     caption: '相等可见',
        // },{
        //     type: 'list',
        //     key: 'items',
        //     caption: '子控件',
        //     visibleEqual: {
        //         key: 'isGroup',
        //         value: true,
        //     }
        // }
    ];
}

class TabPanelMeta {
    id;
    @observable title = "";
    @observable isGroup = true;
    @observable isGrid = false;
    @observable gridId = null;
    @observable items = [];
    constructor(data) {
        if (data.id) {
            this.id = data.id;
        } else {
            this.id = uuid.v4();
        }
        if (typeof data === 'string') {
            this.title = data;
        }
        if (typeof data === 'object') {
            this.key = data.key;
            this.title = data.caption;
            this.isGroup = data.isGroup;
            this.isGrid = data.isGrid;
            this.gridId = data.gridId;
            if (data.items) {
                for (const itm of data.items) {
                    this.items.push(new ControlItem(itm));
                }
            }
        }
    }
    @action
    changeCaption(title) {
        this.caption = title;
    }
    @action
    addItem() {
        this.items.push(new ControlItem());
    }
    @action
    removeItem(index) {
        this.items.splice(index, 1);
    }
    static editor = [
        {
            type: Text,
            key: 'id',
            caption: '标识',
            disabled: true,
        },
        {
            type: Text,
            key: 'title',
            caption: '抬头',
        },
    ];
}
export default class TabMeta extends BaseMeta {
    @observable tabs = [];
    constructor(json) {
        super(json);
        if (json.id) {
            this.id = json.id;
        }
        if (json && json.tabs) {
            for (const p of json.tabs) {
                this.tabs.push(new TabPanelMeta(p));
            }
        }
    }
    @action
    addTab(title) {
        tabs.push(new TabPanelMeta(title));
    }
    @action
    removeTab(index) {
        tabs.splice(index, 1);
    }
}