import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Components } from 'yes-comp-react-native-web'; // eslint-disable-line import/no-unresolved
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';
import PropTypes from 'prop-types';

const { CustomBillForm, LoadingComp } = Components;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
});
class NormalTemplate extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
        getBillForm: PropTypes.func,
    }
    render() {
        return this.buildChildren();
    }
    buildChildren() {
        const { items } = this.props;
        // const form = this.context.getBillForm();
        // if (form) {
        if (this.props.foot || this.props.head) {
            const foot = this.context.createElement(this.props.foot);
            const head = this.context.createElement(this.props.head);
            return (<View style={styles.container}>
                {head}
                <ScrollView><CellLayoutTemplate
                    items={items}
                /></ScrollView>
                {foot}
            </View>);
        }
        return (<ScrollView><CellLayoutTemplate
            items={items}
        /></ScrollView>);
    }
    // return <LoadingComp icon="loading" show>加载中...</LoadingComp>; // eslint-disable-line react/jsx-no-undef, max-len
}
const WrappedNormalTemplate = getMappedComponentHOC(NormalTemplate);
defaultTemplateMapping.reg('normal', WrappedNormalTemplate);
export default WrappedNormalTemplate;
