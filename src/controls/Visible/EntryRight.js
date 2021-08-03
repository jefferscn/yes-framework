import React from 'react';
import EntryContext from '../../context/Entry';
import Element from '../../template/Element';

const EntryRight = ({ children, element, entry }) => {
    const { entries } = React.useContext(EntryContext);
    if (entries && entries.has(entry)) {
        return element ? <Element meta={element} /> : children;
    }
    return null;
}

export default EntryRight
