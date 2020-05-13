import { YIUI, View, Svr, DataDef, cacheSystem, Confirm } from 'yes-core';
import './formext';
import { History as HashHistory } from 'yes-platform';
import { HashMap } from 'yes-yiui-common';
import { FilterMap } from 'yes-filtermap';
import { lodash as $ } from 'yes-common';
//严格模式
'use strict';
YIUI.DictHandler.getDictFilter = function (form, fieldKey, itemFilters, itemKey, cxt) {
    var filter = this.getMetaFilter(form, fieldKey, itemFilters, itemKey);
    if (filter) {
        var filterVal, paras = [];
        if (filter.filterVals !== null && filter.filterVals !== undefined && filter.filterVals.length > 0) {
            for (var j = 0, len = filter.filterVals.length; j < len; j++) {
                filterVal = filter.filterVals[j];
                switch (filterVal.type) {
                    case YIUI.FILTERVALUETYPE.CONST:
                        //paras += content;
                        paras.push(filterVal.refVal);
                        break;
                    case YIUI.FILTERVALUETYPE.FIELD:
                        //paras += form.eval(content, cxt, null);
                        if (!cxt) {
                            cxt = new View.Context(form);
                        }
                        paras.push(form.eval(filterVal.refVal, cxt, null));
                        break;
                    case YIUI.FILTERVALUETYPE.FORMULA:
                        var obj = form.getUIProcess().evalFilter(fieldKey, filterVal.refVal);
                        paras.push(obj);
                        break;
                }
            }
        }
        var dictFilter = {};
        dictFilter.itemKey = itemKey;
        dictFilter.formKey = form.formKey;
        dictFilter.sourceKey = fieldKey;
        dictFilter.fieldKey = fieldKey;
        dictFilter.filterIndex = filter.filterIndex;
        dictFilter.values = paras;
        dictFilter.dependency = filter.dependency;
        dictFilter.typeDefKey = filter.typeDefKey;
        return dictFilter;
    }
    return null;
};
