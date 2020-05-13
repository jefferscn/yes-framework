import { YIUI } from 'yes-core';
// (function () {
//严格模式
'use strict';
YIUI.UIProcess_old = YIUI.UIProcess;
YIUI.UIProcess = function (form) {
    var result = new YIUI.UIProcess_old(form);

    result.richDocumentGridEmptyRow = async function (gridKey) {
        return await this.calcProcess.richDocumentGridEmptyRow(gridKey);
    };

    result.preFireValueChanged = function (component) {
        YIUI.UIDependencyProcess.valueChanged(this.form, component);
    };

    result.fireValueChanged = async function (component) {
        await this.calcProcess.valueChanged(component);
    };

    result.evalFilter = async function (evalEnv,fieldKey, formula) {
        return await this.calcProcess.evalFilter(evalEnv,fieldKey, formula);
    };

    result.doPreCellValueChanged = async function (grid, rowIndex, colIndex, cellKey, isCommit) {
        await YIUI.UIDependencyProcess.cellValueChanged(form, grid, rowIndex, colIndex, cellKey, isCommit);
    };
    return result;
};
// })();