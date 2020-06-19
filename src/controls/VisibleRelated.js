import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import PropTypes from 'prop-types';

class VisibleRelated extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    render() {
        const { visible, children, element } = this.props;
        if(visible) {
            return element? this.context.createElement(element): children;
        }
        return null;
    }
}

export default ControlWrap(VisibleRelated);
