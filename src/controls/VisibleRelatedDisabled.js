import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import PropTypes from 'prop-types';

class VisibleRelatedDisabled extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    render() {
        const { disabled, children, element } = this.props;
        if(!disabled) {
            return element? this.context.createElement(element): children;
        }
        return null;
    }
}

export default ControlWrap(VisibleRelatedDisabled);
