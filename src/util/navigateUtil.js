import { History, Util } from 'yes-platform';
import eventemitter from 'eventemitter3';
import { YIUI } from 'yes-core';

const modalEventEmitter = new eventemitter();
export const openForm = (formKey, oid, status) => {
    History.push(`card/YES/${formKey}/${oid}/${status}`);
}

export const newForm = (formKey) => {
    History.push(`card/YES/${formKey}/new/NEW`);
}

export const openModal = async (formKey, oid, status, params) => {
    let realOid = oid;
    if(oid === 'new') {
        realOid = await YIUI.RemoteService.applyNewOID();
    }
    Util.showBillformInModal(formKey, realOid, status, params);
}

export const showModal = (v)=> {
    modalEventEmitter.emit('show', v);
}

export const addShowModalEventListener = (handler)=> {
    modalEventEmitter.addListener('show', modal);
}
