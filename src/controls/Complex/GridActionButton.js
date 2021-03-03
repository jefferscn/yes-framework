import React, { PureComponent } from 'react';
import ActionButton from '../RenderLayer/ActionButton';
import GridAddRowClick from '../Touchable/GridAddRowClick';

export default class GridActionButton extends PureComponent {
    render() {
        // const { editable, style } = this.props;
        // return editable ? (
        //     <ActionButton onPress={this.props.addNewRow} style={style} />
        // ) : null
        const { style, ...otherProps } = this.props;
        return (
            <GridAddRowClick {...otherProps}>
                <ActionButton style={style} />
            </GridAddRowClick>
        )
    }
}
