import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

export default (Comp)=> {
    @inject('store')
    @observer
    class EditorControlWrap extends Component {
        onChange = (v) => {
            this.props.store.selectedControl[this.props.controlId] = v;
        }
        render() {
            const { controlId, meta } = this.props;
            const val = this.props.store.selectedControl[controlId];
            return (
                <Comp disabled={meta.disabled} meta={ meta } value = {val} onChange={this.onChange} />
            );
        }
    }
    return EditorControlWrap;
}
