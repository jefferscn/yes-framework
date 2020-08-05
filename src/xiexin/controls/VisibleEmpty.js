import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Element from 'yes-framework/template/Element';
import { ControlWrap } from 'yes-intf';

class VisibleEmpty extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }

    render() {
        const { value, element, children } = this.props;
        if(value==null || value == '') {
            if(element){
                return <Element meta = { element } />;
            }
            return children;
        }
        return null;
    }
}

export default ControlWrap(VisibleEmpty);
