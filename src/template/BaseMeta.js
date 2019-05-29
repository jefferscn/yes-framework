import { observable, action } from 'mobx';
import uuid from 'uuid';

export function buildYigoControlMeta(filter) {
    class YIGOControl {
        @observable yigoId = null;
        @observable control = null;//渲染控件
        @observable controlProps = null;
        contructor(json) {
            if (json) {
                Object.assign(this, json);
            }
        }
        static editor = [
            {
                type: 'ControlSelect',
                key: 'yigoId',
                caption: '单据控件',
                controlType: filter,
            },
            {
                type: 'DesignControlSelect',
                key: 'control',
                caption: '渲染控件',
                allowEmpty: true,
                emptyStirng: '默认',
                category: 'yigo',
                linkProps: [{
                    name: 'detailType',
                    link: '',
                }],
            },
            {
                type: 'SubForm',
                key: 'controlProps',
                isGroup: true,
                linkProps: [{
                    name: 'control',
                    link: 'control',
                }],
            }
        ];
    }
    return YIGOControl;
};

export class Element {
    @observable type = 'element';
    @observable elementType;
    @observable elementProps = null;
    constructor(json) {
        if (json) {
            this.elementType = json.elementType;
            this.elementProps = json.elementProps;
        }
    }
    static editor = [
        {
            type: 'DesignControlSelect',
            key: 'elementType',
            caption: '控件',
            category: 'template'
        }, {
            type: 'SubForm',
            key: 'elementProps',
            isGroup: true,
            linkProps: [{
                name: 'control',
                link: 'elementType',
            }],
        }
    ];
}

export class YigoControl {
    @observable key;
    @observable props = {}
    contructor(json) {
        if (json) {
            if (typeof json === 'string') {
                this.key = json;
            } else {
                this.key = json.key;
                if (json.props) {
                    this.props = Object.assign(this.props, json.props);
                } else {
                    const { key, ...others } = json;
                    this.props = Object.assign(this.props, others);
                }
            }
        }
    }
}

export class Control {

}

export default class BaseMeta {
    id;
    @observable formTemplate;
    @observable controls = {};
    @observable foot = null;
    @observable head = null;
    constructor(json) {
        this.id = uuid.v4();
        this.foot = new Element(json.foot);
        this.head = new Element(json.head);
    }

    @action
    changeControl(key, control) {
        controls[key] = control;
    }
    @action
    removeControl(key) {
        delete controls[key];
    }
}