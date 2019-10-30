import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { deepObserve } from 'mobx-utils';
import { DynamicControl } from 'yes';
import designExport from '../../utils/DesignExport';
import YIGOControlConfig from '../../components/Editor/Controls/YIGO';

@observer
class YIGOControl extends Component {
    static contextTypes = {
        createElement: PropTypes.func,
        getControl: PropTypes.func,
    }
    @observable meta = this.props.meta
    state = {
        version: 0,
    }
    onDeepChange = (change, path) => {
        console.dir(change);
        this.setState({
            version: this.state.version + 1,
        });
    }
    componentWillMount() {
        this.disposer = deepObserve(this.meta, this.onDeepChange);
    }
    componentWillUnmount() {
        this.disposer && this.disposer();
    }
    render() {
        const { meta, control, yigoid, ...otherProps } = this.props;
        if(!meta) {
            return null;
        }
        const c = this.context.getControl(meta.control);
        return (
            <DynamicControl
                designStyle={this.props.layoutStyles}
                yigoid={this.meta.yigoId}
                isCustomLayout
                control={c}
                meta={this.meta.controlProps}
                {...otherProps}
                {...this.meta.controlProps}
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
        onChange: function (value, context, runtimeContext) {
            const control = runtimeContext.getContextComponent(value);
            context.setValue('control', YIGOControlConfig.defaultControlMapping[control.tagName]);
        }
    }, {
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
        }, {
            name: 'yigoid',
            link: 'yigoId',
        }],
    }
    ];
};

export const ListControl = designExport(YIGOControl, {
    yigoId: '',
    control: '',
    controlProps: {},
}, buildYigoControlMeta('listview'));

export default designExport(YIGOControl, {
    yigoId: '',
    control: '',
    controlProps: {},
}, buildYigoControlMeta());
