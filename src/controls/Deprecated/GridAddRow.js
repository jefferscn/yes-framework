import React, { PureComponent } from 'react';
import { GridWrap } from 'yes-intf';
import { withDetail } from 'yes-comp-react-native-web';
import PropTypes from 'prop-types';
import { View } from 'react-native';

@GridWrap
@withDetail
class GridAddRow_ extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    static defaultProps = {
        sizeLimit: Number.MAX_VALUE,
    }
    onPress = () => {
        this.props.addNewRow && this.props.addNewRow();
    }
    getRowCount = () => {
        return this.props.data ? this.props.data.size : 0;
    }
    render() {
        const { children, editable, sizeLimit } = this.props;
        if (!editable || this.getRowCount() >= sizeLimit) {
            return null;
        }
        const child = this.context.createElement(children);
        return React.cloneElement(child, {
            onPress: this.onPress,
        });
    }
}

export default class GridAddRow extends PureComponent {
    render() {
        const { style } = this.props;
        return <View style={style}>
            <GridAddRow_ {...this.props} />
        </View>
    }
}
