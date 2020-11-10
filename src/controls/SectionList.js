import React, { PureComponent } from 'react';
import { GridWrap, GridRowWrap as gridRowWrap, MetaBillFormWrap } from 'yes-intf';
import { SectionList, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import ListViewItem from './ListViewItem';
import { ListComponents, withDetail } from 'yes-comp-react-native-web';

const {
    ListText
} = ListComponents;

const defaultMapFunction = {
    date: (v) => {
        return v.toLocaleDateString();
    }
}

class DefaultSectionComponent extends PureComponent {
    render() {
        const { section } = this.props;
        return <Text style={styles.sectionHeader}>{section.sectionValue}</Text>;
    }
}

@MetaBillFormWrap
@GridWrap
@withDetail
export default class SectionListGrid extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
        getOwner: PropTypes.func,
    }
    static defaultProps = {
        style: {},
        showArrow: true,
        divider: true,
        useBodyScroll: false,
        hideAction: false,
        removeable: true,
        removeType: 'normal',
        storybook: false,//专门用于storybook
    };
    static getDerivedStateFromProps(nextProps, prevState) {
        const data = nextProps.controlState.getIn(['dataModel', 'data']);
        if (data !== prevState.data) {
            const sections = [];
            const columns = nextProps.controlState.getIn(['dataModel', 'colModel', 'columns']);
            if (!columns) {
                return null;
            }
            const sectionColumnIndex = columns.findIndex((item) => item.get('key') === prevState.sectionColumn);
            let sectionKey = null;
            let section = {};
            for (let i = 0; i < data.size; i++) {
                let sectionValue = null;
                if(nextProps.storybook) {
                    sectionValue = data.getIn([i, prevState.sectionColumn]);
                } else { 
                    sectionValue = data.getIn([i, 'data', sectionColumnIndex, 0]);
                }
                if (nextProps.mapFun) {
                    let mapFunc = defaultMapFunction[nextProps.mapFun] || nextProps.mapFun;
                    sectionValue = mapFunc(sectionValue);
                }
                if (sectionKey != sectionValue) {
                    section = {
                        data: [],
                        rowIndex: i,
                        sectionValue,
                    };
                    sections.push(section);
                    sectionKey = sectionValue;
                }
                section.data.push({
                    data: data.getIn([i, 'data']),
                    rowIndex: i,
                });
            }
            return {
                sections,
                data,
            };
        }
        return null;
    }

    generateTertiaryElement = () => {
        const el = [];
        if (this.props.tertiaryKey) {
            this.props.tertiaryKey.forEach((item) => {
                let itemtype = typeof item;
                if (itemtype === 'string') {
                    el.push(<ListText yigoid={item} style={[styles.secondaryText]} />);
                } else {
                    const tmp = this.context.createElement(item);
                    if (tmp.$$typeof) {
                        el.push(tmp);
                    } else {
                        el.push(<ListText {...tmp} />);
                    }
                }
            });
            return <View style={{ flexDirection: 'row' }}>{el}</View>;
        }
        return null;
    }
    generatePrimaryELement = () => {
        const primaryKey = this.props.primaryKey;
        let el;
        if (!primaryKey) {
            return null;
        }
        const itemtype = typeof (primaryKey);
        if (itemtype === 'string') {
            el = <ListText style={[styles.primaryText]} yigoid={primaryKey} />;
        } else {
            if (primaryKey.$$typeof) {
                el = primaryKey;
            } else {
                const tmp = this.context.createElement(primaryKey);
                if (tmp.$$typeof) {
                    el = tmp;
                } else {
                    el = <ListText style={[styles.primaryText]} {...primaryKey} />;
                }
            }
        }
        return <View style={[{ flexDirection: 'row', overflow: 'hidden' }, this.props.style.firstline]}>{el}</View>;
    }
    generateSecondaryElement = () => {
        const el = [];
        if (this.props.secondKey) {
            this.props.secondKey.forEach((item) => {
                let itemtype = typeof item;
                if (itemtype === 'string') {
                    el.push(<ListText style={[styles.secondaryText]} key={item} yigoid={item} />);
                } else {
                    const tmp = this.context.createElement(item);
                    if (tmp.$$typeof) {
                        el.push(tmp);
                    } else {
                        el.push(<ListText style={[styles.secondaryText]} {...tmp} />);
                    }
                }
            });
            return <View style={{ flexDirection: 'row' }}>{el}</View>;
        }
        return null;
    }
    centerComp = !this.props.centerElement ? (
        <View style={[{ flex: 1 }, this.props.style.centerStyle]}>
            {this.generatePrimaryELement()}
            {this.generateSecondaryElement()}
            {this.generateTertiaryElement()}
        </View>
    ) : this.context.createElement(this.props.centerElement)

    NewListItem = gridRowWrap(ListViewItem, ActivityIndicator, this.props.yigoid)

    state = {
        sectionColumn: this.props.sectionColumn,
        sections: [],
        data: null,
        loadingMore: false,
    }

    onClick = (rowIndex) => {
        if (this.props.onClick) {
            this.props.onClick(rowIndex);
        }
    }

    renderItem = ({ item }) => {
        const rowIndex = item.rowIndex;
        const NewListItem = this.NewListItem;
        return (<NewListItem
            centerElement={this.centerComp}
            rightElement={this.context.createElement(this.props.rightElement)}
            containerView={this.context.createElement(this.props.rowContainer)}
            containerStyle={[styles.rowStyle, this.props.rowStyle]}
            onPress={() => this.onClick(rowIndex)}
            divider={this.props.divider}
            dividerStyle={this.props.dividerStyle}
            rowIndex={rowIndex}
            showArrow={this.props.showArrow}
            leftElement={this.context.createElement(this.props.leftElement)}
            detailElement={this.context.createElement(this.props.detailElement)}
        />);
    }

    renderSectionHeader = ({ section }) => {
        if(this.props.SectionHeader) {
            return this.context.createElement(this.props.SectionHeader, {
                section,
            });
        }
        return <DefaultSectionComponent section={section} />;
    }

    onEndReached = async () => {
        if (this.props.hasMore) {
            if (this.state.loadingMore) {
                return;
            }
            this.setState({
                loadingMore: true,
            });
            await this.props.loadMore();
            this.setState({
                loadingMore: false,
            });
        }
    }

    renderListFooter = ()=> {
        if (!this.props.onRefresh) {
            return null;
        }
        return !this.props.hasMore ?
            (<View style={styles.foot}>
                <Text>没有更多数据</Text>
            </View>) : (this.state.loadingMore ? (<View style={styles.foot}><ActivityIndicator /></View>) : null);
    }

    render() {
        return <SectionList
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            sections={this.state.sections}
            stickySectionHeadersEnabled
            onEndReached={this.onEndReached}
            ListFooterComponent={this.renderListFooter}
        />
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        padding: 10,
        backgroundColor: 'aliceblue',
    },
    rowStyle: {
        padding: 12,
    },
    center: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1,
        flexBasis: 'auto',
        // overflow: 'hidden',
    },
    head: {
        flexDirection: 'row',
        paddingLeft: 12,
        height: 35,
    },
    headTitle: {
        paddingTop: 8,
        paddingBottom: 8,
        flex: 1,
        opacity: '80%',
    },
    list: {
        flex: 1,
    },
    primaryText: {
        // paddingTop: 8,
        // paddingLeft: 4,
        fontSize: 14,
        fontWeight: 'bold',
    },
    secondaryText: {
        // paddingTop: 4,
        paddingLeft: 2,
        // paddingBottom: 4,
        opacity: '60%',
        fontSize: 12,
    },
    tertiaryContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        lineHeight: 12,
        paddingBottom: 6,
    },
    tertiaryText: {
        fontSize: 10,
        color: 'rgba(0,0,0,0.5)',
    },
    foot: {
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    extraStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});
