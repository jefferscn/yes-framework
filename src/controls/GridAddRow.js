import React, { PureComponent } from 'react';
import { GridWrap } from 'yes-intf';
import { withDetail } from 'yes-comp-react-native-web';
import PropTypes from 'prop-types';

@GridWrap
@withDetail
export default class GridAddRow extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    onPress = ()=> {
        this.props.addNewRow && this.props.addNewRow();
    }
    render() {
        const { children, editable } = this.props;
        if(!editable) {
            return null;
        }
        const child = this.context.createElement(children);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    }
}
