// export { default as default } from './IconFont';
import React from 'react';
import Element from '../template/Element';

export default (props) => {
    const meta = {
        type: 'element',
        elementType: 'IconFont',
        elementProps: {
            ...props
        }
    }
    return <Element meta={meta} />
}
