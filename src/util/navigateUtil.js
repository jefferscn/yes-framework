import { History, Util } from 'yes-platform';
import eventemitter from 'eventemitter3';

const modalEventEmitter = new eventemitter();
export const openForm = (formKey, oid, status) => {
    History.push(`card/YES/${formKey}/${oid}/${status}`);
}

export const newForm = (formKey) => {
    History.push(`card/YES/${formKey}/new/NEW`);
}

export const openModal = (formKey, oid, status) => {
    Util.showBillformInModal(formKey, oid, status);
}

export const showModal = (v)=> {
    modalEventEmitter.emit('show', v);
}

export const addShowModalEventListener = (handler)=> {
    modalEventEmitter.addListener('show', modal);
}
