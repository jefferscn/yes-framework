import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'yes-platform';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        lineHeight: 24,
        paddingBottom: 6,
    },
});
export default class MultiControl extends PureComponent {
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <Text yigoid={this.props.from} layoutStyles={{ flex: 2, flexBasis: 0 }} textStyles={{ flex: 0 }} />
                <Text layoutStyles={{ justifyContent: 'flex-start', paddingLeft: 10, flex: 1, flexBasis: 0 }} yigoid={this.props.to} />
                {this.props.third ? <Text layoutStyles={{ justifyContent: 'flex-start', paddingLeft: 10 , flex: 1, flexBasis: 0 }} yigoid={this.props.third} /> : null}
            </View>
        );
    }
}
