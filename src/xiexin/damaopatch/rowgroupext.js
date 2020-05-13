import { YIUI } from 'yes-core';
import { lodash as $ } from 'yes-common';
export default YIUI.GridRowGroup.prototype = $.extend(YIUI.GridRowGroup.prototype, {
    getGroupCellColumnKeys: function () {
        let columnKeys = [],
            indexes = this.grid.getMetaObj().groupIndexes || [],
            dtlMetaRow = this.grid.getDetailRow();
        for (let i = 0, size = indexes.length; i < size; i++) {
            columnKeys.push(dtlMetaRow.cells[indexes[i]].columnKey);
        }
        return columnKeys;
    }
});