import { YIUI, View } from 'yes-core';


YIUI.ListView.prototype.doOnRowDblClick = function (rowIndex) {
    var formula = this.getMetaObj().rowDblClick;
    if (formula) {
        var form = YIUI.FormStack.getForm(this.ofFormID);
        var cxt = new View.Context(form);
        cxt.updateLocation(this.key,rowIndex,-1);
       // form.eval(formula, cxt, null);
       this.activeRowIndex = rowIndex;
        form.eval(formula, cxt);
    }

};
YIUI.ListView.prototype.getRowCount=function() {
   return this.state.get('data').size;
};
YIUI.ListView.prototype.isRowDataLoaded = function (rowIndex) {
    if (rowIndex > this.getRowCount()) {
        return;
    }
    return true;
};

YIUI.ListView.prototype.loadDetailRow = function (rowIndex) {
    //TODO:加载指定行的数据
    return;
};

YIUI.ListView.prototype.getValueByKey = function (rowIndex, colKey) {
    const colCfg = this.getColumnConfig(colKey);
    return this.state.getIn(['data', rowIndex, colCfg.columnKey]);
};

YIUI.ListView.prototype.isCellEnable = function (rowIndex, Key) {
    return false;
};

