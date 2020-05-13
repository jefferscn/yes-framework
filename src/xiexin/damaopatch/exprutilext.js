import { YIUI } from 'yes-core';
import { lodash as $ } from 'yes-common';
import { isOtherField, convertValue } from './common';
// (function () {
//严格模式
'use strict';

YIUI.ExprUtil.getImplValue_old = YIUI.ExprUtil.getImplValue;
YIUI.ExprUtil.getImplValue = function (form, key, cxt, obj) {
    let newForm = form;
    let newObj = obj;
    if (obj && $.isString(obj)) {
        let container = form.getDefContainer();
        if (!container) {
            container = form.getContainer();
        }
        if (container && obj === container.key) {
            newForm = container.form;
            newObj = undefined;
        }
    }

    const doc = newForm.getDocument();
    if (doc == null) {
        return null;
    }
    const cellLocation = newForm.getCellLocation(key);
    let grid;
    if (cellLocation) {
        grid = newForm.getComponent(cellLocation.key);
    }
    let result = null, gridHasData = false;
    if (grid) {
        let rowCont = grid.getRowCount();
        let rowIndex = cxt.rowIndex == undefined ? -1 : cxt.rowIndex;
        if (rowIndex == -1 && cxt.getLoc) {
            rowIndex = cxt.getLoc(grid.key) ? cxt.getLoc(grid.key).getRow() : -1;
        }
        if (rowIndex == -1) {
            rowIndex = grid.getFocusRowIndex();
        }
        cxt.rowIndex = rowIndex;
        gridHasData = rowCont > (rowIndex >= 0 ? rowIndex : 0);
    }
    if (!grid || gridHasData) {
        result = this.getImplValue_old(newForm, key, cxt, newObj);
    }

    if (cellLocation) {
        const dataTable = doc.getByKey(cellLocation.tableKey);
        if (dataTable != null) {
            const col = dataTable.getColByKey(cellLocation.columnKey);
            if (col != null) {
                const dataType = col.type;
                result = YIUI.TypeConvertor.toSafeDataType(dataType, result);
            }
        }
    } else {
        //头控件
        const comp = newForm.getComponent(key);
        if (!comp) {
            return result;
        }
        if (isOtherField(comp.key)) {
            result = convertValue(comp.type, result, comp.multiSelect);
            return result;
        }
        if (!comp.tableKey) {
            return result;
        }
        const dataTable = doc.getByKey(comp.tableKey),
            col = dataTable.getColByKey(comp.columnKey),
            dataType = col.type;
        result = YIUI.TypeConvertor.toSafeDataType(dataType, result);
    }
    return result;
};

// })();