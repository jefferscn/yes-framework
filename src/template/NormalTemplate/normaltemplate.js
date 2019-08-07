import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Components } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';
import PropTypes from 'prop-types';
import designable from 'yes-designer/utils/designable';
import Element from '../Element';

const { DynamicBillForm, LoadingComp } = Components;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
});
class NormalTemplate extends Component {
    // buildChildren() {
    //     const { items } = this.props;
    //     const form = this.getBillForm();
    //     if (form) {
    //         if (this.props.foot) {
    //             const foot = this.context.createElement(this.props.foot);
    //             return (<View style={styles.container}>
    //                 <ScrollView><CellLayoutTemplate
    //                     items={items}
    //                 /></ScrollView>
    //                 {foot}
    //             </View>);
    //         }
    //         return (<ScrollView><CellLayoutTemplate
    //             items={items}
    //         /></ScrollView>);
    //     }
    //     return <LoadingComp icon="loading" show>加载中...</LoadingComp>; // eslint-disable-line react/jsx-no-undef, max-len
    // }
    render() {
        const { head, foot, content } = this.props;
        return (<View style={{ flex: 1, backgroundColor: 'white' }}>
            <Element
                meta={head}
            />
            <ScrollView style={{ flex: 1 }} >
                <CellLayoutTemplate
                    meta={content}
                    designPositionBase
                />
            </ScrollView>
            <Element
                designPositionBase
                meta={foot}
            />
        </View>);
    }
}
const defaultValue = {
    formTemplate: 'normal',
    head: Element.defaultValue,
    foot: Element.defaultValue,
    content: {
        isGroup: true,
        hideTitle: true,
        items: [],
    },
}

const editor = [
    {
        type: 'SubForm',
        key: 'head',
        isGroup: true,
        control: Element,
    },
    {
        type: 'SubForm',
        key: 'foot',
        isGroup: true,
        control: Element,
    },
]
// const WrappedNormalTemplate = getMappedComponentHOC(NormalTemplate);
const DesignableNormalTemplate = designable(defaultValue, editor)(NormalTemplate);
DesignableNormalTemplate.caption = "单列表模板";
defaultTemplateMapping.reg('normal', DesignableNormalTemplate);
export default DesignableNormalTemplate;
