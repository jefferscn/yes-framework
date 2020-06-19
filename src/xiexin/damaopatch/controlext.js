import { YIUI, Svr, View } from 'yes-core';
import Immutable from 'immutable';


YIUI.Control.prototype.setValue = async function (v, commit = true, fireEvent, ignoreChanged, editing, ignoreFireValueChanged) {
    let value = (v != null ? (v.value != null ? v.value : v) : null);
    const state = this.getState();
    await this.setInnerValue(value);
    if (!Immutable.is(this.getState(), state)) {
        const form = YIUI.FormStack.getForm(this.ofFormID);
        // setTimeout(async () =>
        await form.doValueChanged(this, this.getValue(), commit, fireEvent, ignoreChanged, editing, ignoreFireValueChanged);
        // , 0);
    }
}