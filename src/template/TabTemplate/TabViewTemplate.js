import React from 'react';
import { DynamicControl, getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import { TabView } from 'yes-platform'; // eslint-disable-line import/no-unresolved
// import TabView from './TabView';
import CellLayoutTemplate from './CellLayoutTemplate';
// import TabView from './TabView;
import { observer } from 'mobx-react';
import { intlShape, FormattedMessage } from 'react-intl';

const CellLayout = getMappedComponentHOC(CellLayoutTemplate);
// const { TabView, TextGrid } = Components;
@observer
class TabViewTemplate extends TabView {
    static contextTypes = {
        intl: intlShape,
    }

    static defaultProps = {
        designMode: false,
    }

    formatMessage = (msg) => {
        return this.context.intl ? this.context.intl.formatMessage({ id: msg }) : msg;
    }

    state = {
        index: 0,
        routes: this.props.meta,
        loading: false,
    }

    handleChangeTab = (index) => {
        this.setState({
            index,
        });
    }

    componentWillMount() {

    }
    // componentWillMount() {
    //     const routes = this.props.itemList.map((item, index) => ({
    //         key: item.key || index,
    //         title: this.formatMessage(item.caption),
    //         ...item,
    //     }));
    //     this.setState({
    //         routes,
    //         loading: false,
    //     });
    // }
    renderScene = ({ route }) => { // eslint-disable-line react/prop-types
        return (
            <CellLayout
                designMode = {this.props.designMode}
                meta={route}
                layoutType={route.layoutType}
                {...route}
            />
        );
    }
}

export default TabViewTemplate;
// export default getMappedComponentHOC(TabViewTemplate);
