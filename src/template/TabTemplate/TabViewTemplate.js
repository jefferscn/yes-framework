import React from 'react';
import { DynamicControl, getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import { TabView } from 'yes-platform'; // eslint-disable-line import/no-unresolved
// import TabView from './TabView';
import CellLayoutTemplate from './CellLayoutTemplate';
// import TabView from './TabView;
import { intlShape, FormattedMessage } from 'react-intl';

const CellLayout = getMappedComponentHOC(CellLayoutTemplate);
// const { TabView, TextGrid } = Components;
class TabViewTemplate extends TabView {
    static contextTypes = {
        intl: intlShape,
    }
    formatMessage = (msg) => {
        return this.context.intl ? this.context.intl.formatMessage({ id: msg }) : msg;
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

export default TabViewTemplate;
// export default getMappedComponentHOC(TabViewTemplate);
