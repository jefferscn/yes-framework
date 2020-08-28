import { UI, View, YIUI, Svr, DataDef, cacheSystem } from 'yes-core';
import { lodash as $ } from 'yes-common';
import { AppDispatcher, BillformStore as BillFormStore, Util } from 'yes';
import { History as HashHistory } from 'yes-platform';
import { HashMap } from 'yes-yiui-common';
import Decimal from 'decimal.js';
// import PluginUtils from './pluginutils';
import Base64 from 'base-64';
import { Toast } from 'antd-mobile';
// import NFCUtil from '../controls/NFCUtil';

const NFCUtil = {};
const BaseFunsExt = (function () {
    //严格模式
    'use strict';
    let funs = {};

    const splitPara = function (para) {
        if (!para) {
            return null;
        }
        para = YIUI.TypeConvertor.toString(para);
        let mapCallback = {}, len = para.length,
            key = '', deep = 0, start = 0;
        for (let i = 0; i < len; i++) {
            let c = para.charAt(i);
            if (c == ':' && deep === 0) {
                key = para.substring(start, i).trim();
            } else if (c == ',' && deep === 0) {
                start = ++i;
            } else if (c == '{') {
                if (deep === 0) {
                    start = ++i;
                }
                deep++;
            } else if (c == '}') {
                deep--;
                if (deep == 0) {
                    mapCallback[key] = para.substring(start, i);
                }
            }
        }

        return mapCallback;
    };

    funs.ToInt = function (name, cxt, args) {
        var v = args[0];
        var r = YIUI.TypeConvertor.toInt(v == null ? 0 : v);
        return r;
    };

    funs.ReadOnly = function (name, cxt, args) {
        var form = cxt.form;
        var operationState = -1;
        if (form != null) {
            operationState = form.getOperationState();
        }
        return operationState == YIUI.Form_OperationState.Default;
    };

    funs.ChangePWD = async function (name, cxt, args) {
        const operatorID = YIUI.TypeConvertor.toLong(args[0]);
        const password = YIUI.TypeConvertor.toString(args[1]);
        const newPassword = YIUI.TypeConvertor.toString(args[2]);

        const publicKey = await Svr.SvrMgr.getPublicKey({ async: false });

        let encryptPassword = Util.encrypt(publicKey.modulus, publicKey.exponent, password);
        encryptPassword = Base64.encode(encryptPassword);

        let encryptNewPassword = Util.encrypt(publicKey.modulus, publicKey.exponent, newPassword);
        encryptNewPassword = Base64.encode(encryptNewPassword);

        var paras = {
            service: 'SessionRights',
            cmd: 'ChangePWD',
            operatorID: operatorID,
            password: encryptPassword,
            newPassword: encryptNewPassword
        };
        const result = await Svr.Request.getData(paras);
        return result;
    };

    funs.New = async function (name, cxt, args) {
        const formKey = args[0];
        let mode = 'form';
        if (args.length > 1) {
            mode = args[1];
        }
        const pForm = cxt.form;
        if (formKey === 'OA_ShowWeb') {//预览文件
            const paras = splitPara(args[2]);
            // const form = cxt.form;
            const url = await pForm.eval(paras['URL'], cxt);
            // const fullUrl = `${Svr.SvrMgr.ServletURL}/../${url}`;
            AppDispatcher.dispatch({
                type: 'preview',
                url
            });
            return;
        }
        let tsParas = args[2];
        if (tsParas) {
            tsParas = splitPara(tsParas);
            for (const key in tsParas) {
                const value = await pForm.eval(tsParas[key], cxt);
                pForm.setCallPara(key, value);
            }
        }

        const form = await cacheSystem.current.FormCache.get(formKey);
        const yesForm = YIUI.FormBuilder.build(form, 'newtab', pForm.formID);
        yesForm.initViewDataMonitor();
        await YIUI.FormParasUtil.processCallParas(pForm, yesForm);

        const doc = await YIUI.DocService.newDefaultDocument(yesForm, pForm);
        const defaultOID = doc.oid;
        yesForm.setDocument(doc);
        yesForm.attachmentOID = defaultOID;

        let cacheDoc = yesForm.getDocument();
        if (cacheDoc.oid <= 0) {
            cacheDoc.oid = defaultOID;
        }
        const cacheOID = cacheDoc.oid;
        const formUniqueKey = `${formKey}.${cacheOID > 0 ? cacheOID : 'new'}`;
        let data = YIUI.DataUtil.toJSONDoc(cacheDoc);
        // await cacheSystem.current.FormDataCache.put(formUniqueKey, {
        //     key: formUniqueKey,
        //     doc,
        //     time: Date.now()
        // });
        BillFormStore.addForm(formUniqueKey, yesForm);
        if (mode === 'modal') {
            Util.showBillformInModal(formKey, data.oid, "NEW");
            return;
        }
        HashHistory.push(`card/YES/${formKey}/${data.oid}/NEW`);
    };

    const downLoadFile = async (filename, options = {}) => {
        const url = Svr.SvrMgr.AttachURL;
        let data = new FormData();
        for (let key in options) {
            data.append(key, options[key]);
        }
        const request = {
            method: 'post',
            credentials: 'include',
            body: data
        };
        const response = await fetch(url, request);
        let blob = await response.blob();
        blob.name = blob.name || filename;

        AppDispatcher.dispatch({
            type: 'attachmentPreview',
            file: blob
        });
        return blob;
    };

    funs.GPSLocate = async function (name, cxt, args) {
        let showAddress = false;
        if (args && args.length > 0) {
            showAddress = YIUI.TypeConvertor.toBoolean(args[0]);
        }
        // const locate = await PluginUtils.gpsLocate(showAddress);
        // console.log(locate);
        // return locate;
        return null;
    };

    funs.DeleteAttachment = function (name, cxt, args) {
        var form = cxt.form;

        var fileOID = YIUI.TypeConvertor.toLong(args[0]);

        var tableKey = YIUI.TypeConvertor.toString(args[1]);

        // 如果给定路径,使用给定路径,否则从数据表中取得
        var path = '';
        if (args.length > 2) {
            path = YIUI.TypeConvertor.toString(args[2]);
        }

        var provider = '';
        if (args.length > 3) {
            provider = YIUI.TypeConvertor.toString(args[3]);
        }

        var grid = form.getGrid(tableKey),
            rowIndex = -1;

        if (grid) {
            rowIndex = cxt.rowIndex;
            if (rowIndex == -1 && cxt.getLoc) {
                rowIndex = cxt.getLoc(grid.key).getRow();
            }
        }

        var doc = form.getDocument(),
            tbl = doc.getByKey(tableKey);

        if (!path) {
            if (tbl.tableMode == YIUI.TableMode.DETAIL) {
                var row = grid.getRowDataAt(rowIndex);
                if (!row.bkmkRow)
                    return;
                tbl.setByBkmk(grid.getRowBookmark(rowIndex));
            } else {
                tbl.first();
            }
            path = tbl.getByKey(YIUI.Attachment_Data.PATH);
        }

        if (!path) {
            return;
        }

        var paras = {
            fileID: fileOID,
            formKey: form.formKey,
            tableKey: tableKey,
            provider: provider,
            path: path,
            service: 'DeleteAttachment'
        };

        Svr.SvrMgr.deleteAttachment(paras);

        if (!grid) {

            var keys = [YIUI.Attachment_Data.NAME,
            YIUI.Attachment_Data.PATH,
            YIUI.Attachment_Data.UPLOAD_TIME,
            YIUI.Attachment_Data.UPLOAD_OPERATOR];

            for (var i = 0, size = keys.length; i < size; i++) {
                var com = form.getCompByDataBinding(tableKey, keys[i]);
                if (com) {
                    com.setValue(null, true, true);
                }
            }
        } else {
            grid.deleteGridRow(rowIndex, true);
        }

        return true;
    };
    funs.IsERPForm = function (name, cxt, args) {
        var form = cxt.form;
        return form.isERPForm;
    }
    funs.DownloadAttachment = async function (name, cxt, args) {
        const form = cxt.form;

        const tableKey = YIUI.TypeConvertor.toString(args[1]);

        let path = '';
        if (args.length > 2) {
            path = YIUI.TypeConvertor.toString(args[2]);
        }

        let provider = '';
        if (args.length > 3) {
            provider = YIUI.TypeConvertor.toString(args[3]);
        }

        const grid = form.getGrid(tableKey);
        let rowIndex = -1;
        if (grid) {
            rowIndex = cxt.rowIndex;
            if (rowIndex == -1 && cxt.getLoc) {
                rowIndex = cxt.getLoc(grid.key).getRow();
            }
        }

        // 如果给定路径,使用给定路径,否则从数据表中取得
        if (!path) {
            var doc = form.getDocument(),
                tbl = doc.getByKey(tableKey);
            if (tbl.tableMode == YIUI.TableMode.DETAIL) {
                var row = grid.getRowDataAt(rowIndex);
                if (YIUI.GridUtil.isEmptyRow(row))
                    return;
                tbl.setByBkmk(grid.getRowBookmark(rowIndex));
            } else {
                tbl.first();
            }
            path = tbl.getByKey(YIUI.Attachment_Data.PATH);
        }

        if (!path)
            return;
        const filename = path.split('/').pop();
        const options = {
            formKey: form.formKey,
            tableKey: tableKey,
            provider: provider,
            path: encodeURIComponent(path),// 不是完整的URI,使用encodeURIComponent,可能含有保留字符"+"等
            mode: 2,
            service: 'DownloadAttachment'
        };
        await downLoadFile(filename, options);
        return true;
    };

    funs.KickOffOperator = async function (name, cxt, args) {
        let mode = -1;
        if (args.length > 0) {
            mode = YIUI.TypeConvertor.toInt(args[0]);
        }
        const clientID = YIUI.TypeConvertor.toString(args[1]);
        const params = {
            service: 'SessionRights',
            cmd: 'KickOffOperator',
            loginMode: mode,
            client: clientID
        };
        await Svr.Request.getData(params);
    };

    funs.RemovePara = function (name, cxt, args) {
        const key = args[0];
        UI.BaseFuns.SetPara('SetPara', cxt, [key, null]);
        return null;
    };

    funs.SetPara = function (name, cxt, args) {
        UI.BaseFuns.SetPara('SetPara', cxt, args);
        return args[1];
    };

    funs.ShowDataCallBack = function (name, cxt, args) {
        return BaseFunsExt.ShowData('ShowData', cxt, args);
    };

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

    funs.Cancel = async function (name, cxt, args) {
        //业务锁解锁
        const form = cxt.form;
        await form.unLock();
        // 界面退出
        const formKey = cxt.form.formKey,
            OID = cxt.form.OID;
        const params = { formKey: formKey, oid: OID, cmd: 'PureOpenForm', async: true };
        if (cxt.form.getOperationState() == YIUI.Form_OperationState.New) {
            HashHistory.goBack();
        } else if (cxt.form.getOperationState() == YIUI.Form_OperationState.Edit) {
            HashHistory.goBack();
        }
    };

    funs.OpenDicByID = function (name, cxt, args) {
        let form = cxt.form, OID = args[0];
        let filterMap = form.getFilterMap();
        filterMap.setOID(OID);
        form.setOptQueue(new YIUI.OptQueue(new YIUI.LoadOpt(form)));
        form.doOptQueue();
    };

    funs.OpenDict = function (name, cxt, args) {
        let pForm = cxt.form;
        let formKey = args[0],
            OID = YIUI.TypeConvertor.toString(args[1]);
        //参数3保留

        let tsParas;
        if (args.length > 3) {
            tsParas = args[3];
        }

        if (tsParas) {
            tsParas = splitPara(tsParas);
            for (let key in tsParas) {
                let value = pForm.eval(tsParas[key], cxt);
                pForm.setCallPara(key, value);
            }
        }
        //将DictEdit界面的变量传到Container界面中
        let items = pForm.getParas().getMap();
        for (let key in items) {
            let value = pForm.getParas().get(key);
            pForm.setCallPara(key, value);
        }

        let container = pForm.getDefContainer();
        if (container == null) {
            container = pForm.getContainer();
        }


        let builder = new YIUI.YIUIBuilder(formKey);
        builder.setContainer(container);
        builder.setParentForm(pForm);
        builder.setOperationState(YIUI.Form_OperationState.Default);

        builder.newEmpty().then(function (emptyForm) {

            if (OID > 0) {
                let filterMap = emptyForm.getFilterMap();
                filterMap.setOID(OID);
                emptyForm.setOptQueue(new YIUI.OptQueue(new YIUI.LoadOpt(emptyForm)));
            }

            YIUI.FormParasUtil.processCallParas(pForm, emptyForm);
            emptyForm.regEvent(YIUI.FormEvent.ShowDocument, function () {
                //pForm.setInitOperationState(YIUI.Form_OperationState.Default);
                //pForm.setOperationState(YIUI.Form_OperationState.Default);
                pForm.resetUIStatus(YIUI.FormUIStatusMask.OPERATION | YIUI.FormUIStatusMask.ENABLE);
            });

            return builder.builder(emptyForm);
        });
    };

    funs.NewDict = function (name, cxt, args) {
        let formKey = args[0];
        let pForm = cxt.form;
        //参数2保留
        let tsParas;
        if (args.length > 2) {
            tsParas = args[2];
        }

        if (tsParas) {
            tsParas = splitPara(tsParas);
            for (let key in tsParas) {
                let value = pForm.eval(tsParas[key], cxt);
                pForm.setCallPara(key, value);
            }
        }
        //将DictEdit界面的变量传到Container界面中
        let items = pForm.getParas().getMap();
        for (let key in items) {
            let value = pForm.getParas().get(key);
            pForm.setCallPara(key, value);
        }

        let container = pForm.getDefContainer();
        if (container == null) {
            container = pForm.getContainer();
        }
        // let dicForm = container.form;
        // if(dicForm){
        //  let items = pForm.getParas().getMap();
        //  for(let m in items) {
        //      let v = items[m];
        //      dicForm.setPara(m, v);
        //  }
        // }

        let builder = new YIUI.YIUIBuilder(formKey);
        builder.setContainer(container);
        builder.setParentForm(pForm);

        builder.newEmpty().then(function (emptyForm) {
            // paras里的参数值一般是由配置中setPara()来设置
            //dicForm && (emptyForm.paras = dicForm.paras);
            YIUI.FormParasUtil.processCallParas(pForm, emptyForm);
            emptyForm.setOptQueue(new YIUI.OptQueue(new YIUI.NewOpt(emptyForm)));
            // if(pForm){
            // pForm.setOperationState(YIUI.Form_OperationState.Default);
            // }
            emptyForm.regEvent(YIUI.FormEvent.ShowDocument, function () {
                pForm.setInitOperationState(YIUI.Form_OperationState.New);
                pForm.setOperationState(YIUI.Form_OperationState.New);
                pForm.resetUIStatus(YIUI.FormUIStatusMask.OPERATION | YIUI.FormUIStatusMask.ENABLE);
            });

            return builder.builder(emptyForm);
        });
    };

    let afterDoMap = function (srcForm, newForm, json, mapWorkitemInfo, postFormula) {
        let document = YIUI.DataUtil.fromJSONDoc(json.doc);
        if (mapWorkitemInfo) {
            if (srcForm) {
                let info = srcForm.getSysExpVals(YIUI.BPMConstants.WORKITEM_INFO);
                if (info != null) {
                    document.putExpData(YIUI.BPMKeys.SaveBPMMap_KEY, info.WorkitemID);
                    document.expDataType[YIUI.BPMKeys.SaveBPMMap_KEY] = YIUI.ExpandDataType.LONG;
                }
            }
        }
    };

    let doERPMap = async function (cxt, params) {
        let form = cxt.form,
            formDoc = form.getDocument(),
            srcFormKey = form.formKey,
            bkmks = [],
            parentFormKey = '',
            parentDocument = null,
            parentParameters = null,
            tableKey = '',
            bookmarks = new HashMap();
        let doc = YIUI.DataUtil.toJSONDoc(formDoc, true);
        params.metaFormKey = srcFormKey;
        // params.formID = form.formID;
        params.document = $.toJSON(doc);
        for (let i = 0; i < formDoc.tbls.length; i++) {
            let table = formDoc.tbls[i];
            if (table.size() == 0 || table.getPos() == -1) {
                continue;
            }
            bookmarks.put(table.key, table.getBkmk());
        }
        if (bookmarks.size > 0) {
            bkmks = $.toJSON(bookmarks);
            params.bkmks = bkmks;
        }
        if (form.getParas()) {
            params.parameters = form.getParas().toJSON();
        }
        let condParas = form.getCondParas();
        if (condParas)
            params.condition = $.toJSON(condParas);
        if (form.getParentForm()) {
            let parentForm = form.getParentForm();
            parentFormKey = parentForm.formKey;
            let parentDoc = parentForm.getDocument();
            parentDocument = YIUI.DataUtil.toJSONDoc(parentDoc, true);
            parentDocument = $.toJSON(parentDocument);
            params.parentFormKey = parentFormKey;
            params.parentDocument = parentDocument;
            if (parentForm.getParas()) {
                parentParameters = parentForm.getParas().toJSON();
                params.parentParameters = parentParameters;
            }
        }
        form.setWFMapping(true);
        params.service = 'ERPMap';
        const json = await Svr.Request.getData(params);
        form.setWFMapping(false);
        if (json) {
            if (form.formKey == json.formKey) {
                let document = YIUI.DataUtil.fromJSONDoc(json.doc);
                form.setDocument(document);
                afterDoMap(null, form, json, false, null);
                await form.showDocument(true);
            } else {
                //新窗口
                await View.UIScopeTrees.newFormShow(form, json);
            }
        }
    };

    funs.Map = async function (name, cxt, args) {
        let mapKey = args[0],
            tgtFormKey = '';
        if (args.length > 1) {
            tgtFormKey = args[1];
        }
        let params = {
            cmd: 'ERPMap',
            mapKey: mapKey,
            tgtFormKey: tgtFormKey
        };
        await doERPMap(cxt, params);
        return true;
    };

    funs.WFMap = async function (name, cxt, args) {
        let mapKey = args[0],
            formula = '',
            tgtViewTableKey = '';
        if (args.length > 4) {
            formula = args[4];
        }
        if (args.length > 5) {
            tgtViewTableKey = args[5];
        }
        let params = {
            cmd: 'ERPWFMap',
            mapKey: mapKey,
            formula: formula,
            tgtFormKey: tgtViewTableKey
        };
        await doERPMap(cxt, params);
        return true;
    };

    funs.WFMapBill = async function (name, cxt, args) {
        let mapKey = YIUI.TypeConvertor.toString(args[0]),
            primaryFilter = '',
            sFilterEx = '',
            isOneBill = true,
            formula = '',
            tgtFormKey = '',
            exp = '',
            sBillFilter = '';
        if (args.length > 1 && (args[1] > 0 || args[1].length > 0)) {
            sBillFilter = args[1];
        }
        if (args.length > 2) {
            primaryFilter = args[2];
        }
        if (args.length > 3) {
            sFilterEx = args[3];
        }
        if (args.length > 4) {
            isOneBill = YIUI.TypeConvertor.toBoolean(args[4]);
        }
        if (args.length > 5) {
            formula = args[5];
        }
        if (args.length > 6) {
            tgtFormKey = args[6];
        }
        if (args.length > 7) {
            exp = args[7];
        }

        let params = {
            cmd: 'ERPWFMapBill',
            mapKey: mapKey,
            sBillFilter: sBillFilter,
            primaryFilter: primaryFilter,
            sFilterEx: sFilterEx,
            isOneBill: isOneBill,
            formula: formula,
            tgtFormKey: tgtFormKey,
            exp: exp
        };
        await doERPMap(cxt, params);
        return true;
    };

    funs.WFMapRst = async function (name, cxt, args) {
        let mapKey = YIUI.TypeConvertor.toString(args[0]);
        let custFilter = '';
        if (args.length > 1) {
            custFilter = YIUI.TypeConvertor.toString(args[1]);
        }
        let params = {
            cmd: 'WFMapRst',
            mapKey: mapKey,
            Filter: custFilter
        };
        await doERPMap(cxt, params);
        return true;
    };

    funs.GetBlurFilter = function (name, cxt, args) {
        let filter = args[0];
        let sBlurFilter = new Array();
        sBlurFilter = filter.split(' ');
        let sSQL = '';
        let sConnectSQL = '';
        const dbtype = BaseFunsExt.GetDBType(name, cxt, args);
        if (dbtype == 'MySql') {
            sConnectSQL = 'UPPER(CONCAT_WS(\'@#\',s0,s1))';
        }
        else if (dbtype == 'Oracle' || dbtype == 'DB2') {
            sConnectSQL = 'UPPER(s0||@#||s1)';
        }
        else if (dbtype == 'SQLServer' || dbtype == 'Sybase') {
            sConnectSQL = 'UPPER(s0+@#+s1)';
        }
        for (let i = 0; i < sBlurFilter.length; i++) {
            if (sBlurFilter[i] != '') {
                let sBlurFilter0 = sBlurFilter[0];
                let sBlurFilteri = sBlurFilter[i];
                if (i < 1) {
                    sSQL += ' where oid>0 and ' + sConnectSQL + ' like \'%' + sBlurFilter0 + '%\' ';
                }
                sSQL += ' or ' + sConnectSQL + ' like \'%' + sBlurFilteri + '%\' ';
            }
        }

        return sSQL;
    };

    // funs.Open = async function (name, cxt, args) {
    //     const pForm = cxt.form, formKey = args[0], OID = args[1] || -1;
    //     let mobileFormKey = await YIUI.BPMService.getAliasKey(1, formKey);
    //     if (formKey == mobileFormKey) {
    //         HashHistory.push(`card/YES/${formKey}/${OID}/DEFAULT`);
    //         return;
    //     }
    //     const form = await cacheSystem.current.FormCache.get(formKey);
    //     const yesForm = YIUI.FormBuilder.build(form, 'newtab', pForm.formID);
    //     yesForm.initViewDataMonitor();
    //     const formUniqueKey = `${formKey}.${OID}`;
    //     yesForm.setOID(OID);
    //     BillFormStore.addForm(formUniqueKey, yesForm);
    //     HashHistory.push(`card/YESMOBILE/${formKey}/${OID}/DEFAULT`);
    // };
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
        //yesForm.setUniqueId(formUniqueKey);
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
        // const newFormKey = formKey + '.new';
        // const billForm = await BillformStore.createDummyForm(newFormKey, true);
        // billForm.form.pFormID = pForm.formID;
        // const ff = billForm.form;
        // await YIUI.FormParasUtil.processCallParas(pForm, ff);
        // if (erpOnLoad) {
        //     await billForm.form.eval(erpOnLoad);
        // }
        // data = await YIUI.DocService.loadFormData(billForm, billForm.getOID(), ff.getFilterMap(), ff.getCondParas());
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


    funs.RunOpt = funs.RunUIOpt = function (name, cxt, args) {
        let form = cxt.form;
        let optKey = args[0];
        //toolbar
        let optInfo = form.getOptMap()[optKey];
        if (optInfo) {
            let action = optInfo.opt.action;
            action && form.eval(action, cxt, null);
        }
        return true;
    };

    funs.ERPInvokeService = async function (name, cxt, args) {
        let form = cxt.form;
        let formula = YIUI.TypeConvertor.toString(args[0]);
        let doc = form.getDocument();
        form.refreshParas();
        let parameters = form.getParas();
        doc = YIUI.DataUtil.toJSONDoc(doc);
        let paras = {
            service: 'RichDocument',
            cmd: 'RichDocumentInvokeService',
            metaFormKey: form.formKey,
            document: $.toJSON(doc),
            //oids: $.toJSON([{tableKeys: tableKey, oids: oid}]),
            formula: formula
        };
        if (parameters) {
            paras.parameters = parameters.toJSON();
        }
        const dirtyData = Svr.Request.getData(paras);
        //YIUI.UICalcProcess.processRichDocumentResult(dirtyData);
        await View.UIScopeTrees.processRichDocumentResult(form, dirtyData);
        //          return  dirtyData;
    };

    // 取值，表头和表格单元格都能取值，数据行使用cxt.get，一旦跨表格，应该就错了
    funs.GetValue = function (name, cxt, args) {
        let form = cxt.form;
        let controlKey = args[0];
        return YIUI.ExprUtil.getImplValue(form, controlKey, cxt);
    };

    // 赋值，表头和表格单元格都能赋值，数据行使用cxt.rowIndex，一旦跨表格，应该就错了
    funs.SetValue = async function (name, cxt, args) {
        let form = cxt.form;
        let controlKey = args[0], value = args[1];

        let fireEvent = false;
        if (args.length > 2) {
            if (args[2] === true || args[2] === 'true') fireEvent = true;
        }

        let cmp = form.getComponent(controlKey);
        if (cmp) {
            form.setComponentValue(controlKey, value, fireEvent);
        } else {
            let loc = form.getCellLocation(controlKey);
            if (!loc) {
                YIUI.ViewException.throwException(YIUI.ViewException.COMPONENT_NOT_EXISTS, controlKey);
            }
            let rowIndex = loc.row;
            //这里先暂时这样处理一下，后续可以考虑在cxt中处理多个表格key 和 表格rowIndex的关系
            if (rowIndex == -1 && cxt.getLoc && cxt.getLoc(loc.key) !== undefined) {
                rowIndex = cxt.getLoc(loc.key).getRow();
            }
            if (rowIndex == -1) {
                rowIndex = cxt.rowIndex;
            }
            if (rowIndex == -1) {
                let cellLocation = form.getCellLocation(controlKey);
                let gridKey = cellLocation.key;
                let grid = form.getComponent(gridKey);
                rowIndex = grid.getFocusRowIndex();
            }
            form.setCellValByIndex(loc.key, rowIndex, loc.column, value, fireEvent);
        }

        if (!fireEvent) {
            await form.getUIProcess().calcProcess.evalExprItemDefaultFormulaValue(controlKey);
        }
    };

    // 关闭字典树首先载入，等到右边的字典界面载入后再加载
    funs.CloseBeforeExpandLoadData = function (name, cxt, args) {
        let dictView = cxt.form.getComponent('DictView');
        dictView.option.beforeExpand = function (node) {
            let def = $.Deferred();

            let id = $(node).attr('id');
            if (!dictView.loadedNodes[id]) {
                let form = cxt.form;
                let formula;
                if (args.length >= 1) {
                    formula = args[0];
                }
                let oidValue = dictView.getNodeValue(node)['oid'];
                let paraArgs = [];
                paraArgs[0] = 'OID';
                paraArgs[1] = oidValue;
                UI.BaseFuns.SetPara('', cxt, paraArgs);
                let nodes = form.eval(formula, cxt);
                let pId = $(node).attr('id') || 0;
                nodes = dictView.convertData(nodes, pId);
                dictView.addNodes(nodes);

                dictView.loadedNodes[$(node).attr('id')] = true;
                if (!$(node).is(':hidden') && !$(node).hasClass('root') && !dictView.isMultiExpand) {
                    $(node).click();
                    if (dictView._selectItem) {
                        let id = dictView._selectItem.itemKey + '_' + dictView._selectItem.oid;
                        if (id == node.attr('id')) {
                            dictView._selectItem.isExpandNode = true;
                        }
                    }
                }
            }
            def.resolve(true);
            return def.promise();
        };
    };

    //    // 界面刷新字典树
    //    funs.ReloadDictView = function (name, cxt, args) {
    //      let form = cxt.form, dictView = form.getComponent('DictView'), itemKey = dictView.itemKey;
    //      let comp = form.getComponent('Container'), dictForm = comp.getActivePane(), paras = dictForm.getParas();
    //      YIUI.DictService.getOrgDictChildren(itemKey, {itemKey : itemKey, oid : 0}, this.dictFilter, paras)
    //          .then(function(nodes) {
    //              let id = itemKey + '_0';
    //              dictView._$table.removeChildren(id);
    //              delete dictView.loadedNodes[id];
    //
    //              nodes = dictView.convertData(nodes, id);
    //              dictView.addNodes(nodes);
    //          });
    //    };

    funs.noop = function (name, cxt, args) { };
    funs.SetParentPara = funs.noop;
    funs.ERPDealCondition = function (name, cxt, args) {
        let parentForm = cxt.form.getParentForm();
        let newCxt = new View.Context(parentForm);
        return UI.BaseFuns.DealCondition(name, newCxt, [true]);
    };
    funs.UIClose = View.FuncMap.get('Close');

    funs.UICloseDoNothing = async function (name, cxt, args) {
        const form = cxt.form;
        await form.unLock();
        form.close();
    };

    funs.DateLong = function () {
        let date = new Date();
        let result = date.Format('yyyyMMdd');
        return result;
    };

    funs.FirstDayOfMonth = function (name, cxt, args) {
        let date;
        if (args.length == 0 || args[0] == null || args[0] == undefined || args[0].toString().length == 0) {
            date = new Date();
        } else {
            date = new Date(args[0].toString());
        }
        date.setDate(1);
        let result = date.Format('yyyyMMdd');
        return result;
    };

    funs.LastDayOfMonth = function (name, cxt, args) {
        let date;
        if (args.length == 0 || args[0] == null || args[0] == undefined || args[0].toString().length == 0) {
            date = new Date();
        } else {
            date = new Date(args[0].toString());
        }
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        let result = date.Format('yyyyMMdd');
        return result;
    };

    //TODO: 这个函数以前是处理界面喜好的
    funs.PropertySet = function (name, cxt, args) {

    };
    funs.PropertyValue = function (name, cxt, args) {
        return args[1];
    };

    funs.Join = function (name, cxt, args) {
        let connector = args[0], result = '';
        for (let i = 1, len = args.length; i < len; i++) {
            if (args[i]) {
                if (result.length > 0) result = result + connector;
                result = result + args[i];
            }
        }
        return result;
    };
    funs.GetFilterByMultiDicValue = async function (name, cxt, args) {
        let form = cxt.form, fieldKey = args[0],
            value = YIUI.ExprUtil.getImplValue(form, fieldKey, cxt);
        if (value == '') {
            // 0 == ""成立
            return '';
        }
        let com = form.getComponent(fieldKey);
        if (com.type == YIUI.CONTROLTYPE.DICT && com.multiSelect == true) {
            let doc = form.getDocument();
            doc = YIUI.DataUtil.toJSONDoc(doc);
            let paras = {
                service: 'RichDocument',
                cmd: 'GetDictMultiFilter',
                metaFormKey: form.getFormKey(),
                document: $.toJSON(doc),
                itemKey: com.itemKey,
                soids: value
            };
            await Svr.Request.getData(paras);
        }

        return value;
    };
    funs.GetMultItemFldFilter = async function (name, cxt, args) {
        let form = cxt.form, fieldKey = args[0],
            value = YIUI.ExprUtil.getImplValue(form, fieldKey, cxt);
        if (value == '') {
            return value;
        }
        let com = form.getComponent(fieldKey);
        if (com.type == YIUI.CONTROLTYPE.DICT && com.multiSelect == true) {
            let doc = form.getDocument();
            doc = YIUI.DataUtil.toJSONDoc(doc);
            let paras = {
                service: 'RichDocument',
                cmd: 'GetDictMultiFilter',
                metaFormKey: form.getFormKey(),
                document: $.toJSON(doc),
                itemKey: com.itemKey,
                soids: value
            };
            value = await Svr.Request.getData(paras);
        }

        return value;
    };

    funs.CheckItemHasFilter = function (name, cxt, args) {
        let value = args[0];
        let newValue = YIUI.TypeConvertor.toSafeDataType(YIUI.DataType.STRING, value);
        if (newValue == null || newValue.length == 0 || newValue == '0' || newValue == '-1') {
            return false;
        } else {
            return true;
        }
    };

    funs.GetLastValue = function (name, cxt, args) {
        let form = cxt.form, fieldKey = args[0];
        let cellLocation = form.getCellLocation(fieldKey);
        // 如果存在单元位置，那么是一个集合组件

        let gridKey = cellLocation.key;
        let column = cellLocation.column;
        let row = cellLocation.row;
        // 1. 固定行单元格取自己的行号
        let rowIndex = row;
        // 2. 普通单元格取上下文中的行
        if (rowIndex == null || rowIndex == -1) {
            rowIndex = cxt.getLoc(gridKey) ? cxt.getLoc(gridKey).getRow() : -1;
        }
        // 上下文中无行取焦点行
        if (rowIndex == null || rowIndex == -1) {
            let grid = form.getComponent(gridKey);
            rowIndex = grid.getFocusRowIndex();
        }
        // 如果是列拓展单元格,取上下文中的列
        column = (cellLocation.expand ? cxt.colIndex : column);
        if (rowIndex <= 0)
            return;
        let value = form.getCellValByIndex(gridKey, rowIndex - 1, column);
        return value;
    };
    funs.MoveID = function (name, cxt, args) {
        let moveType = args[0].toString().toLowerCase(),
            oids = args[1] ? args[1] : '0',
            curID = args[2] ? YIUI.TypeConvertor.toString(args[2]) : '0', result;
        oids = oids.split(';');
        if ('movefirst' == moveType) {
            result = oids[0];
        } else if ('movepre' == moveType) {
            let lIdx = oids.indexOf(curID);
            if (lIdx <= 0) {
                result = oids[0];
            } else {
                result = oids[lIdx - 1];
            }
        } else if ('movenext' == moveType) {
            let lIdx = oids.indexOf(curID);
            if (lIdx < 0) {
                result = oids[oids.length - 1];
            } else {
                result = oids[lIdx + 1];
            }
        } else if ('movelast' == moveType) {
            result = oids[oids.length - 1];
        }
        return YIUI.TypeConvertor.toLong(result);
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
    funs.ResetEidtBillShow = function (name, cxt, args) {
        var form = cxt.form;
        form.setOperationState(YIUI.Form_OperationState.Default);
        return BaseFunsExt.ShowData('ShowData', cxt, args);
    };
    funs.RefreshDicOperation = function (name, cxt, args) {
        let form = cxt.form;
        let toolbar = form.defaultToolBar;
        if (!toolbar || toolbar.isDestroyed)
            form = cxt.form.getParentForm();
        let MASKCHECK = YIUI.FormUIStatusMask.OPERATION;
        form.resetUIStatus(YIUI.FormUIStatusMask.OPERATION);
        return true;
    };
    funs.DicEditSetPara = function (name, cxt, args) {
        let form = cxt.form, key = args[0], value = args[1];
        form.setPara(key, value);
        let comp = form.getComponent('Container');
        if (comp && comp.tagName == 'stackcontainer') {
            //复合字典中要打开的form
            let activeForm = comp.getActivePane();
            if (activeForm) {
                let newCxt = activeForm.newCxt();
                newCxt.form.setPara(key, value);
            }
        }
        let toolbar = form.defaultToolBar;
        if (!toolbar || toolbar.isDestroyed) {
            form = cxt.form.getParentForm();
            form.setPara(key, value);
        }
    };
    funs.DicEditGetPara = function (name, cxt, args) {
        let form = cxt.form, key = args[0];
        let result = form.getPara(key);
        let toolbar = form.defaultToolBar;
        if (!toolbar || toolbar.isDestroyed) {
            form = cxt.form.getParentForm();
            result = form.getPara(key);
        }
        return result;
    };
    funs.getMenuPath = function (name, cxt, args) {
        return cxt.path;
    };

    funs.DicStatus = function (name, cxt, args) {
        let form = cxt.form, parentForm = form.getParentForm(), dictView = parentForm.getComponent('DictView');
        let oid = UI.BaseFuns.getSelectedValue(name, cxt, ['OID']);
        if (oid <= 0) {
            return -3;
        }
        return YIUI.ExprUtil.getImplValue(form, 'Status', cxt);
    };

    funs.HasParent = function (name, cxt, args) {
        let form = cxt.form, parentForm = form.getParentForm();
        let b = false;
        if (args.length == 1) {
            if (args[0] == 1) {
                b = true;
            }
        }
        if (parentForm != null) {
            return true;
        } else {
            return false;
        }
    };

    funs.GetSelDtlFldValue = function (name, cxt, args) {
        let form = cxt.form, fieldKey = args[0], sp = args[1],
            doc = form.getDocument(),
            cellLocation = form.getCellLocation(fieldKey),
            grid = form.getComponent(cellLocation.key),
            col = doc.getByKey(cellLocation.tableKey).getColByKey(cellLocation.columnKey),
            dataType = col.type;
        let selectColKey = 'Selected', metaRows = grid.getMetaObj().rows, metaRow, metaCell;
        for (let rowIndex = 0, length = metaRows.length; rowIndex < length; rowIndex++) {
            metaRow = metaRows[rowIndex];
            for (let colIndex = 0, colLength = metaRow.cells.length; colIndex < colLength; colIndex++) {
                metaCell = metaRow.cells[colIndex];
                if (metaCell.isSelect) {
                    selectColKey = metaCell.key;
                    break;
                }
            }
        }
        if (!selectColKey) {
            return '';
        }
        let result = [];
        for (let dataRowIndex = 0, len = grid.getRowCount(); dataRowIndex < len; dataRowIndex++) {
            let isSelected = YIUI.TypeConvertor.toBoolean(grid.getValueByKey(dataRowIndex, selectColKey));
            if (!isSelected) {
                continue;
            }

            let data = YIUI.TypeConvertor.toSafeDataType(dataType, grid.getValueByKey(dataRowIndex, fieldKey));
            result.push(data);
        }
        return result.join(sp);
    };

    funs.SelectDtlNum = function (name, cxt, args) {
        let form = cxt.form,
            fieldKey = args[0],
            cellLocation = form.getCellLocation(fieldKey),
            grid = form.getComponent(cellLocation.key),
            count = 0;
        for (let i = 0, len = grid.getRowCount(); i < len; i++) {
            if (grid.getValueByKey(i, fieldKey) == 1) {
                count++;
            }
        }
        return count;
    };

    funs.MaxUIGridValue = function (name, cxt, args) {
        let form = cxt.form, fieldKey = args[0],
            doc = form.getDocument(),
            cellLocation = form.getCellLocation(fieldKey),
            grid = form.getComponent(cellLocation.key),
            col = doc.getByKey(cellLocation.tableKey).getColByKey(cellLocation.columnKey),
            dataType = col.type;

        let maxValue;
        for (let dataRowIndex = 0, len = grid.getRowCount(); dataRowIndex < len; dataRowIndex++) {
            let data = grid.getValueByKey(dataRowIndex, fieldKey);
            if (dataRowIndex == 0) {
                maxValue = data;
            }
            if (data.comparedTo(maxValue) >= 0) {
                maxValue = data;
            }

        }
        return maxValue;
    };

    funs.MaxValue = function (name, cxt, args) {
        let form = cxt.form, fieldKey = args[0], doc = form.getDocument(),
            cellLocation = form.getCellLocation(fieldKey),
            grid = form.getComponent(cellLocation.key),
            col = doc.getByKey(cellLocation.tableKey).getColByKey(cellLocation.columnKey),
            dataType = col.type;

        let maxValue;
        for (let dataRowIndex = 0, len = grid.getRowCount() - 1; dataRowIndex < len; dataRowIndex++) {
            let data = grid.getValueByKey(dataRowIndex, fieldKey);
            if (dataRowIndex == 0) {
                maxValue = data;
            }
            let result = 0, d1, d2;
            switch (dataType) {
                case YIUI.DataType.INT:
                    d1 = YIUI.TypeConvertor.toInt(data), d2 = YIUI.TypeConvertor.toInt(maxValue);
                    result = d1 - d2;
                    break;
                case YIUI.DataType.LONG:
                    d1 = YIUI.TypeConvertor.toLong(data), d2 = YIUI.TypeConvertor.toLong(maxValue);
                    result = d1 - d2;
                    break;
                case YIUI.DataType.FLOAT:
                    d1 = YIUI.TypeConvertor.toDecimal(data), d2 = YIUI.TypeConvertor.toDecimal(maxValue);
                    result = d1.comparedTo(d2);
                    break;
                case YIUI.DataType.STRING:
                    d1 = YIUI.TypeConvertor.toDecimal(data), d2 = YIUI.TypeConvertor.toDecimal(maxValue);
                    result = d1.comparedTo(d2);
                    break;
                case YIUI.DataType.DATE:
                    d1 = YIUI.TypeConvertor.toDate(data), d2 = YIUI.TypeConvertor.toDate(maxValue);
                    result = d1 - d2;
                    break;
                case YIUI.DataType.DATETIME:
                    d1 = YIUI.TypeConvertor.toDate(data), d2 = YIUI.TypeConvertor.toDate(maxValue);
                    result = d1.getTime() - d2.getTime();
                    break;
            }
            if (result >= 0) {
                maxValue = data;
            }

        }
        return maxValue;
    };

    funs.checkPercentageIsDesc = function (name, cxt, args) {
        let form = cxt.form;
        let percent1 = args[0];
        let percent2 = args[1];
        if (percent2.comparedTo(new Decimal(0)) == 0) {
            return true;
        } else if (percent2.comparedTo(percent1) >= 0) {
            return false;
        } else {
            return true;
        }
    };

    funs.checkDaysIsAsc = function (name, cxt, args) {
        let form = cxt.form;
        let day1 = args[0];
        let day2 = args[1];
        let day3 = args[2];
        let isasc = true;
        if (day3 > 0) {
            isasc = (day3 > day2) && (day2 > day1);
        } else if (day2 > 0) {
            isasc = (day2 > day1);
        }
        return isasc;
    };

    funs.GetUICaption = function (name, cxt, args) {
        let form = cxt.form;
        let key = args[0];
        if (form.formKey == key) {
            return form.caption;
        }
        //暂时不区分控件，直接取text
        let com = form.getComponent(key);
        return com.text;
    };

    funs.getMultiDicFldFilter = function (name, cxt, args) {
        let form = cxt.form, fieldKey = args[0];
        let com = form.getComponent(fieldKey);
        if (com.type == YIUI.CONTROLTYPE.DICT && com.multiSelect == true) {
            let value = YIUI.ExprUtil.getImplValue(form, fieldKey, cxt);
            return 'oid in (' + value + ')';
        } else {
            //不是多选字典，都返回空
            return '';
        }
    };

    /**
        取余数，一般用于整型数字
    **/
    funs.Mod = function (name, cxt, args) {
        let num1 = YIUI.TypeConvertor.toDecimal(args[0]),
            num2 = YIUI.TypeConvertor.toDecimal(args[1]);
        if (num2.isZero()) {
            throw new Error('被除数不能为0');
        }
        let value = num1.mod(num2);
        return value;
    };

    funs.Fix = function (name, cxt, args) {
        let num = YIUI.TypeConvertor.toDecimal(num);
        let value = YIUI.TypeConvertor.toInt(num.toFixed(0, Decimal.ROUND_DOWN));
        return value;
    };

    funs.Round = function (name, cxt, args) {
        //四舍五入
        if (args[0] == '') {
            return '';
        }
        let value = YIUI.TypeConvertor.toDecimal(args[0]);
        let decimalPlaces = args[1]; //保留小数位
        return YIUI.TypeConvertor.toDecimal(value.toFixed(decimalPlaces));
    };

    funs.Space = function (name, cxt, args) {
        let form = cxt.form, num = args[0];
        let value = '';
        for (let i = 0; i < num; i++) {
            value = value + ' ';
        }
        return value;
    };

    // funs.UStr = function (name, cxt, args) {
    //     let form = cxt.form, str = args[0];
    //     str = str.toUpperCase();
    //     return str;
    // };

    funs.OpenDictNoContainer = function (name, cxt, args) {
        let pForm = cxt.form;
        let formKey = args[0],
            OID = YIUI.TypeConvertor.toString(args[1]);


        //        let container = pForm.getDefContainer();
        //        if (container == null) {
        //            container = pForm.getContainer();
        //        }

        let builder = new YIUI.YIUIBuilder(formKey);
        builder.setContainer(pForm);
        builder.setParentForm(pForm);
        builder.setOperationState(YIUI.Form_OperationState.Default);

        builder.newEmpty().then(function (emptyForm) {

            if (OID > 0) {
                let filterMap = emptyForm.getFilterMap();
                filterMap.setOID(OID);
                emptyForm.setOptQueue(new YIUI.OptQueue(new YIUI.LoadOpt(emptyForm)));
            }

            YIUI.FormParasUtil.processCallParas(pForm, emptyForm);

            emptyForm.regEvent(YIUI.FormEvent.ShowDocument, function () {
                pForm.resetUIStatus(YIUI.FormUIStatusMask.OPERATION);
            });

            return builder.builder(emptyForm);
        });
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
        //        form.setOptQueue(new YIUI.OptQueue(new YIUI.NewOpt(form)));
        //        form.doOptQueue();
        //      return true;
    };

    funs.ExistsVariable = function (name, cxt, args) {
        let form = cxt.form, key = args[0];
        let value = form.getPara(key);
        if (value == null) {
            return false;
        }
        return true;
    };

    funs.SumValueByFilter = function (name, cxt, args) {
        let form = cxt.form, cellKey = args[0].toString(),
            filter = args[1].toString(),
            cellLoc = form.getCellLocation(cellKey),
            grid = form.getComponent(cellLoc.key);
        if (grid == undefined) return 0;
        let rowData, colInfoes, colIndex, count = new Decimal(0), value;
        for (let i = 0, len = grid.getRowCount(); i < len; i++) {
            rowData = grid.getRowDataAt(i);
            if (rowData.rowType === 'Detail' && !YIUI.GridUtil.isEmptyRow(rowData)) {
                let newContext = new View.Context(form);
                newContext.updateLocation(grid.key, i, -1);
                let bFilter = form.eval(filter, newContext, null);
                if (bFilter) {
                    rowData = grid.getRowDataAt(i);
                    if (rowData.rowType === 'Detail' && !YIUI.GridUtil.isEmptyRow(rowData)) {
                        value = rowData.data[cellLoc.column][0];
                        value = YIUI.TypeConvertor.toDecimal(value);
                        count = count.plus(YIUI.TypeConvertor.toDecimal(value));
                        // colInfoes = grid.getColInfoByKey(cellKey);
                        // if (colInfoes == null)
                        //     continue;
                        // for (let j = 0, jlen = colInfoes.length; j < jlen; j++) {
                        //     colIndex = colInfoes[j].colIndex;
                        //     value = rowData.data[colIndex][0];
                        //     count = count.plus(YIUI.TypeConvertor.toDecimal(value));
                    }
                }
            }
        }
        return count;
    };

    // 获取拓展单元格的值
    funs.GetExpandFieldValue = function (name, cxt, args) {
        let form = cxt.form;
        let gridKey = args[0];
        let grid = form.getComponent(gridKey);
        let colIndex = parseInt(args[1]), columnKey = args[2];
        colIndex = (colIndex == -1 ? cxt.getLoc(gridKey).column : colIndex);
        const rowIndex = cxt.getLoc(gridKey).getRow();
        let detailRow = grid.getRowDataAt(rowIndex);
        return detailRow.data[colIndex][1];
    };

    funs.SetGridAddNewBehavior = function (name, cxt, args) {
        let form = cxt.form;

        // TODO: 这里的功能需要实现
        return true;
    };
    funs.SetGridTreeLock = function (name, cxt, args) {
        let form = cxt.form;

        // TODO: 这里的功能需要实现
        return true;
    };
    // 这个功能在平台函数UICheck中已实现，统一改为UICheck函数
    // funs.CheckUIHasErr = function (name, cxt, args) {
    //     let form = cxt.form;

    //     // TODO: 这里的功能需要实现
    //     return true;
    // };

    funs.GroupValue = function (name, cxt, args) {
        let form = cxt.form, cellKey = args[0].toString();
        let cellLoc = form.getCellLocation(cellKey);
        let grid = form.getComponent(cellLoc.key);
        let dt = form.getDocument().getByKey(grid.tableKey);
        if (dt) {
            dt.first();
            let ret = dt.getByKey(cellKey);
            return ret;
        }
        // TODO: 这里的功能需要实现
        return '';
    };

    // funs.SetUIVariableAndReturn = function (name, cxt, args) {
    //     let form = cxt.form ,paraKey = args[0].toString();
    //     let value = args[1];
    //     form.setPara(paraKey,value);
    //     // TODO: 这里的功能需要实现
    //     return value;
    // };

    funs.UISumValue = function (name, cxt, args) {
        let form = cxt.form, cellKey = YIUI.TypeConvertor.toString(args[0]),
            cellLoc = form.getCellLocation(cellKey),
            grid = form.getComponent(cellLoc.key);
        if (grid == undefined || !cellLoc) return 0;
        let rowData, sumValue = new Decimal(0), value;
        for (let i = 0, size = grid.getRowCount(); i < size; i++) {
            rowData = grid.getRowDataAt(i);
            if (rowData.rowType === 'Detail' && !YIUI.GridUtil.isEmptyRow(rowData)) {
                value = rowData.data[cellLoc.column][0];
                value = YIUI.TypeConvertor.toDecimal(value);
                sumValue = sumValue.plus(YIUI.TypeConvertor.toDecimal(value));
            }
        }
        return sumValue;
    };

    funs.SetEnFoldGridTreeRow = function (name, cxt, args) {
        let form = cxt.form;

        // TODO: 这里的功能需要实现
        return true;
    };

    funs.SetGridBehavior = function (name, cxt, args) {

        // TODO: 这里的功能需要实现
        return true;
    };

    funs.GridRefresh = function (name, cxt, args) {
        let form = cxt.form,
            gridKey = args[0],
            grid = form.getComponent(gridKey);
        grid.load(true);
        return true;
    };

    funs.Distinct = function (name, cxt, args) {
        let form = cxt.form;
        let argNumber = args.length;
        let cellKey = args[0],
            cellLoc = form.getCellLocation(cellKey),
            grid = form.getComponent(cellLoc.key);
        if (grid == undefined) return 0;
        let rowData, value;
        let allValue = new HashMap();
        for (let i = 0, len = grid.getRowCount(); i < len; i++) {
            cellLoc = form.getCellLocation(cellKey),
                rowData = grid.getRowDataAt(i);
            if (rowData.rowType === 'Detail' && !YIUI.GridUtil.isEmptyRow(rowData)) {
                let rowValue = '';
                value = rowData.data[cellLoc.column][0];
                rowValue = rowValue + '_' + value;
                if (argNumber > 1) {
                    for (let j = 1; j < argNumber; j++) {
                        cellLoc = form.getCellLocation(args[j]);
                        value = rowData.data[cellLoc.column][0];
                        rowValue = rowValue + '_' + value;
                    }
                }
                if (allValue.containsKey(rowValue)) {
                    return 1;
                }
                allValue.put(rowValue, i);
            }
        }
        // TODO: 这里的功能需要实现
        return 0;
    };

    funs.SetParentDocResult = function (name, cxt, args) {
        // TODO
        return true;
    };

    funs.ResultCode = function (name, cxt, args) {
        // TODO
        return 1;
    };

    funs.AutoHideRowHeightByKey = function (name, cxt, args) {
        // TODO
    };

    funs.ShowSlider = function (name, cxt, args) {
        //TODO
    };
    funs.HideSlider = function (name, cxt, args) {
        //TODO
    };
    funs.CheckField = function (name, cxt, args) {
        //TODO
        return true;
    };
    funs.CheckGridField = function (name, cxt, args) {
        //TODO
        return true;
    };

    funs.GetParentPara = function (name, cxt, args) {
        let form = cxt.form;
        let parentform = form.getParentForm();
        let key = args[0];
        return parentform.getPara(key);
    };

    funs.GetDBType = async function (name, cxt, args) {
        let formKey = cxt.form.getFormKey();
        let paras = {
            service: 'RichDocument',
            cmd: 'RichDocumentGetDBTypeCmd',
            metaFormKey: formKey
        };
        const result = await Svr.Request.getData(paras);
        return result;
    };

    //获取界面上的表头字段的错误信息
    funs.FormHeadFieldsErr = function (name, cxt, args) {
        let form = cxt.form;
        let cmpList = form.getComponentList(), cmp;
        for (let i in cmpList) {
            cmp = cmpList[i];
            if (cmp instanceof YIUI.Control) {
                let err = cmp.isError();
                if (err != undefined) {
                    return err;
                }
            }
        }
        return '';
    };

    funs.abs = function (name, cxtt, args) {
        let value = YIUI.TypeConvertor.toDecimal(args[0]);
        return value.abs(value);
    };

    funs.isWFMapping = function (name, cxt, args) {
        let form = cxt.form;
        return form.isWFMapping();
    };

    funs.SetFormSize = function (name, cxt, args) {
        return true;
    };
    funs.DebugMode = function (name, cxt, args) {
        return false;
    };

    funs.GetRoleRightByItemField = function (name, cxt, args) {
        //TODO:先空实现
        return '';
    };

    funs.IsFocusTabByKey = function (name, cxt, args) {
        let comp = cxt.form.getComponent(args[0]);
        let tabComp = comp.ownerCt,
            items = tabComp.items;
        for (let i = 0, len = items.length; i < len; i++) {
            if (items[i].key == comp.key && i == tabComp.activeTab) {
                return true;
            }
        }
        return false;
    };

    funs.EndEdit = function (name, cxt, args) {
        //TODO
        return true;
    };

    funs.SetRowHeightByKey = function (name, cxt, args) {
        //TODO
        return true;
    };

    funs.SetResultCode = function (name, cxt, args) {
        //TODO
        return true;
    };

    funs.CalcExpandValue = function (name, cxt, args) {
        //现在支持三层扩展求和
        let count = new Decimal(0),
            form = cxt.form,
            cellKey = args[0],
            loc = form.getCellLocation(cellKey),
            grid = form.getComponent(loc.key),
            expandColumn = args[1],
            expandColumnValue = args[2], expandColumn2 = null, expandColumn2Value = null;
        if (!grid)
            return count;
        let detailRow = grid.getDetailMetaRow();
        let row = grid.getRowDataAt(cxt.getLoc(grid.key).getRow()),
            value;
        if (args.length > 3) {
            expandColumn2 = args[3];
            expandColumn2Value = args[4];
        }
        // let value, count;
        if (row) {
            for (let i = 0, len = row.cellKeys.length; i < len; i++) {
                if (row.cellKeys[i] == cellKey) {
                    let crossValueMap = detailRow.cells[i].crossValueMap;
                    if (crossValueMap && expandColumn in crossValueMap) {
                        let corssValue = crossValueMap[expandColumn].value;
                        if (corssValue == expandColumnValue) {
                            if (expandColumn2 != null && crossValueMap && expandColumn2 in crossValueMap) {
                                corssValue = crossValueMap[expandColumn2].value;
                                if (corssValue == expandColumn2Value) {
                                    value = row.data[i][0];
                                    count = count.plus(YIUI.TypeConvertor.toDecimal(value));
                                }
                            } else {
                                value = row.data[i][0];
                                count = count.plus(YIUI.TypeConvertor.toDecimal(value));
                            }
                        }
                    }
                }
            }
        }
        return count;
    };
    funs.ERAF_GetDicDirection = function (name, cxt, args) {
        if (args.length < 2 || args[0] == null || args[1] == null) {
            return 0;
        }
        let lDirection = 0, sDicDirection = args[0].toString(), sDicID = args[1].toString();
        if ($.isString(sDicDirection)) {
            let str = sDicDirection.split(';');
            for (let i = 0, len = str.length; i < len; i++) {
                let aItem = str[i].split(',');
                if (aItem[0] == sDicID) {
                    lDirection = YIUI.TypeConvertor.toInt(aItem[1]);
                    break;
                }
            }
        }
        return lDirection;
    };
    /**
     * 取当前单元格的扩展的值
     */
    funs.FIGetExpandSrcValue = function (name, cxt, args) {
        let form = cxt.form, gridKey = 'grid0', cellKey = args[0].toString();
        if (args.length > 1) {
            gridKey = args[1].toString();
        }
        let paraArgs = [];
        paraArgs[0] = gridKey;
        paraArgs[1] = -1;
        paraArgs[2] = cellKey;
        let expValue = UI.BaseFuns.GetExpandValue('', cxt, paraArgs);
        return expValue;
    };
    /**
     * 余额表中汇总行计算合计数
     */
    funs.ERAF_BalanceCalcSubTotal = function (name, cxt, args) {
        let form = cxt.form, accountIDKey = args[0], cellKey = args[1], isrootaccount = YIUI.TypeConvertor.toBoolean(args[2]),
            cellLoc = form.getCellLocation(cellKey), accountIDCellLoc = form.getCellLocation(accountIDKey),
            grid = form.getComponent(cellLoc.key);
        if (grid == undefined || !cellLoc || !accountIDCellLoc) {
            return 0;
        }
        let rowData, count = new Decimal(0), value, accountID;
        for (let i = 0, len = grid.getRowCount(); i < len; i++) {
            rowData = grid.getRowDataAt(i);
            if (rowData.rowType === 'Detail' && !YIUI.GridUtil.isEmptyRow(rowData)) {
                if (isrootaccount) {
                    accountID = rowData.data[accountIDCellLoc.column][0];
                    let level = YIUI.DictService.getDictValue(accountID.itemKey, accountID.oid, 'NodeLevel');
                    if (level && level == 1) {
                        value = rowData.data[cellLoc.column][0];
                        count = count.plus(YIUI.TypeConvertor.toDecimal(value));
                    }
                } else {
                    value = rowData.data[cellLoc.column][0];
                    count = count.plus(YIUI.TypeConvertor.toDecimal(value));
                }
            }
        }
        return count;
    };
    funs.ERAF_GetDictPathName = function (name, cxt, args) {
        let accountid = args[0].toString(), itemKey = args[1].toString();
        let curname = YIUI.DictService.getDictValue(itemKey, accountid, 'Name');
        let dictPathName = '';
        let success = function (result) {
            if (result) {
                $.each(result, function (i) {
                    if (this.oid > 0) {
                        let tmpname = YIUI.DictService.getDictValue(itemKey, this.oid, 'Name');
                        dictPathName = tmpname + '-';
                    }
                });
                dictPathName = dictPathName + curname;
            }
        };
        let itemData = {
            oid: accountid,
            itemKey: itemKey
        };
        let parentdic = YIUI.DictService.getAllParentID(itemKey, itemData, success);
        return dictPathName;
    };
    funs.RefreshToolbar = function (name, ctx, args) {
        let form = ctx.form;
        if (form)
            form.resetUIStatus(YIUI.FormUIStatusMask.OPERATION);
    };

    funs.ExistField = function (name, ctx, args) {
        return true;
    };

    funs.GetRowCount = function (name, ctx, args) {
        let gridKey = args[0].toString();
        let form = ctx.form,
            grid = form.getComponent(gridKey);
        if (grid == undefined) return 0;
        let rowCount = grid.getRowCount();
        for (let i = rowCount - 1; i >= 0; i--) {
            let row = grid.getRowDataAt(i);
            if (row.inAutoGroup || YIUI.GridUtil.isEmptyRow(row)) {
                rowCount = rowCount - 1;
            }
        }
        //let rowCount = grid.getRowCount();
        return rowCount;
    };

    funs.DeleteDtl = function (name, ctx, args) {
        let grid = ctx.grid;
        let rowIndex = grid.getFocusRowIndex();
        return grid.deleteGridRow(rowIndex, true);
    };
    funs.DeleteGridRow = function (name, ctx, args) {
        let gridKey = args[0].toString();
        let rowIndex = YIUI.TypeConvertor.toInt(args[1]);
        let form = ctx.form,
            grid = form.getComponent(gridKey);
        if (grid == undefined || rowIndex == undefined) return;
        return grid.deleteGridRow(rowIndex, true);
    };
    funs.UISumValueSonGrid = function (name, ctx, args) {
        let form = ctx.form, cellKey = YIUI.TypeConvertor.toString(args[0]),
            cellLoc = form.getCellLocation(cellKey),
            grid = form.getComponent(cellLoc.key);
        if (grid == undefined || !cellLoc) return 0;
        let rowData, sumValue = new Decimal(0), value;
        for (let i = 0, size = grid.getRowCount(); i < size; i++) {
            rowData = grid.getRowDataAt(i);
            if (rowData.rowType === 'Detail' && !YIUI.GridUtil.isEmptyRow(rowData)) {
                value = rowData.data[cellLoc.column][0];
                value = YIUI.TypeConvertor.toDecimal(value);
                sumValue = sumValue.plus(YIUI.TypeConvertor.toDecimal(value));
            }
        }
        return sumValue;
    };

    funs.RunValueChanged = function (name, ctx, args) {
        let form = ctx.form;
        let fieldKey = args[0];

        let calcProcess = new YIUI.UICalcProcess(form);

        let cellLocation = form.getCellLocation(fieldKey);
        if (cellLocation) {
            let colIndex = cellLocation.column;
            let rowIndex = ctx.getLoc(cellLocation.key) ? ctx.getLoc(cellLocation.key).getRow() : -1;
            let grid = form.getComponent(cellLocation.key);
            if (rowIndex == null || rowIndex == -1) {
                rowIndex = grid.getFocusRowIndex();
            }
            if (rowIndex == -1) {
                return;
            }
            let cellComponent = grid.getDetailMetaRow().cells[colIndex];
            if (cellComponent.valueChanged) {
                calcProcess.cellValueChanged(grid, rowIndex, colIndex, fieldKey);
            }
            return;
        }

        let control = form.getComponent(fieldKey);
        if (control) {
            if (control.valueChanged) {
                calcProcess.valueChanged(control);
            }
            return;
        }
    };

    funs.IsModified = function (name, cxt, args) {
        let form = cxt.form;
        if (form != null) {
            let tbls = form.document.tbls;
            for (let i = 0; i < tbls.length; i++) {
                let rows = tbls[i].allRows;
                for (let j = 0; j < rows.length; j++) {
                    if (rows[j].state == DataDef.D_New || rows[j].state == DataDef.D_Modified || rows[j].state == DataDef.D_Deleted) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    funs.IsEmpty = function (name, cxt, args) {
        let key = args[0];
        let value = funs.GetValue(name, cxt, args);
        if (value == null || value == '') {
            return true;
        }
        return false;
    };

    funs.selectRow = function (name, cxt, args) {
        let gridKey = args[0];
        let rowIndex = args[1];
        let form = cxt.form;
        let grid = form.getComponent(gridKey);

        grid.clickRow(rowIndex);
        grid.focusRowChanged(rowIndex, grid.getFocusRowIndex());
    };

    // 针对字典字段值，建立基于界面的缓冲
    funs.GetDictValue = async function (name, cxt, args) {
        const oid = args[1];
        if (oid == null || oid == 0) {
            return null;
        }
        const itemKey = args[0];
        const fieldKey = args[2];
        const form = cxt.form;
        let dictCache = form.dictCache;
        if (!dictCache) {
            dictCache = {};
            form.dictCache = dictCache;
        }

        const key = itemKey + oid + fieldKey, result = dictCache[key];
        if (result !== undefined && result !== null) {
            return result;
        }
        const value = await YIUI.DictService.getDictValue(itemKey, oid, fieldKey);
        dictCache[key] = value;
        return value;
    };

    funs.GenSumData = function (name, cxt, args) {
        let asTgtFld = args[0].split(':');
        let asSrcGrpFld = args[1].split(':');
        let asSrcSumFld = args[2].split(':');
        let form = cxt.form,
            doc = form.getDocument();

        let tgtCellLocation = form.getCellLocation(asTgtFld[0]);
        let srcCellLocation = form.getCellLocation(asSrcGrpFld[0]);
        let tgtGrid = form.getComponent(tgtCellLocation.key);
        let srcGrid = form.getComponent(srcCellLocation.key);
        let tgtTable = doc.getByKey(tgtGrid.tableKey);
        let srcTable = doc.getByKey(srcGrid.tableKey);

        let colGrp = new HashMap();
        let colSumRow = new HashMap();
        let vSumValue = new HashMap();
        let vSumValue1 = [];
        let lTgtRow = 0;

        srcTable.beforeFirst();
        while (srcTable.next()) {
            let sGrpValue = '';
            for (let i = 0; i < asSrcGrpFld.length; i++) {
                if (sGrpValue == '') {
                    sGrpValue = srcTable.getByKey(asSrcGrpFld[i]);
                } else {
                    sGrpValue = sGrpValue + ',' + srcTable.getByKey(asSrcGrpFld[i]);
                }
            }
            if (!colGrp.containsValue(sGrpValue)) {
                colGrp.put(lTgtRow, sGrpValue);
                for (let i = 0; i < asSrcSumFld.length; i++) {
                    vSumValue1[i] = YIUI.TypeConvertor.toDecimal(srcGrid.getValueByKey(i, asSrcSumFld[i]));
                }
                vSumValue.put(lTgtRow, vSumValue1.clone());
                colSumRow.put(sGrpValue, lTgtRow);
                lTgtRow = lTgtRow + 1;
            } else {
                let data = vSumValue.get(YIUI.TypeConvertor.toInt(colSumRow.get(sGrpValue)));
                for (let i = 0; i < asSrcSumFld.length; i++) {
                    vSumValue1[i] = YIUI.TypeConvertor.toDecimal(srcGrid.getValueByKey(i, asSrcSumFld[i]));
                    data[i] = data[i].plus(YIUI.TypeConvertor.toDecimal(srcGrid.getValueByKey(i, asSrcSumFld[i])));
                }
                vSumValue.put(colSumRow.get(sGrpValue), data);
            }
        }

        tgtTable.delAll();
        tgtTable.clearGridData();

        let vValue = [], rowIndex = 0;
        for (let i = 0; i < colGrp.length; i++) {
            tgtGrid.appendAutoRowAndGroup();
            vValue = colGrp.get(i).split(',');
            if (vValue.length > 0) {
                for (let j = 0; j < asSrcGrpFld.length; j++) {
                    tgtGrid.setValueByKey(rowIndex, asSrcGrpFld[j], vValue[j], false, false);
                }
            }
            let quantity = vSumValue.get(i);
            for (let j = asSrcGrpFld.length; j < asTgtFld.length; j++) {
                tgtGrid.setValueByKey(rowIndex, asSrcGrpFld[j], vValue[j], false, false);
            }
            rowIndex++;
        }
        return true;
    };
    // funs.UICheck = function (name, cxt, args) {
    //     return true;
    // };
    // funs.Close = function (name, cxt, args) {
    //     let form = cxt.form;
    //     form.isOKClose = args && args.length > 0 && args[0];
    //     form.fireClose();
    // };

    // 两个参数，第一个参数表示rowIndex，第二个参数字段Key
    funs.SetFocusCell = function (name, cxt, args) {
        if (args.length > 2) {//两个参数以上的还是用平台的方法
            UI.BaseFuns.SetFocusCell('SetFocusCell', cxt, args);
        } else {
            let form = cxt.form,
                rowIndex = parseInt(args[0].toString()),
                fieldKey = args[1].toString(),
                cellLocation = form.getCellLocation(fieldKey),
                gridKey = cellLocation.key,
                grid = form.getComponent(gridKey);
            cxt.updateLocation(gridKey, rowIndex, cellLocation.column);
            form.setFocusCell(gridKey, rowIndex, cellLocation.column);
        }
    };

    funs.RefreshDictView = function (name, cxt, args) {
        let form = cxt.form;
        let controlKey = args[0];
        let itemKey = args[1];
        let oid = args[2];
        let optState = args[3] || YIUI.Form_OperationState.Default;

        if (!$.isNumeric(optState)) {
            if ('default' === optState) {
                optState = YIUI.Form_OperationState.Default;
            } else if ('new' === optState) {
                optState = YIUI.Form_OperationState.New;
            } else if ('edit' === optState) {
                optState = YIUI.Form_OperationState.Edit;
            } else if ('delete' === optState) {
                optState = YIUI.Form_OperationState.Delete;
            }
        }

        let dictView = form.getComponent(controlKey);

        let itemData = {
            itemKey: itemKey,
            oid: YIUI.TypeConvertor.toLong(oid)
        };

        if (dictView.type == YIUI.CONTROLTYPE.DICTVIEW) {
            switch (optState) {
                case YIUI.Form_OperationState.New:
                    dictView.addNode(itemData);
                    break;
                case YIUI.Form_OperationState.Delete:
                    // 修改previd属性
                    dictView.removeNode(itemData.itemKey + '_' + itemData.oid);
                    break;
                default:
                    dictView.refreshNode(itemData);
            }
        }
    };
    funs.CheckItemCount = function (name, cxt, args) {
        let form = cxt.form, fieldKey = args[0],
            value = YIUI.ExprUtil.getImplValue(form, fieldKey, cxt);
        let ids = value.split(',');
        if (ids.length > 1) {
            return ids.length;
        } else {
            if (ids[0] != 0 && ids[0] != '') {
                return 1;
            } else {
                return 0;
            }
        }

    };
    funs.OneCheckedOnly = function (name, cxt, args) {
        let form = cxt.form,
            fieldKey = args[0],
            cellLocation = form.getCellLocation(fieldKey),
            gridKey = cellLocation.key,
            grid = form.getComponent(gridKey),
            colIndex = cellLocation.column;
        if (!grid) {
            YIUI.ViewException.throwException(YIUI.ViewException.COMPONENT_NOT_EXISTS);
        }
        let rowIndex = grid.getFocusRowIndex();
        if (rowIndex < 0) {
            return;
        }
        grid.getHandler().selectSingle(grid, rowIndex, colIndex, grid.getValueAt(rowIndex, colIndex));
    };

    funs.DateLongAdd = function (name, cxt, args) {
        if (args[0] == 0) {
            return 0;
        }
        const dateLong = parseInt(args[0]);
        const yyyy = parseInt(dateLong / 10000);
        const i = dateLong % 10000;
        let MM = parseInt(i / 100);
        let dd = i % 100;


        if (MM < 10) {
            MM = '0' + MM;
        }
        if (dd < 10) {
            dd = '0' + dd;
        }
        const dateText = yyyy + '-' + MM + '-' + dd;

        let date = new Date(dateText),
            interval = args[1], num = args[2];
        if (interval == 'd' || interval == 'dd') {
            date.setDate(date.getDate() + num);
        } else if (interval == 'm' || interval == 'mm') {
            date.setMonth(date.getMonth() + num);
        } else if (interval == 'yyyy') {
            date.setFullYear(date.getFullYear() + num);
        } else if (interval == 'q') {
            date.setMonth(date.getMonth() + num * 3);
        } else if (interval == 'w') {
            date.setDate(date.getDay() + num * 7);
        } else if (interval == 'ww') {
            date.setDate(date.getDay() + num * 7);
        } else {
            throw new Error('dateIntAdd ' + interval + ' not impl.支持天:d,dd,月:m,mm,年:yyyy,旬:q.');
        }

        let resultText = date.Format('yyyy-MM-dd') || '';
        resultText = resultText.toString().replace(/(\W+)/g, '');
        return resultText == null ? null : YIUI.TypeConvertor.toLong(resultText);
    };

    funs.RunClick = function (name, cxt, args) {
        let form = cxt.form;
        let key = args[0];
        let comp = form.getComponent(key);
        if (comp) {
            switch (comp.type) {
                case YIUI.CONTROLTYPE.BUTTON:
                case YIUI.CONTROLTYPE.HYPERLINK:
                    let clickContent = comp.clickContent;
                    clickContent && form.eval(clickContent, cxt, null);
                    break;
            }
        } else {
            let cellLocation = form.getCellLocation(key);
            if (!cellLocation) {
                YIUI.ViewException.throwException(YIUI.ViewException.COMPONENT_NOT_EXISTS, key);
            }
            let rowIndex = cellLocation.row;
            let colIndex = cellLocation.column;
            //这里先暂时这样处理一下，后续可以考虑在cxt中处理多个表格key 和 表格rowIndex的关系
            if (rowIndex == -1 && cxt.getLoc(cellLocation.key) !== undefined) {
                rowIndex = cxt.getLoc(cellLocation.key).getRow();
            }
            let gridKey = cellLocation.key;
            let grid = form.getComponent(gridKey);
            if (rowIndex == -1) {
                rowIndex = grid.getFocusRowIndex();
            }
            grid.getHandler().doOnCellClick(grid, rowIndex, colIndex);
        }
        return true;
    };

    // 取分析点显示名称
    funs.GetAnaVisible = async function (name, cxt, args) {
        let dicfieldKey = args[0].toLowerCase();
        let form = cxt.form;
        let dt = form.getPara('AccountAnalysisSet');

        if (!dt || dt == null) {
            let SQL = 'Select * from EFI_AccountAnalysisSet';
            let values = [];
            let paras = YIUI.YesJSONUtil.toJSONArray(values);
            let params = {
                service: 'DBQuery',
                cmd: 'DBQuery',
                sql: SQL,
                paras: $.toJSON(paras)
            };
            dt = await Svr.Request.getData(params);
            form.setPara('AccountAnalysisSet', dt);
        }
        dt.beforeFirst();
        while (dt.next()) {
            if (dt.getByKey('RelationField').toLowerCase() == dicfieldKey) {
                return dt.getByKey('IsUsed') == 1;
            }
        }
        return false;
    };

    // 取分析点显示名称
    funs.GetAnaCaption = async function (name, cxt, args) {
        let dicfieldKey = args[0].toLowerCase();
        let form = cxt.form;
        let dt = form.getPara('AccountAnalysisSet');

        if (!dt || dt == null) {
            let SQL = 'Select * from EFI_AccountAnalysisSet';
            let values = [];
            let paras = YIUI.YesJSONUtil.toJSONArray(values);
            let params = {
                service: 'DBQuery',
                cmd: 'DBQuery',
                sql: SQL,
                paras: $.toJSON(paras)
            };
            dt = await Svr.Request.getData(params);
            form.setPara('AccountAnalysisSet', dt);
        }
        dt.beforeFirst();
        while (dt.next()) {
            if (dt.getByKey('RelationField').toLowerCase() == dicfieldKey) {
                return dt.getByKey('AnaCaption');
            }
        }
        return '';
    };

    funs.CheckDuplicate = function (name, cxt, args) {
        let form = cxt.form;
        if (args.length > 0) {
            let cellKey = args[0],
                cl = form.getCellLocation(cellKey),
                grid = form.getComponent(cl.key);

            if (!grid) {
                YIUI.ViewException.throwException(YIUI.ViewException.COMPONENT_NOT_EXISTS, cl.key);
            }

            let containsValue = function (datas, data) {
                if (datas.length == 0)
                    return false;

                let equals = function (dataA, dataB) {
                    for (let i = 0, o1, o2, length = dataA.length; i < length; i++) {
                        if (!_equal(dataA[i], dataB[i]))
                            return false;
                    }
                    return true;
                };
                let _equal = function (o1, o2) {
                    if (o1 == null && o2 == null)
                        return true;
                    if ((o1 == null && o2 != null) || (o1 != null && o2 == null))
                        return false;
                    if (typeof o1 == 'object') {
                        if (o1 instanceof YIUI.ItemData) {
                            return o1.getOID() == o2.getOID();
                        } else if (o1 instanceof Decimal) {
                            return parseFloat(o1) == parseFloat(o2);
                        } else if (o1 instanceof Date) {
                            return o1.getTime() == o2.getTime();
                        }
                    } else {
                        return o1 == o2;
                    }
                };

                for (let i = 0, length = datas.length; i < length; i++) {
                    if (equals(datas[i], data))
                        return true;
                }
                return false;
            };

            let datas = [], values;
            for (let i = 0, row = grid.getRowDataAt(i); row != undefined; i++) {

                values = [];

                if (row.isDetail && !YIUI.GridUtil.isEmptyRow(row)) {
                    for (let j = 0, key = args[j]; key != undefined; j++) {
                        values.push(grid.getValueByKey(i, key));
                    }

                    if (containsValue(datas, values))
                        return true;

                    datas.push(values);
                }
            }
        }
        return false;
    };

    funs.AscendDic = function (name, cxt, args) {
        //TODO 追溯字典
    };

    funs.ShowMapView = function (name, cxt, args) {
        //TODO 是否显示MapView
        return true;
    };

    funs.DealCondition = function (name, cxt, args) {
        UI.BaseFuns.DealCondition(name, cxt, args);
        let isParent = false;
        if (args.length > 0) {
            isParent = args[0];
        }
        let form = cxt.form;
        let target = (isParent && form.getParentForm() != null) ? form.getParentForm() : form;
        let paras = target.getParas();
        let condParas = target.getCondParas();
        let condPara, condParaKey, paraKey, paraValue;
        for (let i = 0, size = condParas.size(); i < size; i++) {
            condPara = condParas.get(i);
            condParaKey = condPara.key;
            paraKey = condParaKey;
            if (paraKey.length > 4 && (paraKey.endsWith('_One') || paraKey.endsWith('_Two'))) {
                paraKey = paraKey.substring(0, paraKey.length - 4);
            }
            paraValue = undefined;
            if (paras.get(paraKey)) {
                paraValue = paras.get(paraKey);
            }
            if (condPara.type == 206 && condPara.value) {
                if (condPara.condSign == 9)
                    paraValue = YIUI.TypeConvertor.toSafeDataType(YIUI.DataType.STRING, condPara.value);
                else {
                    if (condPara.value.length && condPara.value.length > 0) {
                        var tmp;
                        for (var index = 0; index < condPara.value.length; index++) {
                            if (tmp) {
                                tmp = tmp + ',' + condPara.value[index].oid;
                            } else {
                                tmp = condPara.value[index].oid;
                            }
                        }
                        paraValue = tmp;
                    }
                    else {
                        paraValue = condPara.value.getOID();
                    }
                }
            } else {
                paraValue = condPara.value;
            }
            if (condPara.group) {
                //有One、Two两个值，作为数组存进去。注意One、Two的顺序
                let paraValues = [];
                if (!paras.get(paraKey)) {
                    paraValues.push(paraValue);
                } else {
                    let preValue = paras.get(paraKey)[0];
                    if (condPara.groupHead) {
                        paraValues.push(paraValue);
                        paraValues.push(preValue);
                    } else if (condPara.groupTail) {
                        paraValues.push(preValue);
                        paraValues.push(paraValue);
                    }
                }
                paras.put(paraKey, paraValues);
            } else {
                paras.put(paraKey, paraValue);
            }
        }
    };
    funs.Left = function (name, cxt, args) {
        let s = YIUI.TypeConvertor.toString(args[0]);
        let l = args[1];
        if (s != null && l <= s.length) {
            return s.substring(0, l);
        } else {
            throw new Error('String index out of range：' + l);
        }

    };
    funs.Right = function (name, cxt, args) {
        let s = YIUI.TypeConvertor.toString(args[0]);
        let l = args[1];
        if (s != null && l <= s.length) {
            return s.substring(s.length - l);
        } else {
            throw new Error('String index out of range：' + l);
        }

    };
    funs.Mid = function (name, cxt, args) {
        let s = YIUI.TypeConvertor.toString(args[0]);
        let p = args[1];
        let l = args[2];
        if (s != null && l < s.length && p + l <= s.length) {
            return s.substring(p, p + l);
        } else {
            throw new Error('String index out of range：' + (p + l));
        }

    };

    funs.ERPRowExpand = async function (name, cxt, args) {
        let form = cxt.form, type = args[0], fieldKey = args[1], expandSource = args[2];
        let paras = ['ERPRowExpandService', true, false, form.formKey, type, fieldKey, expandSource];
        let result = await UI.BaseFuns.InvokeService('InvokeService', cxt, paras);
        return result;
    };

    funs.IsNumeric = function (name, cxt, args) {
        let value = args[0];
        return $.isNumeric(value);
    };

    funs.RefreshPanelAllHideRow = function (name, cxt, args) {
    };

    /**
     * 重写方法支持表格字段的Visible
     */
    funs.SetVisible = function (name, cxt, args) {
        let form = cxt.form;
        let key = args[0];
        let visible = YIUI.TypeConvertor.toBoolean(args[1]);
        //是否grid中列
        let cellLoc = form.getCellLocation(key);
        if (cellLoc == undefined)
            return UI.BaseFuns.SetVisible('SetVisible', cxt, [key, visible]);
        else {
            return UI.BaseFuns.SetColumnVisible('SetColumnVisible', cxt, [cellLoc.key, key, visible]);
        }
    };
    /**
     * 根据条件去oid，默认条件是code
     */
    funs.GetDicsValue = async function (name, cxt, args) {
        let itemKey = args[0];
        let value = args[1];
        let fieldKey = 'Code';
        if (args.length > 1) {
            fieldKey = args[2];
        }
        let oid = 0;
        let item = await YIUI.DictService.locate2(itemKey, fieldKey, value);
        if (item) {
            oid = item.oid;
        }

        return oid;
    };
    funs.ExpandDictView = function (name, cxt, args) {
        let form = cxt.form;
        let controlKey = args[0], oid = args[1];
        let comp = form.getComponent(controlKey);
        if (comp.type == YIUI.CONTROLTYPE.DICTVIEW) {
            let id = comp.itemKey + '_' + oid;
            comp.expandNode(id);
        }
    };

    /**
     * 判断是从后台菜单进入的Form要显示传输的三个按钮
     */
    funs.IsBackMenu = function (name, cxt, args) {
        let isBack = false;
        let form = cxt.form;
        let entryPath = form.getPara('EntryPath');
        if (entryPath != undefined && entryPath != null) {
            let array = entryPath.split('/');
            if (array.length > 1)
                isBack = array[1] == '后台配置';
        }
        return isBack;
    };
    /**
     * 根据TRSelected取选择的oid
     */
    funs.getTrSelectOIDs = function (name, cxt, args) {
        let form = cxt.form;
        let oids = '';
        //只有单表的时候才加传输选择列,其他的都按照表单的OID来加
        let gridMap = form.getGridArray();
        let size = form.document.tbls.length;
        let cellLoc = form.getCellLocation(YIUI.SystemField.OID_SYS_KEY);
        if (size == 1 && gridMap.length == 1) {
            let tableKey = YIUI.TypeConvertor.toString(form.document.tbls[0].key);
            let listoid = YIUI.BatchUtil.getSelectOIDs(form, tableKey,
                YIUI.SystemField.OID_SYS_KEY, false);
            oids = listoid.join(',');
        } else {
            oids = form.getOID();
        }
        return oids;
    };

    funs.CondClear = function (name, cxt, args) {
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

    funs.TimeCompare = function (name, cxt, args) {
        let restStart = args[0];
        let restEnd = args[1];
        if (restStart == null && restEnd == null) {
            return 0;
        } else if (restStart == null && restEnd) {
            return -1;
        } else if (restStart && restEnd == null) {
            return 1;
        } else {
            let Date1 = new Date(restStart);
            let Date2 = new Date(restEnd);
            if (Date1 < Date2) {
                return -1;
            } else if (Date1 == Date2) {
                return 0;
            } else {
                return 1;
            }
        }
    };

    funs.RemoveWebFormCache = function (name, cxt, args) {
        YIUI.DocService.removeCache(args[0]);
    };

    funs.SetGridRowBackColor = function (name, cxt, args) {
        let form = cxt.form;
        let key = YIUI.TypeConvertor.toString(args[0]);
        let backValueKey = YIUI.TypeConvertor.toString(args[1]);
        let grid = form.getComponent(key);
        let colIndex = form.getCellLocation(backValueKey).column;
        for (let i = 0, size = grid.getRowCount(); i < size; i++) {
            let rowData = grid.getRowDataAt(i);
            if (rowData.rowType === 'Detail' && !YIUI.GridUtil.isEmptyRow(rowData)) {
                let backColor = YIUI.TypeConvertor.toString(rowData.data[colIndex][0]);
                for (let columnIndex = 0, coulumnSize = rowData.cellKeys.length; columnIndex < coulumnSize; columnIndex++) {
                    grid.setCellBackColor(i, columnIndex, backColor);
                }
            }
        }
    };
    funs.ResetCondition = function (name, cxt, args) {
        var form = cxt.form;

        var tableKey;
        if (args.length > 0) {
            tableKey = YIUI.TypeConvertor.toString(args[0]);
        }

        var compList = form.getComponentList(),
            com,
            meta;

        for (var i in compList) {
            com = compList[i];
            meta = com.getMetaObj();

            if (meta.clearable === false) {
                com.setValue(null, true, false);
            } else if (com.condition && com.condition.needReset !== false) {
                if (!tableKey || tableKey === com.condition.tableKey) {
                    com.setValue(null, true, false);
                }
            }
        }
        return true;
    };

    var viewReload = async function (form, data, context) {
        // 获取载入前数据的版本号
        var originDocContainVerID = false;
        var originVerID = -1;
        var originDoc = form.getDocument();
        if (originDoc) {
            //MainTable
            var mtKey = form.mainTableKey;
            var mt = originDoc.getByKey(mtKey);
            if (mt && mt.getRowCount() > 0) {
                originVerID = mt.getByKey(YIUI.SystemField.VERID_SYS_KEY);
                if (originVerID >= 0)
                    originDocContainVerID = true;
            }
        }

        // 原始数据无版本信息，那么就不要执行UpdateView
        if (!originDocContainVerID)
            return;
        if (data) {
            form.setDocument(data);
            form.showDocument();
        } else {
            getDispatcher().dispatch(reloadForm(form.getUniqueId()));
        }
        getDispatcher().dispatch(workflowchange());
    };
    funs.SaveData = async function (name, cxt, args) {
        var form = cxt.form;
        var checkUI = true;
        if (args.length > 0) {
            checkUI = YIUI.TypeConvertor.toBoolean(args[0]);
        }
        if (checkUI) {
            var opt = new YIUI.UICheckOpt(form);
            await opt.doOpt();
        }

        var paras = form != null ? form.getParas() : null;
        form.document.Form_OperationState = 1;//改变单据的状态让单据可以保存
        form.document.state = 1;//改变单据的状态让单据可以保存
        var formDoc = form.getDocument();
        formDoc = YIUI.DataUtil.toJSONDoc(formDoc, true);

        var params = {
            service: 'SaveFormData',
            parameters: paras.toJSON(),
            document: $.toJSON(formDoc),
            formKey: form.getFormKey(),
            async: false
        };
        var data = await Svr.SvrMgr.saveFormData(params, form);
        form.setOperationState(YIUI.Form_OperationState.Default);
        viewReload(form, data, cxt);
    };
    funs.FillGridData = function (name, cxt, args) {
        var form = cxt.form, dataTable = args[1], doc = form.getDocument(),
            clearOldData = false, gridKey = args[0].toString(), grid = form.getComponent(gridKey);
        if (args.length > 2) {
            clearOldData = YIUI.TypeConvertor.toBoolean(args[2]);
        }
        if (grid == null) {
            YIUI.ViewException.throwException(YIUI.ViewException.COMPONENT_NOT_EXISTS);
        }
        var tableKey = grid.tableKey, oldTable = doc.getByKey(tableKey);
        if (oldTable != null) {
            if (clearOldData) {
                YIUI.DataUtil.deleteAllRow(oldTable);
            }

            var parentKey = oldTable.parentKey,
                parentBkmk = -1;
            if (parentKey) {
                parentBkmk = doc.getByKey(parentKey).getBkmk();
            }

            YIUI.DataUtil.append(dataTable, oldTable, parentBkmk);
            var ignoreKeys = [],
                metaCell;
            for (var i = 0, count = dataTable.cols.length; i < count; i++) {
                metaCell = grid.getMetaCellByColumnKey(dataTable.getCol(i).getKey());
                if (metaCell) {
                    ignoreKeys.push(metaCell.key);
                }
            }
            form.setSysExpVals('IgnoreKeys', ignoreKeys);

            // 需要重新构造表格结构,因为可能先改变列拓展,再插行
            grid.load(true);

            grid.getHandler().dealWithSequence(form, grid, 0);
        }
    };

    const addNFCWriteListener = (payload, mimeType) => {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line no-undef
            global.nfcWriteTag = (nfcEvent) => {
                // eslint-disable-next-line no-undef
                const record = global.ndef.mimeMediaRecord(mimeType, global.nfc.stringToBytes(payload));
                // eslint-disable-next-line no-undef
                global.nfc.write(
                    [record],
                    () => resolve(),
                    (error) => reject(error)
                );
            };
            // eslint-disable-next-line no-undef
            NFCUtil.addNFCListener(global.nfcWriteTag, (error) => reject(error));
        });
    };

    funs.WriteNFC = async function (name, cxt, args) {
        const payload = args[0], mimeType = args.length > 1 && args[1] ? args[1] : 'text/bokedata';
        // eslint-disable-next-line no-undef
        if (!global.nfc) {
            Util.showToast('您的设备未开启或不支持NFC功能!');
            return;
        }
        if (!payload) {
            Util.alert('请输入待写入数据');
            return;
        }
        try {
            Toast.loading('请靠近NFC标签', 0);
            await addNFCWriteListener(payload, mimeType);
            console.log('数据写入完成');
        } catch (error) {
            console.error(error);
            Toast.hide();
            Util.processError(error);
        } finally {
            // eslint-disable-next-line no-undef
            global.nfcWriteTag && await NFCUtil.removeNFCListener(global.nfcWriteTag);
            Toast.hide();
        }
    };
    // funs.OpenWorkitem = async function (name, cxt, args) {
    //     var form = cxt.form;
    //     var WID = args[0].toString();
    //     var onlyOpen = false;
    //     var loadInfo = true;
    //     if (args.length > 1) {
    //     onlyOpen = YIUI.TypeConvertor.toBoolean(args[1]);
    //     }
    //     if (args.length > 2) {
    //     loadInfo = YIUI.TypeConvertor.toBoolean(args[2]);
    //     }

    //     var tsParas;
    //     if (args.length > 3) {
    //     tsParas = args[3];
    //     }

    //     if (tsParas) {
    //     tsParas = splitPara(tsParas);
    //     for (var key in tsParas) {
    //     form.setCallPara(key, form.eval(tsParas[key], cxt));
    //     }
    //     }

    //     YIUI.BPMService.loadWorkitemInfo(WID).then(async function(info){
    //     if(!info){
    //     $.error("工作项不可用");
    //     }
    //     var formKey = info.FormKey;
    //     var OID = info.OID;
    //     const pForm = cxt.form;
    //     let mobileFormKey = await YIUI.BPMService.getAliasKey(1, formKey);
    //     if (formKey == mobileFormKey) {
    //     HashHistory.push(`card/YES/${formKey}/${OID}/DEFAULT`);
    //     return;
    //     }
    //     const form = await cacheSystem.current.FormCache.get(formKey);
    //     const yesForm = YIUI.FormBuilder.build(form, 'newtab', pForm.formID);
    //     yesForm.initViewDataMonitor();
    //     const formUniqueKey = `${formKey}.${OID}`;
    //     BillFormStore.addForm(formUniqueKey, yesForm);
    //     HashHistory.push(`card/YESMOBILE/${formKey}/${OID}/DEFAULT`);
    //     });
    // };
    funs.Sum = function (name, cxt, args) {
        var form = cxt.form, cellKey = args[0].toString(),
            cellLoc = form.getCellLocation(cellKey),
            grid = form.getComponent(cellLoc.key);
        if (grid == undefined) return 0;
        var sumInGrid = function (grid, rowIndex, colIndex) {
            var count = new Decimal(0), len = grid.getRowCount(), rowData = grid.getRowDataAt(rowIndex), value;
            switch (rowData.rowType) {
                case "Fix":
                case "Total":
                    var colInfoes = grid.getColInfoByKey(cellKey), isMatch = false;
                    if (colInfoes != null) {
                        for (var j = 0, jlen = colInfoes.length; j < jlen; j++) {
                            if (colIndex == colInfoes[j].colIndex) {
                                isMatch = true;
                                break;
                            }
                        }
                    }
                    if (isMatch) {
                        for (var i = 0, rlen = grid.getRowCount(); i < rlen; i++) {
                            rowData = grid.getRowDataAt(i);
                            if (rowData.isDetail && rowData.bookmark != null) {
                                value = rowData.data[colIndex][0];
                                if (value !== null) {
                                    count = count.plus(value);
                                }
                            }
                        }
                    } else {
                        sumOutGrid(grid, cellKey);
                    }
                    break;
                case "Group":
                    if (rowData.isGroupHead) {
                        for (var nextRi = rowIndex + 1; nextRi < len; nextRi++) {
                            var nextRD = grid.getRowDataAt(nextRi);
                            if (nextRD.rowGroupLevel == rowData.rowGroupLevel) {
                                break;
                            }
                            if (nextRD.isDetail && nextRD.bookmark != null) {
                                value = nextRD.data[colIndex][0];
                                if (value !== null) {
                                    count = count.plus(value);
                                }
                            }
                        }
                    } else if (rowData.isGroupTail) {
                        for (var preRi = rowIndex - 1; preRi >= 0; preRi--) {
                            var preRD = grid.getRowDataAt(preRi);
                            if (preRD.rowGroupLevel == rowData.rowGroupLevel) {
                                break;
                            }
                            if (preRD.isDetail && preRD.bookmark != null) {
                                value = preRD.data[colIndex][0];
                                if (value !== null) {
                                    count = count.plus(value);
                                }
                            }
                        }
                    }
                    break;
            }
            return count;
        };
        var sumOutGrid = function (grid, cellKey) {
            var rowData, colInfoes, colIndex, count = new Decimal(0), value;
            for (var i = 0, len = grid.getRowCount(); i < len; i++) {
                rowData = grid.getRowDataAt(i);
                if (rowData.isDetail && rowData.bookmark != null) {
                    colInfoes = grid.getColInfoByKey(cellKey);
                    if (colInfoes == null) continue;
                    for (var j = 0, jlen = colInfoes.length; j < jlen; j++) {
                        colIndex = colInfoes[j].colIndex;
                        value = rowData.data[colIndex][0];
                        if (value != null) {
                            count = count.plus(value);
                        }
                    }
                }
            }
            return count;
        };
        var targetCellLocation = form.getCellLocation(cxt.target);
        if (targetCellLocation == null || targetCellLocation.key != grid.key) {
            return sumOutGrid(grid, cellKey);
        } else if (cxt.rowIndex !== undefined && cxt.colIndex != undefined && cellLoc !== undefined) {
            return sumInGrid(grid, cxt.rowIndex, cxt.colIndex);
        } else {
            return sumOutGrid(grid, cellKey);
        }
    };

    return funs;
})();

for (let p in BaseFunsExt) {
    View.FuncMap.put(p, BaseFunsExt[p]);
}

export default BaseFunsExt;