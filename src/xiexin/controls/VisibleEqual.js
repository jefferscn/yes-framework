import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Element from 'yes-framework/template/Element';
import { ControlWrap } from 'yes-intf';

class VisibleEqual extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }

    render() {
        const { value, targetValue, element, children } = this.props;
        if(value==targetValue) {
            return element ? <Element meta = { element } />: children;
        }
        return null;
    }
}

export default ControlWrap(VisibleEqual);
