/**
 * 一个支持主文字，副文字以及右边有一个链接标志的列表
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListView, PullToRefresh } from 'antd-mobile';
import { View, ActivityIndicator } from 'react-native';
import { propTypes } from 'yes'; // eslint-disable-line
import { ListRowWrap as listRowWrap, ListWrap, DynamicControl, GridWrap } from 'yes';
// import styles from '../../style';
import ListViewItem from './ListViewItem';

class AntdListView extends PureComponent {
    static propTypes = {
        yigoid: PropTypes.string,
        primaryKey: PropTypes.string,
        secondKey: PropTypes.string,
        tertiaryKey: PropTypes.string,
        divider: PropTypes.bool,
    };
    // static contextTypes = {
    //     uiTheme: PropTypes.object.isRequired,
    // };
    static defaultProps = {
        // ...ImmutableVirtulized.defaultProps,
        style: {},
        divider: true,
    };

    componentWillReceiveProps(nextProps) {
        const data = nextProps.controlState.get('data');
        if (data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.controlState.get('data'), this.generateRowIdentifier(nextProps)),
            });
        }
    }

    componentWillMount() {
        if (this.props.controlState && this.props.controlState.get('data')) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.controlState.get('data'),
                    this.generateRowIdentifier(this.props)),
            });
        }
    }

    generateRowIdentifier = (props) => {
        const data = props.controlState.get('data');
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
                    el.push(<DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={this.props.style.tertiaryText} yigoid={item} />);
                } else {
                    if (item.$$typeof) {
                        el.push(item);
                    } else {
                        el.push(<DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={this.props.style.tertiaryText} {...item} />);
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
            el = <DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={this.props.style.primaryText} yigoid={primaryKey} />;
        } else {
            if (primaryKey.$$typeof) {
                el = primaryKey;
            } else {
                el = <DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={this.props.style.primaryText} {...primaryKey} />;
            }
        }
        return <View style={[{ flex: 1 }, this.props.style.firstline]}>{el}</View>;
    }
    generateSecondaryElement = () => {
        const el = [];
        if (this.props.secondKey) {
            this.props.secondKey.forEach((item) => {
                let itemtype = typeof item;
                if (itemtype === 'string') {
                    el.push(<DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={this.props.style.secondaryText} key={item} yigoid={item} />);
                } else {
                    if (item.$$typeof) {
                        el.push(item);
                    } else {
                        el.push(<DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={this.props.isCustomLayout} textStyles={this.props.style.secondaryText} {...item} />);
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
        const NewListItem = this.NewListItem;
        // const RowView = this.RowView;
        // if (this.props.actions) {
        //     return (<RowView style={[styles.flexcol, this.props.rowContainerStyle]}>
        //         <ListItem
        //             centerElement={this.centerComp}
        //             rightElement={this.props.rightElement}
        //             onPress={() => this.onClick(index)}
        //             divider={this.props.divider}
        //             rowIndex={index}
        //             numberOfLines={3}
        //             leftElement={this.props.leftElement}
        //         />
        //         {
        //             this.generateActions()
        //         }
        //     </RowView>);
        // }
        return (
            <NewListItem
                centerElement={this.centerComp}
                rightElement={this.props.rightElement}
                containerStyle={this.props.rowStyle}
                onPress={() => this.onClick(rowId)}
                // divider={this.props.divider}
                rowIndex={rowId}
                showArrow
                leftElement={this.props.leftElement}
            />
        );
    }
    onRefresh = () => {
        this.props.onRefresh && this.props.onRefresh();
    }
    render() {
        const { controlState, layoutStyles, style } = this.props;
        if (controlState && controlState.get('isVirtual')) {
            return (
                <View style={[layoutStyles]}>
                    <ActivityIndicator size="large" color="cadetblue" />
                </View>
            );
        }
        return (
            <ListView
                style={style}
                contentContainerStyle={{ width: '100%' }}
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}
                pageSize={4}
                // pullToRefresh
                pullToRefresh={this.props.onRefresh ? <PullToRefresh
                    refreshing={false}
                    onRefresh={this.onRefresh}
                /> : null}
            />
        );
    }
}
AntdListView.propTypes = propTypes.List;

export const GridView = GridWrap(AntdListView);
export default ListWrap(AntdListView);
