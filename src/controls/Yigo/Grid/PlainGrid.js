import React, { useRef, PureComponent, useState } from 'react';
import { GridRowWrap as gridRowWrap, GridWrap } from 'yes';
import { FlatList, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListComponents } from 'yes-comp-react-native-web';
import ImmutableVirtulizedList from 'yes-comp-react-native-web/dist/components/List/ImmutableVirtulizedList';
import ListText from '../Text/ListText';
import PropTypes from 'prop-types';
import { RefreshControl } from 'react-native-web-refresh-control';

const { ListImage } = ListComponents;

const RowView = gridRowWrap(View);
// interface Props {
//     //是否开启锁定
//     isLockTable?: boolean;
//     //标题数据
//     titleData: string[];
//     lockColumns: string[];
//     dataColumns: string[];
//     // //数据源
//     // tableData: object[];
//     data: object;
//     //单元格文字大小
//     textSize?: number;
//     //单元格文字颜色
//     textColor?: string;
//     //单元格最大宽度
//     cellMaxWidth?: number;
//     //单元格高度
//     cellHeight?: number;
//     //第一行背景色
//     firstRowBackGroundColor?: string;
//     //第一列背景色
//     firstColumnBackGroundColor?: string;
//     //表头字体颜色
//     tableHeadTextColor?: string;
// };

/**
 * 注释: 双向锁定表格
 * 时间: 2020/7/21 0021 14:06
 * @author 郭翰林
 * @param props
 * @constructor
 */
function LockTableView(props) {
    const border_width = Platform.OS === 'ios' ? StyleSheet.hairlineWidth : StyleSheet.hairlineWidth * 2;
    // let columnMaxWidth: number[] = [];
    let firstColumnData = [];

    //计算每列最大宽度、分割数据
    // let scale = props.textSize;
    // props.titleData.map((value, i) => {
    //     if (value.length * scale < props.cellMaxWidth) {
    //         columnMaxWidth[i] = value.length * scale;
    //     } else {
    //         columnMaxWidth[i] = props.cellMaxWidth;
    //     }
    // });
    // props.tableData.map((item, i) => {
    //     Object.values(item).map((value, j) => {
    //         if (j == 0 && props.isLockTable) {
    //             firstColumnData.push(value);
    //         }
    //         if (columnMaxWidth[j] < value.length * scale) {
    //             if (value.length * scale < props.cellMaxWidth) {
    //                 columnMaxWidth[j] = value.length * scale;
    //             } else {
    //                 columnMaxWidth[j] = props.cellMaxWidth;
    //             }
    //         }
    //     });
    //     if (props.isLockTable) {
    //         //删除对象第一个属性数据
    //         delete item[Object.keys(item)[0]];
    //     }
    // });

    function getCellWidth(key) {
        let width = props.cellWidth;
        if(props.cellWidths) {
            width = props.cellWidths[key] || width;
        }
        return width;
    }
    /**
     * 注释: 绘制每行数据
     * 时间: 2020/7/23 0023 9:14
     * @author 郭翰林
     */
    function renderRowCell(index) {
        let childrenViews = [];
        props.dataColumns.forEach((item) => {
            childrenViews.push(
                (item.type === 211 || item.tagName === 'image') ?
                    <ListImage
                        yigoid={item.key}
                        style={styles.image}
                    /> :
                    <ListText
                        yigoid={item.key}
                        style={{
                            fontSize: props.textSize,
                            color: props.textColor,
                            width: getCellWidth(item.key),
                            height: props.cellHeight,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            textAlignVertical: 'center',
                            borderWidth: border_width,
                            borderColor: '#e7e7e7',
                            overflow: 'hidden',
                            backgroundColor: !props.isLockTable && i === 0 ? props.firstColumnBackGroundColor : 'transparent',
                        }} />
            );
        });
        return <RowView rowIndex={index} style={{ flexDirection: 'row', overflow: 'hidden', alignItems: 'center' }}>{childrenViews}</RowView>;
    }

    /**
     * 注释: 绘制第一行行数据
     * 时间: 2020/8/5 0005 17:33
     * @author 郭翰林
     * @param rowData
     * @returns {any}
     */
    function renderFirstRowCell(rowData) {
        let childrenViews = [];
        rowData.map((item, i) => {
            childrenViews.push(
                <Text
                    style={{
                        fontSize: props.textSize,
                        color: props.tableHeadTextColor,
                        width: getCellWidth(item.key),
                        height: props.cellHeight,
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlignVertical: 'center',
                        borderWidth: border_width,
                        borderColor: '#e7e7e7',
                        backgroundColor: props.isLockTable ? 'transparent' : props.firstRowBackGroundColor,
                    }}>
                    {item.caption}
                </Text>,
            );
        });
        return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{childrenViews}</View>;
    }

    /**
     * 注释: 绘制表格头
     * 时间: 2020/8/5 0005 17:36
     * @author 郭翰林
     * @returns {any}
     */
    function renderHeaderView() {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: props.firstRowBackGroundColor }}>
                <View
                    style={{
                        width: getCellWidth(props.lockColumns[0].key),
                        height: props.cellHeight,
                        borderWidth: border_width,
                        borderColor: '#e7e7e7',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: props.textSize,
                            color: props.tableHeadTextColor,
                            textAlign: 'center',
                            textAlignVertical: 'center',
                        }}>
                        {props.lockColumns[0].caption}
                    </Text>
                </View>
                <ScrollView
                    ref={headScrollView}
                    style={{ borderRightWidth: border_width, borderColor: '#e7e7e7' }}
                    horizontal={true}
                    removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    scrollEnabled={false}
                    keyboardShouldPersistTaps={'handled'}>
                    {renderFirstRowCell(props.dataColumns)}
                </ScrollView>
            </View>
        );
    }

    /**
     * 注释: 绘制第一列锁定数据
     * 时间: 2020/8/5 0005 15:21
     * @author 郭翰林
     * @param rowData
     * @param index
     * @returns {any}
     */
    function renderFirstCell(index) {
        const lockColumn = props.lockColumns[0];
        return (
            <RowView
                rowIndex={index}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderColor: '#e7e7e7',
                    height: props.cellHeight,
                    borderWidth: border_width,
                }}>
                {
                    (lockColumn.type === 211 || lockColumn.tagName === 'image') ?
                        <ListImage
                            style={styles.image}
                            yigoid={lockColumn.key}
                        /> : <ListText
                            yigoid={lockColumn.key}
                            style={{
                                fontSize: props.textSize,
                                color: props.textColor,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                textAlignVertical: 'center',
                            }} />
                }
            </RowView>
        );
    }

    let lockList = useRef(null);
    let headScrollView = useRef(null);
    async function onRefresh() {
        props.onRefresh && props.onRefresh();
    }
    let [loadingMore, setLoadingMore] = useState(false);
    async function onEndReached() {
        console.log('onEndReached');
        if (props.hasMore) {
            if (loadingMore) {
                return;
            }
            await props.loadMore();
            setLoadingMore(false);
        }
    }

    /**
     * 注释: 绘制锁定表格
     * 时间: 2020/8/7 0007 20:29
     * @author 郭翰林
     */
    function renderLockTable() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                {renderHeaderView()}
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {/*锁定列*/}
                    <View style={{
                        width: getCellWidth(props.lockColumns[0].key)
                    }}>
                        <ImmutableVirtulizedList
                            ref={lockList}
                            contentContainerStyle={{
                                backgroundColor: props.firstColumnBackGroundColor,
                            }}
                            scrollEnabled={false}
                            data={props.data}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ index }) => {
                                return renderFirstCell(index);
                            }}
                        />
                    </View>
                    {/*滚动数据*/}
                    <ScrollView
                        style={{ borderRightWidth: border_width, borderColor: '#e7e7e7' }}
                        horizontal={true}
                        bounces={false}
                        scrollEventThrottle={30}
                        onScroll={event => {
                            headScrollView.current.scrollTo({ x: event.nativeEvent.contentOffset.x, animated: false });
                        }}
                        keyboardShouldPersistTaps={'handled'}>
                        <ImmutableVirtulizedList
                            data={props.data}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={props.refreshing} onRefresh={onRefresh} />
                            }
                            onScroll={event => {
                                lockList.current.scrollToOffset({
                                    animated: false,
                                    offset: event.nativeEvent.contentOffset.y,
                                });
                            }}
                            onEndReached={onEndReached}
                            renderItem={({ index }) => {
                                return renderRowCell(index);
                            }}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }

    /**
     * 注释: 绘制不锁定表格
     * 时间: 2020/8/7 0007 20:54
     * @author 郭翰林
     * @returns {any}
     */
    function renderUnLockTable() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView
                    style={{ borderRightWidth: border_width, borderColor: '#e7e7e7' }}
                    horizontal={true}
                    bounces={false}
                    keyboardShouldPersistTaps={'handled'}>
                    <FlatList
                        data={props.tableData}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={renderFirstRowCell(props.titleData)}
                        renderItem={rowData => {
                            return renderRowCell(rowData.item, rowData.index);
                        }}
                    />
                </ScrollView>
            </View>
        );
    }

    return props.isLockTable ? renderLockTable() : renderUnLockTable();
}

LockTableView.defaultProps = {
    isLockTable: false,
    textSize: 15,
    textColor: '#666',
    tableHeadTextColor: '#666',
    cellMaxWidth: 150,
    cellHeight: 35,
    firstRowBackGroundColor: '#F0F9FF',
    firstColumnBackGroundColor: '#FFF9F7',
};

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
    }
});

/**
 * 一个纯粹用来显示用的表格，行列形式
 */
@GridWrap
export default class PlainGrid extends PureComponent {
    static contextTypes = {
        getOwner: PropTypes.func,
    }
    static defaultProps = {
        cellWidth: 100,
    }
    render() {
        const { lockColumns, dataColumns, ...otherProps } = this.props;
        const grid = this.context.getOwner();
        if (!grid) {
            return null;
        }
        let columns = grid.getVisibleColumns();
        columns = columns.filter((c) => !c.isSelect && c.type!==200);
        let lockColumns_ = [columns[0]];
        if(lockColumns) {
            lockColumns_ = columns.filter((c)=>lockColumns.includes(c.key));
        }
        let dataColumns_ = null;
        if(dataColumns) {
            dataColumns_ = columns.filter((c)=>dataColumns.includes(c.key));
        } else {
            dataColumns_ = columns.filter((c)=>!lockColumns_.some(l=>l.key===c.key));
        }
        // const dataColumns_ = columns;
        return <LockTableView
            isLockTable
            onRefresh={this.props.onRefresh}
            refreshing={this.props.refreshing}
            lockColumns={lockColumns_}
            dataColumns={dataColumns_}
            {...otherProps}
        />
    }
}
