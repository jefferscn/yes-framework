/**
 * 一个支持主文字，副文字以及右边有一个链接标志的列表
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListView, PullToRefresh } from 'antd-mobile';
import { View, ActivityIndicator } from 'react-native';
import { propTypes } from 'yes'; // eslint-disable-line
import { GridRowWrap as gridRowWrap, DynamicControl, GridWrap } from 'yes';
// import styles from '../../style';
import ListViewItem from '../ListViewItem';
import designable from '../../../designer/utils/designable';
import { observer } from 'mobx-react';

const defaultValue = {
    divider: true,
    primaryKey: '',
    secondKey: '',
    tertiaryKey: '',
}

const editor = [
    {
        type: 'Toggle',
        key: 'divider',
        caption: '是否显示分隔线',
    },
    {
        type: 'ListColumnSelect',
        key: 'primaryKey',
        caption: '主文本字段',
    },
    {
        type: 'ListColumnSelect',
        key: 'secondKey',
        caption: '次文本字段',
    },
    {
        type: 'ListColumnSelect',
        key: 'tertiaryKey',
        caption: '輔助信息字段',
    }
];

@observer
@GridWrap
class AntdGridView extends PureComponent {
    static propTypes = {
        yigoid: PropTypes.string,
        primaryKey: PropTypes.string,
        secondKey: PropTypes.string,
        tertiaryKey: PropTypes.string,
        divider: PropTypes.bool,
        showArrow: PropTypes.bool,
    };
    // static contextTypes = {
    //     uiTheme: PropTypes.object.isRequired,
    // };
    static defaultProps = {
        // ...ImmutableVirtulized.defaultProps,
        style: {},
        showArrow: true,
        divider: true,
    };

    componentWillReceiveProps(nextProps) {
        const data = nextProps.controlState.getIn(['dataModel', 'data']);
        if (data) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.controlState.getIn(['dataModel', 'data']), this.generateRowIdentifier(nextProps)),
            });
        }
    }

    componentWillMount() {
        if (this.props.controlState && this.props.controlState.getIn(['dataModel', 'data'])) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.controlState.getIn(['dataModel', 'data']),
                    this.generateRowIdentifier(this.props)),
            });
        }
    }

    generateRowIdentifier = (props) => {
        const data = props.controlState.getIn(['dataModel', 'data']);
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
        return <View style={[{ flexDirection: 'row' }, this.props.style.firstline]}>{el}</View>;
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
        <View style={[{ flex: 1 }, this.props.style.centerStyle]}>
            {this.generatePrimaryELement()}
            {this.generateSecondaryElement()}
            {this.generateTertiaryElement()}
        </View>
    )
    NewListItem = gridRowWrap(ListViewItem, ActivityIndicator, this.props.yigoid)
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
                showArrow={this.props.showArrow}
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
                initialListSize={20}
                dataSource={this.state.dataSource}
                contentContainerStyle={{ width: '100%' }}
                renderRow={this.renderItem}
                pageSize={4}
                pullToRefresh={this.props.onRefresh ? <PullToRefresh
                    refreshing={false}
                    onRefresh={this.onRefresh}
                /> : null}
            />
        );
    }
}
AntdGridView.propTypes = propTypes.List;

let result = AntdGridView;
if(__DESIGN__) {
    result = designable(defaultValue, editor)(AntdGridView);
}
result.category = 'yigo';
result.detailType = 'grid';
export default result;
