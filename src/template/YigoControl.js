import React, { Component } from 'react';
import PropTypes from 'prop-types';
import designable from '../../designer/utils/designable';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { DynamicControl } from 'yes';

@observer
class YIGOControl extends Component {
    static contextTypes = {
        createElement: PropTypes.func,
        getControl: PropTypes.func,
    }
    @observable meta = this.props.meta
    render() {
        const { meta, control, yigoid, ...otherProps } = this.props;
        const c = this.context.getControl(meta.control);
        return (
            <DynamicControl
                yigoid={this.meta.yigoId}
                isCustomLayout
                control={c}
                meta = {this.meta.controlProps}
                {...this.meta.controlProps}
                {...otherProps}
            />
        )
    }
}

export function buildYigoControlMeta(filter) {
    return [{
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
                    name: 'yigoId',
                    link: 'yigoId',
                }],
            },
            {
                type: 'SubForm',
                key: 'controlProps',
                isGroup: true,
                linkProps: [{
                    name: 'control',
                    link: 'control',
                },{
                    name: 'yigoid',
                    link: 'yigoId',
                }],
            }
        ];
};

export const ListControl = designable({
    yigoId: '',
    control: '',
    controlProps: {},
}, buildYigoControlMeta('listview'))(YIGOControl);

export default designable({} ,buildYigoControlMeta())(YIGOControl);
