import React from 'react';
import EntryContext from 'yes-framework/context/Entry';
import Element from 'yes-framework/template/Element';

const EntryRight = ({ children, element, entry }) => {
    const { entries } = React.useContext(EntryContext);
    if (entries && entries.has(entry)) {
        return element ? <Element meta={element} /> : children;
    }
    return null;
}

export default EntryRight
