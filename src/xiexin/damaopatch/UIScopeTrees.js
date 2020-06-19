import { YIUI, View, Svr, DataDef, cacheSystem, UI } from 'yes-core';
import { BillformStore as BillFormStore, AppDispatcher } from 'yes';
import { History as HashHistory } from 'yes-platform';
import { HashMap } from 'yes-yiui-common';
import { FilterMap } from 'yes-filtermap';
import { lodash as $ } from 'yes-common';
import BaseFunsExt from './basefunext';

View.UIScopeTrees = new function () {
    //严格模式
    'use strict';
    this.scopeTrees = {};
    this.covertJavaDataType = function (javaDataType, value) {
        if (javaDataType === undefined || value === null || value === undefined) {
            return value;
        }
        var result = value;
        switch (javaDataType) {
            case YIUI.JavaDataType.USER_INT:
                result = YIUI.TypeConvertor.toInt(value);
                break;
            case YIUI.JavaDataType.USER_LONG:
                result = YIUI.TypeConvertor.toLong(value);
                break;
            case YIUI.JavaDataType.USER_NUMERIC:
                result = YIUI.TypeConvertor.toDecimal(value);
                break;
            case YIUI.JavaDataType.USER_STRING:
                result = YIUI.TypeConvertor.toString(value);
                break;
            case YIUI.JavaDataType.USER_DATETIME:
                result = YIUI.TypeConvertor.toDate(value);
                break;
        }
        return result;
    };
    this.get = async function (formKey) {
        if (this.scopeTrees[formKey]) {
            return this.scopeTrees[formKey];
        }
        const paras = {
            service: 'RichDocument',
            cmd: 'BuildScopeTree',
            metaFormKey: formKey
        };
        const scopeTreeData = await Svr.Request.getData(paras);
        const fieldKey2Scope = scopeTreeData.fieldKey2Scope;

        let result = {};
        if (fieldKey2Scope) {
            for (let i = 0; i < fieldKey2Scope.length; i++) {
                let fieldKey = fieldKey2Scope[i].fieldKey;
                let scope = fieldKey2Scope[i].scope;
                result[fieldKey] = scope;
            }
        }
        this.scopeTrees[formKey] = result;
        return result;
    };
    this.getJSONDoc = function (doc, scope) {
        if (!doc) return;
        if (scope != undefined && scope.includeDocument) {
            return YIUI.DataUtil.toJSONDoc(doc);
        }

        let json = {},
            table_list = [],
            table;
        if (doc.oid) {
            json.oid = doc.oid;
        }
        if (doc.poid) {
            json.poid = doc.poid;
        }
        json.documentid = doc.documentid || 1;
        json.form_OperationState = doc.form_OperationState || YIUI.Form_OperationState.Default;
        json.verid = doc.verid || 0;
        json.dverid = doc.dverid || 0;

        json.state = doc.state || DataDef.D_Normal;

        if (doc.docType) {
            json.document_type = doc.docType;
        }

        let keys = doc.maps.table, dt;
        if (scope && scope.tableColumnKeys) {
            for (let key in keys) {
                const columnKeys = scope.tableColumnKeys[key];
                if (!columnKeys) {
                    continue;
                }
                dt = doc.getByKey(key);

                table = this.toJSONDataTable(dt, columnKeys);
                table_list.push(table);
            }
        }

        json.table_list = table_list;
        json.expand_data = doc.expData;
        json.expand_data_type = doc.expDataType;
        json.expand_data_class = doc.expDataClass;
        json.mainTableKey = doc.mainTableKey;
        json.object_key = doc.object_key;
        json.headValues = doc.headValues;
        json.otherFieldValues = doc.otherFieldValues;
        json.tableFilter = doc.tableFilter;
        return json;
    };
    this.toJSONDataTable = function (dataTable, columnKeys) {
        if (!dataTable) return;

        let table = {};
        table.key = dataTable.key;
        table.bookmark_seed = dataTable.bkmkSeed;
        table.tableMode = dataTable.tableMode;

        let cols = dataTable.cols, col, columns = [], column, colIndexes = [];
        for (let i = 0, length = columnKeys.length; i < length; i++) {
            let columnKey = columnKeys[i];
            colIndexes.push(dataTable.indexByKey(columnKey));
        }

        for (let k = 0, length = colIndexes.length; k < length; k++) {
            let colIndex = colIndexes[k];
            col = cols[colIndex];
            column = {};
            column.data_type = col.type;
            column.key = col.key;
            column.index = k;
            column.user_type = col.userType;
            column.accesscontrol = col.accessControl;
            column.isPrimary = col.isPrimary;
            columns.push(column);
        }
        table.columns = columns;

        let valsToJSON = function (vals, colIndexes) {
            let arr = [];
            for (let i = 0, len = colIndexes.length; i < len; i++) {
                let colIndex = colIndexes[i];
                if (vals[colIndex] instanceof Date) {
                    arr.push(vals[colIndex].getTime());
                } else {
                    arr.push(vals[colIndex]);
                }
            }
            return arr;
        };

        let allRows = dataTable.allRows,
            row, all_data_rows = [], all_data_row;
        for (let j = 0, len = allRows.length; j < len; j++) {
            row = allRows[j];
            all_data_row = {};
            all_data_row.data = valsToJSON(row.vals, colIndexes);
            all_data_row.row_bookmark = row.bkmk;
            all_data_row.row_parent_bookmark = row.parentBkmk;
            all_data_row.row_state = row.state;
            if (row.orgVals) {
                all_data_row.originaldata = valsToJSON(row.orgVals, colIndexes);
            }
            all_data_rows.push(all_data_row);
        }
        table.all_data_rows = all_data_rows;

        return table;
    };

    this.getJsonBookmarks = function (form, scope, grid, rowIndex) {
        let bookmarks;
        if (grid) {
            if (!rowIndex || rowIndex < 0) {
                rowIndex = grid.getFocusRowIndex();
            }
            let tableKey = grid ? grid.getTableKey() : '';
            bookmarks = form.getCurrentBookmarks(grid, tableKey, rowIndex);
        } else if (scope && scope.tableColumnKeys) {
            bookmarks = new HashMap();
            for (let tableKey in scope.tableColumnKeys) {
                grid = form.getGrid(tableKey);
                const bks = grid ? form.getCurrentBookmarks(grid, tableKey, grid.getFocusRowIndex()) : null;
                if (bks) {
                    bookmarks.put(tableKey, bks.get(tableKey));
                }
            }
        } else {
            bookmarks = new HashMap();
            let gridMap = form.getGridArray(), gridInfo, grid, tableKey;
            for (let i = 0, len = gridMap.length; i < len; i++) {
                gridInfo = gridMap[i];
                grid = form.getComponent(gridInfo.key);
                tableKey = gridInfo.tableKey;
                var bks = grid ? form.getCurrentBookmarks(grid, tableKey, grid.getFocusRowIndex()) : null;
                if (bks && bks.get(tableKey) >= 0) {
                    bookmarks.put(tableKey, bks.get(tableKey));
                }
            }
        }
        return $.toJSON(bookmarks);
    };

    this.processRichDocumentResult = async function (form, result) {
        const formKey = form.formKey;
        const parentForm = form.getParentForm();

        const filterMap = result.filterMap;
        if (filterMap) {
            form.filterMap = new FilterMap(filterMap);
        }

        const formDirtyDatas = result.formDirtyDatas;
        if (formDirtyDatas) {
            for (let i = 0; i < formDirtyDatas.length; i++) {
                const oneFormKey = formDirtyDatas[i].formKey;
                const dirtyData = formDirtyDatas[i].dirtyData;
                if (dirtyData == undefined) {
                    continue;
                }
                if (oneFormKey == formKey) {
                    await this.processOneRichDocumentResult(form, dirtyData);
                } else {
                    await this.processOneRichDocumentResult(parentForm, dirtyData);
                }

            }
        }
    };
    this.processOneRichDocumentResult = async function (form, docDirtyFieldValue) {
        if (form == null || (!form.getDocument() && !docDirtyFieldValue.isFullData)) {
            //emptyForm时可能发生
            return;
        }
        if (form.getDocument()) {
            const oid = docDirtyFieldValue.oid;
            form.getDocument().oid = oid;

            const poid = docDirtyFieldValue.poid;
            form.getDocument().poid = poid;

            const verid = docDirtyFieldValue.verid;
            form.getDocument().verid = verid;

            const dverid = docDirtyFieldValue.dverid;
            form.getDocument().dverid = dverid;


            const state = docDirtyFieldValue.state;
            form.getDocument().state = state;

            const document_type = docDirtyFieldValue.document_type;
            form.getDocument().document_type = document_type;
        }
        const closeFlag = docDirtyFieldValue.closeFlag;
        if (closeFlag != undefined && closeFlag == true) {
            form.fireClose();
            return;
        }
        if (form.document && form.document.state == DataDef.D_New) {
            form.setOperationState(YIUI.Form_OperationState.New);
        }
        AppDispatcher.dispatch({
            type: 'STOPEVENT',
        })
        try {
            if (docDirtyFieldValue.isFullData) {
                const doc = YIUI.DataUtil.fromJSONDoc(docDirtyFieldValue.documentJson);
                form.setDocument(doc);
            } else {
                const dirtyFieldValues = docDirtyFieldValue.dirtyFieldValues;
                if (dirtyFieldValues) {
                    for (let i = 0; i < dirtyFieldValues.length; i++) {
                        let fieldKey = dirtyFieldValues[i].key;
                        let bookmark = dirtyFieldValues[i].bookmark;
                        let value = dirtyFieldValues[i].value;
                        await this.setValueNoChange(form, fieldKey, bookmark, value);
                    }
                }
                // this.processOneRichDocumentResult_emptyRowDirtyValues(docDirtyFieldValue, form, undefined, true);
                await this.processOneRichDocumentResult_dirtyDataTable(form, docDirtyFieldValue);
            }
            this.processUICommands(form, docDirtyFieldValue);
        } finally{
            AppDispatcher.dispatch({
                type: 'ENABLEEVENT',
            });
        }
        // var returnMessage = docDirtyFieldValue.returnMessage;
        // if (returnMessage != undefined) {
        //     Confirm(returnMessage);
        // }

    };
    this.setValueNoChange = async function (form, fieldKey, bookmark, value) {
        var cellLocation = form.getCellLocation(fieldKey);
        var comp;
        if (cellLocation) {
            comp = form.getComponent(cellLocation.key);
            if (comp.type == YIUI.CONTROLTYPE.LISTVIEW) {
                // return comp.getValue(cxt.rowIndex, cellLocation.column);
            } else if (comp.type == YIUI.CONTROLTYPE.GRID) {
                //对于未显示的表格直接设置DataTable的值，测试下来只有子表格才不加载数据
                if (comp.isSubDetail && comp.getRowCount() == 0) {
                    var dataTable = form.getDocument().getByKey(comp.getTableKey());
                    var columnKey = cellLocation.columnKey;
                    var dataType = dataTable.getColByKey(columnKey).type;
                    dataTable.setByBkmk(bookmark);
                    dataTable.setByKey(fieldKey, YIUI.Handler.convertValue(value, dataType));
                } else {
                    var rowIndex = this.getRowIndexByBookmark(form, comp, bookmark);
                    var isCommit = bookmark != -1;
                    comp.setValueAt(rowIndex, cellLocation.column, value, isCommit, false, false, false, true);
                }
            }
        } else {
            comp = form.getComponent(fieldKey);
            if (comp == undefined) {
                YIUI.ViewException.throwException(YIUI.ViewException.NO_COMPONENT_KEY, fieldKey);
            }
            let newValue = View.tanserDataToComponentType(comp, value);
            //com.setValue方法中baseHandler.doValueChanged 会调用preFireValueChanged,postFireValueChanged
            //form.getViewDataMonitor().preFireValueChanged(comp);
            // 20180816
            //对动态字典的ItemKey字段赋值需要触发preFireCellValueChanged用以让字典重新计算下拉框。
            //测试用例：凭证行项目清单分析点下拉框改变后，后面的字典的下拉框要随之改变
            await comp.setValue(newValue, true, false, false, false, !isDynamicDictItemKeyField(form, fieldKey));
            //form.getViewDataMonitor().postFireValueChanged(comp);

        }
    };
    /**
     * 判断是否动态字典的ItemKey字段：字段key去除ItemKey字符串后看取到的字段是否动态字典且其refKey是否是当前字段的Key
     **/
    var isDynamicDictItemKeyField = function (form, key, rowIndex) {
        if (!key || key.indexOf('ItemKey') == -1) {
            return false;
        }
        var cellLoc = form.getCellLocation(key);
        var newKey = key.replace('ItemKey', '');

        var comp, refKey, grid;
        if (cellLoc && rowIndex && rowIndex >= 0) {
            grid = form.getComponent(cellLoc.key);
            var editOpt = grid.getCellEditOpt(rowIndex, cellLoc.column);
            if (editOpt.type == YIUI.CONTROLTYPE.DYNAMICDICT) {
                refKey = editOpt.refKey;
            }
        } else if (!cellLoc) {
            comp = form.getComponent(newKey);
            if (comp.type == YIUI.CONTROLTYPE.DYNAMICDICT) {
                refKey = comp.getMetaObj().refKey;
            }
        }
        return refKey && refKey == key;
    };
    this.getRowIndexByBookmark = function (form, grid, bookmark) {
        const dataTable = form.getDocument().getByKey(grid.getTableKey());
        let rowIndex, rowData;
        for (rowIndex = grid.getRowCount() - 1; rowIndex >= 0; rowIndex--) {
            rowData = grid.getRowDataAt(rowIndex);
            if (rowData.rowType != 'Group' && rowData.rowType != 'Detail' && !rowData.bkmkRow) {
                continue;
            }
            const bkmkRow = !rowData.bkmkRow && rowData.bkmkRow != null ? rowData.bkmkRow : undefined;
            const rowBookmark = bkmkRow || rowData.bookmark;
            if (rowBookmark == undefined) {
                continue;
            }
            //对于列扩展，只要有一个bookmark满足就返回。
            if (grid.hasColumnExpand()) {
                const rowArray = bkmkRow ? bkmkRow.getRowArray() : rowData.bookmark;
                for (let i = 0; i < rowArray.length; i++) {
                    let bkmk = bkmkRow ? rowArray[i].getBookmark() : rowArray[i];
                    if (bkmk == bookmark) {
                        dataTable.setByBkmk(bkmk);
                        return rowIndex;
                    }
                }
            } else {
                const bkmk = bkmkRow ? bkmkRow.getBookmark() : rowData.bookmark;
                if (bkmk != undefined && bkmk == bookmark) {
                    dataTable.setByBkmk(bkmk);
                    break;
                } else if (bookmark == -1) {
                    break;
                }
            }
        }
        return rowIndex;
    };
    this.processOneRichDocumentResult_dirtyDataTable = async function (form, docDirtyFieldValue) {
        const dirtyDataTables = docDirtyFieldValue.dirtyDataTables;
        if (dirtyDataTables) {
            for (let i = 0; i < dirtyDataTables.length; i++) {
                let isGrid = dirtyDataTables[i].isGrid;
                if (!isGrid) {
                    //todo 可能存在问题
                    let tableKey = dirtyDataTables[i].tableKey;
                    let dataTable = dirtyDataTables[i].dataTable;
                    dataTable = YIUI.DataUtil.fromJSONDataTable(dataTable);
                    let doc = form.getDocument();
                    doc.setByKey(tableKey, dataTable);
                    let tableDirtyData = dirtyDataTables[i].oneTableFieldDirtyData;
                    this.oneTableFieldDirtyData(form, tableDirtyData);
                } else {
                    let gridKey = dirtyDataTables[i].gridKey;
                    let dataTable = dirtyDataTables[i].dataTable;
                    dataTable = YIUI.DataUtil.fromJSONDataTable(dataTable);
                    let grid = form.getComponent(gridKey);
                    let doc = form.getDocument();
                    let tableKey = dirtyDataTables[i].tableKey;
                    doc.setByKey(tableKey, dataTable);
                    dataTable.beforeFirst();
                    grid.rootGroupBkmk = [];
                    // grid.getPageInfo().currentPage = 1;
                    if (grid.load) {
                        await grid.load(true, true);
                    } else {
                        YIUI.SubDetailUtil.clearSubDetailData(form, grid);
                        var show = new YIUI.ShowGridData(form, grid);
                        await show.load(true);
                        form.getUIProcess().resetComponentStatus(grid);
                    }
                }
            }
        }
    };

    // 执行界面命令,这里仅实现部分手机端可能用到的，
    this.processUICommands = function (form, docDirtyValue) {
        const uiCommands = docDirtyValue.uiCommands;
        if (!uiCommands) return;
        let hasFirst = 0;
        for (let i = 0, len = uiCommands.length; i < len; i++) {
            if (uiCommands[i].key == 'UpdateFormParas') {
                let tempFirst = uiCommands[i];
                uiCommands.splice(i, 1);
                uiCommands.unshift(tempFirst);
                hasFirst = 1;
                continue;
            }
            if (uiCommands[i].key == 'UpdateParentFormParas') {
                let tempSecond = uiCommands[i];
                uiCommands.splice(i, 1);
                if (hasFirst == 1 && len > 1) {
                    uiCommands.splice(1, 0, tempSecond);
                } else {
                    uiCommands.unshift(tempSecond);
                }
            }
        }

        for (let i = 0, len = uiCommands.length; i < len; i++) {
            let key = uiCommands[i].key, content = uiCommands[i].content;
            // if (key == 'UpdateDictView') {
            //     this.updateDictView(form, content);
            // } else if (key == 'AddDictViewNode') {
            //     this.addDictViewNode(form, content);
            // } else if (key == 'SelectDictViewByOID') {
            //     this.selectDictViewByOID(form, content);
            // } else if (key == 'UpdateDictViewRowFieldData') {
            //     this.updateDictViewRowFieldData(form, content);
            // } else if (key == 'DeleteDicViewRow') {
            //     this.deleteDicViewRow(form, content);
            // } else if (key == 'UpdateTabCaption') {
            //     this.updateTabCaption(form, content);
            // } else
            if (key == 'UpdateFormParas') {
                this.updateFormParas(form, content);
            } else if (key == 'UpdateParentFormParas') {
                if (form.getParentForm() != null) {
                    this.updateParentFormParas(form.getParentForm(), content);
                }
            } else if (key == 'NewFormShow') {
                this.newFormShow(form, content);
            }
            else if (key == 'FormShow') {
                this.formShow(form, content);
            } else if (key == 'FormShowDefaultStatus') {
                form.document.state = DataDef.D_Normal;
                form.setOperationState(YIUI.Form_OperationState.Default);
                form.showDocument();
            } else if (key == 'NewBill') {
                let cxt = new View.Context(form);
                BaseFunsExt.NewBill(name, cxt, null);
            } else if (key == 'ShowData') {
                let cxt = new View.Context(form);
                BaseFunsExt.ShowData(name, cxt, null);
            } else if (key == 'EditBill') {
                let cxt = new View.Context(form);
                BaseFunsExt.EditBill(name, cxt, null);
            } else if (key == 'ResetEditBill') {
                // if (form.isFormNew) {
                //     form.close();
                // } else {
                let cxt = new View.Context(form);
                BaseFunsExt.ResetEditBill(name, cxt, null);
                // }
            } else if (key == 'ERPShowModal') {
                const formKey = content.FormKey;
                const onLoad = content.OnLoad;
                const target = content.Target;
                let args = [formKey];
                onLoad && args.push(onLoad);
                target && args.push(target);
                let cxt = new View.Context(form);
                BaseFunsExt.ERPShowModal(name, cxt, args);
            } else if (key == 'SetFieldError') {
                this.setFieldError(form, content);
            } else if (key == 'Alert') {
                let cxt = new View.Context(form);
                UI.BaseFuns.Confirm(name, cxt, [content]);
            } else if (key == 'RunUIOpt') {
                let cxt = new View.Context(form);
                let action = content.action;
                if (action) {
                    form.eval(action, cxt, null);
                }
                if (form && form.getUIProcess()) {
                    form.getUIProcess().addOperation();
                }
            } else if (key == 'RemoveCache') {
                let cxt = new View.Context(form);
                let args = [content.itemKey];
                BaseFunsExt.RemoveCache(name, cxt, args);
            } else {
                throw new Error(`UICommand [${key}] 未实现`);
            }
        }
    };
    // 更新form对象的paras对象
    this.updateFormParas = function (form, content) {
        form.paras = new YIUI.Paras(content);
    };

    // 更新parentform对象的paras对象，不能整体更新
    this.updateParentFormParas = function (form, content) {
        const items = content.items;
        if (items) {
            for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i];
                form.setPara(item.key, item.value);
                //需要更新类型，否则下次数字类型不对，导致小数点丢失
                if (form.getParas().mapType && form.getParas().mapType[item.key]) {
                    delete form.getParas().mapType[item.key];
                }
            }
        }
    };

    this.setCallParasFromParaJson = function (form, paraJson) {
        if ($.isEmptyObject(paraJson)) return;
        const items = paraJson.items;
        for (let i = 0, len = items.length; i < len; i++) {
            let item = items[i];
            form.setCallPara(item.key, item.value);
        }
    };
    //
    this.formShow = function (form, content) {
        //FIXME:这个实现可能需要修改
        var formKey = content.formKey;
        var docData = content.doc;
        var doc = YIUI.DataUtil.fromJSONDoc(docData);
        form.setOperationState(doc.state);
        form.setDocument(doc);
        form.showDocument();
        return true;
    };
    // 打开新的界面并对界面赋值
    this.newFormShow = async function (form, content) {
        const self = this;
        const formKey = content.formKey,
            docData = content.doc,
            paras = content.para,
            alert = content.alert,
            doc = YIUI.DataUtil.fromJSONDoc(docData);
        const _newFormShow = async function () {
            // const container = form.getContainer();
            // const target = YIUI.FormTarget.NEWTAB;
            self.setCallParasFromParaJson(form, paras);
            form.setCallPara('SysUseExistsDocument', true);
            // const data = docData;
            // const formUniqueKey = `${formKey}.${data.oid}`;
            // data.key = formUniqueKey;
            // let formStatus = 'DEFAULT';
            // if (data.state == DataDef.D_New) {
            //     formStatus = 'NEW';
            // }
            // else if (data.state == DataDef.D_Modified) {
            //     formStatus = 'EDIT';
            // }
            // await cacheSystem.current.FormDataCache.put(formUniqueKey, {
            //     key: formUniqueKey,
            //     data,
            //     time:Date.now()
            // });

            const pForm = form;
            const billForm = await BillFormStore.createDummyForm(formKey + '.-1', true);
            billForm.form.pFormID = pForm.formID;
            const yesForm = billForm.form;
            await YIUI.FormParasUtil.processCallParas(pForm, yesForm);
            // const newForm = await cacheSystem.current.FormCache.get(formKey);
            // const yesForm = YIUI.FormBuilder.build(newForm, 'newtab', pForm.formID);
            // yesForm.initViewDataMonitor();
            // await YIUI.FormParasUtil.processCallParas(pForm, yesForm);

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
            await cacheSystem.current.FormDataCache.put(formUniqueKey, {
                key: formUniqueKey,
                data,
                time: Date.now()
            });
            let formStatus = 'DEFAULT';
            if (data.state == DataDef.D_New) {
                formStatus = 'NEW';
            } else if (data.state == DataDef.D_Modified) {
                formStatus = 'EDIT';
            }
            BillFormStore.addForm(formUniqueKey, yesForm);
            HashHistory.push(`card/YES/${formKey}/${cacheOID}/${formStatus}`);


            // let emptyForm =  YIUI.FormBuilder.builder(formKey);
            // builder.setContainer(container);
            // builder.setTarget(target);
            // builder.setParentForm(form);
            // builder.setOperationState(doc.state);//YIUI.Form_OperationState.Default

            // builder.newEmpty().then(function (emptyForm) {
            //     YIUI.FormParasUtil.processCallParas(form, emptyForm);
            //     View.UIScopeTrees.updateFormParas(emptyForm, para);

            //     builder.builder(emptyForm, doc, true).then(function (emptyForm) {
            //         emptyForm.setDocument(doc);
            //         emptyForm.showDocument();
            //     });
            // });
        };
        // var _confirmAndShow = async function () {
        //     const result = await Confirm.current('确认', alert, YIUI.Dialog_MsgType.DEFAULT);
        //     if (result) {
        //         await _newFormShow();
        //     }
        // };
        // if (alert) {
        // await _confirmAndShow();
        // } else {
        await _newFormShow();
        // }

    };


};
export default View.UIScopeTrees;