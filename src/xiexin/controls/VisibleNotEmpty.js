import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Element from 'yes-framework/template/Element';
import { ControlWrap } from 'yes-intf';

class VisibleNotEmpty extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }

    render() {
        const { value, element } = this.props;
        if(!(value==null || value == '')) {
            return <Element meta = { element } />;
        }
        return null;
    }
}

export default ControlWrap(VisibleNotEmpty);
