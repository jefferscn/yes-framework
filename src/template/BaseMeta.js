import { observable, action } from 'mobx';
import uuid from 'uuid';

export class Element{
    @observable type;
    @observable elementType;
    @observable elementProps = {};
    constructor(json) {
        if(json) {
            this.type = json.type;
            this.elementType = json.elementType;
            this.elementProps = json.elementProps;
        }
    }
}
export default class BaseMeta {
    id;
    @observable formTemplate;
    @observable controls = {};
    @observable foot = null;
    @observable head = null;
    constructor(json) {
        this.id = uuid.v4();
        this.foot = json.foot ? new Element(json.foot) : null;
        this.head = json.head ? new Element(json.head) : null;
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