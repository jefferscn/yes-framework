import React, { Component } from 'react';
import PropTypes from 'prop-types';
import designable from '../../designer/utils/designable';
import { observer } from 'mobx-react';

const editor = [
    {
        type: 'DesignControlSelect',
        key: 'elementType',
        caption: '控件',
        category: 'template'
    }, {
        type: 'SubForm',
        key: 'elementProps',
        isGroup: true,
        linkProps: [{
            name: 'control',
            link: 'elementType',
        }],
    }
];

export const buildElementEditor = (dtlType) => {
    return [
        {
            type: 'DesignControlSelect',
            key: 'elementType',
            caption: '控件',
            category: 'template',
            detailType: dtlType,
        }, {
            type: 'SubForm',
            key: 'elementProps',
            isGroup: true,
            linkProps: [{
                name: 'control',
                link: 'elementType',
            }],
        }
    ];
}

@designable({
    elementType: '',
    elementProps: {

    }
}, editor)
@observer
class Element extends Component {
    static contextTypes = {
        getControl: PropTypes.func,
    }
    render() {
        const { meta } = this.props;
        if (!meta) {
            return null;
        }
        const Control = this.context.getControl(meta.elementType);
        if (Control) {
            return <Control meta={meta.elementProps} {...meta.elementProps} />
        }
        return null;
    }
}

export function isElementNull(ele) {
    if (!ele) {
        return true;
    }
    return !ele.elementType;
}

export default Element;
