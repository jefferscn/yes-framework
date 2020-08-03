import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator } from 'react-native';
import defaultTemplateMapping from '../defaultTemplateMapping';
import Element from '../Element';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    paddingBottom: {
        paddingBottom: 20,
    }
});

class AutoTemplate extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    // render() {
    //     const { containerStyle, items } = this.props;
    //     return (
    //         <View style={[styles.container, containerStyle]}>
    //             {
    //                 items.map(item => {
    //                     <Element meta={item} />
    //                 })
    //             }
    //         </View>
    //     )
    // }
    render() {
        const { items, action, error, errorMsg, formStatus, containerStyle } = this.props;
        // const form = this.context.getBillForm();
        // if (form) {
        let actionButton = this.context.createElement(action);
        const foot = this.context.createElement(this.props.foot);
        const head = this.context.createElement(this.props.head);
        if (error) {
            return (<View style={styles.container}>
                {head}
                <View style={styles.errorContainer}>
                    <Text>{errorMsg.message}</Text>
                </View>
            </View>)
        }
        if (formStatus === 'ok') {
            return (<View style={styles.container}>
                {head}
                <View style={[styles.container, containerStyle]}>
                    <ScrollView style={styles.paddingBottom}>
                        {
                            items.map(item => 
                                <Element meta={item} />
                            )
                        }
                    </ScrollView>
                    {actionButton}
                </View>
                {foot}
            </View>);
        }
        return (<View style={styles.container}>
            {head}
            <View style={styles.errorContainer}>
                <ActivityIndicator size="large" color="cadetblue" />
            </View>
        </View>);
    }
}

defaultTemplateMapping.reg('auto', AutoTemplate);
export default AutoTemplate;
