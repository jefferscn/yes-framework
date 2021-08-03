import React from 'react';
import EntryContext from '../../context/Entry';
import Element from '../../template/Element';
var EntryRight = function (_a) {
    var children = _a.children, element = _a.element, entry = _a.entry;
    var entries = React.useContext(EntryContext).entries;
    if (entries && entries.has(entry)) {
        return element ? React.createElement(Element, { meta: element }) : children;
    }
    return null;
};
export default EntryRight;
