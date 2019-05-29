import { observable, runInAction, action, computed } from 'mobx';

export default class DesignerStore {
    @observable selectedControl = null;
    @observable meta = null;
    props= null;
    defaultValue = null;
    @action
    selectControl(control, props, meta, defaultValue) {
        this.selectedControl = control;
        this.meta = meta;
        this.props= props;
        this.defaultValue = defaultValue;
    }
}
