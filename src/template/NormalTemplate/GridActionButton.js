import React, { PureComponent } from 'react';
import { GridWrap } from 'yes-intf';
import { withDetail } from 'yes-comp-react-native-web';
import ActionButton from '../../controls/ActionButton';

@GridWrap
@withDetail
export default class GridActionButton extends PureComponent {
    render() {
        const { editable, style } = this.props;
        return editable ? (
            <ActionButton onPress={this.props.addNewRow} style={style} />
        ) : null
    }
}
