import { YIUI, Svr, View, cacheSystem } from 'yes-core';
import { lodash as $ } from 'yes-common';
import './UIScopeTrees';

YIUI.DocService.loadFormData = async function (form, oid, filterMap, condParas) {
    if (!form) {
        throw new Error(YIUI.I18N.docserviceproxy.noFormDefined);
    }
    // if(oid<=0){
    //     return null;
    // }
    const formKey = form.getFormKey();
    form.refreshParas();
    const parameters = form.getParas();
    const doc = YIUI.DataUtil.toJSONDoc(form.getDocument());
    const params = {
        cmd: 'RichDocumentLoadFormDataCmd',
        service: 'RichDocument',
        metaFormKey: formKey,
        document: $.toJSON(doc)
    };
    if (parameters) {
        params.parameters = parameters.toJSON();
    }
    if (filterMap) {
        filterMap['OID'] = oid;
        params.filterMap = $.toJSON(filterMap);
    }
    if (condParas) {
        params.condition = $.toJSON(condParas);
    }

    const templateKey = form.getTemplateKey();
    if (templateKey) {
        params.templateKey = templateKey;
    }
    const parentForm=form.getParentForm();
    if (parentForm) {
        const parentFormKey = parentForm.getFormKey();
        const parentDoc = YIUI.DataUtil.toJSONDoc(parentForm.getDocument());
        params.parentFormKey = parentFormKey;
        params.parentDocument = $.toJSON(parentDoc);
        if (parentForm.getParas()) {
            params.parentParameters = parentForm.getParas().toJSON();
        }
    }
    const loadInfo = form.getSysExpVals(YIUI.BPMKeys.LOAD_WORKITEM_INFO);
    if (loadInfo !== undefined) {
        params.loadWorkItemInfo = loadInfo;
    }
    try {
        const data = await Svr.Request.getData(params);
        return data.formDirtyDatas[0].dirtyData.documentJson;
    } catch (e) {
        throw e;
    }
};

YIUI.DocService.newDocument = async function (formKey, formParas, parentForm) {
    // const formKey = form.getFormKey(), formParas = form.getParas();
    const formScopes = await View.UIScopeTrees.get(formKey);
    const scope = formScopes['.DefaultFormulaUseParentDoc.'];
    let params = {
        cmd: 'NewRichDocument',
        service: 'RichDocument',
        metaFormKey: formKey
    };
    if (formParas) {
        params.parameters = formParas.toJSON();
    }
    if (scope && scope.includeParentDocument && parentForm) {
        const parentFormKey = parentForm.getFormKey();
        const parentDoc = YIUI.DataUtil.toJSONDoc(parentForm.getDocument());
        params.parentFormKey = parentFormKey;
        params.parentDocument = $.toJSON(parentDoc);
        if (parentForm.getParas()) {
            params.parentParameters = parentForm.getParas().toJSON();
        }
    }
    const data = await Svr.Request.getData(params, undefined, false);
    const result = data;
    return result;
};

YIUI.DocService.newDefaultDocument = async function (form, parentForm) {
    const formKey = form.getFormKey(), formParas = form.getParas();
    const formScopes = await View.UIScopeTrees.get(formKey);
    const scope = formScopes['.DefaultFormulaUseParentDoc.'];
    let params = {
        cmd: 'DefaultRichDocument',
        service: 'RichDocument',
        metaFormKey: formKey
    };
    if (formParas) {
        params.parameters = formParas.toJSON();
    }
    if (scope && scope.includeParentDocument && parentForm) {
        const parentFormKey = parentForm.getFormKey();
        const parentDoc = YIUI.DataUtil.toJSONDoc(parentForm.getDocument());
        params.parentFormKey = parentFormKey;
        params.parentDocument = $.toJSON(parentDoc);
        if (parentForm.getParas()) {
            params.parentParameters = parentForm.getParas().toJSON();
        }
    }
    const data = await Svr.Request.getData(params, undefined, false);
    const result = YIUI.DataUtil.fromJSONDoc(data);
    return result;
};

YIUI.DocService.newRichDocument = async function (form, isSynchronized) {
    const formKey = form.formKey, formParas = form.getParas();
    const scope = View.UIScopeTrees.get(formKey)['.DefaultFormulaUseParentDoc.'];
    const doc = View.UIScopeTrees.getJSONDoc(form.getDocument(), scope);
    const params = {
        cmd: 'NewRichDocument',
        service: 'RichDocument',
        metaFormKey: formKey,
        document: $.toJSON(doc)
    };
    if (formParas) {
        params.parameters = formParas.toJSON();
    }

    if (scope && scope.includeParentDocument && form.getParentForm()) {
        const parentForm = form.getParentForm();
        const parentFormKey = parentForm.formKey;
        const parentDoc = YIUI.DataUtil.toJSONDoc(parentForm.getDocument());
        params.parentFormKey = parentFormKey;
        params.parentDocument = $.toJSON(parentDoc);

        if (parentForm.getParas()) {
            params.parentParameters = parentForm.getParas().toJSON();
        }
    }
    if (isSynchronized) {
        throw new Error('先试试全异步情况下，能否不用同步方法,如果看到这个错误，请联系zhufeng@bokesoft.com！');
    }
    const data = await Svr.Request.getData(params);
    const result = YIUI.DataUtil.fromJSONDoc(data);
    return result;
};