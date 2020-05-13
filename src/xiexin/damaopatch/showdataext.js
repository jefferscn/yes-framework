import { YIUI } from 'yes-core';
import { isOtherField } from './common';

// (function () {
//严格模式
'use strict';
YIUI.ShowData_old = YIUI.ShowData || {};
YIUI.ShowData = function (form) {
    var result = new YIUI.ShowData_old(form);

    /**
        * 默认不提交值,下推后提交值
        * @param commitValue 是否提交值
        * @returns {boolean}
        */
    result.show = async function (commitValue) {
        form.setShowing(true);
        console.time('prepare');
        this.prepare();
        console.timeEnd('prepare');
        console.time('load data');
        var cmpList = form.getComponentList(), cmp;
        for (var i in cmpList) {
            cmp = cmpList[i];
            if (cmp.isSubDetail) continue;
            switch (cmp.type) {
                case YIUI.CONTROLTYPE.LISTVIEW:
                    this.loadListView(cmp);
                    break;
                case YIUI.CONTROLTYPE.GRID:
                    cmp.rootGroupBkmk = null;
                    this.loadGrid(cmp);
                    break;
                case YIUI.CONTROLTYPE.CHART:
                    this.loadChart(cmp);
                    break;
                case YIUI.CONTROLTYPE.BPM_GRAPH:
                    this.loadBPMGraph(cmp);
                    break;
                default:
                    // if (cmp.hasDataBinding()) {
                    // if (cmp.needClean()) {
                    //     cmp.setValue(null);
                    // }
                    this.loadHeader(cmp);
                    // }
                    break;
            }
        }
        console.timeEnd('load data');
        await this.postShowData(commitValue);
        form.setShowing(false);
        return true;
    };
    result.loadHeader = function (cmp) {
        var document = form.getDocument();
        var tableKey = cmp.getMetaObj().tableKey;
        var table = tableKey && document.getByKey(tableKey);
        var columnKey = cmp.getMetaObj().columnKey, value = undefined;
        if (isOtherField(cmp.key)) {
            value = document.otherFieldValues[cmp.key];
        } else if (!table) {
            value = document.headValues[cmp.key];
        } else {
            if (table.getRowCount() > 0) {
                if (table.first()) {
                    value = table.getByKey(columnKey);
                }
            } else if (table.tableMode == YIUI.TableMode.DETAIL) {
                value = document.headValues[cmp.key];
            }
        }
        if (value != undefined) {
            if (cmp.type == YIUI.CONTROLTYPE.DYNAMICDICT) {
                let itemKey;
                if (table) {
                    itemKey = table.getByKey(columnKey + 'ItemKey');
                } else {
                    const itemCmp = form.getComponent(cmp.key + 'ItemKey');
                    const itemTableKey = itemCmp.getMetaObj().tableKey;
                    const itemTable = itemTableKey && document.getByKey(itemTableKey);
                    itemKey = itemTable.getByKey(itemCmp.getMetaObj().columnKey);
                }
                cmp.itemKey = itemKey;
            }
            cmp.setValue(value, false, false, true, false);
        }
    };
    return result;
};
YIUI.ShowSubDetailData_Old = YIUI.ShowSubDetailData || {};
YIUI.ShowSubDetailData = function (form, grid) {
    var result = new YIUI.ShowSubDetailData_Old(form, grid);
    result.loadHeader = function (rowIndex, com) {
        var meta = com.getMetaObj();
        var cellKey = meta.bindingCellKey;
        if (cellKey) {
            var value = grid.getValueByKey(rowIndex, cellKey);
            com.setValue(value, false, false);
        } else if (meta.tableKey && meta.columnKey) {
            var table = form.getDocument().getByKey(meta.tableKey);
            var rowData = grid.getRowDataAt(rowIndex);
            table.setByBkmk(rowData.bkmkRow.getBookmark());
            value = table.getByKey(meta.columnKey);
            com.setValue(value, false, false);
        }
    };
    return result;
};
// })();