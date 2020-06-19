import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet } from 'react-native';

class GridSelect extends PureComponent {
    static defaultProps = {
        size: 14,
        color: 'red',
    }
    render() {
        const { value } = this.props;
        if( value ) {
            return <View style={styles.container}>
                <Icon
                    name='check'
                    size={this.props.size}
                    color={this.props.color}
                />
            </View>
        }
        return null;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
    }
})

export default ControlWrap(GridSelect);
