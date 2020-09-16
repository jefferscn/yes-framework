import React, { PureComponent } from 'react';
import { Components } from 'yes-comp-react-native-web'; // eslint-disable-line import/no-unresolved
import { getMappedComponentHOC, internationalWrap } from 'yes'; // eslint-disable-line import/no-unresolved
import defaultTemplateMapping from '../defaultTemplateMapping';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Tabs } from 'antd-mobile';
import AutofitScrollView from '../../controls/AutofitScrollView';
import Element from '../Element';

const { CustomBillForm, LoadingComp } = Components;
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
});
class TabTemplate extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    renderTab = (tab) => {
        return <AutofitScrollView>
            {
                tab.items.map(item =>
                    <Element meta={item} />
                )
            }
        </AutofitScrollView>
    }
    renderContent(tabs) {
        if (this.props.foot || this.props.head) {
            const foot = this.context.createElement(this.props.foot);
            const head = this.context.createElement(this.props.head);
            return (<View style={styles.container}>
                {head}
                <Tabs tabs={tabs}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
                    {...this.props}
                >
                    {this.renderTab}
                </Tabs>
                {foot}
            </View>);
        }
        return (
            <Tabs tabs={tabs}
                renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
                {...this.props}
            >
                {this.renderTab}
            </Tabs>
        );
    }

    formatTabs(tabs) {
        return tabs;
    }

    render() {
        const { tabs } = this.props;
        const newTabs = this.formatTabs(tabs);
        return this.renderContent(newTabs);
    }
}
const WrappedTabTemplate = getMappedComponentHOC(internationalWrap(TabTemplate));
defaultTemplateMapping.reg('tabs', WrappedTabTemplate);
export default WrappedTabTemplate;
