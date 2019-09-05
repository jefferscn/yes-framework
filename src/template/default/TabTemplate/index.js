import React, { Component } from 'react';
import { Components } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import TabViewTemplate from './TabViewTemplate';
// import defaultTemplateMapping from '../defaultTemplateMapping';
import { View, StyleSheet } from 'react-native';
import { internationalWrap } from 'yes';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import designExport from 'yes-designer/utils/DesignExport';
import Element from 'yes-designer/components/Framework/Element';

const { LoadingComp } = Components;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
});

@observer
class TabTemplate extends Component {
    @observable meta = this.props.meta;
    formatMessage = (msg) => {
        return this.props.formatMessage? this.props.formatMessage(msg) : msg;
    }

    onTabChange = (tabs)=> {
        this.props.meta.tabs = tabs;
        this.props.onMetaChange(this.props.meta);
    }

    renderContent(tabs) {
        if (this.meta.foot || this.meta.head) {
            return (<View style={styles.container}>
                <Element meta = {this.meta.head} />
                <TabViewTemplate
                    onTabChange={this.onTabChange}
                    meta={tabs}
                    tabPosition={this.meta.tabPosition}
                    // {...this.meta}
                />
                <Element designPositionBase meta = {this.meta.foot} />
            </View>);
        }
        return (
            <TabViewTemplate
                onTabChange={this.onTabChange}
                meta={tabs}
                tabPosition={this.meta.tabPosition}
            />
        );
    }

    formatTabs(tabs) {
        return tabs;
    }

    render() {
        const { tabs } = this.meta;
        if (tabs) {
            const newTabs = this.formatTabs(tabs);
            return this.renderContent(newTabs);
        }
        return <LoadingComp icon="loading" show>{this.formatMessage('loading...')}</LoadingComp>; // eslint-disable-line react/jsx-no-undef, max-len
    }
}

const editor = [
    {
        type: 'Combobox',
        key: 'tabPosition',
        items: [{
            key: 'top',
            text: '上方',
        }, {
            key: 'bottom',
            text: '下方',
        }],
        caption: 'Tab位置',
    },
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
];

const defaultValue = {
    formTemplate: 'tabs',
    tabs: [],
    head: Element.defaultValue,
    foot: Element.defaultValue,
    tabPosition: 'top',
}

const WrappedTabTemplate = designExport(internationalWrap(TabTemplate), defaultValue, editor);
WrappedTabTemplate.caption = "多页单据模板";
WrappedTabTemplate.key = 'tabs';

// defaultTemplateMapping.reg('tabs', WrappedTabTemplate);
export default WrappedTabTemplate;
