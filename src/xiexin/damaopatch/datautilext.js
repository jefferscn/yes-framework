import { YIUI, Svr, DataDef } from 'yes-core';
import { lodash as $ } from 'yes-common';
import Decimal from 'decimal.js';
import './datatypeext';
// (function () {
//严格模式
'use strict';
YIUI.DataUtil = $.extend(YIUI.DataUtil, {
    applyNewOID: async function () {
        const paras = {
            service: 'ApplyNewOID',
            random: Math.random(),
        };
        const result = await Svr.Request.getData(paras);
        const oid = result.OID;
        return oid;
    },
    toJSONDoc: function (doc, withShadow) {
        if (!doc) return;

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

        for (let key in keys) {
            if (withShadow) {
                dt = doc.getShadow(key);
                dt = dt == null ? doc.getByKey(key) : dt;
            } else {
                dt = doc.getByKey(key);
            }

            table = this.toJSONDataTable(dt);
            table_list.push(table);
        }

        // let maps = doc.maps.table, map;
        // for (let i in maps) {
        //     map = maps[i];
        //     table = this.toJSONDataTable(map);
        //     table_list.push(table);
        // }

        json.table_list = table_list;
        json.expand_data = doc.expData;
        json.expand_data_type = doc.expDataType;
        json.expand_data_class = doc.expDataClass;
        json.mainTableKey = doc.mainTableKey;
        json.object_key = doc.object_key;
        json.documentid = doc.documentid;
        json.headValues = doc.headValues;
        json.otherFieldValues = doc.otherFieldValues;
        json.emptyGridRowValues = doc.emptyGridRowValues;
        json.tableFilter = doc.tableFilter;
        return json;
    },

    toJSONDataTable: function (dataTable) {
        if (!dataTable) return;

        let table = {};
        table.key = dataTable.key;
        table.bookmark_seed = dataTable.bkmkSeed;
        table.tableMode = dataTable.tableMode;

        let cols = dataTable.cols, col, columns = [], column;
        for (let k = 0, length = cols.length; k < length; k++) {
            col = cols[k];
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

        let valsToJSON = function (vals) {

            let arr = [];
            for (let i = 0, len = vals.length; i < len; i++) {
                if (vals[i] instanceof Date) {
                    arr.push(vals[i].getTime());
                } else {
                    arr.push(vals[i]);
                }
            }

            return arr;
        };

        let allRows = dataTable.allRows,
            row, all_data_rows = [], all_data_row;
        for (let j = 0, len = allRows.length; j < len; j++) {
            row = allRows[j];
            all_data_row = {};
            all_data_row.data = valsToJSON(row.vals);
            all_data_row.row_bookmark = row.bkmk;
            all_data_row.row_parent_bookmark = row.parentBkmk;
            all_data_row.row_state = row.state;
            if (row.orgVals) {
                all_data_row.originaldata = valsToJSON(row.orgVals);
            }
            all_data_rows.push(all_data_row);
        }
        table.all_data_rows = all_data_rows;


        return table;
    },

    fromJSONDoc: function (document) {
        if (!document) return;

        let doc = new DataDef.Document();
        doc.headValues = {};
        doc.tableFilter = {};

        if (document.oid) {
            doc.oid = document.oid;
        }
        if (document.poid) {
            doc.poid = document.poid;
        }
        doc.documentid = document.documentid || 1;
        doc.form_OperationState = document.form_OperationState || YIUI.Form_OperationState.Default;
        doc.verid = document.verid || 0;
        doc.dverid = document.dverid || 0;

        doc.state = document.state || 0;

        doc.mainTableKey = document.mainTableKey || '';

        if (document.document_type) {
            doc.docType = document.document_type;
        }
        if (document.table_list) {
            let dataTable, doc_tableList = document.table_list, doc_table, tableKey;
            for (let j = 0; j < doc_tableList.length; j++) {
                doc_table = doc_tableList[j];
                tableKey = doc_table.key;
                dataTable = this.fromJSONDataTable(doc_table);
                doc.add(tableKey, dataTable);
            }
        }
        doc.object_key = document.object_key;
        doc.documentid = document.documentid;
        doc.expData = document.expand_data;
        doc.expDataType = document.expand_data_type;
        doc.expDataClass = document.expand_data_class;
        doc.headValues = document.headValues || {};
        doc.otherFieldValues = document.otherFieldValues || {};
        doc.emptyGridRowValues = document.emptyGridRowValues;
        doc.tableFilter = document.tableFilter || {};
        return doc;
    },

    fromJSONDataTable: function (jsondt) {
        if (!jsondt) return null;

        let dataTable = new DataDef.DataTable();

        dataTable.key = jsondt.key;
        dataTable.parentKey = jsondt.parentKey;
        dataTable.tableMode = jsondt.tableMode;
        let docTable = jsondt,
            allDataRows = docTable.all_data_rows,
            columns = docTable.columns;
        for (let j = 0; j < columns.length; j++) {
            let column = columns[j];
            dataTable.addCol(column.key, column.data_type, column.user_type, column.accesscontrol, column.defaultValue, column.isPrimary);
        }
        let dataRow, len, row, val, col;

        for (let i = 0; i < allDataRows.length; i++) {
            dataRow = allDataRows[i];
            //dataTable.addRow();
            len = dataRow.data.length;
            row = new DataDef.Row();
            //let row = dataTable.rows[dataTable.pos];
            val = null, col;
            for (let k = 0; k < len; k++) {

                col = columns[k];

                val = dataRow.data[k];

                if (val != null) {
                    switch (col.data_type) {
                        case YIUI.DataType.DATETIME:
                        case YIUI.DataType.DATE:
                            val = new Date(parseInt(val));
                            break;
                        case YIUI.DataType.INT:
                        case YIUI.DataType.LONG:
                            val = parseInt(val);
                            break;
                        case YIUI.DataType.NUMERIC:
                            val = new Decimal(val);
                            break;
                        case YIUI.DataType.BOOLEAN:
                            val = Boolean(val);
                            break;
                    }
                }

                row.vals[k] = val;
            }
            if (dataRow.originaldata) {
                row.orgVals = [];
                for (let k = 0; k < len; k++) {

                    col = columns[k];

                    val = dataRow.originaldata[k];

                    if (val != null) {
                        switch (col.data_type) {
                            case YIUI.DataType.DATETIME:
                            case YIUI.DataType.DATE:
                                val = new Date(parseInt(val));
                                break;
                            case YIUI.DataType.INT:
                            case YIUI.DataType.LONG:
                                val = parseInt(val);
                                break;
                            case YIUI.DataType.NUMERIC:
                                val = new Decimal(val);
                                break;
                            case YIUI.DataType.BOOLEAN:
                                val = Boolean(val);
                                break;
                        }
                    }

                    row.orgVals[k] = val;
                }
            }

            row.state = dataRow.row_state || DataDef.R_Normal;
            row.bkmk = dataRow.row_bookmark;

            if (row.bkmk >= dataTable.bkmkSeed) {
                dataTable.bkmkSeed++;
            }
            row.parentBkmk = dataRow.row_parent_bookmark;

            dataTable.allRows.push(row);
            if (row.state != DataDef.R_Deleted) {
                dataTable.rows.push(row);
                dataTable.bkmks.put(row.bkmk, dataTable.rows.length - 1);
                dataTable.pos = dataTable.rows.length - 1;
            }

        }
        if (docTable.bookmark_seed) {
            dataTable.bkmkSeed = docTable.bookmark_seed;
        }
        return dataTable;
    },

    fromJSONOrgItem: function (json) {
        let item = new DataDef.Item();
        if (!item) return;
        item.itemKey = json.itemKey;
        item.oid = json.oid;
        item.nodeType = json.nodeType || 0;
        item.enable = json.enable || 0;
        item.caption = json.caption;
        item.mainTableKey = json.mainTableKey;
        item.itemTables = json.itemTables;
        item.HasAllOrgData = json.HasAllOrgData;
        return item;
    },

    append: function (srcTable, tgtTable, parentBkmk) {
        let srcIndexArray = [], tgtIndexArray = [], tgtDataTypeArray = [], colInfo, tgtColInfo, tgtIndex;
        for (let i = 0, len = srcTable.cols.length; i < len; i++) {
            colInfo = srcTable.getCol(i);
            tgtColInfo = tgtTable.getColByKey(colInfo.key);
            if (tgtColInfo) {
                srcIndexArray.push(i);
                tgtIndexArray.push(tgtTable.indexByKey(colInfo.key));
                tgtDataTypeArray.push(tgtColInfo.type);
            }
        }
        srcTable.beforeFirst();
        while (srcTable.next()) {
            tgtTable.addRow(true);
            for (let j = 0, jLen = srcIndexArray.length; j < jLen; j++) {
                tgtTable.set(tgtIndexArray[j], YIUI.TypeConvertor.toSafeDataType(tgtDataTypeArray[j], srcTable.get(srcIndexArray[j])));
            }
            if (parentBkmk != undefined && parentBkmk != -1) {
                tgtTable.setParentBkmk(parentBkmk);
            }
        }
        srcTable.beforeFirst();
        tgtTable.beforeFirst();
    },

    clone: function (srcTable, tgtTable) {
        tgtTable.key = srcTable.key;
        tgtTable.pos = srcTable.pos;
        tgtTable.bkmkSeed = srcTable.bkmkSeed;
        tgtTable.bkmks = $.extend(true, {}, srcTable.bkmks);
        tgtTable.allRows = $.extend(true, [], srcTable.allRows);
        tgtTable.rows = $.extend(true, [], srcTable.rows);
        tgtTable.cols = $.extend(true, [], srcTable.cols);
    }
});
// })();