import React from 'react';
import { View, StyleSheet } from 'react-native';
var styles = StyleSheet.create({
    ver: {}
});
export default (function (_a) {
    var _b = _a.weight, weight = _b === void 0 ? 8 : _b, _c = _a.direction, direction = _c === void 0 ? "ver" : _c, _d = _a.color, color = _d === void 0 ? 'transparent' : _d;
    var weightStyle = direction === 'hor' ? {
        width: weight,
        height: '100%',
    } : {
        height: weight,
        width: '100%',
    };
    return React.createElement(View, { style: [direction === 'ver' ? styles.ver : styles.hor,
            weightStyle,
            {
                backgroundColor: color
            }
        ] });
});
