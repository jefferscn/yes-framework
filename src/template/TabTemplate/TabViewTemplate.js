import React from 'react';
import CellLayoutTemplate from './CellLayoutTemplate';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Animated } from 'react-native';
import TabLabel from './TabLabel';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import { observable } from 'mobx';
import { internationalWrap, getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import { TabView } from 'yes-platform'; // eslint-disable-line import/no-unresolved
const CellLayout = getMappedComponentHOC(CellLayoutTemplate);
// const { TabView, TextGrid } = Components;
@observer
class TabViewTemplate extends TabView {
    static contextTypes = {
        isDesignMode: PropTypes.func,
    }

    formatMessage = (msg) => {
        return this.props.formatMessage? this.props.formatMessage(msg) : msg;
    }

    buildRoutes = () => {
        if (this.context.isDesignMode()) {
            return [...this.props.meta, { key: 'new' }]
        }
        return this.props.meta;
    }

    @observable meta = this.props.meta;

    state = {
        index: -1,
        routes: this.buildRoutes(this.meta),
        loading: false,
    }

    addTab = () => {
        this.meta.push({
            title: '',
            content: {
                isGroup: true,
                hideTitle: true,
                items: [],
            }
        });
        this.setState({
            routes: this.buildRoutes(this.meta),
        })
    }

    removeTab = (index) => {

    }

    handleChangeTab = (index) => {
        if (this.context.isDesignMode()) {
            //判断是不是点击了新增按钮页
            if (index === this.state.routes.length - 1) {
                this.addTab();
            }
        }
        this.setState({
            index,
        });
    }

    componentWillMount() {//覆盖父类的代码

    }

    renderLabel = props => ({ route, index }) => {
        // const inputRange = props.navigationState.routes.map((x, i) => i);
        // const outputRange = inputRange.map(
        //     inputIndex => (inputIndex === index ? '#D6356C' : '#222'),
        // );
        // const color = props.position.interpolate({
        //     inputRange,
        //     outputRange,
        // });
        if (this.context.isDesignMode()) {//需要增加一個刪除的按鈕
            let title = route.title;
            if (route.key === 'new') {
                title = <AwesomeFontIcon name='plus' />;
                return (<Animated.Text style={[styles.label]}>
                    {title}
                </Animated.Text>);
            }
            return (
                <TabLabel designPositionBase debugStyle={{alignSelf: 'stretch'}} meta={route} routes={this.state.routes} index={index} title={title} />
            )
        }
        return (
            <Animated.Text style={[styles.label]}>
                {route.title}
            </Animated.Text>
        );
    }

    renderScene = ({ route }) => { // eslint-disable-line react/prop-types
        if (!route.content) {
            return null;
        }
        return (
            <TabPanel meta = {route.content} designStyle={{flex:1}} designPositionBase/>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        margin: 8,
    },
});

// export default getMappedComponentHOC(TabViewTemplate);
export default internationalWrap(TabViewTemplate);
