import { YIUI, View, Svr } from 'yes-core';
import { lodash as $ } from 'yes-common';
import './UIScopeTrees';

View.LocationInfo = function (key, row, column) {
    this.key = '';
    this.row = row;
    this.column = column;
};

View.LocationInfo.prototype = {
    setRow: function (row) {
        this.row = row;
    },
    getRow: function () {
        return this.row;
    },
    setColumn: function (column) {
        this.column = column;
    },
    getColumn: function () {
        return this.column;
    }
};


View.Old_Context = View.Context;
View.Context = function (form) {
    let result = new View.Old_Context(form);
    result.locationMap = {};
    if (form && form.getGridArray) {
        var grids = form.getGridArray(), grid;
        for (var i = 0, size = grids.length; i < size; i++) {
            grid = form.getComponent(grids[i].key);
            result.locationMap[grid.key] = new View.LocationInfo(grid.key, grid.getFocusRowIndex(), -1);
        }

        var lvs = form.getLVArray(), lv;
        for (var i = 0, size = lvs.length; i < size; i++) {
            lv = form.getComponent(lvs[i].key);
            result.locationMap[lv.key] = new View.LocationInfo(lv.key, lv.getFocusRowIndex(), -1);
        }
    }
    result.setGrid = function (grid) {
        this.grid = grid;
    };
    result.getLoc = function (key, row, column) {
        let loc = this.locationMap[key];
        return loc;
    };
    result.updateLocation = function (key, row, column) {
        //兼容性处理
        if (this.locationMap) {
            let loc = this.locationMap[key];
            loc.setRow(row);
            loc.setColumn(column);
        }
    };

    return result;
};

View.EvalEnv.prototype.evalMacro_old = View.EvalEnv.prototype.evalMacro;
View.EvalEnv.prototype.evalMacro = async function (cxt, envScope, name, macro, args) {
    const form = cxt.form, formKey = form.formKey;// fromID = form.formID, operationState = form.operationState;
    const formScopes = await View.UIScopeTrees.get(formKey);
    const scope = formScopes['.macro.' + name];
    console.log(`Scope ${formKey}.macro.${name} = ${scope}`);
    if(scope && scope.includeERPMidFunction && !scope.includeOnlyUIFunction && form.isERPForm) {
    // if (scope && !scope.includeOnlyUIFunction) {
        var doc = form.getDocument();
        form.refreshParas();
        var parameters = form.getParas();

        var grid = cxt.grid, rowIndex = cxt.rowIndex;
        var bookmarks = View.UIScopeTrees.getJsonBookmarks(form, scope, grid, rowIndex);
        var filterMap = form.filterMap;

        doc = View.UIScopeTrees.getJSONDoc(doc, scope);
        //todo 处理明细行上按钮字段执行宏公式，需要bkmks,fieldKey等更多信息
        var paras = {
            service: 'RichDocument',
            cmd: 'RichDocumentEvalMacro',
            metaFormKey: formKey,
            document: $.toJSON(doc),
            filterMap: $.toJSON(filterMap),
            bkmks: bookmarks,
            macroKey: name,
            args: $.toJSON(args)
        };
        if (parameters) {
            paras.parameters = parameters.toJSON();
        }

        if (scope && scope.includeParentDocument == true) {
            var parentForm = form.getParentForm();
            if (parentForm) {
                var parentDoc = YIUI.DataUtil.toJSONDoc(parentForm.getDocument());
                var parentFormKey = parentForm.formKey;
                if (parentForm.getParas()) {
                    paras.parentParameters = parentForm.getParas().toJSON();
                }
                paras.parentFormKey = parentFormKey,
                    paras.parentDocument = $.toJSON(parentDoc);
                paras.parentBkmks = View.UIScopeTrees.getJsonBookmarks(parentForm);
                var parentCondParas = parentForm.getCondParas();
                if (parentCondParas)
                    paras.parentCondition = $.toJSON(parentCondParas);
                if (parentForm.filterMap) {
                    paras.parentFilterMap = $.toJSON(parentForm.filterMap);
                }
            }
        }
        const condParas = form.getCondParas();
        if (condParas)
            paras.condition = $.toJSON(condParas);
        const result = await Svr.Request.getData(paras);
        const returnResult = result.result;
        const returnResultType = result.resultType;
        const value = View.UIScopeTrees.covertJavaDataType(returnResultType, returnResult);
        await View.UIScopeTrees.processRichDocumentResult(form, result);
        return value;
    } else {
        let result = await this.evalMacro_old(cxt, envScope, name, macro, args);
        return result;
    }
};


View.tanserDataToComponentType = function (comp, oldValue) {
    var value = oldValue;
    switch (comp.cellType || comp.type) {
        case YIUI.CONTROLTYPE.DATEPICKER:
            value = YIUI.TypeConvertor.toDate(oldValue);
            break;
        case YIUI.CONTROLTYPE.NUMBEREDITOR:
            value = YIUI.TypeConvertor.toDecimal(oldValue);
            break;
        case YIUI.CONTROLTYPE.TEXTEDITOR:
        case YIUI.CONTROLTYPE.TEXTBUTTON:
        case YIUI.CONTROLTYPE.CHECKLISTBOX:
            value = oldValue == null || oldValue == undefined ? '' : oldValue;
            break;
        case YIUI.CONTROLTYPE.DICT:
        case YIUI.CONTROLTYPE.COMPDICT:
        case YIUI.CONTROLTYPE.DYNAMICDICT:
            value = oldValue == null || oldValue == undefined ? 0 : value;
            break;
        case YIUI.CONTROLTYPE.COMBOBOX:
            const integerValue =  comp.editOptions?comp.editOptions.get('integerValue'):comp.getMetaObj().integerValue;
            value = oldValue == null || oldValue == undefined ? (integerValue ? 0 : '') : oldValue;
            break;
    }
    return value;
};