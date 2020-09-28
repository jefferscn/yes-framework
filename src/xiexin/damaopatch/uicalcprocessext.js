import { YIUI, Svr, View } from 'yes-core';
import { lodash as $ } from 'yes-common';
import './abstractuiprocessext';
import './UIScopeTrees';

YIUI.UICalcProcess = YIUI.extend(YIUI.UICalcProcess, {
    // 计算过滤条件的表达式，如果需要到中间层计算，取得计算范围，将计算延后到中间层计算
    evalFilter: async function (evalEnv, fieldKey, formula) {
        let result, grid, gridKey, rowIndex, colIndex;

        const cellLocation = this.form.getCellLocation(fieldKey);
        // 如果存在单元位置，那么是一个集合组件
        if (cellLocation) {
            gridKey = cellLocation.key;
            colIndex = cellLocation.column;
            rowIndex = cellLocation.row;
            if (rowIndex == null || rowIndex == -1) {
                grid = this.form.getComponent(gridKey);
                rowIndex = grid.getFocusRowIndex();
            }
        }
        const formScope = await View.UIScopeTrees.get(this.form.formKey);
        const scope = formScope[fieldKey + '.ItemFilter.' + formula];
        if (scope && scope.includeOnlyUIFunction) {
            console.log(`${gridKey}当前行 = ${rowIndex}`);
            let cxt = new View.Context(this.form);
            if (cellLocation) {
                cxt.updateLocation(gridKey, rowIndex, colIndex);
            }
            result = await this.form.eval(formula, cxt);
            // result = await evalEnv(formula);
        } else {
            let doc = this.form.getDocument();
            doc = View.UIScopeTrees.getJSONDoc(doc, { includeDocument: true });
            // doc = View.UIScopeTrees.getJSONDoc(doc, scope);
            // 如果存在单元位置，那么是一个集合组件
            let bookmarks;
            if (cellLocation) {
                const tableKey = grid.getTableKey();
                bookmarks = this.form.getCurrentBookmarks(grid, tableKey, rowIndex);
            }
            result = {
                metaFormKey: this.form.metaForm.formKey,
                fieldKey: fieldKey,
                // formula: formula,
                document: $.toJSON(doc),
                bkmks: $.toJSON(bookmarks)
            };

            const parameters = this.form.getParas();
            if (parameters) {
                result.parameters = parameters.toJSON();
            }
        }
        return result;
    },
    /**
        SetValue公式保持与服务端表现一致，有第三个参数走valuechanged事件，否则执行影响项的默认值
    **/
    evalExprItemDefaultFormulaValue: async function (fieldKey) {
        let formKey = this.form.formKey,
            cellLocation = this.form.getCellLocation(fieldKey),
            scope = View.UIScopeTrees.get(formKey)[fieldKey];
        if (scope) {
            let result;
            if (cellLocation) {
                let grid = this.form.getComponent(cellLocation.key),
                    rowIndex = grid.getFocusRowIndex();
                let tableKey = cellLocation.tableKey;
                let bookmarks = this.form.getCurrentBookmarks(grid, tableKey, rowIndex);
                result = await this.richDocumentValueChanged(fieldKey, scope, false, tableKey, bookmarks);
            } else {
                result = await this.richDocumentValueChanged(fieldKey, scope, false);
            }
            await View.UIScopeTrees.processRichDocumentResult(this.form, result);
        } else {
            if (cellLocation) {
                let grid = this.form.getComponent(cellLocation.key),
                    rowIndex = grid.getFocusRowIndex();
                if (rowIndex == -1) {
                    return;
                }
                await this.cellValueChanged(grid, rowIndex, cellLocation.column, fieldKey, true);
            } else {
                let comp = this.form.getComponent(fieldKey);
                const items = this.calcTree.affectItems[comp.key];

                if (!items)
                    return;

                let cxt = new View.Context(this.form),
                    len = items.length,
                    item,
                    com;
                for (var i = 0; i < len; i++) {
                    item = items[i];
                    com = this.form.getComponent(item.source);
                    if (!com)
                        continue;

                    await this.calcExprItemObject(com, item, cxt, true);
                }
            }

        }
        //TODO 有没有没有scope的情况？
    },
    needCalc_Com: function (com, calcAll) {

        // 1.如果有忽略字段(下推,copyNew),根据忽略字段判断
        let ignoreKeys = this.form.getSysExpVals('IgnoreKeys');
        if (ignoreKeys && ignoreKeys.indexOf(com.key) != -1) {
            return false;
        }

        // 2.如果是查询字段,永远重新计算
        if (com.getMetaObj().condition) {
            return true; // 这里与平台有区别
        }

        return this.base(com, calcAll);
    },
    valueChanged: async function (comp, ignoreValueChange) {
        console.log('this is extend UICalcProcess valueChanged');
        let formKey = this.form.formKey,
            formScope = await View.UIScopeTrees.get(formKey);
        const scope = formScope[comp.key];
        if (scope && scope.includeERPMidFunction && this.form.isERPForm) {
            let result = await this.richDocumentValueChanged(comp.key, scope, !scope.valueChangedIncludeOnlyUIFunction);
            await View.UIScopeTrees.processRichDocumentResult(this.form, result);
            if (scope.valueChangedIncludeOnlyUIFunction) {
                let cxt = new View.Context(this.form);
                await this.form.eval(comp.valueChanged, cxt);
            }
            return;
        } else {
            await this.base(comp);
            if (!ignoreValueChange && comp.valueChanged) {
                let cxt = new View.Context(this.form);
                await this.form.eval(comp.valueChanged, cxt);
            }
        }
    },

    cellValueChanged: async function (grid, rowIndex, colIndex) {
        console.log('this is extend UICalcProcess cellValueChanged');
        let editOpt = grid.getCellEditOpt(rowIndex, colIndex),
            rowData = grid.getRowDataAt(rowIndex);
        if (!rowData) {
            return;
        }

        const formKey = this.form.formKey,
            formScope = await View.UIScopeTrees.get(formKey);
        const scope = formScope[editOpt.key];
        if (scope) {
            //TODO: 服务端处理时需要考虑树状表格的处理
            let tableKey = grid.getTableKey();
            let bookmarks = this.form.getCurrentBookmarks(grid, tableKey, rowIndex);
            let result = await this.richDocumentValueChanged(editOpt.key, scope, !scope.valueChangedIncludeOnlyUIFunction, tableKey, bookmarks);
            await View.UIScopeTrees.processRichDocumentResult(this.form, result);
            if (scope.valueChangedIncludeOnlyUIFunction) {
                let ctx = new View.Context(this.form);
                ctx.updateLocation(grid.key, rowIndex, colIndex);
                ctx.curIndex = colIndex;
                await this.form.eval(editOpt.valueChanged, ctx);
            }
            return;
        } else {
            await this.base(grid, rowIndex, colIndex);
            let cellComponent = grid.getDetailMetaRow().cells[colIndex];
            if (cellComponent.valueChanged) {
                let ctx = new View.Context(this.form);
                ctx.updateLocation(grid.key, rowIndex, colIndex);
                ctx.curIndex = colIndex;
                await this.form.eval(cellComponent.valueChanged, ctx);
            }
        }
    },
    doAfterDeleteRow: async function (grid) {
        const formKey = this.form.formKey,
            scopeGridKey = '.GridKey.' + grid.key,
            formScope = await View.UIScopeTrees.get(formKey),
            scope = formScope[scopeGridKey];
        // if (scope && !scope.includeOnlyUIFunction) {
        if (scope && scope.includeERPMidFunction && !scope.includeOnlyUIFunction && this.form.isERPForm) {
            const result = await this.richDocumentDoAfterDeleteRow(grid.key, scope);
            await View.UIScopeTrees.processRichDocumentResult(this.form, result);
        } else {
            this.base(grid);
        }
    },
    richDocumentDoAfterDeleteRow: async function (key, scope) {

        this.form.refreshParas();
        var parameters = this.form.getParas();
        let doc = this.form.getDocument();
        doc = View.UIScopeTrees.getJSONDoc(doc, scope);
        let paras = {
            service: 'RichDocument',
            cmd: 'RichDocumentDoAfterDeleteRow',
            metaFormKey: this.form.formKey,
            document: $.toJSON(doc),
            deleteGridKey: key
        };

        if (parameters) {
            paras.parameters = parameters.toJSON();
        }

        if (scope && scope.includeParentDocument == true) {
            var parentForm = this.form.getParentForm();
            if (parentForm) {
                var parentDoc = YIUI.DataUtil.toJSONDoc(parentForm.getDocument());
                var parentFormKey = parentForm.formKey;

                if (parentForm.getParas()) {
                    paras.parentParameters = parentForm.getParas().toJSON();
                }
                paras.parentFormKey = parentFormKey,
                    paras.parentDocument = $.toJSON(parentDoc);
            }
        }
        const result = await Svr.Request.getData(paras);
        return result;
    },
    richDocumentValueChanged: async function (key, scope, isExecValueChanged, tableKey, bookmarks) {
        let doc = this.form.getDocument();
        this.form.refreshParas();
        let parameters = this.form.getParas();
        let filterMap = this.form.filterMap;

        doc = View.UIScopeTrees.getJSONDoc(doc, scope);
        let paras = {
            service: 'RichDocument',
            cmd: 'RichDocumentValueChanged',
            metaFormKey: this.form.formKey,
            document: $.toJSON(doc),
            filterMap: $.toJSON(filterMap),
            bkmks: $.toJSON(bookmarks),
            valueChangeKey: key,
            execValueChanged: isExecValueChanged
        };

        if (parameters) {
            paras.parameters = parameters.toJSON();
        }

        if (scope && scope.includeParentDocument == true) {
            let parentForm = this.form.getParentForm();
            if (parentForm) {
                let parentDoc = YIUI.DataUtil.toJSONDoc(parentForm.getDocument());
                let parentFormKey = parentForm.formKey;

                if (parentForm.getParas()) {
                    paras.parentParameters = parentForm.getParas().toJSON();
                }
                paras.parentFormKey = parentFormKey,
                    paras.parentDocument = $.toJSON(parentDoc);
                paras.parentBkmks = View.UIScopeTrees.getJsonBookmarks(parentForm);
                if (parentForm.filterMap) {
                    paras.parentFilterMap = $.toJSON(parentForm.filterMap);
                }
            }
        }
        const result = await Svr.Request.getData(paras);
        return result;
    },

    doOnClick: async function (key) {
        let result = await this.richDocumentOnClick(key);
        await this.processRichDocumentResult(result);
    },

    richDocumentOnClick: async function (key, tableKey, bookmarks) {
        let doc = this.form.getDocument();
        doc = YIUI.DataUtil.toJSONDoc(doc);
        let formKey = this.form.formKey;
        let parentForm = this.form.getParentForm();
        let parentFormKey;
        let parentDoc;
        let parentFilterMap;
        if (parentForm != undefined) {
            parentFormKey = parentForm.formKey;
            parentDoc = parentForm.getDocument();
            parentDoc = YIUI.DataUtil.toJSONDoc(parentDoc);
            parentFilterMap = parentForm.filterMap;
        }

        let filterMap = this.form.filterMap;
        let paras = {
            service: 'RichDocument',
            cmd: 'RichDocumentOnClick',
            metaFormKey: formKey,
            document: $.toJSON(doc),
            filterMap: $.toJSON(filterMap),
            parentFormKey: parentFormKey,
            parentDocument: $.toJSON(parentDoc),
            parentFilterMap: $.toJSON(parentFilterMap),
            bkmks: $.toJSON(bookmarks),
            onClickKey: key
        };

        let parameters = this.form.getParas();
        if (parameters) {
            paras.parameters = parameters.toJSON();
        }
        const result = await Svr.Request.getData(paras);
        return result;
    },

    calcAll: async function () {

        this.calcAlling = true;


        // //计算固定行字段默认值，以及依赖固定行字段的默认值。
        // this.calcFixGridRows(this.calcTree.items, calcAll);

        // //计算依赖扩展字段的字段的默认值
        // this.calcAllExpandGridColumnAffectItems(this.calcTree.affectItems, calcAll);

        // let gm = this.form.getGridArray(), grid;
        // for (let i = 0, size = gm.length; i < size; i++) {
        //     grid = this.form.getComponent(gm[i].key);

        //     YIUI.GridSumUtil.evalSum(this.form, grid);

        //     grid.refreshSelectAll();
        // }

        // let lvm = this.form.getLVArray(), listview;
        // for (let i = 0, size = lvm.length; i < size; i++) {
        //     listview = this.form.getComponent(lvm[i].key);

        //     listview.refreshSelectAll();
        // }

        this.form.removeSysExpVals('IgnoreKeys');

        this.calcAlling = false;
    },
    // calcFixGridRows: function (items, calcAll) {
    //     let cxt = new View.Context(this.form),
    //         item,
    //         com;

    //     for (let i = 0; item = items[i]; i++) {
    //         com = this.form.getComponent(item.source);
    //         if (!com || com.isSubDetail)
    //             continue;

    //         switch (item.objectType) {
    //             case YIUI.ExprItem_Type.Item:
    //                 if (com.type == YIUI.CONTROLTYPE.GRID) {
    //                     this.calcingFixRow = true;
    //                     try {
    //                         this.calcHeadItem(com, item, cxt, calcAll);
    //                         this.calcingFixRow = false;
    //                     } catch (e) {
    //                         this.calcingFixRow = false;
    //                         throw e;
    //                     }
    //                 }
    //                 break;
    //         }
    //     }
    //     this.callingFixRow = false;
    // },
    needCalc_Cell: function (grid, ri, ci, metaCell, cellData, calcAll) {
        if (this.calcingFixRow) {
            return true;
        }
        return this.base(grid, ri, ci, metaCell, cellData, calcAll);
    },
    // calcAllExpandGridColumnAffectItems: function (affectItems, calcAll) {
    //     let cxt = new View.Context(this.form),
    //         cellLoc, grid, affectItem;

    //     for (let fieldKey in affectItems) {
    //         if (affectItems.hasOwnProperty(fieldKey)) {
    //             cellLoc = this.form.getCellLocation(fieldKey);
    //             if (!cellLoc || !cellLoc.expand) {
    //                 continue;
    //             }
    //             let affectItem = affectItems[fieldKey];
    //             grid = this.form.getComponent(cellLoc.key);
    //             for (let i = 0, item; item = affectItem[i]; i++) {
    //                 this.calcGridExpandGridColumnAffectItems(grid, cxt, item, calcAll);
    //             }
    //         }
    //     }
    // },
    // calcGridExpandGridColumnAffectItems: function (grid, cxt, item, calcAll) {
    //     for (let i = 0, rowData, count = grid.getRowCount(); i < count; i++) {
    //         rowData = grid.getRowDataAt(i);
    //         if (rowData.rowType === 'Detail' || rowData.rowType === 'Fix') {
    //             this.calcGridRowExpandGridColumnAffectItems(grid, cxt, i, item, calcAll);
    //         }
    //     }
    // },
    // calcGridRowExpandGridColumnAffectItems: function (grid, cxt, rowIndex, itemSet, calcAll) {
    //     if (!itemSet.items || rowIndex == -1) {
    //         return;
    //     }
    //     for (let i = 0, item; item = itemSet.items[i]; i++) {
    //         if (item.empty || item.treeSum) {
    //             continue;
    //         }
    //         this.impl_calcGridRowExpandGridColumnAffectItems(grid, cxt, rowIndex, item, true);
    //     }
    // },
    // impl_calcGridRowExpandGridColumnAffectItems: function (grid, cxt, rowIndex, item, calcAll) {
    //     let pos = item.pos;
    //     let rowData = grid.getRowDataAt(rowIndex),
    //         cellData, editOpt, colIndex,
    //         colIndex = pos.index,
    //         cellData = rowData.data[colIndex],
    //         editOpt = grid.getCellEditOpt(rowIndex, colIndex);
    //     cxt.updateLocation(grid.key, rowIndex, -1);
    //     grid.setValueAt(rowIndex, colIndex, this.calcFormulaValue(item, cxt), rowData.bkmkRow || cellData.bkmkRow, false);
    // },
    // doCalcOneRow: function (com, rowIndex) {
    //     if (com.type === YIUI.CONTROLTYPE.GRID) {
    //         let rowData = com.getRowDataAt(rowIndex);
    //         //                this.calcGridRow(com,rowIndex,rowData.bkmkRow == null);
    //         let emptyRow = rowData.bkmkRow == null
    //         if (emptyRow) {
    //             this.showEmptyRow(com, rowIndex);
    //         }
    //     } else {
    //         this.calcListViewRow(com, rowIndex, false);// ListView没有空行,只计算没有数据绑定的
    //     }
    // },
    // showEmptyRow: function (grid, rowIndex) {
    //     let emptyGridRowValues = this.form.document.emptyGridRowValues;
    //     let tableKey = grid.tableKey;
    //     if (emptyGridRowValues && emptyGridRowValues[tableKey]) {
    //         let emptyRowValue = emptyGridRowValues[tableKey];
    //         let gridRow = grid.getRowDataAt(rowIndex), value,
    //             metaRow = grid.getMetaObj().rows[gridRow.metaRowIndex];
    //         for (let i = 0, len = metaRow.cells.length; i < len; i++) {
    //             let metaCell = metaRow.cells[i];
    //             if (metaCell.columnKey.endsWith('ItemKey')) {
    //                 value = emptyRowValue[metaCell.columnKey];
    //                 // grid.setValueByKey(rowIndex, metaCell.key, value, false, false);
    //                 grid.setValueAt(rowIndex, i, value, false, false, true, true);
    //             }
    //         }
    //         for (let i = 0, len = metaRow.cells.length; i < len; i++) {
    //             let metaCell = metaRow.cells[i];
    //             if (!metaCell.columnKey.endsWith('ItemKey')) {
    //                 value = emptyRowValue[metaCell.columnKey];
    //                 grid.setValueAt(rowIndex, i, value, false, false, true, true);
    //             }
    //         }
    //         let metaCell = grid.getMetaCellByColumnKey(YIUI.SystemField.SEQUENCE_FIELD_KEY);
    //         if (metaCell) {
    //             let loc = this.form.getCellLocation(metaCell.key);
    //             grid.setValueAt(rowIndex, loc.column, rowIndex + 1, false, false, true, true);
    //         }
    //     }
    //     //如果是新增加行把emptyGridRowValues字段的默认值进行显示。但不提交到DataTable中
    //     //todo 表单新增时 由于在服务端newDocument时已经对空行进行了处理，这里就多处理一次， 在修改单据时需要处理。
    //     let result = this.richDocumentGridEmptyRow(grid.key);
    //     this.showEmptyRowDirtyValues(result, grid.key);
    // },
    // calcSubDetail: function (gridKey) {
    //     if (true) {
    //         return;
    //     }
    //     let items = this.calcTree.items,
    //         context = this.newContext(this.form, -1, -1);
    //     for (let i = 0, exp, com; exp = items[i]; i++) {
    //         com = this.form.getComponent(exp.source);
    //         if (!com || !YIUI.SubDetailUtil.isSubDetail(this.form, com, gridKey))
    //             continue;

    //         this.calcExprItemObject(com, exp, context, this.form.operationState == YIUI.Form_OperationState.New, false);
    //     }
    // },

    richDocumentGridEmptyRow: async function (gridKey) {
        const doc = YIUI.DataUtil.toJSONDoc(this.form.getDocument());
        const grid = this.form.getComponent(gridKey);
        const rowIndex = grid.getFocusRowIndex();
        const tableKey = grid ? grid.tableKey : '';
        const bookmarks = this.form.getCurrentBookmarks(grid, tableKey, rowIndex);
        const paras = {
            service: 'RichDocument',
            cmd: 'RichDocumentGridEmptyRow',
            metaFormKey: this.form.formKey,
            bkmks: $.toJSON(bookmarks),
            document: $.toJSON(doc),
            gridKey: gridKey
        };

        const parameters = this.form.getParas();
        if (parameters) {
            paras.parameters = parameters.toJSON();
        }
        const formScope = await View.UIScopeTrees.get(this.form.formKey);
        const scope = formScope['.DefaultFormulaUseParentDoc.'];
        if (scope.includeParentDocument && this.form.getParentForm()) {
            const parentForm = this.form.getParentForm();
            if (parentForm) {
                const parentDoc = YIUI.DataUtil.toJSONDoc(parentForm.getDocument());
                const parentFormKey = parentForm.formKey;

                if (parentForm.getParas()) {
                    paras.parentParameters = parentForm.getParas().toJSON();
                }
                paras.parentFormKey = parentFormKey,
                    paras.parentDocument = $.toJSON(parentDoc);
                paras.parentBkmks = View.UIScopeTrees.getJsonBookmarks(parentForm);
            }
        }
        return await Svr.Request.getData(paras);
    },
    doAfterInsertRow: async function (component, rowIndex, emptyRow) {
        if (component.type === YIUI.CONTROLTYPE.GRID) {
            // await this.doCalcGridRow(component, rowIndex, emptyRow, false);// 全部计算,不提交值
        } else {
            await this.calcListViewRow(component, rowIndex, true);
        }
    },
    reCalcComponent: function (component) {
        var items = this.form.dependency.calcTree.items;
        for (var i = 0, exp; exp = items[i]; i++) {
            if (exp.objectType != YIUI.ExprItem_Type.Set)
                continue;
            if (exp.source !== component.key)
                continue;
            switch (component.type) {
                case YIUI.CONTROLTYPE.GRID:
                    this.calcGrid(component, this.newContext(this.form, -1, -1), this.initTree(exp), false, false)
                    break;
                case YIUI.CONTROLTYPE.LISTVIEW:
                    this.calcListView(component, this.newContext(this.form, -1, -1), this.initTree(exp), false);
                    break;
            }
        }
    }
    // // 计算过滤条件的表达式，如果需要到中间层计算，取得计算范围，将计算延后到中间层计算
    // evalFilter: function (fieldKey, formula) {
    //     let result;
    //     let scope = View.UIScopeTrees.get(this.form.formKey)[fieldKey + ".ItemFilter." + formula];
    //     let cellLocation = this.form.getCellLocation(fieldKey), gridKey, rowIndex, colIndex;
    //     // 如果存在单元位置，那么是一个集合组件
    //     if (cellLocation) {
    //         gridKey = cellLocation.key;
    //         colIndex = cellLocation.column;
    //         rowIndex = cellLocation.row;
    //         if (rowIndex == null || rowIndex == -1) {
    //             let grid = this.form.getComponent(gridKey);
    //             rowIndex = grid.getFocusRowIndex();
    //         }
    //     }
    //     if (scope && !scope.includeOnlyUIFunction) {
    //         let doc = this.form.getDocument();
    //         doc = View.UIScopeTrees.getJSONDoc(doc, scope);
    //         let cellLocation = this.form.getCellLocation(fieldKey);
    //         // 如果存在单元位置，那么是一个集合组件
    //         if (cellLocation) {
    //             let tableKey = grid.getTableKey();
    //             let bookmarks = this.form.getCurrentBookmarks(grid, tableKey, rowIndex);
    //         }

    //         result = {
    //             metaFormKey: this.form.metaForm.formKey,
    //             fieldKey: fieldKey,
    //             formula: formula,
    //             document: $.toJSON(doc),
    //             bkmks: $.toJSON(bookmarks)
    //         };

    //         let parameters = this.form.getParas();
    //         if (parameters) {
    //             result.parameters = parameters.toJSON();
    //         }
    //     } else {
    //         let cxt = new View.Context(this.form);
    //         if (cellLocation) {
    //             cxt.updateLocation(gridKey, rowIndex, colIndex);
    //         }
    //         result = this.form.eval(formula, cxt);
    //     }
    //     return result;
    // },

    // //显示空白行的差异数据
    // showEmptyRowDirtyValues: function (DirtyData, gridKey) {
    //     let formDirtyDatas = DirtyData.formDirtyDatas;
    //     if (formDirtyDatas) {
    //         for (let i = 0; i < formDirtyDatas.length; i++) {
    //             let oneFormKey = formDirtyDatas[i].formKey;
    //             let docDirtyFieldValue = formDirtyDatas[i].dirtyData;
    //             if (docDirtyFieldValue == undefined) {
    //                 continue;
    //             }
    //             if (oneFormKey == this.form.formKey) {
    //                 View.UIScopeTrees.processOneRichDocumentResult_emptyRowDirtyValues(docDirtyFieldValue, this.form, gridKey, false);
    //             }
    //         }
    //     }

    // },

    // // 计算字段默认值，目前仅用于计算动态字典的ItemKey，不要用于其它地方
    // evalDefaultFormulaValue: function (fieldKey, defaultFormlaValue) {
    //     let result, formKey = this.form.formKey;
    //     let scope = View.UIScopeTrees.get(formKey)[fieldKey];
    //     if (scope) {
    //         let doc = this.form.getDocument();
    //         doc = View.UIScopeTrees.getJSONDoc(doc, scope);
    //         let paras = {
    //             service: "RichDocument",
    //             cmd: "RichDocumentCalcDefaultFormulaValue",
    //             metaFormKey: formKey,
    //             document: $.toJSON(doc),
    //             fieldKey: fieldKey
    //         };
    //         return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, paras);
    //     } else {
    //         let cxt = new View.Context(this.form);
    //         result = this.form.eval(defaultFormlaValue, cxt);
    //     }
    //     return result;
    // },

    // doAfterDeleteRow: function (grid) {
    //     let formKey = this.form.formKey,
    //         scopeGridKey = ".GridKey." + grid.key,
    //         scope = View.UIScopeTrees.get(formKey)[scopeGridKey];
    //     if (scope && !scope.includeOnlyUIFunction) {
    //         let result = this.richDocumentDoAfterDeleteRow(grid.key, scope);
    //         View.UIScopeTrees.processRichDocumentResult(this.form, result);
    //     } else {
    //         this.base(grid);
    //     }
    // },

    // richDocumentDoAfterDeleteRow: function (key, scope) {
    //     let doc = this.form.getDocument();
    //     this.form.refreshParas();
    //     let parameters = this.form.getParas();

    //     doc = View.UIScopeTrees.getJSONDoc(doc, scope);
    //     let paras = {
    //         service: "RichDocument",
    //         cmd: "RichDocumentDoAfterDeleteRow",
    //         metaFormKey: this.form.formKey,
    //         document: $.toJSON(doc),
    //         deleteGridKey: key
    //     };

    //     if (parameters) {
    //         paras.parameters = parameters.toJSON();
    //     }

    //     if (scope && scope.includeParentDocument == true) {
    //         let parentForm = this.form.getParentForm();
    //         if (parentForm) {
    //             let parentDoc = YIUI.DataUtil.toJSONDoc(parentForm.getDocument());
    //             let parentFormKey = parentForm.formKey;

    //             if (parentForm.getParas()) {
    //                 paras.parentParameters = parentForm.getParas().toJSON();
    //             }
    //             paras.parentFormKey = parentFormKey,
    //                 paras.parentDocument = $.toJSON(parentDoc);
    //         }
    //     }
    //     return Svr.Request.getSyncData(Svr.SvrMgr.ServletURL, paras);
    // }
});