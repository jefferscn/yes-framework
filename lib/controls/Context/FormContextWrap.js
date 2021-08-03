var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useContext } from 'react';
import FormContext from '../../context/FormContext';
export default (function (Comp) {
    return function (_a) {
        var contextKey = _a.contextKey, otherProps = __rest(_a, ["contextKey"]);
        var _b = useContext(FormContext), contextValues = _b.contextValues, changeValue = _b.changeValue;
        var onChange = function (v) {
            changeValue(contextKey, v);
        };
        return (React.createElement(Comp, __assign({}, otherProps, { onChange: onChange, value: contextValues ? contextValues[contextKey] : null })));
    };
});
