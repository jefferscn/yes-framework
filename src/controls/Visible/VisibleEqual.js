/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */
import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import Element from '../../template/Element';

class VisibleEqual extends PureComponent {
    render() {
        const { value, targetValue, element, children } = this.props;
        if(value==targetValue) {
            return element ? <Element meta = { element } />: children;
        }
        return null;
    }
}

export default ControlWrap(VisibleEqual);
