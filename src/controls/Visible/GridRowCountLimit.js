/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */
import React, { PureComponent } from 'react';
import { GridWrap } from 'yes-intf';
import Element from 'yes-framework/template/Element';
/**
 *
 */
@GridWrap
class GridRowCountLimit extends PureComponent {
    static defaultProps = {
        sizeLimit: Number.MAX_VALUE,
    }
    getRowCount = () => {
        return this.props.data ? this.props.data.size : 0;
    }
    render() {
        const { element, children, sizeLimit } = this.props;
        if (this.getRowCount() < sizeLimit ) {
            return element ? <Element meta={element} /> : children;
        }
        return null;
    }
}

export default GridRowCountLimit
