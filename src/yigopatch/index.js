import { YIUI, Svr } from 'yes-core';
import { lodash as $ } from 'yes-common';

YIUI.DocService.loadFormData = async function (form, oid, filterMap, condParas) {
    if (!form) {
        throw new Error(YIUI.I18N.docserviceproxy.noFormDefined);
    }

    form.refreshParas();
    const parameters = form.getParas();
    const params = {
        cmd: "RichDocumentLoadFormDataCmd",
        service: "RichDocument",
        metaFormKey: form.getFormKey()
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

    const loadInfo = form.getSysExpVals(YIUI.BPMKeys.LOAD_WORKITEM_INFO);
    if (loadInfo !== undefined) {
        params.loadWorkItemInfo = loadInfo;
    }
    const data = await Svr.Request.getData(params, null, false);
    return data.formDirtyDatas[0].dirtyData.documentJson;
};
