/**
 * 一个支持主文字，副文字以及右边有一个链接标志的列表
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListView, PullToRefresh } from 'antd-mobile';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
// import { propTypes } from 'yes'; // eslint-disable-line
import { ListRowWrap as listRowWrap, ListWrap, DynamicControl, GridWrap } from 'yes';
import { ListComponents } from 'yes-comp-react-native-web';
// import styles from '../../style';
import ListViewItem from './ListViewItem';

const { ListText } = ListComponents;

class AntdListView extends PureComponent {
    static propTypes = {
        yigoid: PropTypes.string,
        primaryKey: PropTypes.string,
        divider: PropTypes.bool,
    };
    static contextTypes = {
        createElement: PropTypes.func,
    }
    // static contextTypes = {
    //     uiTheme: PropTypes.object.isRequired,
    // };
    static defaultProps = {
        // ...ImmutableVirtulized.defaultProps,
        style: {},
        divider: true,
        useBodyScroll: false,
        showArrow: true,
    };

    componentWillReceiveProps(nextProps) {
        const data = nextProps.data;
        if (data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.data,
                    this.generateRowIdentifier(nextProps)),
            });
        }
    }

    componentWillMount() {
        if (this.props.data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.data,
                    this.generateRowIdentifier(this.props)),
            });
        }
    }

    generateRowIdentifier = (props) => {
        const data = props.data;
        const result = [];
        for (let i = 0; i < data.size; i++) {
            result.push(i);
        }
        return result;
    }

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            getRowData: (dataBlob, sectionIndex, rowIndex) => {
                return dataBlob[sectionIndex].get(rowIndex);
            },
        }),
        loadingMore: false,
    }

    onClick = (rowIndex) => {
        if (this.props.onClick) {
            this.props.onClick(rowIndex);
        }
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
        return <View style={[{ flexDirection: 'row' }, this.props.style.firstline]}>{el}</View>;
    }
    generateSecondaryElement = () => {
        const el = [];
        if (this.props.secondKey) {
            this.props.secondKey.forEach((item) => {
                let itemtype = typeof item;
                if (itemtype === 'string') {
                    el.push(<ListText style={[styles.secondaryText]} key={item} yigoid={item} />);
                } else {
                    if (item.$$typeof) {
                        el.push(item);
                    } else {
                        el.push(<ListText style={[styles.secondaryText]} {...item} />);
                    }
                }
            });
            return <View style={{ flexDirection: 'row' }}>{el}</View>;
        }
        return null;
    }
    generateActions = () => (
        <View style={[styles.flexrow_r, this.props.actionContainerStyle]}>
            {
                this.props.actions.map((action) => {
                    const itemType = typeof (action);
                    if (itemType === 'string') {
                        return <DynamicControl yigoid={action} />;
                    }
                    if (itemType.$$typeof) {
                        return action;
                    }
                    return <DynamicControl {...action} />;
                })
            }
        </View>
    );

    centerComp = (
        <View style={[{ flex: 1, overflow: 'hidden' }, this.props.style.centerStyle]}>
            {this.generatePrimaryELement()}
            {this.generateSecondaryElement()}
            {this.generateTertiaryElement()}
        </View>
    )
    NewListItem = listRowWrap(ListViewItem, this.props.yigoid)
    // RowView = listRowWrap(View, this.props.yigoid)
    renderItem = (item, secionId, rowId, highlightRow) => {
        if (this.props.RowElement) {
            const rowElement = this.context.createElement(this.props.RowElement);
            return React.cloneElement(rowElement, {
                rowIndex: rowId,
                onPress: () => this.onClick(rowId)
            });
        }
        const NewListItem = this.NewListItem;
        const { showArrow } = this.props;

        return (
            <NewListItem
                centerElement={this.centerComp}
                rightElement={this.context.createElement(this.props.rightElement)}
                containerStyle={this.props.rowStyle}
                onPress={() => this.onClick(rowId)}
                // divider={this.props.divider}
                rowIndex={rowId}
                showArrow={showArrow}
                leftElement={this.props.leftElement}
            />
        );
    }
    onRefresh = () => {
        this.props.onRefresh && this.props.onRefresh();
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
    renderFoot = () => {
        if(!this.props.onRefresh) {
            return null;
        }
        return !this.props.hasMore ?
            (<View style={styles.foot}>
                <Text>没有更多数据</Text>
            </View>) : (this.state.loadingMore? (<View style={styles.foot}><ActivityIndicator/></View>): null);
    }
    render() {
        const { controlState, layoutStyles, style, useBodyScroll } = this.props;
        if (controlState && controlState.get('isVirtual')) {
            return (
                <View style={[styles.center, style]}>
                    <ActivityIndicator size="large" color="cadetblue" />
                </View>
            );
        }
        return (
            <ListView
                style={style}
                dataSource={this.state.dataSource}
                useBodyScroll={useBodyScroll}
                renderRow={this.renderItem}
                pageSize={4}
                onEndReached={this.onEndReached}
                contentContainerStyle={{
                    backgroundColor: 'lightgray',
                    width: '100%',
                }}
                renderFooter={this.renderFoot}
                // pullToRefresh
                pullToRefresh={this.props.onRefresh ? <PullToRefresh
                    refreshing={false}
                    onRefresh={this.onRefresh}
                /> : null}
            />
        );
    }
}
// AntdListView.propTypes = propTypes.List;
const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
        flex: 1,
    },
    head: {
        flexDirection: 'row',
        paddingLeft: 12,
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
        paddingTop: 8,
        paddingLeft: 4,
        fontSize: 12,
        whiteSpace: 'nowrap',
    },
    secondaryText: {
        paddingTop: 4,
        paddingLeft: 6,
        paddingBottom: 4,
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
    } 
});

// export const GridView = GridWrap(AntdListView);
export default ListWrap(AntdListView);
