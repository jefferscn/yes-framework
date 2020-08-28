import { YIUI, View, Svr } from 'yes-core';
import { HashMap } from 'yes-yiui-common';
import { History as HashHistory } from 'yes-platform';
import { lodash as $ } from 'yes-common';
import { isOtherField } from './common';
import getDispatcher from 'yes-core/dist/dispatchers';

const _setOtherFieldValueToDocument = function (form, control, newValue) {
    const type = control.type;
    const fieldKey = control.key;
    if (newValue != null) {
        switch (type) {
            case YIUI.CONTROLTYPE.DICT:
            case YIUI.CONTROLTYPE.DYNAMICDICT:
            case YIUI.CONTROLTYPE.COMPDICT:
                if (control.multiSelect) {
                    if (newValue.length > 0) {
                        var str = '';
                        for (var i = 0; i < newValue.length; i++) {
                            if (newValue[i] instanceof YIUI.ItemData) {
                                str += ',' + newValue[i].oid;
                            } else {
                                str += ',' + newValue;
                            }
                        }
                        form.getDocument().otherFieldValues[fieldKey] = str.substring(1);
                    }
                } else {
                    if (newValue instanceof YIUI.ItemData) {
                        form.getDocument().otherFieldValues[fieldKey] = newValue.oid;
                    } else {
                        form.getDocument().otherFieldValues[fieldKey] = YIUI.TypeConvertor.toLong(newValue);
                    }
                }
                break;
            case YIUI.CONTROLTYPE.NUMBEREDITOR:
                form.getDocument().otherFieldValues[fieldKey] = YIUI.TypeConvertor.toDecimal(newValue);
                break;
            default:
                form.getDocument().otherFieldValues[fieldKey] = newValue;
        }
    } else {
        delete form.getDocument().otherFieldValues[fieldKey];
    }
}
const formExt = {

    setDocument: function (document) {
        if (this.document) {
            document.documentid = document.documentid || this.document.documentid;
            document.form_OperationState = document.form_OperationState || this.document.form_OperationState;
            document.headValues = document.headValues || this.document.headValues;
            document.otherFieldValues = document.otherFieldValues || this.document.otherFieldValues;
            document.emptyGridRowValues = document.emptyGridRowValues || this.document.emptyGridRowValues;
            document.tableFilter = document.tableFilter || this.document.tableFilter;
        }
        this.documentNotShow = true;
        this.document = document;
    },
    /**
         * 各控件的值变化事件
         * formID: 控件所在表单的ID
         * controlKey: 控件自身的key
         * newValue: 新的存储值
         */
    doValueChanged: async function (control, newValue, commitValue, fireEvent, ignoreChanged, editing, ignoreFireValueChanged) {
        let form = this,
            columnKey = control.columnKey,
            tableKey = control.tableKey, dataTable,
            document = form.getDocument();
        this.formulaCache.clear();
        if (commitValue && document) {
            if (tableKey) {
                dataTable = document.getByKey(tableKey);
            }
            // 子明细设置值
            if (isOtherField(control.key)) {
                _setOtherFieldValueToDocument(form, control, newValue);
            } else if (control.isSubDetail) {
                var cellKey = control.bindingCellKey;
                var grid = form.getComponent(control.parentGridKey), row, colIndex,
                    rowIndex = (grid == null ? -1 : grid.getFocusRowIndex());
                if (isNaN(rowIndex) || rowIndex == -1) {
                    rowIndex = grid.getLastDetailRowIndex();
                    if (rowIndex != -1) {
                        grid.setFocusRowIndex(rowIndex);
                        grid.setCellFocus(rowIndex, grid.getCellIndexByKey(cellKey));
                    }
                }
                if (rowIndex >= 0) {
                    if (cellKey) { //  绑定单元格
                        colIndex = grid.getCellIndexByKey(cellKey);
                        if (colIndex !== -1) {
                            grid.setValueAt(rowIndex, colIndex, newValue, true, fireEvent);
                        }
                    } else { // 自有数据绑定
                        row = grid.getRowDataAt(rowIndex);
                        if (row.isDetail && row.bookmark !== undefined) {
                            if (dataTable) {
                                if (dataTable.tableMode == YIUI.TableMode.HEAD) {
                                    this.setValueToDocument(control, dataTable, columnKey, -1, newValue);
                                } else {
                                    this.setValueToDocument(control, dataTable, columnKey, row.bookmark, newValue);
                                }
                            }
                        }
                    }
                }
            } else {
                if (dataTable) {
                    this.setValueToDocument(control, dataTable, columnKey, -1, newValue);
                }
            }
        }
        // 触发事件之前需要做的事
        if (!ignoreFireValueChanged) {
            await form.getViewDataMonitor().preFireValueChanged(control);
        }

        // 触发事件
        if (fireEvent) {
            await form.getViewDataMonitor().fireValueChanged(control);
        }
        // 触发事件之后需要做的事
        await form.getViewDataMonitor().postFireValueChanged(control);
    },
    setValueToDocument: function (control, dataTable, columnKey, bookmark, newValue) {
        if (dataTable.indexByKey(columnKey) == -1) return;
        // 头表设置一行,明细设置多行
        const impl_setObject = function (table, columnKey, value) {
            if (table.tableMode == YIUI.TableMode.HEAD) {
                table.setByKey(columnKey, value);
            } else {
                table.beforeFirst();
                while (table.next()) {
                    table.setByKey(columnKey, value);
                }
            }
        };
        const type = control.type;
        var dataType = dataTable.cols[dataTable.indexByKey(columnKey)].type;
        bookmark == -1 ? dataTable.first() : dataTable.setByBkmk(bookmark);
        if (newValue == undefined || newValue == null) {
            newValue = this.convertValue(newValue, dataType);
            impl_setObject(dataTable, columnKey, newValue);
        } else {
            switch (type) {
                case YIUI.CONTROLTYPE.DICT:
                case YIUI.CONTROLTYPE.DYNAMICDICT:
                case YIUI.CONTROLTYPE.COMPDICT:
                    if (control.multiSelect) {
                        if (newValue.length > 0) {
                            var str = '';
                            for (var i = 0; i < newValue.length; i++) {
                                let oid = $.isArray(newValue[i]) ? newValue[i].oid : newValue[i];
                                str += ',' + oid;
                            }
                            str = str.substring(1);
                            impl_setObject(dataTable, columnKey, str);
                            if (newValue[0].itemKey && type == YIUI.CONTROLTYPE.DYNAMICDICT || type == YIUI.CONTROLTYPE.COMPDICT) {
                                impl_setObject(dataTable, columnKey, newValue[0].itemKey);
                            }
                        }
                    } else {
                        let oid = $.isArray(newValue) ? newValue.oid : newValue;
                        impl_setObject(dataTable, columnKey, oid);
                        if (newValue.itemKey && type == YIUI.CONTROLTYPE.DYNAMICDICT || type == YIUI.CONTROLTYPE.COMPDICT) {
                            impl_setObject(dataTable, columnKey + 'ItemKey', newValue.itemKey);
                        }
                    }
                    break;
                // case YIUI.CONTROLTYPE.DATEPICKER:
                //     if (newValue instanceof Date) {
                //         newValue = newValue.getTime();
                //     } else {
                //         newValue = new Date(newValue).getTime();
                //     }
                //     dataTable.setByKey(columnKey, newValue);
                //     break;
                default:
                    newValue = this.convertValue(newValue, dataType);
                    impl_setObject(dataTable, columnKey, newValue);
            }
        }
    },
    fireClose: async function () {
        if (this.type != YIUI.Form_Type.Entity) {
            await this.unLock();
            await this.close();
            return true;
        }

        if (this.operationState == YIUI.Form_OperationState.Default || this.operationState == YIUI.Form_OperationState.Delete) {
            await this.unLock();
            await this.close();
            return true;
        }

        if (!this.confirmClose) {
            await this.unLock();
            await this.close();
            return true;
        }
    },
    close: async function () {
        var onClose = this.onClose;
        if (onClose) {
            var cxt = new View.Context(this);
            await this.eval(onClose, cxt);
        }
        var callback = this.getEvent(YIUI.FormEvent.Close);
        if (callback) {
            callback.doTask(this, null);
        }
        // HashHistory.goBack();
    },

    doOnLoad: async function () {
        const metaForm = this.metaForm;
        const scriptCollection = metaForm.scriptCollection;
        const loadScript = scriptCollection["load"];
        const cxt = new View.Context(this);
        const onLoad = this.onLoad;
        const postShow = this.postShow;

        if (this.getOID() == -1 || this.operationState === YIUI.Form_OperationState.New) { // 非具体单据
            const data = await YIUI.DocService.newDocument(this.getFormKey(), this.paras, this.getParentForm());
            const doc = YIUI.DataUtil.fromJSONDoc(data);
            if (this.type === YIUI.Form_Type.Entity) {
                this.setOID(doc.oid);
            }
            this.setDocument(doc);
            if (onLoad) {
                await this.eval(onLoad, cxt);
            }
            getDispatcher().dispatch({
                type: 'STOPEVENT',
            });
            try {
                await this.showDocument();
            } finally {
                getDispatcher().dispatch({
                    type: 'ENABLEEVENT',
                });
            }
        } else {
            const data = await YIUI.DocService.newDocument(this.getFormKey(), this.paras, this.getParentForm());
            const doc = YIUI.DataUtil.fromJSONDoc(data);
            const oid = this.getOID();
            doc.oid = oid;
            this.setDocument(doc);
            if (this.type === YIUI.Form_Type.Entity) {
                if (loadScript && oid > 0) {
                    await this.eval(loadScript, cxt, null);
                }
            } else {
                if (onLoad) {
                    onLoad && await this.eval(onLoad, cxt);
                    // postShow && await this.eval(postShow, cxt);
                }
            }
            getDispatcher().dispatch({
                type: 'STOPEVENT',
            })
            try {
                await this.showDocument();
            } finally {
                getDispatcher().dispatch({
                    type: 'ENABLEEVENT',
                });
            }
        }
    },
    unLock: async function () {
        const doc = YIUI.DataUtil.toJSONDoc(this.getDocument());
        var paras = {
            service: 'ERPBusinessLock',
            cmd: 'ERPBusinessLock',
            metaFormKey: this.getFormKey(),
            document: $.toJSON(doc),
            methodName: 'UnLock'
        };
        await Svr.Request.getData(paras);
    },
    setWFMapping: function (b) {
        this.bWFMapping = b;
    },
    isWFMapping: function () {
        return this.bWFMapping;
    },
    getCurrentParentBookmark: function (grid, bks) {
        var parentGrid = this.getComponent(grid.parentGridKey);

        if (!parentGrid) {
            return bks;
        }

        var parentGridTableKey = parentGrid.tableKey;
        var parentDataTable = this.getDocument().getByKey(parentGridTableKey);

        if (parentDataTable && parentDataTable.isValid()) {
            bks.put(parentGridTableKey, parentDataTable.getBkmk());
        } else {
            bks.put(parentGridTableKey, -1);
        }

        return this.getCurrentParentBookmark(parentGrid, bks);
    },

    //获得当前行bookmark 包含父表单
    getCurrentBookmarks: function (grid, tableKey, rowIndex) {
        if (!grid) {
            return;
        }

        if (!tableKey) {
            tableKey = grid.getTableKey();
        }

        let bkmk;
        if (rowIndex != null && rowIndex >= 0 && grid.getRowCount() > rowIndex) {
            bkmk = grid.getRowBookmark(rowIndex);
            if (bkmk == undefined) {
                console.log('无法获取当前bookmarks');
            }
        }

        var bks = new HashMap();
        if (bkmk != undefined) {
            bks.put(tableKey, bkmk);
        }
        else {
            bks.put(tableKey, -1);
        }

        if (rowIndex != null) {
            return this.getCurrentParentBookmark(grid, bks);
        }
        return bks;
    },
    setFocusCell: function (gridKey, rowIndex, colIndex) {
        //兼容性处理
    },
    getGridArray: function () {
        //兼容性处理
        return this.getGridInfoMap();
    },
    getLVArray: function () {
        return this.formAdapt.LVMap;
    },
    getGrid: function (arg) {
        //兼容性处理
        let key, grid;
        const gridArray = this.getGridArray();
        if ($.isNumeric(arg)) {
            let index = YIUI.TypeConvertor.toInt(arg);
            grid = gridArray[index];
            key = grid && grid.key;
        } else {
            for (let i = 0, len = gridArray.length; i < len; i++) {
                grid = gridArray[i];
                if (grid.tableKey == arg) {
                    key = grid.key;
                    break;
                }
            }
        }
        return key ? this.getComponent(key) : null;
    },
    isERPForm: true,
};

for (let fun in formExt) {
    YIUI.Form.prototype[fun] = formExt[fun];
}