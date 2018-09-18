import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Components } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';
import PropTypes from 'prop-types';

const { DynamicBillForm, LoadingComp } = Components;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
});
class NormalTemplate extends DynamicBillForm {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    buildChildren() {
        const { items } = this.props;
        const form = this.getBillForm();
        if (form) {
            if (this.props.foot) {
                const foot = this.context.createElement(this.props.foot);
                return (<View style={styles.container}>
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
        return <LoadingComp icon="loading" show>加载中...</LoadingComp>; // eslint-disable-line react/jsx-no-undef, max-len
    }
}
const WrappedNormalTemplate = getMappedComponentHOC(NormalTemplate);
defaultTemplateMapping.reg('normal', WrappedNormalTemplate);
export default WrappedNormalTemplate;
