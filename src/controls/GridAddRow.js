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

export default class GridAddRow extends PureComponent {
    render() {
        const { style } = this.props;
        return <View style={style}>
            <GridAddRow_ {...this.props} />
        </View>
    }
}
