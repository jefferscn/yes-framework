import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';

class VisibleRelated extends PureComponent {
    render() {
        const { visible, children } = this.props;
        return visible? children : null; 
    }
}

export default ControlWrap(VisibleRelated);
