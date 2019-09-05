import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import CellLayoutTemplate from 'yes-template-default/TabTemplate/CellLayoutTemplate';
import { DynamicControl } from 'yes';
import PropTypes from 'prop-types';

const pressRetentionOffset = { top: 5, left: 5, right: 5, bottom: 5 };

export default class CellLayoutItem extends PureComponent {
    static contextTypes = {
        isDesignMode: PropTypes.func,
    }
    onPress = () => {
        this.props.onPress();
    }

    addAction = ()=> {

    }

    generateActions = () => (
        <View style={[styles.actionContainer, this.props.actionContainerStyle]}>
            {
                this.props.actions.map((action) => {
                    const itemType = typeof (action);
                    if (itemType === 'string') {
                        return <DynamicControl isCustomLayout layoutStyles={styles.action} yigoid={action} />;
                    }
                    if (itemType.$$typeof) {
                        return action;
                    }
                    return <DynamicControl isCustomLayout layoutStyles={styles.action} {...action} />;
                })
            }
            {
                this.context.isDesignMode()?<AwesomeFontIcon onPress={this.addAction} name='plus' />: null
            }
        </View>
    );
    render() {
        return (
            <TouchableOpacity onPress={this.onPress} pressRetentionOffset={pressRetentionOffset}>
                <View style={[styles.container, this.props.containerStyle]}>
                    <CellLayoutTemplate meta = {this.props.content}  />
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
