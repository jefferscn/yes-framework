import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'antd-mobile';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    notLeaf: {
        backgroundColor: 'lightgrey',
    },
    leaf: {
        height: 30,
        alignItems: 'center',
    },
    leafText: {
        textAlign: 'left',
        paddingLeft: 16,
        flex: 1,
    },
    notLeafText: {
        textAlign: 'left',
        paddingLeft: 12,
        flex: 1,
    },
    icon: {

    }
});

export default class TreeDictRow extends PureComponent {
    render() {
        const { data, checked } = this.props;
        const isLeaf = !data.NodeType;
        if (isLeaf) {
            return (
                <TouchableOpacity onPress={this.props.onClick}>
                    <View
                        style={[styles.container, styles.leaf]}>
                        <Text style={styles.leafText}>{data.DisplayName || data.Name}</Text>
                        {checked ? <Icon type="check" /> : null}
                    </View>
                </TouchableOpacity>);
        }
        return (
            <View
                style={[styles.container, styles.notLeaf]}>
                <Text style={styles.leafText}>{data.DisplayName || data.Name}</Text>
            </View>
        )
    }
}
