import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CellLayoutTemplate from '../template/TabTemplate/CellLayoutTemplate';
import { DynamicControl } from 'yes';

const pressRetentionOffset = { top: 5, left: 5, right: 5, bottom: 5 };

export default class CellLayoutItem extends PureComponent {
    onPress = () => {
        this.props.onPress();
    }

    generateActions = () => (
        <View style={[styles.actionContainer, this.props.actionContainerStyle]}>
            {
                this.props.actions.map((action) => {
                    const itemType = typeof (action);
                    if (itemType === 'string') {
                        return <DynamicControl isCustomLayout layoutStyles={styles.action} yigoid={action} />;
                        // return <TouchableOpacity style={gridStyles.action} onPress={() => this.onActionClick(action.yigoid)}><Text>{action.caption}</Text></TouchableOpacity>
                        // return <DynamicControl isCustomLayout layoutStyles={gridStyles.action} yigoid={action} />;
                    }
                    if (itemType.$$typeof) {
                        return action;
                    }
                    return <DynamicControl isCustomLayout layoutStyles={styles.action} {...action} />;
                })
            }
        </View>
    );
    render() {
        return (
            <TouchableOpacity onPress={this.onPress} pressRetentionOffset={pressRetentionOffset}>
                <View style={[styles.container, this.props.containerStyle]}>
                    <CellLayoutTemplate items = {this.props.items}  />
                    {this.props.actions? this.generateActions(): null}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
        height: 54,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        backgroundColor: 'white',
    },
    action: {
        paddingVertical: 0,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 10,
    },
    container: {
    },
});
