import { AppDispatcher, BillformStore } from 'yes-intf';
export { default as font } from './font';
export { default as billforms } from './config/billforms';
export { default as ProjectCfg } from './config/project';
export { default as LoginCfg } from './config/login.json';
export { default as RouteCfg } from './config/route.json';
export { default as controls } from './config/control';
export { default as util } from './util';
export { default as ModalCfg } from './config/modal.json';
import { Svr, View as YIGOView } from 'yes-core';
import path from 'path';
import { openModal } from 'yes-framework/util/navigateUtil';
const invokeService = YIGOView.FuncMap.get('InvokeService')
import { Util } from 'yes-web';

import './damaopatch';
import './patch';

AppDispatcher.register((action) => {
    switch (action.type) {
        case 'WORKFLOWCHANGE':
            setTimeout(() => {
                BillformStore.reloadFormData("ToDoListTotal.-1");
            }, 0)
    }
});

function base64ToFile(base64, mimeType = 'application/pdf') {
    let bytes = window.atob(base64);
    let arrayBuffer = new ArrayBuffer(bytes.length);
    let intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < bytes.length; i++) {
        intArray[i] = bytes.charCodeAt(i)
    }
    let blob = new Blob([intArray], { type: mimeType });
    // let files = new window.File([blob], fileName, { type: mimeType })
    return blob;
}

async function uploadAttachment(file, fileName) {
    const options = {
        service: 'UploadAttachment',
        formKey: "FSSC_InvoiceEntry",
        fileID: -1,
        poid: -1,
        quickSave: true,
        oid: -1,
        tableKey: 'EFSSC_AttachMentHead',
        provider: '',
        path: '',
        seriesPath: '',
        mode: 2
    }
    const result = await Svr.Request.upload(file, options, fileName);
    return result.Path;
}
export const OpenwithHandler = async (item) => {
    console.log(item);
    const fileName = path.basename(item.path);
    const file = base64ToFile(item.base64);
    const p = await uploadAttachment(file, fileName);
    const data = await invokeService('', {}, ['ServiceAPPInvoiceSave', false, false, p, "FSSC_InvoiceEntry"]);
    const result = JSON.parse(data);
    console.log(result);
    if (result.success==='false') {
        Util.alert('导入Pdf失败', result.errorMsg);
        return;
    }
    var invoice = result.data[0];
    if (invoice) {
        var json = JSON.parse(invoice);
        openModal(json.formkey, json.oid, 'DEFAULT', {}, 'View');
    }
}