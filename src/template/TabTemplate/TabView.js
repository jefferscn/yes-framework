import { Tabs } from 'antd-mobile';
import React, { PureComponent } from 'react';

export default class TabView extends PureComponent {
    render() {
        return (<Tabs tabs={this.state.routes} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}>
            {this.renderScene}
        </Tabs>);
    }
}
