import { YIUI } from 'yes-core';
import './typeconvertorext';

export const isOtherField = function (fieldKey) {
    return fieldKey && fieldKey.endsWith("_NODB4Other");
};
export const convertValue = function (type, value, multiSelect) {
    switch (type) {
        case YIUI.CONTROLTYPE.DICT:
        case YIUI.CONTROLTYPE.DYNAMICDICT:
        case YIUI.CONTROLTYPE.COMPDICT:
            if (multiSelect) {
                return YIUI.TypeConvertor.toSafeDataType(YIUI.DataType.STRING, value);
            } else {
                return YIUI.TypeConvertor.toSafeDataType(YIUI.DataType.LONG, value);
            }

        case YIUI.CONTROLTYPE.NUMBEREDITOR:
            return YIUI.TypeConvertor.toSafeDataType(YIUI.DataType.NUMERIC, value);
        case YIUI.CONTROLTYPE.CHECKBOX:
            return YIUI.TypeConvertor.toSafeDataType(YIUI.DataType.INT, value);
        default:
            return value;
    }
};