/**
 * 一个支持主文字，副文字以及右边有一个链接标志的列表
 *
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListView, PullToRefresh } from 'antd-mobile';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { propTypes } from 'yes'; // eslint-disable-line
import { ListRowWrap as listRowWrap, ListWrap, DynamicControl, GridWrap } from 'yes';
// import styles from '../../style';
import ListViewItem from '../ListViewItem';
import { observer } from 'mobx-react';
import designable from 'yes-designer/utils/designable';

const styles = StyleSheet.create({
    primaryTextLayout: {
        justifyContent: 'flex-start',
        flexBasis: 0,
    },
    primaryContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        lineHeight: 24,
        paddingBottom: 6,
    },
    primaryText: {
        fontSize: 17,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    secondaryContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        lineHeight: 14,
        paddingBottom: 6,
    },
    secondaryText: {
        fontSize: 13,
        color: 'rgba(0,0,0,0.5)',
    },
    tertiaryContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        lineHeight: 12,
        paddingBottom: 6,
    },
    tertiaryText: {
        fontSize: 11,
        color: 'rgba(0,0,0,0.5)',
    }
});
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
]
@observer
@ListWrap
class AntdListView extends PureComponent {
    static propTypes = {
        yigoid: PropTypes.string,
        primaryKey: PropTypes.string,
        secondKey: PropTypes.string,
        tertiaryKey: PropTypes.string,
        divider: PropTypes.bool,
    };
    static contextTypes = {
        isDesignMode: PropTypes.func,
        // uiTheme: PropTypes.object.isRequired,
    };
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
        this.centerComp = (
            <View style={[{ flex: 1, overflow: 'hidden' }, this.props.style.centerStyle]}>
                {this.generatePrimaryElement(nextProps)}
                {this.generateSecondaryElement(nextProps)}
                {this.generateTertiaryElement(nextProps)}
            </View>
        )
    }

    componentWillMount() {
        if (this.props.controlState && this.props.controlState.get('data')) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.props.controlState.get('data'),
                    this.generateRowIdentifier(this.props)),
            });
        }
    }

    // componentWillReact() {
    //     console.log('react');
    // }

    generateRowIdentifier = (props) => {
        const data = props.controlState.get('data');
        const result = [];
        for (let i = 0; i < data.size; i++) {
            result.push(i);
        }
        return result;
    }

    checkRowUpdate = (row1, row2) => {
        return this.context.isDesignMode() || row1 !== row2;
    }

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: this.checkRowUpdate,
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
    generateTertiaryElement = (props) => {
        const el = [];
        if (props.tertiaryKey) {
            let tertiaryKeyArray = props.tertiaryKey;
            if (typeof props.tertiaryKey === 'string') {
                tertiaryKeyArray = [props.tertiaryKey];
            }
            tertiaryKeyArray.forEach((item) => {
                let itemtype = typeof item;
                if (itemtype === 'string') {
                    el.push(<DynamicControl
                        layoutStyles={StyleSheet.flatten(styles.tertiaryContainer)}
                        isCustomLayout={props.isCustomLayout}
                        textStyles={StyleSheet.flatten([styles.tertiaryText, props.style.tertiaryText])}
                        yigoid={item} />);
                } else {
                    if (item.$$typeof) {
                        el.push(item);
                    } else {
                        el.push(<DynamicControl
                            layoutStyles={StyleSheet.flatten(styles.tertiaryContainer)}
                            isCustomLayout={props.isCustomLayout}
                            textStyles={StyleSheet.flatten([styles.tertiaryText, props.style.tertiaryText])}
                            {...item} />);
                    }
                }
            });
            return <View style={{ flexDirection: 'row' }}>{el}</View>;
        }
        return null;
    }
    generatePrimaryElement = (props) => {
        const primaryKey = props.primaryKey;
        let el;
        if (!primaryKey) {
            return null;
        }
        const itemtype = typeof (primaryKey);
        if (itemtype === 'string') {
            el = <DynamicControl
                layoutStyles={StyleSheet.flatten(styles.primaryContainer)}
                isCustomLayout={props.isCustomLayout}
                textStyles={StyleSheet.flatten([styles.primaryText, props.style.primaryText])}
                yigoid={primaryKey} />;
        } else {
            if (primaryKey.$$typeof) {
                el = primaryKey;
            } else {
                el = <DynamicControl layoutStyles={{ justifyContent: 'flex-start' }} isCustomLayout={props.isCustomLayout} textStyles={props.style.primaryText} {...primaryKey} />;
            }
        }
        return <View style={[{ flex: 1 }, props.style.firstline]}>{el}</View>;
    }
    generateSecondaryElement = (props) => {
        const el = [];
        if (props.secondKey) {
            let secondKeyArray = props.secondKey;
            if (typeof props.secondKey === 'string') {
                secondKeyArray = [props.secondKey];
            }
            secondKeyArray.forEach((item) => {
                let itemtype = typeof item;
                if (itemtype === 'string') {
                    el.push(<DynamicControl
                        layoutStyles={StyleSheet.flatten(styles.secondaryContainer)}
                        isCustomLayout={props.isCustomLayout}
                        textStyles={StyleSheet.flatten([styles.secondaryText, props.style.secondaryText])}
                        key={item} yigoid={item} />);
                } else {
                    if (item.$$typeof) {
                        el.push(item);
                    } else {
                        el.push(<DynamicControl
                            layoutStyles={StyleSheet.flatten(styles.secondaryContainer)}
                            isCustomLayout={props.isCustomLayout}
                            textStyles={StyleSheet.flatten([styles.secondaryText, props.style.secondaryText])}
                            {...item} />);
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
            {this.generatePrimaryElement(this.props)}
            {this.generateSecondaryElement(this.props)}
            {this.generateTertiaryElement(this.props)}
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
                style={layoutStyles}
                contentContainerStyle={{ width: '100%' }}
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}
                pageSize={20}
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

let result = AntdListView;

if(__DESIGN__) {
    result = designable(defaultValue, editor)(AntdListView);
}
// const YIGOAntdListView =  ListWrap(AntdListView);
result.category = 'yigo';
result.detail = 'listview';

export default result;
