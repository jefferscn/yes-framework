import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { Components, withDetail } from 'yes-comp-react-native-web'; // eslint-disable-line import/no-unresolved
import { getMappedComponentHOC, GridWrap } from 'yes'; // eslint-disable-line import/no-unresolved
import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';
import PropTypes from 'prop-types';
// import ActionButton from '../../controls/ActionButton';
import GridActionButton from './GridActionButton'

const { CustomBillForm, LoadingComp } = Components;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    }
});
// @GridWrap
// @withDetail
// class GridActionButton extends PureComponent {
//     render() {
//         const { editable, style } = this.props;
//         return editable ? (
//             <ActionButton onPress={this.props.addNewRow} style={style} />
//         ) : null
//     }
// }

class NormalTemplate extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
        getBillForm: PropTypes.func,
    }
    render() {
        return this.buildChildren();
    }
    buildChildren() {
        const { items, action, error, errorMsg, formStatus } = this.props;
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
            if (this.props.foot || this.props.head) {
                return (<View style={styles.container}>
                    {head}
                    <View style={styles.container}>
                        <ScrollView>
                            <CellLayoutTemplate
                                items={items}
                            />
                        </ScrollView>
                        {actionButton}
                    </View>
                    {foot}
                </View>);
            }
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <CellLayoutTemplate
                            items={items}
                        />
                    </ScrollView>
                    {actionButton}
                </View>);
        }
        return (<View style={styles.container}>
            {head}
            <View style={styles.errorContainer}>
                <ActivityIndicator size="large" color="cadetblue" />
            </View>
        </View>);
    }
    // return <LoadingComp icon="loading" show>加载中...</LoadingComp>; // eslint-disable-line react/jsx-no-undef, max-len
}
const WrappedNormalTemplate = getMappedComponentHOC(NormalTemplate);
defaultTemplateMapping.reg('normal', WrappedNormalTemplate);
export default WrappedNormalTemplate;
