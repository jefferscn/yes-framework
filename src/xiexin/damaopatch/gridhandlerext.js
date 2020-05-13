import { YIUI, View, Svr } from 'yes-core';
import { lodash as $ } from 'yes-common';

// (function () {
//严格模式
'use strict';
// 静态私有方法
// const impl_dependedValueChanged = function (form, grid, rowIndex, target, value) {
//     let loc = form.getCellLocation(target);
//     if (loc.expand) {
//         let columns = loc.columns;
//         for (let i = 0; i < columns.length; i++) {
//             grid.setValueAt(rowIndex, columns[i], value, true, true);
//         }
//     } else {
//         let cellData = grid.getCellDataAt(rowIndex, loc.column);
//         let editOpt = grid.getCellEditOpt(rowIndex, loc.column);
//         //一般情况下明细上不会有多选字典，所以暂时不考虑
//         if ((editOpt.cellType == YIUI.CONTROLTYPE.DICT
//             || editOpt.cellType == YIUI.CONTROLTYPE.DYNAMICDICT
//             || editOpt.cellType == YIUI.CONTROLTYPE.COMPDICT) && cellData && cellData[0] && cellData[0].getOID() > 0) {

//             let editOptions = editOpt.editOptions;

//             let itemKey = editOptions.itemKey,
//                 stateMask = editOptions.stateMask,
//                 itemFilters = editOptions.itemFilters;

//             let cxt = new View.Context(form);
//             cxt.updateLocation(grid.key, rowIndex, loc.column);
//             if (editOpt.cellType == YIUI.CONTROLTYPE.DYNAMICDICT) {
//                 itemKey = YIUI.DictHandler.getItemKey(form, editOptions.refKey, new View.UnitContext({
//                     gridKey: grid.key,
//                     row: rowIndex,
//                     column: loc.column
//                 }));
//             }
//             let dictFilter = YIUI.DictHandler.getDictFilter(form, editOpt.key, itemFilters, itemKey);
//             let item = YIUI.DictService.getItemByOID(
//                 itemKey,
//                 0,
//                 10,
//                 3,
//                 cellData[0].getOID(),
//                 stateMask,
//                 dictFilter,
//                 null,
//                 form.formKey,
//                 target
//             );

//             if (item && item != null) {
//                 let itemData = new YIUI.ItemData(item[0]);
//                 grid.setValueAt(rowIndex, loc.column, itemData, true, true);
//             } else {
//                 grid.setValueAt(rowIndex, loc.column, value, true, true);
//             }
//             if (editOpt.cellType == YIUI.CONTROLTYPE.DYNAMIC) {
//                 grid.refreshDynamicOpt(editOpt, rowIndex, loc.column);
//             }
//         } else {
//             grid.setValueAt(rowIndex, loc.column, value, true, true);
//             if (editOpt.cellType == YIUI.CONTROLTYPE.DYNAMIC) {
//                 grid.refreshDynamicOpt(editOpt, rowIndex, loc.column);
//             }
//         }
//     }
// };

// const applyNewOID = async function () {
//     const paras = {
//         service: 'ApplyNewOID'
//     };
//     const result = await Svr.Request.getData(paras);
//     const oid = result.OID;
//     return oid;
// };

// const setSystemColumIfNull = function (doc, table, parentTable) {
//     const oid = YIUI.TypeConvertor.toLong(table.getByKey(YIUI.SystemField.OID_SYS_KEY));
//     const soid = YIUI.TypeConvertor.toLong(table.getByKey(YIUI.SystemField.SOID_SYS_KEY));
//     const poid = YIUI.TypeConvertor.toLong(table.getByKey(YIUI.SystemField.POID_SYS_KEY));
//     if (oid <= 0) {
//         table.setByKey(YIUI.SystemField.OID_SYS_KEY, applyNewOID());
//     }
//     if (soid <= 0) {
//         table.setByKey(YIUI.SystemField.SOID_SYS_KEY, doc.oid);
//     }

//     if (parentTable && poid <= 0) {
//         let parentOID = YIUI.TypeConvertor.toLong(parentTable.getByKey(YIUI.SystemField.OID_SYS_KEY));
//         if (parentOID > 0) {
//             table.setByKey(YIUI.SystemField.POID_SYS_KEY, parentOID);
//         }
//     }
// };

export default YIUI.GridHandlerExt = $.extend({}, {
    // setCellValueToDataTable: function (form, grid, table, editOpt, cellData) {
    //     var columnKey = editOpt.columnKey;

    //     if (!columnKey)
    //         return;
    //     const cellType = editOpt.cellType;
    //     const newValue = cellData;

    //     switch (cellType) {
    //         case YIUI.CONTROLTYPE.DYNAMICDICT:
    //         case YIUI.CONTROLTYPE.DICT:
    //             const editOptions = editOpt.editOptions;
    //             if (newValue == null) {
    //                 if (editOptions.allowMultiSelection) {  // TODO itemkey 没清空
    //                     table.setByKey(columnKey, null);
    //                 } else {
    //                     table.setByKey(columnKey, 0);
    //                 }
    //                 break;
    //             }
    //             if (editOptions.allowMultiSelection) {
    //                 var oids = [], itemKey = "";
    //                 if (editOptions.isCompDict) {
    //                     $.error($.ygrid.formatString($.ygrid.compDictNotDataBinding, editOpt.key))
    //                 }
    //                 for (var i = 0, len = newValue.length; i < len; i++) {
    //                     oids.push(newValue[i].oid);
    //                     oids.push(",");
    //                 }
    //                 if (oids && oids.length > 0) {
    //                     oids.pop();
    //                     itemKey = newValue[0].itemKey;
    //                 }
    //                 table.setByKey(columnKey, oids.join(""));
    //                 if (cellType == YIUI.CONTROLTYPE.DYNAMICDICT) {
    //                     table.setByKey(columnKey + "ItemKey", itemKey);
    //                 }
    //             } else {
    //                 table.setByKey(columnKey, newValue.oid);
    //                 if (cellType == YIUI.CONTROLTYPE.DYNAMICDICT || cellType == YIUI.CONTROLTYPE.COMPDICT) {
    //                     table.setByKey(columnKey + "ItemKey", newValue.itemKey);
    //                 }
    //             }
    //             break;
    //         case YIUI.CONTROLTYPE.DYNAMIC:
    //             this.setDynamicCellValueToDataTable(form, grid, table, editOpt, cellData);
    //             break;
    //         default:
    //             const dataType = table.getColByKey(columnKey).type;
    //             table.setByKey(columnKey, grid.convertValue(newValue, dataType));
    //             break;
    //     }
    // },
    // flushRow: function (form, grid, rowIndex) {
    //     let rowData = grid.getRowDataAt(rowIndex),
    //         metaRow = grid.getMetaObj().rows[rowData.metaRowIndex],
    //         table = form.getDocument().getByKey(grid.tableKey),
    //         viewRow,
    //         rowBkmk;
    //     if (grid.hasColumnExpand()) {
    //         let expandModel = grid.dataModel.expandModel;
    //         let cellData,
    //             metaCell,
    //             crossValue,
    //             areaIndex,
    //             viewRow = new YIUI.ExpandRowBkmk(expandModel.length);
    //         rowBkmk = [];
    //         for (let i = 0, len = rowData.data.length; i < len; i++) {
    //             cellData = rowData.data[i];
    //             metaCell = metaRow.cells[i];
    //             if (metaCell.isColExpand) {
    //                 crossValue = metaCell.crossValue;
    //                 areaIndex = metaCell.columnArea;

    //                 let detailViewRow = viewRow.getAtArea(areaIndex, crossValue);

    //                 if (!detailViewRow) {
    //                     table.addRow(true);
    //                     setSystemColumIfNull(form.getDocument(), table);

    //                     detailViewRow = new YIUI.DetailRowBkmk(table.getBkmk());
    //                     viewRow.add(areaIndex, crossValue, detailViewRow);

    //                     //扩展数据赋值
    //                     let expInfo = expandModel[areaIndex],
    //                         node,
    //                         expKey;
    //                     for (let k = 0, cLen = crossValue.values.length; k < cLen; k++) {
    //                         node = crossValue.values[k];
    //                         expKey = expInfo[k];
    //                         if (expKey !== undefined && expKey !== null && expKey.length > 0) {
    //                             table.setByKey(expKey, node.value);
    //                         }
    //                     }
    //                 }
    //                 //当前单元格赋值
    //                 this.setCellValueToDataTable(form, grid, table, metaCell, cellData);
    //             }
    //         }
    //         for (let m = 0, size = viewRow.size(); m < size; m++) {
    //             table.setByBkmk(viewRow.getAt(m).getBookmark());
    //             for (let n = 0, length = rowData.data.length; n < length; n++) {
    //                 metaCell = metaRow.cells[n];
    //                 if (!metaCell.isColExpand) {
    //                     this.setCellValueToDataTable(form, grid, table, metaCell, rowData.data[n]);
    //                 }
    //             }
    //         }
    //     } else {
    //         table.addRow(true);
    //         this.processHeadValue(form, grid.tableKey, table, form.getDocument());
    //         // 设置维度值
    //         let dimValue = metaRow.dimValue, dimNode;
    //         if (dimValue) {
    //             for (let l = 0, size = dimValue.size(); l < size; l++) {
    //                 dimNode = dimValue.getValue(l);
    //                 table.setByKey(dimNode.getColumnKey(), grid.convertValue(dimNode.getValue(), dimNode.getDataType()));
    //             }
    //         }
    //         for (let k = 0, len = rowData.data.length; k < len; k++) {
    //             let metaCell = metaRow.cells[k];
    //             this.setCellValueToDataTable(form, grid, table, metaCell, rowData.data[k][0]);
    //         }

    //         viewRow = new YIUI.DetailRowBkmk(table.getBkmk());
    //         rowBkmk = table.getBkmk();
    //         let pTable;
    //         if (grid.isSubDetail) {
    //             let pGrid = YIUI.SubDetailUtil.getBindingGrid(form, grid),
    //                 parentRow = pGrid.getRowDataAt(pGrid.getFocusRowIndex());
    //             pTable = form.getDocument().getByKey(pGrid.tableKey);
    //             if (!parentRow) {
    //                 table.rows[table.pos].parentBkmk = pTable.pos;
    //                 pTable.setByBkmk(pTable.pos);
    //             } else {
    //                 table.rows[table.pos].parentBkmk = parentRow.bkmkRow.getBookmark();
    //                 pTable.setByBkmk(parentRow.bkmkRow.getBookmark());
    //             }

    //         }
    //         setSystemColumIfNull(form.getDocument(), table, pTable);

    //         //把空行移除
    //         let emptyGridRowValues = form.document.emptyGridRowValues;
    //         if (emptyGridRowValues && emptyGridRowValues[grid.tableKey]) {
    //             emptyGridRowValues[grid.tableKey] = null;
    //         }
    //     }
    //     //TODO：目前exprutil.js中（仅有此处）还需要这个属性，但平台正在删除。
    //     //     先放着，扩展的js都不要用这个属性
    //     // rowData.bkmkRow = viewRow;
    //     rowData.bookmark = rowBkmk;

    //     const state = grid.state.setIn(['dataModel', 'data', rowIndex, 'bookmark'], rowBkmk);
    //     grid.changeState(state);
    //     return rowData;
    // },

    // processHeadValue: function (form, tableKey, table, document) {
    //     let headValues = document.headValues || {};
    //     for (let fieldKey in headValues) {
    //         let meta = form.getMetaComp(fieldKey);
    //         if (meta && meta.tableKey && meta.tableKey.toLowerCase() == tableKey.toLowerCase()) {
    //             table.setByKey(meta.columnKey, headValues[fieldKey]);
    //         }
    //     }
    // },
    // /**
    //  *处理表格值变化时需要发生的相关事件
    //  */
    fireEvent: function (form, grid, rowIndex, colIndex) {
        const row = grid.getRowDataAt(rowIndex), cellKey = row.cellKeys[colIndex];
        //                editOpt = grid.dataModel.colModel.cells[cellKey];
        // const loc = form.getCellLocation(cellKey);
        // const editOpt = grid.getCellEditOpt(rowIndex, loc.column);

        //     // 触发事件
        //     //form.getViewDataMonitor().fireCellValueChanged(grid, rowIndex, colIndex,cellKey);
        //     const metaRow = grid.getMetaObj().rows[row.metaRowIndex];
        this.uiProcess = new YIUI.UIProcess(form);
        this.uiProcess.doCellValueChanged(grid, rowIndex, colIndex, cellKey);
        //     // YIUI.GridSumUtil.evalAffectSum(form, grid, rowIndex, colIndex);

        //     // if (grid.isEnable() && grid.newEmptyRow && editOpt && editOpt.columnKey) {

        //     //     const index = grid.appendEmptyRow(rowIndex);
        //     //     const newRowIndex = rowIndex + 1; //上面的方法没有正确返回新行
        //     //     const gridKey = grid.key;
        //     //     //                let calcProcess = new YIUI.UICalcProcess(form);
        //     //     //                let result = calcProcess.richDocumentGridEmptyRow(gridKey);
        //     //     //                //处理空白行显示
        //     //     //                calcProcess.showEmptyRowDirtyValues(result,gridKey);
        //     //     if (!grid.getMetaObj().hideGroup4Editing && row.inAutoGroup) {
        //     //         for (let i = rowIndex - 1; i >= 0; i--) {
        //     //             let pRow = grid.dataModel.data[i];
        //     //             if (!pRow.inAutoGroup) break;
        //     //             pRow.inAutoGroup = false;
        //     //         }
        //     //         row.inAutoGroup = false;
        //     //         for (let ind = rowIndex + 1, len = grid.dataModel.data.length; ind < len; ind++) {
        //     //             let nRow = grid.dataModel.data[ind];
        //     //             if (!nRow.inAutoGroup) break;
        //     //             nRow.inAutoGroup = false;
        //     //         }
        //     //         grid.appendEmptyGroup();
        //     //     }
        //     // }
        //     // let sr = grid.el[0].p.selectRow, sc = grid.el[0].p.selectCell;
        //     // if ( sr && sc ) {
        //     //     grid.el.setGridParam({selectRow: sr, selectCell: sc});
        //     // }
    },

    // setDtlValueToDoc: function (form, grid, rowIndex, colIndex) {
    //     const editOpt = grid.getCellEditOpt(rowIndex, colIndex),
    //         rowData = grid.getRowDataAt(rowIndex),
    //         cellData = rowData.data[colIndex],
    //         doc = form.getDocument(),
    //         sIndex = grid.selectFieldIndex;

    //     let newValue = cellData[0];

    //     if (sIndex == colIndex && rowData.rowType === 'Detail') {
    //         this.selectRow(form, grid, rowIndex, colIndex, newValue);
    //     }

    //     if (!doc || !editOpt.hasDB)
    //         return;

    //     let table = doc.getByKey(grid.tableKey);

    //     let bkmkRow = rowData.bookmark;

    //     if (rowData.rowType === 'Detail' && bkmkRow == undefined) {
    //         this.flushRow(form, grid, rowIndex);
    //         if (!editOpt.isColExpand) {
    //             this.setCellValueToDataTable(form, grid, table, editOpt, cellData);
    //         }
    //         grid.loadSubDetail();

    //         this.dealWithSequence(form, grid, rowIndex);
    //         this.dealWithSystemField(form, grid, rowIndex);
    //     } else {
    //         if (grid.hasColumnExpand()) {
    //             // if (editOpt.isColExpand) {
    //             //     let crossValue = editOpt.crossValue,
    //             //         areaIndex = editOpt.columnArea;

    //             //     let cellBkmk = bkmkRow.getAtArea(areaIndex, crossValue);

    //             //     if (!cellBkmk) {
    //             //         table.addRow(true);

    //             //         cellBkmk = new YIUI.DetailRowBkmk(table.getBkmk());
    //             //         bkmkRow.add(areaIndex, crossValue, cellBkmk);

    //             //         // 扩展数据赋值
    //             //         let expInfo = grid.dataModel.expandModel[areaIndex],
    //             //             node;
    //             //         for (let k = 0, count = crossValue.values.length; k < count; k++) {
    //             //             node = crossValue.values[k];

    //             //             table.setByKey(expInfo[k], node.value);
    //             //         }

    //             //         // 刷入非拓展字段
    //             //         const metaRow = grid.getMetaObj().rows[rowData.metaRowIndex];
    //             //         let cellEditOpt;
    //             //         for (let i = 0, size = metaRow.cells.length; i < size; i++) {//循环单元格
    //             //             cellEditOpt = metaRow.cells[i];
    //             //             if (!cellEditOpt.isColExpand) {
    //             //                 if (!cellEditOpt.isColExpand && cellEditOpt.columnKey == YIUI.SystemField.OID_SYS_KEY) {
    //             //                     let oid = YIUI.TypeConvertor.toLong(table.getByKey(YIUI.SystemField.OID_SYS_KEY));
    //             //                     if (oid <= 0) {
    //             //                         table.setByKey(YIUI.SystemField.OID_SYS_KEY, applyNewOID());
    //             //                     }
    //             //                 } else {
    //             //                     this.setCellValueToDataTable(form, grid, table, cellEditOpt, rowData.data[i]);
    //             //                 }
    //             //             }
    //             //         }
    //             //     } else {
    //             //         table.setByBkmk(cellBkmk.getBookmark());
    //             //     }
    //             //     this.setCellValueToDataTable(form, grid, table, editOpt, cellData);
    //             // } else {
    //             //     for (let i = 0, len = bkmkRow.size(); i < len; i++) {
    //             //         table.setByBkmk(bkmkRow.getAt(i).getBookmark());
    //             //         this.setCellValueToDataTable(form, grid, table, editOpt, cellData);
    //             //     }
    //             // }
    //         } else {
    //             table.setByBkmk(bkmkRow);
    //             this.setCellValueToDataTable(form, grid, table, editOpt, cellData);
    //         }
    //     }
    //     // 设置子明细头控件的值
    //     let coms = form.subDetailInfo[editOpt.key];
    //     if (coms) {
    //         for (let i = 0, len = coms.length; i < len; i++) {
    //             form.getComponent(coms[i]).setValue(newValue, false, false);
    //         }
    //     }

    //     // 设置影子表的值
    //     // this.setValue2ShadowTable(form, grid, editOpt, table);
    // },
    // /**
    //     dataTable新增一行后会生成OID，如果Grid行中设置了OID和SOID的显示字段，需要将DataTable系统字段值填到GridRow中
    // **/
    // dealWithSystemField: function (form, grid, rowIndex) {
    //     let rowData = grid.getRowDataAt(rowIndex),
    //         bkmkRow = rowData.bkmkRow;
    //     if (rowData.rowType === 'Detail' && !bkmkRow) {
    //         return;
    //     }
    //     let table = form.getDocument().getByKey(grid.tableKey);
    //     if (grid.hasColumnExpand()) {
    //         let expandModel = grid.dataModel.expandModel;
    //         let hasExpandSystemField = false;
    //         for (let expandIndex = 0, expandLen = expandModel.size; expandIndex < expandLen; expandIndex++) {
    //             if (expandModel[expandIndex] == YIUI.SystemField.OID_SYS_KEY || expandModel[expandIndex] == YIUI.SystemField.SOID_SYS_KEY) {
    //                 hasExpandSystemField = true;
    //                 break;
    //             }
    //         }
    //         if (hasExpandSystemField) {
    //             //一般不会对OID和SOID字段做扩展，如果有到时根据实际情况处理
    //         } else {
    //             table.setByBkmk(bkmkRow.getRowArray()[0].bookmark);
    //             this.setSystemFieldInGridFromDtl(grid, rowIndex, table);
    //         }
    //     } else {
    //         table.setByBkmk(bkmkRow.getBookmark());
    //         this.setSystemFieldInGridFromDtl(grid, rowIndex, table);
    //     }

    // },
    // setSystemFieldInGridFromDtl: function (grid, rowIndex, table) {
    //     let oid = table.getByKey(YIUI.SystemField.OID_SYS_KEY);
    //     let soid = table.getByKey(YIUI.SystemField.SOID_SYS_KEY);
    //     let rowData = grid.getRowDataAt(rowIndex),
    //         metaRow = grid.getMetaObj().rows[rowData.metaRowIndex];
    //     let fieldCount = 0, metaCell;
    //     for (let j = 0, jLen = rowData.data.length; j < jLen; j++) {
    //         metaCell = metaRow.cells[j];
    //         if (metaCell.columnKey === undefined || metaCell.columnKey === '') {
    //             continue;
    //         }
    //         if (metaCell.columnKey == YIUI.SystemField.OID_SYS_KEY) {
    //             // let colInfoes = grid.getColInfoByKey(metaCell.key);
    //             // for (let i = 0, len = colInfoes.length; i < len; i++) {
    //             grid.setValueAt(rowIndex, j, oid, false, false, true);
    //             // }
    //             // grid.setValueByKey(rowIndex, metaCell.key, oid, false, false);
    //             fieldCount += 1;
    //         }
    //         if (metaCell.columnKey == YIUI.SystemField.SOID_SYS_KEY) {
    //             grid.setValueAt(rowIndex, j, soid, false, false, true);
    //             //grid.setValueByKey(rowIndex, metaCell.key, soid, false, false);
    //             fieldCount += 1;
    //         }
    //         if (fieldCount >= 2) {
    //             break;
    //         }
    //     }
    // },

    // dependedValueChange: function (form, grid, target, depend, value) {
    //     let loc = form.getCellLocation(target);
    //     if (loc) {
    //         if (loc.row == null || loc.row == -1) {
    //             for (let i = 0, len = grid.getRowCount(); i < len; i++) {
    //                 let row = grid.getRowDataAt(i);
    //                 if (row.rowType == 'Detail' && row.bkmkRow) {
    //                     impl_dependedValueChanged(form, grid, i, target, value);
    //                 }
    //             }
    //         } else {
    //             impl_dependedValueChanged(form, grid, loc.row, target, value);
    //         }
    //     } else {
    //         if (grid.key === target) {
    //             grid.load(true);
    //         }
    //     }
    // },
    // dependedCellValueChange: function (form, grid, rowIndex, depend, target, value) {
    //     impl_dependedValueChanged(form, grid, rowIndex, target, value);
    // },


    // // 使界面中DBColumnName为“Sequence”的组件显示DataTable中Sequence的值
    // setSeqInGridFromDtl: function (grid) {
    //     let formID = grid.ofFormID,
    //         form = YIUI.FormStack.getForm(formID),
    //         cellKey, row,
    //         SYS_SEQUENCE = YIUI.SystemField.SEQUENCE_FIELD_KEY,
    //         dataTable = form.getDocument().getByKey(grid.tableKey),
    //         seqIndex = dataTable.indexByKey(SYS_SEQUENCE);

    //     if (seqIndex == -1) {
    //         return;
    //     }

    //     // 界面中DBColumnName为“Sequence”的组件Key
    //     for (let i = 0, len = grid.dataModel.data.length; i < len; i++) {
    //         row = grid.dataModel.data[i];
    //         if (!row.isDetail || row.bookmark == undefined) {
    //             // 对于表格新增行，row.bookmark 是undefined， 但是也要对它的Seq处理
    //             //continue;
    //         }
    //         for (let j = 0, len1 = row.cellKeys.length; j < len1; j++) {
    //             let loc = form.getCellLocation(row.cellKeys[j]);
    //             let editOpt = grid.getCellEditOpt(i, loc.column);
    //             //                    let editOpt = grid.dataModel.colModel.cells[row.cellKeys[j]];
    //             if (editOpt == undefined
    //                 || editOpt.columnKey === undefined
    //                 || editOpt.columnKey === '')
    //                 continue;
    //             if (editOpt.columnKey.equalsIgnoreCase(SYS_SEQUENCE)) {
    //                 cellKey = row.cellKeys[j];
    //                 break;
    //             }
    //         }
    //         if (cellKey) {
    //             let newValue;
    //             if (dataTable.size() > 0) {
    //                 if (!row.bkmkRow) {
    //                     if (grid.parentGridKey != '') {
    //                         let subTables = form.getDocument().getByParentKey(grid.parentGridKey);
    //                         if (subTables.length == 0) {
    //                             newValue = 1;
    //                         } else {
    //                             newValue = dataTable.getByKey(SYS_SEQUENCE) + 1;
    //                         }
    //                     } else {
    //                         newValue = dataTable.getByKey(SYS_SEQUENCE) + 1;
    //                     }
    //                 } else {
    //                     let bkmk = row.bkmkRow.bookmark;
    //                     dataTable.setByBkmk(bkmk);
    //                     newValue = dataTable.getByKey(SYS_SEQUENCE);
    //                 }
    //             } else {
    //                 newValue = 1;
    //             }
    //             grid.setValueByKey(i, cellKey, newValue, false, false);
    //         }
    //     }
    // },

    // // 增加了对方法setSeqInGridFromDtl的调用
    // dealWithSequence: function (form, grid, rowIndex) {
    //     let SYS_SEQUENCE = YIUI.SystemField.SEQUENCE_FIELD_KEY;
    //     let dataTable = form.getDocument().getByKey(grid.tableKey);
    //     let seqIndex = dataTable.indexByKey(SYS_SEQUENCE);
    //     if (seqIndex == -1) {
    //         return;
    //     }
    //     let row, bkmk, seq, curSeq = 0;
    //     for (let i = rowIndex - 1; i >= 0; --i) {
    //         row = grid.dataModel.data[i];

    //         if (!row.isDetail || !row.bkmkRow) {
    //             continue;
    //         }

    //         bkmk = row.bkmkRow;
    //         if (grid.hasColumnExpand()) {
    //             dataTable.setByBkmk(bkmk.getAt(0).getBookmark());
    //         } else {
    //             dataTable.setByBkmk(bkmk.getBookmark());
    //         }
    //         curSeq = parseInt(dataTable.getByKey(SYS_SEQUENCE));
    //         break;
    //     }
    //     if (grid.getMetaObj().serialSeq) {
    //         for (let i = rowIndex, len = grid.dataModel.data.length; i < len; i++) {
    //             row = grid.dataModel.data[i];
    //             if (!row.isDetail || !row.bkmkRow) continue;
    //             bkmk = row.bkmkRow.bookmark;
    //             if (grid.hasColumnExpand()) {
    //                 dataTable.setByBkmk(bkmk[0]);
    //                 seq = ++curSeq;
    //                 for (let j = 0, jlen = bkmk.length; j < jlen; j++) {
    //                     dataTable.setByBkmk(bkmk[j]);
    //                     dataTable.setByKey(SYS_SEQUENCE, seq);
    //                 }
    //             } else {
    //                 dataTable.setByBkmk(bkmk);
    //                 dataTable.setByKey(SYS_SEQUENCE, ++curSeq);
    //             }
    //         }
    //         this.setSeqInGridFromDtl(grid);
    //     } else {
    //         for (let i = rowIndex, len = grid.dataModel.data.length; i < len; i++) {
    //             row = grid.dataModel.data[i];
    //             if (!row.isDetail || !row.bkmkRow) {
    //                 continue;
    //             }
    //             bkmk = row.bkmkRow;
    //             if (grid.hasColumnExpand()) {
    //                 dataTable.setByBkmk(bkmk.getAt(0).getBookmark());
    //                 seq = parseInt(dataTable.getByKey(SYS_SEQUENCE));
    //                 if (seq == undefined || seq == null || seq <= curSeq) {
    //                     seq = curSeq + 1;
    //                     for (let j = 0, jlen = bkmk.size(); j < jlen; j++) {
    //                         dataTable.setByBkmk(bkmk.getAt(j).getBookmark());
    //                         dataTable.setByKey(SYS_SEQUENCE, seq);
    //                     }
    //                 } else {
    //                     break;
    //                 }
    //             } else {
    //                 dataTable.setByBkmk(bkmk.getBookmark());
    //                 seq = parseInt(dataTable.getByKey(SYS_SEQUENCE));
    //                 if (seq == undefined || seq == null || seq <= curSeq) {
    //                     seq = curSeq + 1;
    //                     dataTable.setByKey(SYS_SEQUENCE, seq);
    //                 } else {
    //                     break;
    //                 }
    //             }
    //             curSeq = seq;
    //         }
    //     }
    // },

    // // 增加了对方法setSeqInGridFromDtl的调用
    // doExchangeRow: function (grid, rowIndex, excIndex) {
    //     let row = grid.getRowDataAt(rowIndex),
    //         excRow = grid.getRowDataAt(excIndex);

    //     grid.dataModel.data.splice(rowIndex, 1, excRow);
    //     grid.dataModel.data.splice(excIndex, 1, row);

    //     this.exchangeRowSequence(grid, rowIndex, excIndex);

    //     grid.el.exchangeRow(rowIndex, excIndex);

    //     this.setSeqInGridFromDtl(grid);
    // },
    /**
     * 表格行点击
     */
    doOnRowClick: function (grid, rowIndex) {

        let rowClick = grid.getMetaObj().rowClick;

        if (rowClick) {
            let formID = grid.ofFormID,
                form = YIUI.FormStack.getForm(formID),
                cxt = new View.Context(form);
            cxt.setGrid(grid);//与平台不同之处
            cxt.updateLocation(grid.key, rowIndex, -1);

            form.eval(rowClick, cxt, null);
        }
    },
    /**
     * 表格行双击事件
     * 与平台不同之处在于设置了当前grid到Context中
     */
    doOnRowDblClick: function (grid, rowIndex) {

        let rowDblClick = grid.getMetaObj().rowDblClick;

        if (rowDblClick) {
            let formID = grid.ofFormID,
                form = YIUI.FormStack.getForm(formID),
                cxt = new View.Context(form);

            cxt.updateLocation(grid.key, rowIndex, -1);
            cxt.setGrid(grid);//与平台不同之处

            form.eval(rowDblClick, cxt, null);
        }

    },
    /**
     * 单元格单击事件， 用于表格的checkbox , button , hyperlink
     */
    doOnCellClick: function (grid, rowIndex, colIndex, value) {
        let form = YIUI.FormStack.getForm(grid.ofFormID),
            rowData = grid.getRowDataAt(rowIndex),
            editOpt = grid.getMetaObj().rows[rowData.metaRowIndex].cells[colIndex];

        switch (editOpt.editOptions.cellType) {
            case YIUI.CONTROLTYPE.BUTTON:
            case YIUI.CONTROLTYPE.HYPERLINK:
            case YIUI.CONTROLTYPE.IMAGE:
            case YIUI.CONTROLTYPE.TEXTBUTTON:
                if (editOpt.editOptions.onClick) {
                    let cxt = new View.Context(form);
                    cxt.updateLocation(grid.key, rowIndex, colIndex);
                    cxt.setGrid(grid);//与平台不同之处
                    form.eval($.trim(editOpt.editOptions.onClick), cxt, null);
                }
                break;
        }
    },
    rowDelete: function (form, grid, rowIndex, fireEvent) {
        if (!fireEvent) {
            return;
        }

        // grid.refreshIndex(rowIndex);

        YIUI.GridLookupUtil.updateFixPos(form, grid);

        grid.loadSubDetail();

        // grid.refreshSelectAll();

        form.getUIProcess().doPostDeleteRow(grid);

        if (grid.serialSeq) {
            this.dealWithSequence(form, grid, rowIndex);
        }

        const metaObj = grid.getMetaObj();
        if (metaObj.rowDelete) {
            let cxt = new View.Context(form);
            form.eval(metaObj.rowDelete, cxt, null);
        }
    }

});
// })();