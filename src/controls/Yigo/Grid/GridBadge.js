import React from 'react';
import GridTotal from 'yes-framework/hoc/GridTotal';
import { Badge } from 'antd-mobile';

const GridTotalCountBadge = GridTotal(({ totalRowCount, children }) => {
    return <Badge text={totalRowCount} overflowCount={99}>
        {children}
    </Badge>
});

const GridSumBadge = GridTotal(({ total, children }) => {
    return <Badge text={total} >
        {children}
    </Badge>
});

export default {
    GridTotalCountBadge,
    GridSumBadge,
}
