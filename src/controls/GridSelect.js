import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

class GridSelect extends PureComponent {
    static defaultProps = {
        size: 14,
        color: 'red',
        onlyShow: true,
    }
    onPress = () => {
        this.props.onChange(!this.props.value);
    }
    render() {
        const { value, onlyShow, style } = this.props;
        if (onlyShow) {
            if (value) {
                return <View style={styles.container}>
                    <Icon
                        name='check'
                        size={this.props.size}
                        color={this.props.color}
                    />
                </View>
            }
        } else {
            return <TouchableOpacity style={style} onPress={this.onPress}>
                <Icon
                    name={value ? 'check-circle-o' : 'circle-o'}
                    size={this.props.size}
                    color={this.props.color}
                />
            </TouchableOpacity>
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
