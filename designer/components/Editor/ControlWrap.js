import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

export default (Comp)=> {
    @inject('store')
    @observer
    class EditorControlWrap extends Component {
        static contextTypes = {
            onMetaChange: PropTypes.func,
            getValue: PropTypes.func,
            setValue: PropTypes.func,
        }
        onChange = (v) => {
            this.context.setValue(this.props.controlId, v);
            // this.props.store.selectedControl[this.props.controlId] = v;
            this.props.onChange && this.props.onChange(this.props.controlId, v);
            this.context.onMetaChange && this.context.onMetaChange();
        }
        render() {
            const { controlId, meta, onChange, value, disabled, ...otherProps } = this.props;
            // const val = this.props.store.selectedControl[controlId];
            const val = this.context.getValue(controlId);
            const pp = {};
            if(meta.linkProps) {
                meta.linkProps.forEach(({name, link})=>{
                    pp[name] = this.context.getValue(link);
                });
            }
            return (
                <Comp disabled={meta.disabled} meta={ meta } value = {val} onChange={this.onChange} {...pp} {...otherProps} />
            );
        }
    }
    return EditorControlWrap;
}
