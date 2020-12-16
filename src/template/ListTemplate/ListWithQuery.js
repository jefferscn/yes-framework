import React, { PureComponent } from 'react';
import defaultTemplateMapping from '../defaultTemplateMapping';
import { View, Text as RawText, StyleSheet, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { DynamicControl } from 'yes';
import { internationalWrap } from 'yes-intf';
import Icon from 'react-native-vector-icons/FontAwesome';
import { History } from 'yes-platform';
import { BackHandler } from 'yes';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    mask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(211,211,211,0.5)',
    },
    queryBlock: {
        flexDirection: 'row',
        height: 48,
    },
    queryitemwrap: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    query: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        left: 0,
        backgroundColor: 'white',
        right: 0,
        maxHeight: 300,
    },
    selectedText: {
        color: '#108EE9'
    },
});

const QueryItem = ({ selected, item, onPress }) => {
    const doPress = () => {
        onPress && onPress(item);
    }
    return <TouchableOpacity style={styles.queryitemwrap} onPress={doPress}>
        <View style={styles.item}>
            <RawText style={[selected ? styles.selectedText : styles.queryItemText]}>{item.text}</RawText>
            <Icon style={[selected ? styles.selectedText : styles.queryItemText]} name={selected ? 'angle-up' : 'angle-down'} />
        </View>
    </TouchableOpacity>
}

const AdvanceQuery = ({ item, selected, onPress }) => {
    const doPress = () => {
        onPress && onPress(item);
    }
    return <TouchableOpacity style={styles.queryitemwrap} onPress={doPress}>
        <View style={styles.item}>
            <Icon name="filter" />
        </View>
    </TouchableOpacity>
}

class QueryBlock extends PureComponent {
    state = {
        selectedItem: null,
    }
    onQuery = (item) => {
        if (item === this.state.selectedItem) {
            this.setState({
                selectedItem: null,
            });
            this.props.onQuery && this.props.onQuery(null);
        } else {
            this.setState({
                selectedItem: item,
            });
            this.props.onQuery && this.props.onQuery(item);
        }
    }
    onAdvanceQuery = () => {
        this.onQuery(null);
        this.props.onAdvanceQuery && this.props.onAdvanceQuery();
    }
    reset = () => {
        this.onQuery(null);
    }
    render() {
        const { items, advanceQuery } = this.props;
        const { selectedItem } = this.state;
        return <View style={styles.queryBlock}>
            {
                items.map(item =>
                    <QueryItem item={item} selected={selectedItem === item} onPress={this.onQuery} />
                )
            }
            {
                advanceQuery ? <AdvanceQuery item={advanceQuery} onPress={this.props.onAdvanceQuery} /> : null
            }
        </View>
    }
}

class ListWithQueryTemplate extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
        onControlClick: PropTypes.func,
        getControlProps: PropTypes.func,
        doOpt: PropTypes.func,
    }

    state = {
        refreshing: false,
        showMask: false,
        showSlideMask: false,
        queryItem: null,
    }

    static defaultProps = {
        queryType: 'button',
    }

    componentWillUnmount() {
        this.removeListener();
    }

    onRefresh = async () => {
        this.setState({
            refreshing: true,
        });
        try {
            const { refresh } = this.props;
            if (!refresh || refresh.type === 'form') {
                await this.props.reload();
            }
            if (refresh && refresh.type === 'button') {
                await this.context.onControlClick(refresh.buttonId);
            }
            if (refresh && refresh.type === 'opt') {
                await this.context.doOpt(refresh.optId);
            }
        } catch (ex) {
            console.log(ex);
        } finally {
            this.setState({
                refreshing: false,
            })
        }
    }

    addListener = () => {
        if (!this.backHandler) {
            History.push(`#ListWithQuery`, false);
            this.backHandler = BackHandler.addPreEventListener(() => {
                // this.removeListener();
                this.onMaskClick();
            });
        }
    }

    removeListener = () => {
        this.backHandler && this.backHandler();
        // this.onMaskClick();
        this.backHandler = null;
    }

    render() {
        return this.buildChildren();
    }

    onAdvanceQuery = () => {
        const { advanceQuery } = this.props;
        if (!advanceQuery) {
            return;
        }
        if (advanceQuery.type === 'button') {
            this.setState({
                queryItem: null,
                showMask: false,
                showSlideMask: false,
            });
            // this.ref && this.ref.reset();
            this.removeListener();
            this.context.onControlClick(advanceQuery.yigoid);
        } else {
            this.setState({
                queryItem: null,
                showMask: false,
                showSlideMask: true,
            });
            this.addListener();
        }
    }

    onQuery = (item) => {
        if (item) {
            this.setState({
                showMask: true,
                queryItem: item,
                showSlideMask: false,
            });
            this.addListener();
        } else {
            this.setState({
                showMask: false,
                queryItem: item,
                showSlideMask: false,
            });
            this.removeListener();
        }
    }

    bindRef = (ref) => {
        this.ref = ref;
    }

    onMaskClick = () => {
        this.ref && this.ref.reset();
    }

    onPostQuery = () => {
        const { queryType, queryId } = this.props;
        this.onMaskClick();
        if (queryType === 'button') {
            this.context.onControlClick(queryId);
        }
    }

    buildChildren() {
        const { queryItems, advanceQuery, list, action, formStatus, error, errorMsg,
            contentStyle, busying } = this.props;
        //reloading状态下不显示加载状态
        const { showMask, showSlideMask, refreshing } = this.state;
        let listEle = this.context.createElement(list, {
            onRefresh: this.onRefresh,
            refreshing: refreshing,
        });
        const foot = this.context.createElement(this.props.foot);
        const head = this.context.createElement(this.props.head);
        let actionButton = this.context.createElement(action);
        if (!React.isValidElement(listEle)) {
            listEle = <DynamicControl
                designPositionBase
                yigoid={list}
                debugStyle={{ flex: 1 }}
                layoutStyles={{ flex: 1 }}
                style={{ flex: 1, marginLeft: 12 }}
                {...this.context.getControlProps(list)}
            />;
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    this.context.createElement(head)
                }
                <View style={[{ flex: 1 }]}>
                    {
                        showSlideMask ? <TouchableWithoutFeedback onPress={this.onMaskClick}><View style={styles.mask} /></TouchableWithoutFeedback> : null
                    }
                    {
                        (showSlideMask && this.props.advanceQuery) ? <View style={styles.slide}>
                            {
                                this.context.createElement(this.props.advanceQuery.content)
                            }
                        </View> : null
                    }
                    <QueryBlock ref={this.bindRef} onQuery={this.onQuery} onAdvanceQuery={this.onAdvanceQuery} items={queryItems} advanceQuery={advanceQuery} />
                    <View style={[{ flex: 1 }, contentStyle]}>
                        {
                            busying ? <View style={styles.mask}><ActivityIndicator /></View> : null
                        }
                        {
                            showMask ? <TouchableWithoutFeedback onPress={this.onMaskClick} style={styles.mask}><View style={styles.mask} /></TouchableWithoutFeedback> : null
                        }
                        {
                            (showMask && this.state.queryItem) ? <View style={styles.query}>
                                {
                                    this.context.createElement(this.state.queryItem.content, {
                                        onChange: this.onPostQuery
                                    })
                                }
                            </View> : null
                        }
                        {listEle}
                        {
                            foot
                        }
                        {
                            actionButton
                        }
                    </View>
                </View>
            </View>
        );
    }
}
const ListWithNavigation = internationalWrap(ListWithQueryTemplate);

ListWithNavigation.caption = "单据列表模板(带过滤)";
defaultTemplateMapping.reg('listwithquery', ListWithNavigation);
export default ListWithNavigation;
