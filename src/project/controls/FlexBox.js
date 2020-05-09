import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
});
export default class FlexBox extends PureComponent {
    static defaultProps ={ 
        direction: 'column',
    }
    static contextTypes = {
        createElement: PropTypes.func,
    }
    render() {
        const { direction, style, items } = this.props;
        return (
            <View style={[direction==='column'?styles.column:styles.row, style]}>
                {
                    items.map(item=>this.context.createElement(item))
                }
            </View>
        )
    }
}
