import { DataDef } from 'yes-core';
import { lodash as $ } from 'yes-common';
// (function () {
//严格模式
'use strict';
DataDef.Document.prototype.old_clone = DataDef.Document.prototype.clone;
DataDef.Document.prototype.clone = function () {
    var newDoc = this.baseprototype.old_clone.apply(this, arguments);
    newDoc.headValues = $.extend(true, {}, this.headValues);
    newDoc.otherFieldValues = $.extend(true, {}, this.otherFieldValues);
    newDoc.tableFilter = $.extend(true, {}, this.tableFilter);
    return newDoc;
};
DataDef.DataTable.prototype.getPos = function () {
    return this.pos;
};

DataDef.DataTable.prototype.addNew = function () {
    return this.pos;
};
if (!String.prototype.equalsIgnoreCase) {
    String.prototype.equalsIgnoreCase = function (str) {
        let equals = false;
        if (str == null) {
            equals = this == str;
        } else {
            str = str.toString();
            equals = this.toLowerCase() == str.toLowerCase();
        }
        return equals;
    }
}
// })();