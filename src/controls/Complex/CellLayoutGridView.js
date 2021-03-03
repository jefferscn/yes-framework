import React from 'react';
import GridView from '../Yigo/Grid/GridView';
import CellLayoutItemRow from '../Yigo/GridRow/CellLayoutItemRow';

export default (props)=> {
    const { items, actions, ...otherProps } = props;
    return (
        <GridView 
            RowElement={<CellLayoutItemRow items={items} actions={actions} />}
            separator={{}}
            {...otherProps}
        />
    )
}
