import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableHighlight } from 'react-native';

class GridSelectAndPost extends PureComponent {
    static defaultProps = {
        size: 14,
        color: 'red',
    }
    static contextTypes = {
        getOwner: PropTypes.func,
        getYigoContext: PropTypes.func,
        onControlClick: PropTypes.func,
    }
    onPress = async () => {
        const grid = this.context.getOwner();
        const ctx = this.context.getYigoContext();
        if(!ctx) {
            return;
        }
        const rowIndex = ctx.rowIndex;
        if (grid) {
            await grid.unselectAll();
            await grid.toggleSelect(rowIndex);
            this.context.onControlClick(this.props.postField);
        }
    }
    render() {
        const { text, style } = this.props;
        return (
            <TouchableHighlight onPress={this.onPress}>
                <Text style={[styles.text, style]}>{text}</Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
    },
    text: {

    }
})

export default GridSelectAndPost;
