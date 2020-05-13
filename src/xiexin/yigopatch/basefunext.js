import { UI, View, YIUI, Svr, DataDef, cacheSystem } from 'yes-core';
import { lodash as $ } from 'yes-common';
import { AppDispatcher, BillformStore as BillFormStore, Util } from 'yes';
import { History as HashHistory } from 'yes-platform';
const BaseFunsExt = (function () {
    //严格模式
    'use strict';
    let funs = {};

    funs.ShowData = async function (name, cxt, args) {
        console.log('ShowData Starting');
        const form = cxt.form;
        if (form.isShowingERPModal) {
            return;
        }
        let mapCallback = {};
        if (args && args.length > 0) {
            if (args[0]) {
                mapCallback = splitPara(args[0]);
            }
        }

        if (form != null) {
            await form.showDocument();
            if (mapCallback.AfterShowData) {
                await form.eval(mapCallback['AfterShowData'].trim(), cxt, null);
            }
        }
        console.log('ShowData Ending');
        return true;
    };

    funs.ERPShowModal = async function (name, cxt, args) {
        const pForm = cxt.form, formKey = args[0], erpOnLoad = args[1];
        // formKey = await YIUI.BPMService.getAliasKey(1,formKey);
        // BillformStore.removeForm(formKey+'.-1');
        const form = await cacheSystem.current.FormCache.get(formKey);
        const yesForm = YIUI.FormBuilder.build(form, 'newtab', pForm.formID);
        yesForm.initViewDataMonitor();
        await YIUI.FormParasUtil.processCallParas(pForm, yesForm);

        const doc = await YIUI.DocService.newDefaultDocument(yesForm, pForm);
        const defaultOID = doc.oid;
        yesForm.setDocument(doc);
        yesForm.attachmentOID = defaultOID;
        if (erpOnLoad) {
            yesForm.isShowingERPModal = true;
            try {
                yesForm.setInitOperationState(YIUI.Form_OperationState.Default);
                yesForm.setOperationState(YIUI.Form_OperationState.Default);
                await yesForm.eval(erpOnLoad);
            } finally {
                yesForm.isShowingERPModal = false;
            }
        }

        const operationState = yesForm.getOperationState();
        let formStatus;
        switch (operationState) {
            case YIUI.Form_OperationState.New:
                formStatus = 'NEW';
                break;
            case YIUI.Form_OperationState.Edit:
                formStatus = 'EDIT'; break;
            default:
                formStatus = 'DEFAULT';
        }
        let cacheDoc = yesForm.getDocument();
        if (cacheDoc.oid <= 0) {
            cacheDoc.oid = defaultOID;
        }
        const cacheOID = cacheDoc.oid;
        const formUniqueKey = `${formKey}.${cacheOID > 0 ? cacheOID : 'new'}`;
        let data = YIUI.DataUtil.toJSONDoc(cacheDoc);
        await cacheSystem.current.FormDataCache.put(formUniqueKey, {
            key: formUniqueKey,
            data,
            time: Date.now()
        });
        BillFormStore.addForm(formUniqueKey, yesForm);
        if ('Attachment' == formKey) {
            formStatus = 'EDIT';
        }
        HashHistory.push(`card/YES/${formKey}/${cacheOID > 0 ? cacheOID : 'new'}/${formStatus}`);
        return true;
    };	
	
    funs.NewBill = async function (name, cxt, args) {
        let formKey;
        if (args && args.length > 0) {
            formKey = args[0];
        }

        let target = YIUI.FormTarget.NEWTAB;
        if (args && args.length > 1) {
            target = YIUI.FormTarget.parse(args[1]);
        }
        let tsParas;
        if (args && args.length > 2) {
            tsParas = args[2];
        }

        let form = cxt.form;

        if (tsParas) {
            tsParas = splitPara(tsParas);
            for (let key in tsParas) {
                let value = form.eval(tsParas[key], cxt);
                form.setCallPara(key, value);
            }
        }

        if (target != YIUI.FormTarget.SELF) {
            const doc = await YIUI.DocService.newRichDocument(form);
            const formUniqueKey = `${formKey}.${doc.oid}`;
            doc.key = formUniqueKey;
            //.then(function(doc) {
            form.setDocument(doc);
            //form.setOperationState(YIUI.Form_OperationState.New);//此处感觉不应该设置死
            form.setOperationState(doc.state);
            form.showDocument();
            //            def.resolve(true);
            return form;
            //});
        } else {
            let opt = new YIUI.NewOpt(form, true);
            opt.doOpt();
        }
        return true;
    };

    funs.EditBill = async function (name, cxt, args) {
        let form = cxt.form;
        if (form.operationState != YIUI.Form_OperationState.New) {
            if (form.type == YIUI.Form_Type.Entity) {
                let doc = form.getDocument();
                form.refreshParas();
                doc = YIUI.DataUtil.toJSONDoc(doc);
                let paras = {
                    service: 'ERPBusinessLock',
                    cmd: 'ERPBusinessLock',
                    metaFormKey: form.getFormKey(),
                    document: $.toJSON(doc),
                    methodName: 'AddLock'
                };
                await Svr.Request.getData(paras);
            }
            form.setOperationState(YIUI.Form_OperationState.Edit);
            let MASKCHECK = YIUI.FormUIStatusMask.ENABLE | YIUI.FormUIStatusMask.VISIBLE |
                YIUI.FormUIStatusMask.OPERATION | YIUI.FormUIStatusMask.CHECKRULE;
            form.resetUIStatus(MASKCHECK);
        }
        return true;
    };
    funs.ResetEditBill = function (name, cxt, args) {
        let form = cxt.form;
        form.setOperationState(YIUI.Form_OperationState.Default);
        let MASKCHECK = YIUI.FormUIStatusMask.ENABLE | YIUI.FormUIStatusMask.VISIBLE |
            YIUI.FormUIStatusMask.OPERATION | YIUI.FormUIStatusMask.CHECKRULE;
        form.resetUIStatus(MASKCHECK);
        return true;
    };

    funs.RemoveCache = function (name, cxt, args) {
        let form = cxt.form, dataObj = form.getDataObject(), newOID = form.document.oid;
        if ((form.type == YIUI.Form_Type.Dict || form.type == YIUI.Form_Type.ChainDict || (args && args.length > 0))
            && form.operationState != YIUI.Form_OperationState.New) {
            let itemKey = dataObj.key;
            if (args && args.length > 0) {
                if (args[0]) {
                    itemKey = args[0];
                }
            }
            YIUI.DictService.removeCache(itemKey, newOID);
            YIUI.DictCacheProxy.removeCache(itemKey, newOID);
        }
    };

    funs.RemoveDictCache = function (name, cxt, args) {
        if (!args || args.length < 2) {
            return;
        }
        let form = cxt.form, itemKey = args[0], oid = YIUI.TypeConvertor.toLong(args[1]);
        if (oid <= 0) {
            return;
        }
        YIUI.DictService.removeCache(itemKey, oid);
        YIUI.DictCacheProxy.removeCache(itemKey, oid);
    };

    return funs;
})();

for (let p in BaseFunsExt) {
    View.FuncMap.put(p, BaseFunsExt[p]);
}

export default BaseFunsExt;