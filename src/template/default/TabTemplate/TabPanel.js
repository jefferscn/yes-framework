import React, { Component } from 'react';
import { observable } from 'mobx';
import CellLayoutTemplate from './CellLayoutTemplate';
import designExport from 'yes-designer/utils/DesignExport';
import YIGOControl from 'yes-designer/components/Framework/YigoControl';
import Element from 'yes-designer/components/Framework/Element';
import CellLayoutItem from './CellLayoutItem';
import { observer } from 'mobx-react';

@observer
class TabPanel extends Component {
    @observable meta = this.props.meta
    render() {
        const { type = 'celllayout' } = this.meta;
        if (type === 'celllayout') {
            return <CellLayoutTemplate meta={this.meta} {...this.meta} />
        }
        if (type === 'yigocontrol') {
            return <YIGOControl designStyle={{flex:1}} layoutStyles={{ flex: 1 }} meta={this.meta.yigocontrol} {...this.meta.yigocontrol} />
        }
        if (type === 'control') {
            return <Element designStyle={{flex:1}} style={{ flex: 1 }} meta={this.meta.control} {...this.meta.control} />
        }
        return null;
    }
}

const defaultValue = {
    type: 'celllayout',
    celllayout: CellLayoutItem.defaultValue,
    yigocontrol: YIGOControl.defaultValue,
    control: Element.defaultValue,
}

const editor = [
    {
        type: 'Combobox',
        key: 'type',
        items: [{
            key: 'celllayout',
            text: 'celllayout',
        }, {
            key: 'yigocontrol',
            text: '单据控件',
        }, {
            key: 'control',
            text: '其他控件',
        }],
        caption: '內容类型',
    },
    // {
    //     type: 'Text',
    //     key: 'title',
    //     caption: 'Tab抬头'
    // },
    // {
    //     type: 'Text',
    //     key: 'key',
    //     caption: 'Tab标识'
    // },
];

export default designExport(TabPanel, defaultValue, editor);
