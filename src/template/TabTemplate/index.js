import React from 'react';
import { Components } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import TabViewTemplate from './TabViewTemplate';
import defaultTemplateMapping from '../defaultTemplateMapping';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';

const { DynamicBillForm, LoadingComp } = Components;
const ToastComponent = LoadingComp;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
});
class TabTemplate extends DynamicBillForm {
    static contextTypes = {
        createElement: PropTypes.func,
        intl: intlShape,
    }
    formatMessage = (msg) => {
        return this.context.intl ? this.context.intl.formatMessage({ id: msg }) : msg;
    }
    renderContent(tabs) {
        if (this.props.foot) {
            const foot = this.context.createElement(this.props.foot);
            return (<View style={styles.container}>
                <TabViewTemplate
                    itemList={tabs}
                    {...this.props}
                />
                {foot}
            </View>);
        }
        return (
            <TabViewTemplate
                itemList={tabs}
                {...this.props}
            />
        );
    }

    formatTabs(tabs) {
        return tabs;
    }

    buildChildren() {
        const { ignoredControl, labels = {}, mergeGridLayout, mergeGridLayoutTitle, ignoredTags, tabs } = this.props;
        const form = this.getBillForm();
        if (tabs) {
            const newTabs = this.formatTabs(tabs);
            return this.renderContent(newTabs);
        }
        if (form) {
            const rootPanel = form.form.getRoot();
            if (rootPanel && rootPanel) {
                const rootElement = rootPanel;
                // ignore control
                // 'yigoElement' may be one of panel or control.
                // Panel has property 'items', while control does not have.

                const yigoElementExceptIgnored = {};

                // eslint-disable-next-line no-shadow, no-inner-declarations
                function removeIgnoredControl(yigoElement, tabKey, result) {
                    /* eslint-disable no-param-reassign */
                    if (yigoElement.tagName === 'toolbar') {
                        return;
                    }
                    const key = yigoElement.metaObj.key;
                    // ignore
                    if (ignoredControl && ignoredControl.indexOf(key) > -1) {
                        return;
                    }
                    if (ignoredTags && ignoredTags.indexOf(yigoElement.tagName) > -1) {
                        return;
                    }
                    if (yigoElement.isPanel) {
                        // 如果是gridLayoutPanel
                        let newTabKey = tabKey;
                        if (yigoElement.tagName === 'gridlayoutpanel') {
                            if (mergeGridLayout) {
                                newTabKey = mergeGridLayoutTitle;
                            } else {
                                newTabKey = key;
                            }
                            if (!result[newTabKey]) {
                                result[newTabKey] = {
                                    tagName: yigoElement.tagName,
                                    caption: newTabKey || yigoElement.metaObj.caption,
                                    key: yigoElement.metaObj.key,
                                    items: [],
                                };
                            }
                        }
                        // eslint-disable-next-line max-len
                        yigoElement.items.forEach((item) => removeIgnoredControl(item, newTabKey, result));
                    } else {
                        // 判断一下是不是表格或者列表
                        if (yigoElement.tagName === 'grid' || yigoElement.tagName === 'listview') {
                            result[yigoElement.metaObj.key] = {
                                tagName: yigoElement.tagName,
                                caption: yigoElement.metaObj.caption,
                                key: yigoElement.metaObj.key,
                            };
                        } else {
                            if (!result[tabKey]) {
                                result[tabKey] = {};
                            }
                            if (!result[tabKey].items) {
                                result[tabKey].items = [];
                            }
                            if (yigoElement.tagName === 'radiobutton') {
                                // yigoElement.
                                if (!yigoElement.getMetaObj().isGroupHead) {
                                    return;
                                }
                            }
                            result[tabKey].items.push({
                                key: yigoElement.metaObj.key,
                                tagName: yigoElement.tagName,
                                caption: labels[yigoElement.metaObj.key] || yigoElement.metaObj.caption,
                            });
                        }
                    }
                    /* eslint-enable no-param-reassign */
                }
                removeIgnoredControl(rootElement, null, yigoElementExceptIgnored);

                const itemList = yigoElementExceptIgnored;

                const tabList = [];
                Object.keys(itemList).forEach((key) => {
                    const item = itemList[key];
                    tabList.push(item);
                });

                return this.renderContent(tabList);
            }
        }
        return <LoadingComp icon="loading" show>{this.formatMessage('loading...')}</LoadingComp>; // eslint-disable-line react/jsx-no-undef, max-len
    }
}
const WrappedTabTemplate = getMappedComponentHOC(TabTemplate);
defaultTemplateMapping.reg('tabs', WrappedTabTemplate);
export default WrappedTabTemplate;
