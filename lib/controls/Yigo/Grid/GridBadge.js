import React from 'react';
import GridTotal from '../../../hoc/GridTotal';
import { Badge } from 'antd-mobile';
var GridTotalCountBadge = GridTotal(function (_a) {
    var totalRowCount = _a.totalRowCount, children = _a.children;
    return React.createElement(Badge, { text: totalRowCount, overflowCount: 99 }, children);
});
var GridSumBadge = GridTotal(function (_a) {
    var total = _a.total, children = _a.children;
    return React.createElement(Badge, { text: total }, children);
});
export default {
    GridTotalCountBadge: GridTotalCountBadge,
    GridSumBadge: GridSumBadge,
};
