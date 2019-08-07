import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CellLayoutSection from './CellLayoutSection';
import CellLayoutCell from './CellLayoutCell';
import designable from 'yes-designer/utils/designable';
import YigoControl from '../YigoControl';
import Element from '../Element';
import { observable } from 'mobx';

const defaultValue = {
    isGroup: false,
    type: 'yigo',
    layoutType: 'cell',
    hideTitle: false,
    caption: '',
    visibleNotEmpty: '',
    visibleRelation: '',
    visibleEqual: {
        yigoid: '',
        value: null,
    },
    items:[],
    yigoControl: YigoControl.defaultValue,
    elementControl: Element.defaultValue,
}

const editor = [
    {
        type: 'Toggle',
        key: 'isGroup',
        caption: '是否组',
    }, {
        type: 'Toggle',
        key: 'hideTitle',
        caption: '无抬头',
        visibleEqual: {
            relateId: 'isGroup',
            value: true,
        }
    }, {
        type: 'Text',
        key: 'caption',
        caption: '抬头',
        visibleEqual: {
            relateId: ['isGroup', 'hideTitle'],
            value: [true, false],
        }
    }, {
        type: 'Combobox',
        key: 'type',
        items: [{
            key: 'yigo',
            text: 'YIGO控件',
        }, {
            key: 'element',
            text: '其他控件',
        }],
        caption: '元素类型',
        visibleEqual: {
            relateId: 'isGroup',
            value: false,
        }
    }, {
        type: 'SubForm',
        key: 'yigoControl',
        isGroup: true,
        visibleEqual: {
            relateId: ['type', 'isGroup'],
            value: ['yigo', false],
        },
        control: YigoControl,
    }, {
        type: 'SubForm',
        key: 'elementControl',
        isGroup: true,
        visibleEqual: {
            relateId: ['type', 'isGroup'],
            value: ['element', false],
        },
        control: Element,
    }, {
        type: 'Combobox',
        key: 'layoutType',
        items: [{
            key: 'cell',
            text: '带Label',
        }, {
            key: 'control',
            text: '不帶Label',
        }],
        caption: '布局类型',
        visibleEqual: {
            relateId: ['type', 'isGroup'],
            value: ['yigo', false],
        }
    }, {
        type: 'ControlSelect',
        key: 'visibleNotEmpty',
        caption: '字段不为空可见',
        showAll: true
    }, {
        type: 'ControlSelect',
        key: 'visibleRelation',
        caption: '可见性关联控件',
        showAll: true
    }, {
        type: 'SubForm',
        key: 'visibleEqual',
        isGroup: true,
        control: {
            editor: [
                {
                    type: 'ControlSelect',
                    key: 'yigoid',
                    showAll: true,
                    caption: '关联控件',
                }, {
                    type: 'Text',
                    key: 'value',
                    caption: '值',
                }
            ],
            defaultValue: {
                yigoid: '',
                value: null,
            }
        },
    }
];

@designable(defaultValue, editor)
@observer
export default class CellLayoutItem extends Component {
    @observable meta = this.props.meta
    render() {
        const meta = this.meta;
        if (meta.isGroup) {
            return (<CellLayoutSection meta={meta} />);
        }
        return (<CellLayoutCell meta={meta} />);
    }
}
