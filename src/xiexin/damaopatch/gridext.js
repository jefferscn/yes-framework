import { YIUI, View, DataDef } from 'yes-core';
import { lodash as $ } from 'yes-common';
import Immutable from 'immutable';
import GridHandlerExt from './gridhandlerext';

YIUI.Grid.prototype.hasColumnExpand = function () {
    return this.hasColExpand;
};

YIUI.Grid.prototype.gridHandlerExt = GridHandlerExt;
YIUI.Grid.prototype.getCellEditOpt = function (row, column) {
    //兼容性处理
    if ($.isString(row)) {
        const editor = this.getCellEditor(row);
        if (editor) {
            return editor.toJS().editOptions;
        }
        return null;
    }
    const rowData = this.getRowDataAt(row);
    if (rowData) {
        return this.getMetaObj().rows[rowData.metaRowIndex].cells[column];
    } else {
        return null;
    }
};
YIUI.Grid.prototype.getDetailMetaRow = function () {
    return this.getDetailRow();
};
YIUI.Grid.prototype.getMetaCellByColumnKey = function (columnKey) {
    const detailRow = this.getDetailMetaRow();
    if (!detailRow) {
        return null;
    }
    let metaCell,
        _columnKey;
    for (let i = 0, size = detailRow.cells.length; i < size; i++) {
        metaCell = detailRow.cells[i];
        _columnKey = metaCell.columnKey;
        if (_columnKey && _columnKey == columnKey) {
            return metaCell;
        }
    }
    return null;
};
/**
    * 新增表格行
    * @param rowData 行数据对象
    * @param rowIndex 行数据对象在表格数据对象中的序号
    * @param isNewGroup 是否为新分组中的明细
    */
YIUI.Grid.prototype.addGridRow = async function (rowData, rowIndex, isNewGroup) {
    let data = this.dataModel.data, dataLength = this.getRowCount(),
        form = YIUI.FormStack.getForm(this.ofFormID), isNewData = false,
        dtrRowIndex = this.getMetaObj().detailMetaRowIndex,
        dtlMetaRow = this.getDetailRow();
    if (!rowData) {
        rowData = {};
        rowData.isDetail = true;
        rowData.isEditable = true;
        rowData.rowHeight = dtlMetaRow.rowHeight;
        rowData.rowID = this.randID();
        rowData.metaRowIndex = dtrRowIndex;
        rowData.rowType = 'Detail';
        rowData.cellKeys = dtlMetaRow.cellKeys;
        rowData.data = [];
        rowData.cellBkmks = [];
        rowData.rowGroupLevel = dtlMetaRow.rowGroupLevel;
        rowData.bookmark = undefined;
        rowData.bkmkRow = undefined;
        isNewData = true;
    }
    rowIndex = parseInt(rowIndex, 10);
    if (isNaN(rowIndex) || rowIndex < 0 || (rowIndex >= dataLength && !isNewGroup)) {
        rowIndex = -1;
    }
    if (rowIndex == -1) {
        let rd, lastDetailRow;
        for (let ri = dataLength - 1; ri >= 0; ri--) {
            rd = this.getRowDataAt(ri);
            if (rd.isDetail) {
                lastDetailRow = ri;
                break;
            }
        }
        if (dataLength == 0) {
            rowData.insertRowID = -1;
            rowIndex = 0;
        } else {
            if (lastDetailRow == undefined) {
                let dtrRow = this.getRowDataAt(dtrRowIndex - 1);
                rowData.insertRowID = (!dtrRow ? -1 : dtrRow.rowID);
                rowIndex = dtrRowIndex;
            } else {
                let dtrRow = this.getRowDataAt(lastDetailRow);
                rowData.insertRowID = dtrRow.rowID;
                rowIndex = lastDetailRow + 1;
            }
        }
    }
    if (isNewData) {
        const result = await form.getUIProcess().richDocumentGridEmptyRow(this.key);
        const formDirtyDatas = result.formDirtyDatas;
        if (formDirtyDatas) {
            const oneFormKey = formDirtyDatas[0].formKey;
            const docDirtyFieldValue = formDirtyDatas[0].dirtyData;
            if (docDirtyFieldValue && docDirtyFieldValue.emptyGridRowDirtyValues && oneFormKey == form.formKey) {
                for (let i = 0; i < docDirtyFieldValue.emptyGridRowDirtyValues.length; i++) {
                    let oneGridKey = docDirtyFieldValue.emptyGridRowDirtyValues[i].gridKey;
                    if (oneGridKey != undefined && this.key != oneGridKey) {
                        continue;
                    }
                    let tableKey = docDirtyFieldValue.emptyGridRowDirtyValues[i].tableKey;
                    let emptyRowValues = docDirtyFieldValue.emptyGridRowDirtyValues[i].emptyRowValues;
                    for (let j = 0; j < emptyRowValues.length; j++) {
                        let columnKey = emptyRowValues[j].key;
                        let value = emptyRowValues[j].value;
                        this.appendEmptyRowValue(form, tableKey, columnKey, value);
                    }
                }
            }

        }
        let soid = form.getDocument().oid;
        if (!soid || soid <= 0) {
            soid = await YIUI.DataUtil.applyNewOID();
        }
        const oid = await YIUI.DataUtil.applyNewOID();
        for (let i = 0, len = this.getColumnCount(); i < len; i++) {
            let value = null;
            let cm = this.getColumnConfig(i)/*this.dataModel.colModel.columns[i]*/,
                tableKey = dtlMetaRow.cells[i].tableKey || this.tableKey || this.metaObj.tableKey,
                columnKey = dtlMetaRow.cells[i].columnKey,
                cellKey = dtlMetaRow.cells[i].key,
                editOpt = this.getCellEditor(cellKey).toJSON();

            if (cm.get('name') == 'rowID') { continue; }
            if (columnKey && form.getDocument().emptyGridRowValues) {
                const emptyRowValues = form.getDocument().emptyGridRowValues[tableKey];
                value = emptyRowValues ? emptyRowValues[columnKey] : null;
            }
            if (columnKey == YIUI.SystemField.OID_SYS_KEY) {
                value = oid;
            } else if (columnKey == YIUI.SystemField.SOID_SYS_KEY) {
                value = soid;
            }
            rowData.data[i] = [View.tanserDataToComponentType(editOpt, value), '', true];
            console.warn(`${dtlMetaRow.cells[i].key}[${tableKey}.${columnKey}] = ${rowData.data[i][0]}`);
        }

        let metaCell = this.getMetaCellByColumnKey(YIUI.SystemField.SEQUENCE_FIELD_KEY);
        if (metaCell) {
            const sequenceLocation = form.getCellLocation(metaCell.key);
            rowData.data[sequenceLocation.column] = [rowIndex + 1, '', true];
        }
    }
    if (rowIndex >= 0) {
        data.splice(rowIndex, 0, rowData);
    } else {
        data.push(rowData);
    }
    let newState = null;
    let newRowIndex = rowIndex;
    rowData.rowIndex = rowIndex;
    if (rowIndex == -1) {
        newRowIndex = this.getRowCount();
        rowData.rowIndex = newRowIndex;
        newState = this.state.updateIn(['dataModel', 'data'], (data) => data.push(Immutable.fromJS(rowData)));
    } else {
        newState = this.state.updateIn(['dataModel', 'data'], (data) => data.insert(rowIndex, Immutable.fromJS(rowData)));
    }
    // this.refreshErrors(rowIndex, false);
    this.changeState(newState);
    await form.getUIProcess().doPostInsertRow(this, rowIndex, true);
    // AppDispatcher.dispatch(PostChange());
    return rowData;
};
/**
* 合并emptyGridRowValues的值
**/
YIUI.Grid.prototype.appendEmptyRowValue = function (form, tableKey, fieldKey, value) {
    if (!tableKey || !fieldKey) {
        return;
    }
    form.getDocument().emptyGridRowValues = form.getDocument().emptyGridRowValues || {};
    form.getDocument().emptyGridRowValues[tableKey] = form.getDocument().emptyGridRowValues[tableKey] || {};
    form.getDocument().emptyGridRowValues[tableKey][fieldKey] = value;
};

YIUI.Grid.prototype.doOnCellClick = function (rowIndex, columnKey) {
    const form = YIUI.FormStack.getForm(this.ofFormID);
    const colEditor = this.getColumnEditor(columnKey);

    switch (colEditor.cellType) {
        case YIUI.CONTROLTYPE.BUTTON:
        case YIUI.CONTROLTYPE.HYPERLINK:
        case YIUI.CONTROLTYPE.IMAGE:
        case YIUI.CONTROLTYPE.TEXTBUTTON:
            if (colEditor.onClick) {
                var cxt = new View.Context(form);
                cxt.setGrid(this);
                cxt.setRowIndex(rowIndex);
                this.activeRowIndex = rowIndex;
                form.eval($.trim(colEditor.onClick), cxt, null);
            }
            break;
    }
};

YIUI.Grid.prototype.doOnRowDblClick = function (rowIndex) {
    var rowDblClick = this.getMetaObj().rowDblClick;
    if (rowDblClick) {
        var formID = this.ofFormID,
            form = YIUI.FormStack.getForm(formID),
            cxt = new View.Context(form);
        cxt.setGrid(this);
        cxt.setRowIndex(rowIndex);
        this.activeRowIndex = rowIndex;
        form.eval(rowDblClick, cxt, null);
    }

};

/**
 * 删除行,静默删除,只删除模型中的行以及界面上行
 * 不删除数据, 内部使用
 * @param rowIndex
 */
YIUI.Grid.prototype.deleteRowAt = function (rowIndex, fireEvent) {

    const lastRow = rowIndex == this.getRowCount() - 1;

    const rowData = this.getRowDataAt(rowIndex),
        parentRow = rowData.parentRow;

    // 删除模型行
    this.dataModel.data.splice(rowIndex, 1);

    // 从父行中移除
    if (parentRow) {
        parentRow.childRows.splice(parentRow.childRows.indexOf(rowData.rowID), 1);
    }

    // if (!this.el) {
    //     return;
    // }

    // 焦点转移
    const ri = lastRow ? rowIndex - 1 : rowIndex;
    // const ci = this.getFocusColIndex();

    // 先清空选择模型
    // this.el[0].cleanSelection();

    // 删除界面行
    // this.el[0].deleteGridRow(rowIndex, fireEvent);
    const newState = this.state.updateIn(['dataModel', 'data'], (data) => data.splice(rowIndex, 1));
    this.changeState(newState);

    // 再设置焦点,避免进入编辑状态
    // if (ri >= 0 && ci >= 0) {
    this.setFocusRowIndex(ri);
    //     this.el.setCellFocus(ri, ci);
    // }
};

YIUI.Grid.prototype.loadSubDetail = function () {
    console.error('warning 暂时不支持子明细数据的显示');
    // TODO:子明细数据显示
    // var form = YIUI.FormStack.getForm(this.ofFormID);

    // YIUI.SubDetailUtil.clearSubDetailData(form, this);
    // var showGrid = new YIUI.ShowGridData(form, this);
    // showGrid.load();
};

YIUI.Grid.prototype.deleteGridRow = async function (rowIndex, fireEvent) {
    rowIndex = parseInt(rowIndex, 10);

    const form = YIUI.FormStack.getForm(this.ofFormID);

    const isNeedDelete = function (form, grid, rowIndex) {

        if (isNaN(rowIndex) || rowIndex < 0 || rowIndex >= grid.getRowCount()) {
            return false;
        }

        const row = grid.getRowDataAt(rowIndex);
        if (!row.isDetail) {
            return false;
        }

        if (form.getOperationState() != YIUI.Form_OperationState.Default) {

            if (!grid.newEmptyRow) {
                return true;
            }

            if (YIUI.GridUtil.isEmptyRow(row)) {
                if (rowIndex == grid.getRowCount() - 1) {
                    // return false;
                    //FIXME:暂时处理为空白行也要删除
                    return true;
                }
                if (grid.getRowDataAt(rowIndex + 1).rowType != 'Detail') {
                    return false;
                }
            }
        }
        return true;
    };

    const deleteDir = function (form, grid, rowIndex, fireEvent) {

        // 取出数据
        const row = grid.getRowDataAt(rowIndex);
        const bkmkRow = row.bkmkRow;
        let bookmark;
        if (bkmkRow) {
            if (bkmkRow.getRowType() === YIUI.IRowBkmk.Detail) {
                bookmark = bkmkRow.getBookmark();
            } else {
                bookmark = bkmkRow.getRowArray();
            }
        }

        // 删除影子表数据
        grid.tableKey && deleteShadowRow(form, grid, bookmark);

        // 删除子明细数据
        !grid.hasColExpand && deleteSubDetailData(form, grid, bookmark);

        // 删除数据行
        grid.tableKey && deleteData(form, grid, bookmark);

        // 删除界面行并转移焦点
        ts.deleteRowAt(rowIndex, fireEvent);

        // 删除行事件
        grid.gridHandlerExt.rowDelete(form, grid, rowIndex, fireEvent);
    };

    const deleteData = function (form, grid, bookmark) {
        if (bookmark == undefined)
            return true;
        const dataTable = form.getDocument().getByKey(grid.tableKey);
        if ($.isArray(bookmark)) {
            for (let i = 0, len = bookmark.length; i < len; i++) {
                dataTable.setByBkmk(bookmark[i].getBookmark());
                dataTable.delRow();
            }
        } else {
            dataTable.setByBkmk(bookmark);
            dataTable.delRow();
        }
    };

    const deleteSubDetailData = function (form, grid, bookmark) {
        if (bookmark == undefined)
            return;
        const delTblData = function (tbl) {
            let subTables = form.getDocument().getByParentKey(tbl.key), subTable;
            let OID = tbl.getByKey('OID'), POID;
            for (let i = 0, size = subTables.length; i < size; i++) {
                subTable = subTables[i];
                subTable.afterLast();
                while (subTable.previous()) {
                    POID = subTable.getByKey('POID');
                    if ((POID > 0 && OID === POID) || subTable.getParentBkmk() == tbl.getBkmk()) {
                        delTblData(subTable);
                        subTable.delRow();
                    }
                }
            }
        };
        const table = form.getDocument().getByKey(grid.tableKey);
        table.setByBkmk(bookmark);
        delTblData(table);
    };

    const deleteShadowRow = function (form, grid, bookmark) {
        const doc = form.getDocument(), dataTable = doc.getByKey(grid.tableKey);
        const shadowTbl = doc.getShadow(grid.tableKey);
        if (!shadowTbl)
            return;
        if ($.isArray(bookmark)) {
            for (let i = 0, size = bookmark.length; i < size; i++) {
                dataTable.setByBkmk(bookmark[i]);
                let bookmark = YIUI.ViewUtil.findShadowBkmk(doc, grid.tableKey);
                if (bookmark != -1) {
                    shadowTbl.setByBkmk(bookmark);
                    shadowTbl.setState(DataDef.R_New);// 置为新增状态,直接删除
                    shadowTbl.delRow();
                }
            }
        } else {
            dataTable.setByBkmk(bookmark);
            let bookmark = YIUI.ViewUtil.findShadowBkmk(doc, grid.tableKey);
            if (bookmark != -1) {
                shadowTbl.setByBkmk(bookmark);
                shadowTbl.setState(DataDef.R_New);// 置为新增状态,直接删除
                shadowTbl.delRow();
            }
        }
    };

    const deleteTreeRow = function (form, grid, rowData, fireEvent) {
        let childRows = rowData.childRows, _child;
        if (childRows) {
            for (let i = childRows.length - 1; i >= 0; i--) {
                _child = grid.getRowDataByID(childRows[i]);
                if (!_child.isLeaf && _child.childRows) {
                    deleteTreeRow(form, grid, _child, fireEvent);
                } else {
                    deleteDir(form, grid, grid.getRowIndexByID(childRows[i]), fireEvent);
                }
            }
        }
        deleteDir(form, grid, grid.getRowIndexByID(rowData.rowID), fireEvent);
    };

    const ts = this;

    if (rowIndex == -1 && this.selectFieldIndex != -1) {
        let indexes = [], v;
        for (let i = this.getRowCount() - 1; i >= 0; --i) {
            v = this.getValueAt(i, this.selectFieldIndex);
            if (YIUI.TypeConvertor.toBoolean(v) && isNeedDelete(form, this, i)) {
                indexes.push(i);
            }
        }
        if (indexes.length > 0) {
            for (let i = 0, length = indexes.length; i < length; i++) {
                deleteDir(form, ts, indexes[i], fireEvent);
            }
            return true;
        }
    }

    if (rowIndex == -1) {
        rowIndex = this.getFocusRowIndex();
    }

    if (rowIndex == -1) {
        return;
    }

    if (!isNeedDelete(form, this, rowIndex)) {
        return false;
    }

    const rowData = this.getRowDataAt(rowIndex);
    if (!YIUI.GridUtil.isEmptyRow(rowData)) {
        if (form.getDocument().getByParentKey(this.tableKey).length > 0 && fireEvent) {
            deleteDir(form, ts, rowIndex, fireEvent);
        } else if (ts.treeIndex != -1 && rowData.childRows) {
            deleteTreeRow(form, ts, rowData, fireEvent);
        } else {
            deleteDir(form, ts, rowIndex, fireEvent);
        }
    } else {
        deleteDir(form, ts, rowIndex, fireEvent);
    }
    await form.getUIProcess().doPostDeleteRow(this);
    return true;
};

YIUI.Grid.prototype.setValueAt = async function (rowIndex, colIndex, newValue, commitValue, fireEvent, isData, ignoreChanged, ignoreFireCellValueChanged) {
    if (rowIndex == undefined || rowIndex < 0 || rowIndex > this.getRowCount()) return;
    //var dt = await this.getCellNeedValue(rowIndex, colIndex, newValue, isData);
    if (newValue && newValue.value != undefined) {
        newValue = newValue.value;
    }
    const state = this.state.setIn(['dataModel', 'data', rowIndex, 'data', colIndex, 0], newValue);
    this.changeState(state);
    //this.state = this.state.setIn(['dataModel', 'data', rowIndex, 'data', colIndex, 1], dt[1]);
    const cellKey = this.getCellKey(rowIndex, colIndex);
    if (commitValue && !ignoreChanged) {
        var form = YIUI.FormStack.getForm(this.ofFormID);
        this.gridHandler.setCellValueToDocument(form, this, rowIndex, colIndex, newValue);
        if (!ignoreFireCellValueChanged) {
            await form.getViewDataMonitor().preFireCellValueChanged(this, rowIndex, colIndex, cellKey);
        }
        if (fireEvent) {
            await this.gridHandlerExt.fireEvent(form, this, rowIndex, colIndex);
        }
        await form.getUIProcess().doPostCellValueChanged(this, rowIndex, colIndex, cellKey);
    }
    // AppDispatcher.dispatch(PostChange());
};

YIUI.Grid.prototype.getRowBookmark = function (rowIndex) {
    if (rowIndex == undefined || rowIndex < 0 || rowIndex > this.getRowCount()) {
        return undefined;
    }
    const bkmk = this.state.getIn(['dataModel', 'data', rowIndex, 'bookmark']);
    return bkmk;
}

YIUI.Grid.prototype.load = async function (construct) {
    var form = YIUI.FormStack.getForm(this.ofFormID);

    YIUI.SubDetailUtil.clearSubDetailData(form, this);

    var show = new YIUI.ShowGridData(form, this);
    await show.load(construct);

    // 如果有列变化,在此处refresh
    form.getUIProcess().resetComponentStatus(this);
}

YIUI.Grid.prototype.getHandler = function () {
    return this.gridHandler;
}