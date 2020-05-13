import { YIUI } from 'yes-core';
import { lodash as $ } from 'yes-common';
// (function () {
//严格模式
'use strict';
YIUI.TypeConvertor.toSafeDataType = (dataType, val) => {
    switch (dataType) {
        case YIUI.DataType.INT:
            return YIUI.TypeConvertor.toInt(val);
        case YIUI.DataType.LONG:
            if (val instanceof YIUI.ItemData) {
                return YIUI.TypeConvertor.toLong(val.getOID());
            }
            return YIUI.TypeConvertor.toLong(val);
        case YIUI.DataType.STRING:
            if (val instanceof YIUI.ItemData) {
                return YIUI.TypeConvertor.toString(val.getOID());
            } else if ($.isArray(val) && val.length > 0 && val[0] instanceof YIUI.ItemData) {
                let result = [];
                for (let index = 0; index < val.length; index++) {
                    let itemData = val[index];
                    result.push(itemData.getOID());
                }
                return result.join(',');
            }
            return YIUI.TypeConvertor.toString(val);
        case YIUI.DataType.DATE:
        case YIUI.DataType.DATETIME:
            return YIUI.TypeConvertor.toDate(val);
        case YIUI.DataType.NUMERIC:
            return YIUI.TypeConvertor.toDecimal(val);
        case YIUI.DataType.BOOLEAN:
            return YIUI.TypeConvertor.toBoolean(val);
    }
    return val;
};
// })();