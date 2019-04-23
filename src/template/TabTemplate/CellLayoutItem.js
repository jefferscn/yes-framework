import React, { Component } from 'react';
import { observer } from 'mobx-react';
import CellLayoutSection from './CellLayoutSection';
import CellLayoutCell from './CellLayoutCell';

@observer
export default class CellLayoutItem extends Component {
    static defaultProps = {
        designMode: false,
    }
    render() {
        const { meta, hideTitle = false, designMode }  = this.props;

        if(meta.isGroup) {
            return (<CellLayoutSection designMode = {designMode} meta = {meta} hideTitle = {hideTitle} />);
        }
        return (<CellLayoutCell designMode = {designMode} meta={meta} />);
    }
}