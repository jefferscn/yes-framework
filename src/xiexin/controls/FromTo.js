import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import IconFont from 'yes-framework/font';
import { ListComponents } from 'yes-comp-react-native-web';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const { ListText } = ListComponents;

export default class FromTo extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    static defaultProps = {
        fontSize: 12,
    }
    render() {
        const { fromId, toId, fontSize, containerStyle } = this.props;
        let from = this.context.createElement(fromId);
        let to = this.context.createElement(toId);
        if(!React.isValidElement(from)) {
            from = <ListText yigoid={from} />;
        }
        if(!React.isValidElement(to)) {
            to = <ListText yigoid={to} />;
        }
        return (
            <View style={[styles.container, containerStyle]}>
                { from }
                <Icon name="long-arrow-right" size={fontSize} />
                { to }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    }
})