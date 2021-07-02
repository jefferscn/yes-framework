/**
 * 一个支持主文字，副文字以及右边有一个链接标志的列表
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListView, PullToRefresh } from 'antd-mobile';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { GridRowWrap as gridRowWrap, DynamicControl, GridWrap, MetaBillFormWrap } from 'yes';
import ListViewItem from '../../Container/ListViewItem';
import Separator from '../../RenderLayer/Seperator';
import { withDetail, ListComponents } from 'yes-comp-react-native-web';
import { RefreshControl } from 'react-native-web-refresh-control';
import ImmutableVirtulizedList from 'yes-comp-react-native-web/dist/components/List/ImmutableVirtulizedList';
import SwipeAction from '../../Animated/SwipeAction';

const {
    ListText
} = ListComponents;

class AntdListView extends PureComponent {
    static propTypes = {
        yigoid: PropTypes.string,
        primaryKey: PropTypes.string,
        secondKey: PropTypes.string,
        tertiaryKey: PropTypes.string,
        divider: PropTypes.bool,
        showArrow: PropTypes.bool,
    };
    static defaultProps = {
        style: {},
        showArrow: true,
        divider: true,
        useBodyScroll: false,
        hideAction: false,
        removeable: true,
        removeType: 'normal',
    };

    static contextTypes = {
        createElement: PropTypes.func,
        getOwner: PropTypes.func,
        getRowIdentifier: PropTypes.func,
    }

    // componentWillReceiveProps(nextProps) {
    //     const data = nextProps.controlState.getIn(['dataModel', 'data']);
    //     if (data) {
    //         this.setState({
    //             dataSource: this.state.dataSource.cloneWithRows(nextProps.controlState.getIn(['dataModel', 'data']), this.generateRowIdentifier(nextProps)),
    //         });
    //     }
    // }

    // componentWillMount() {
    //     if (this.props.controlState && this.props.controlState.getIn(['dataModel', 'data'])) {
    //         this.setState({
    //             dataSource: this.state.dataSource.cloneWithRows(this.props.controlState.getIn(['dataModel', 'data']),
    //                 this.generateRowIdentifier(this.props)),
    //         });
    //     }
    // }

    generateRowIdentifier = (props) => {
        // const data = props.controlState.getIn(['dataModel', 'data']);
        // const result = [];
        // for (let i = 0; i < data.size; i++) {
        //     result.push(i);
        // }
        const result = this.context.getRowIdentifier();
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
        // if (this.props.onRowClick) {
        //     this.props.onRowClick(rowIndex);
        // }
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

    rowAction = (action, rowId) => {
        if (!action) {
            return;
        }
        if (action.columnKey) {
            const owner = this.context.getOwner();
            owner.doOnCellClick(rowId, action.columnKey);
        }
    }

    removeRow = (rowId) => {
        if (this.props.removeType === 'normal') {
            this.props.removeRow(rowId);
        }
        if (this.props.removeType === 'column') {
            const owner = this.context.getOwner();
            if (owner) {
                owner.doOnCellClick(rowId, this.props.removeColumn);
            }
        }
    }

    centerComp = !this.props.centerElement ? (
        <View style={[{ flex: 1 }, this.props.style.centerStyle]}>
            {this.generatePrimaryELement()}
            {this.generateSecondaryElement()}
            {this.generateTertiaryElement()}
        </View>
    ) : this.context.createElement(this.props.centerElement)

    NewListItem = gridRowWrap(ListViewItem, ActivityIndicator, this.props.yigoid)
    // RowView = listRowWrap(View, this.props.yigoid)
    renderItem = ({ item, index }) => {
        const rowId = index;
        if (this.props.RowElement) {
            const rowElement = this.context.createElement(this.props.RowElement);
            return React.cloneElement(rowElement, {
                rowIndex: rowId,
                onPress: () => this.onClick(rowId)
            });
        }
        const NewListItem = this.NewListItem;
        const rightActions = [];
        const leftActions = [];
        const containerStyle = {

        };
        if (this.props.rowHeight) {
            containerStyle.height = this.props.rowHeight;
        }

        if (((this.props.status === 1 || this.props.status === 2) && this.props.removeable) ||
            this.props.rightActions || this.props.leftActions) {
            if (this.props.leftActions) {
                this.props.leftActions.forEach((action) => {
                    leftActions.push({
                        text: action.text,
                        style: {
                            backgroundColor: '#aaa',
                            color: 'white',
                        },
                        onPress: () => this.rowAction(action, rowId),
                    })
                });
            }
            if (this.props.rightActions) {
                this.props.rightActions.forEach((action) => {
                    rightActions.push({
                        text: action.text,
                        style: {
                            backgroundColor: '#aaa',
                            color: 'white',
                        },
                        onPress: () => this.rowAction(action, rowId),
                    })
                })
            }
            let removeable = false;
            if ((this.props.status === 1 || this.props.status === 2) && this.props.removeable) {
                removeable = true;
                // rightActions.push({
                //     text: '删除',
                //     style: {
                //         backgroundColor: '#aaa',
                //         color: 'white',
                //     },
                //     onPress: () => this.removeRow(rowId)
                // });
            }
            return (<SwipeAction
                removeable={removeable}
                onRemove={() => this.removeRow(rowId)}
                autoClose
                right={rightActions}
                left={leftActions}
            >
                <NewListItem
                    centerElement={this.centerComp}
                    rightElement={this.context.createElement(this.props.rightElement)}
                    containerView={this.context.createElement(this.props.rowContainer)}
                    containerStyle={[styles.rowStyle, this.props.rowStyle]}
                    onPress={() => this.onClick(rowId)}
                    divider={this.props.divider}
                    dividerStyle={this.props.dividerStyle}
                    rowIndex={rowId}
                    showArrow={this.props.showArrow}
                    leftElement={this.context.createElement(this.props.leftElement)}
                    detailElement={this.context.createElement(this.props.detailElement)}
                    containerStyle={containerStyle}
                />
            </SwipeAction>);
        }
        return (
            <NewListItem
                centerElement={this.centerComp}
                rightElement={this.context.createElement(this.props.rightElement)}
                containerView={this.context.createElement(this.props.rowContainer)}
                containerStyle={[styles.rowStyle, this.props.rowStyle]}
                onPress={() => this.onClick(rowId)}
                divider={this.props.divider}
                dividerStyle={this.props.dividerStyle}
                rowIndex={rowId}
                showArrow={this.props.showArrow}
                leftElement={this.context.createElement(this.props.leftElement)}
                detailElement={this.context.createElement(this.props.detailElement)}
                containerStyle={containerStyle}
            />
        );
    }
    onRefresh = () => {
        this.props.onRefresh && this.props.onRefresh();
    }
    addRow = () => {
        this.props.addNewRow && this.props.addNewRow();
    }
    renderFoot = () => {
        if (!this.props.onRefresh) {
            return null;
        }
        return !this.props.hasMore ?
            (<View style={styles.foot}>
                <Text>没有更多数据</Text>
            </View>) : (this.state.loadingMore ? (<View style={styles.foot}><ActivityIndicator /></View>) : null);
    }
    renderSeparator = () => {
        if (this.props.separator) {
            return <Separator direction={'ver'} {...this.props.separator} />
        }
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
    keyExtractor = (items, index) => {
        const { data, keyField } = this.props;
        const owner = this.context.getOwner();
        if (!owner) {
            return index;
        }
        const keyData = owner.getValueByKey(index, keyField || "OID");
        //这里得keyData可能是一个数值也可能是一个Decimal对象所以需要区别处理
        return (keyData && (keyData.gt ? keyData.gt(0) : keyData)) ? keyData : data.getIn([index, 'rowID']);
    }
    render() {
        const { layoutStyles, style, isVirtual, showHead, onRefresh, refreshing, controlState,
            rowHeight, headTitle, headExtra, editable, useBodyScroll, hideAction, newElement } = this.props;
        const extra = headExtra ? this.context.createElement(headExtra) : null;
        const visible = controlState.get('visible');
        const newEle = this.context.createElement(newElement, {
            onPress: this.addRow,
        });
        if (isVirtual) {
            return null;
        }
        if (!visible) {
            return null;
        }
        return (
            <View style={[layoutStyles, styles.container]}>
                {
                    showHead ?
                        <View style={[styles.head]}>
                            <Text style={[styles.headTitle]}>{headTitle}</Text>
                            <View style={styles.extraStyle}>
                                {extra}
                            </View>
                        </View> : null
                }
                {/* <View style={{ flex: 1 }}> */}
                {/* <ListView
                    style={style}
                    initialListSize={20}
                    useBodyScroll={useBodyScroll}
                    dataSource={this.state.dataSource}
                    contentContainerStyle={{ width: '100%' }}
                    onEndReached={this.onEndReached}
                    renderRow={this.renderItem}
                    pageSize={4}
                    renderSeparator={this.renderSeparator}
                    renderFooter={this.renderFoot}
                    pullToRefresh={
                        onRefresh ? <PullToRefresh
                            onRefresh={this.onRefresh}
                            refreshing={refreshing}
                        /> : false
                    }
                /> */}
                {
                    <ImmutableVirtulizedList
                        initialNumberToRender={20}
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        ListFooterComponent={this.renderFoot}
                        onEndReached={this.onEndReached}
                        rowHeight={rowHeight}
                        refreshControl={
                            onRefresh ? <RefreshControl
                                onRefresh={this.onRefresh}
                                refreshing={refreshing}
                            /> : null
                        }
                    />
                }
                {
                    (editable && !hideAction) ? newEle : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
})

export default MetaBillFormWrap(GridWrap(withDetail(AntdListView)));
