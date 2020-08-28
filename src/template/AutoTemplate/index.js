import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
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
    topBackground: {
        position: 'absolute',
        top: -1,
        left: 0,
        right: 0,
        height: 200,
    },
    paddingBottom: {
        paddingBottom: 20,
    },
    mask: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(245,245,245,0.5)',
    }
});

const defaultHeader = {
    "type": "element",
    "elementType": "Header",
    "elementProps": {
        "canBack": true,
        "titleElement": {
            "type": "element",
            "elementType": "FormTitle",
            "elementProps": {
                "containerStyle": {
                    "alignItems": "center",
                    "justifyContent": "center"
                }
            }
        }
    }
};

class AutoTemplate extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }

    static defaultProps = {
        head: defaultHeader,
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
        const { items, action, error, errorMsg, formStatus, containerStyle, backgroundImg } = this.props;
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
        return (<View style={styles.container}>
            {
                backgroundImg ? <ImageBackground style={styles.topBackground} source={backgroundImg} /> : null
            }
            {head}
            <View style={[styles.container, containerStyle]}>
                <ScrollView style={styles.paddingBottom}>
                    {
                        formStatus != 'ok' ?
                            <View style={styles.mask}><ActivityIndicator /></View> : null
                    }
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
        // return (<View style={styles.container}>
        //     {head}
        //     <View style={styles.errorContainer}>
        //         <ActivityIndicator size="large" color="cadetblue" />
        //     </View>
        // </View>);
    }
}

defaultTemplateMapping.reg('auto', AutoTemplate);
export default AutoTemplate;
