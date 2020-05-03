import React from 'react';
import { internationalWrap, getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
// import { TabView } from 'yes-platform'; // eslint-disable-line import/no-unresolved
import TabView from './TabView';
import CellLayoutTemplate from './CellLayoutTemplate';
// import TabView from './TabView;
const CellLayout = getMappedComponentHOC(CellLayoutTemplate);
// const { TabView, TextGrid } = Components;
class TabViewTemplate extends TabView {
    formatMessage = (msg) => {
        return this.props.formatMessage? this.props.formatMessage(msg) : msg;
    }
    componentWillMount() {
        const routes = this.props.itemList.map((item, index) => ({
            key: item.key || index,
            title: this.formatMessage(item.caption),
            ...item,
        }));
        this.setState({
            routes,
            loading: false,
        });
    }
    renderScene = ({route}) => { // eslint-disable-line react/prop-types
        return (
            <CellLayout
                items={route.items}
                layoutType={route.layoutType}
                {...route}
            />
        );
    }
}

export default internationalWrap(TabViewTemplate);
