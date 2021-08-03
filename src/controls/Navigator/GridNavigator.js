import React, { PureComponent, useEffect, useRef, memo } from 'react';
import {
    View, StyleSheet, Text, ScrollView, Animated,
    TouchableHighlight, PanResponder, LayoutAnimation,
    TouchableOpacity, Dimensions,
} from 'react-native';
import IconFont from '../../font';
import { Modal, WhiteSpace } from 'antd-mobile';
import Header from '../Container/Header';
// import util from '../util';
// import { showModal } from 'yes-framework/SiblingMgr';
import { openForm, openModal } from '../../util/navigateUtil';
import PropTypes from 'prop-types';
import { Svr } from 'yes-core';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import { History } from 'yes-web';
import { Util, BackHandler } from 'yes-intf';
import getHistory from 'yes-intf/dist/history';
import Global from 'global';
// import Animated, { withSpring, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F7F7F7',
    },
    headImg: {
        height: 200,
    },
    entry: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 34,
    },
    entryText: {

    },
    entryList: {
        flexDirection: 'row',
        backgroundColor: 'white',
        flexWrap: 'wrap',
    },
    entryStyle: {
        justifyContent: 'center',
        height: 80,
    },
    container: {
    },
    favoriteLine: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingTop: 2,
        paddingBottom: 2,
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
    },
    favoriteList: {
        flexDirection: 'row',
        flex: 1,
        paddingLet: 8,
    },
    favoriteLineTextLeft: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
    },
    favoriteLineTextRight: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 16,
        paddingLeft: 8,
    },
    smallIcon: {
        paddingLeft: 4,
    },
    button: {
        color: '#00bfff',
    },
    favoritePanel: {
        // paddingTop: 12,
    },
    categoryPanel: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    categoryPanelTitle: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'flex-start',
        fontSize: 12,
        paddingLeft: 12,
        backgroundColor: '#fff',
    },
    removeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: 'cornflowerblue',
    },
    todolistview: {
        backgroundColor: 'white',
    },
    todolistviewheader: {
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 12,
    },
    todolistviewtitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    todolistviewcontent: {
        flexDirection: 'row',
        height: 40,
    },
    todolistviewitem: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 12,
    },
    todolistviewitemcontent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    todolistviewicon: {
        color: '#2598F3',
        fontSize: 20,
        paddingRight: 6,
    },
    todolistviewitembadge: {
        color: '#E02020',
        fontSize: 21,
    },
    todolistviewitemtext: {
        paddingRight: 6,
        color: '#666666',
    },
});

const openUrl = async (service) => {
    const data = {
        service: "InvokeUnsafeService",
        extSvrName: service,
        cmd: "InvokeExtService",
    };
    const dt = await Svr.Request.getData(data);
    const result = JSON.parse(dt);
    if (!result.result) {
        alert(result.msg);
        return;
    }
    if (Global.cordova) {
        if (Global.cordova.platformId != "android") {
            StatusBar.hide();
        }
    }
    let ref = open(result.data, '_blank', 'location=no,footer=yes,closebuttoncaption=返回,hidenavigationbuttons=yes,lefttoright=yes');

    ref.addEventListener('exit', () => {
        if (cordova) {
            if (cordova.platformId != "android") {
                StatusBar.show();
            }
        }
    });
    ref.addEventListener('message', (params) => {
        if (params.data.msgType === 'close') {
            ref.close();
            ref = null;
        }
    });
}

class Entry extends PureComponent {
    static defaultProps = {
        removable: false,
        editing: false,
    }
    onPress = () => {
        this.props.onPress && this.props.onPress(this.props.entry);
    }
    onRemove = () => {

    }
    render() {
        const { icon, text, entry, containerStyle, removable,
            iconStyle, textStyle, iconSize, editing, selected } = this.props;
        return (
            <TouchableOpacity style={containerStyle} onPress={this.onPress}>
                <View style={[styles.entry]}>
                    {(editing && selected) ? <TouchableHighlight style={styles.removeButton}>
                        <AwesomeFontIcon name="check" color="white" /></TouchableHighlight> : null}
                    {removable ? <TouchableHighlight style={styles.removeButton} onPress={this.onRemove}>
                        <AwesomeFontIcon name="times" color="white" /></TouchableHighlight> : null}
                    <IconFont name={icon} size={iconSize} style={[iconStyle]} color={entry.color || "#008CD7"} />
                    <Text style={[styles.entryText, textStyle]}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const DragableEntry = memo((props) => {
    const getPosition = () => {
        const { column, position, width, height } = props;
        return {
            x: (position % column) * width,
            y: Math.floor(position / column) * height,
        }
    }
    const onRemove = () => {
        props.onRemove && props.onRemove(props.entry);
    }
    const { icon, text, entry, containerStyle, removable, translate,
        iconStyle, textStyle, iconSize, position, width, height, column } = props;
    // const translateXY = useSharedValue({
    //     x: 0,
    //     y: 0,
    // });
    const translateXY = useRef(new Animated.ValueXY()).current;
    const posStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
    };
    useEffect(() => {
        if (props.translate) {
            translateXY.setValue(props.translate);
            return;
        }
        const calcPos = getPosition();
        Animated.spring(translateXY, {
            toValue: calcPos,
            duration: 500,
        }).start();
    }, [translate, position, width, height, column]);
    // const animatedStyle = useAnimatedStyle(() => {
    //     console.log(translateXY.value);
    //     return {
    //         transform: [
    //             {
    //                 translateX: translateXY.value.x,
    //             },
    //             {
    //                 translateY: translateXY.value.y,
    //             }
    //         ]
    //     };
    // });
    return (
        <Animated.View style={[styles.entry, containerStyle, posStyle, {
            transform: translateXY.getTranslateTransform(),
        }]}>
            {removable ? <TouchableHighlight style={styles.removeButton} onPress={onRemove}>
                <AwesomeFontIcon name="times" color="white" /></TouchableHighlight> : null}
            <IconFont name={icon} size={iconSize} style={[iconStyle]} color={entry.color || "#008CD7"} />
            <Text style={[styles.entryText, textStyle]}>{text}</Text>
        </Animated.View>
    )
});

class FavoriteLine extends PureComponent {
    state = {
        editing: false,
    }
    onPress = () => {
        this.setState({
            editing: !this.state.editing,
        }, () => {
            this.props.changeEditStatus(this.state.editing);
        });
    }
    onRemove = (entry) => {
        this.props.changeSelected(entry, false);
    }
    render() {
        const { list, column } = this.props;
        return (<View style={styles.container}>
            <View style={styles.favoriteLine}>
                <Text style={styles.favoriteLineTextLeft} >常用功能</Text>
                <ScrollView style={[{ flex: 1, flexDirection: 'row' }]} horizontal={true} >
                    {
                        list.map(item => {
                            return (item.category != "system") ? <IconFont color={item.color} style={styles.smallIcon} name={item.icon} size={30} /> : null;
                        })
                    }
                </ScrollView>
                <TouchableHighlight style={styles.favoriteLineTextRight} onPress={this.onPress}>
                    <Text style={styles.button}>{this.state.editing ? '保存' : '编辑'}</Text>
                </TouchableHighlight>
            </View>
            {this.state.editing ?
                <DragableEntryList
                    onRemove={this.onRemove}
                    selectedList={list}
                    editing={this.state.editing}
                    iconSize={34}
                    column={column}
                    iconStyle={styles.icon}
                    entryStyle={styles.entryStyle}
                    changeLocation={this.props.changeLocation}
                /> : null}
        </View>);
    }
}


class DragableEntryList extends PureComponent {
    static defaultProps = {
        column: 4,
        iconSize: 50,
    }
    static contextTypes = {
        getTopPadding: PropTypes.func,
    }
    state = {
        dragging: false,
        dragX: 0,
        dragY: 0,
        dragEntry: null,
    }
    onRemove = (entry) => {
        this.props.onRemove(entry);
    }
    UNSAFE_componentWillUpdate(props) {
        if (this.state.dragging && this.state.dragEntry) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            const dragIndex = props.selectedList.findIndex(item => item.key === this.state.dragEntry.key);
            this.setState({
                dragIndex: dragIndex
            });
        }
        // LayoutAnimation.spring();
    }
    calcIndex = (nativeEvent) => {
        const { column } = this.props;
        const { width } = Dimensions.get('window');
        const height = width / column;
        const { pageX, locationY } = nativeEvent;
        const leftIndex = Math.floor((pageX * column) / width);  // 根据坐标Y获取当前所在的行
        const topIndex = Math.floor((locationY) / height);             // 根据坐标X获取当前所在的列    
        console.log(`x=${leftIndex};y=${topIndex}`);
        const index = topIndex * column + leftIndex;
        return index;
    }
    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt, gestureState) => {
            const { column } = this.props;
            const index = this.calcIndex(evt.nativeEvent);
            const top = Math.floor(index / this.props.column);
            const left = index % this.props.column;
            if (this.props.selectedList.length <= index) {
                return;
            }
            const dragItem = this.props.selectedList[index];
            const { width } = Dimensions.get('window');
            const height = width / column;
            this.setState({
                dragging: true,
                dragIndex: index,
                dragEntry: dragItem,
                dragX: left * width / column,
                dragY: top * height,
                dragXOrigin: left * width / column,
                dragYOrigin: top * height,
            })
        },
        onPanResponderMove: (evt, gestureState) => {
            if (!this.state.dragging) {
                return;
            }
            const index = this.calcIndex(evt.nativeEvent);
            if (index !== this.state.dragIndex) {//需要交换两个Entry
                if (!(index < 0 || index >= this.props.selectedList.length)) {
                    this.props.changeLocation(index, this.state.dragIndex);
                }
            }
            this.setState({
                dragX: this.state.dragXOrigin + gestureState.dx,
                dragY: this.state.dragYOrigin + gestureState.dy,
            });
        },
        onPanResponderRelease: () => {
            this.setState({
                dragging: false,
            });
        }
    })
    calcDragStyle = () => {
        return {
            position: 'absolute',
            top: this.state.dragY,
            left: this.state.dragX,
            transform: [{ scale: 1.1 }],
            borderWidth: 1,
            borderStyle: 'dotted',
            backgroundColor: 'aliceblue',
        };
    }
    render() {
        const { entryStyle, iconSize, iconStyle, selectedList, column } = this.props;
        const { width } = Dimensions.get('window');
        const WIDTH = width / column;
        const HEIGHT = WIDTH;
        const dragEntry = this.state.dragEntry;
        const dragStyle = this.calcDragStyle();
        return (<View style={[styles.entryList, {
            height: HEIGHT * Math.ceil(selectedList.length / this.props.column),
        }]}
            {...this.panResponder.panHandlers}
        >
            {
                selectedList.map((item, index) => {
                    return <DragableEntry
                        // panHandler={this.panResponder.panHandlers}
                        key={item.key}
                        position={index}
                        icon={item.icon}
                        text={item.text}
                        iconSize={iconSize}
                        iconStyle={iconStyle}
                        width={WIDTH}
                        height={HEIGHT}
                        column={column}
                        removable={true}
                        entry={item}
                        onRemove={this.onRemove}
                        containerStyle={[entryStyle]}
                    />;
                })
            }
            {
                (this.state.dragging && dragEntry) ? <DragableEntry
                    key={`drag_${this.state.dragEntry.key}`}
                    icon={dragEntry.icon}
                    text={dragEntry.text}
                    iconSize={iconSize}
                    width={WIDTH}
                    height={HEIGHT}
                    iconStyle={iconStyle}
                    removable={false}
                    entry={dragEntry}
                    translate={{
                        x: this.state.dragX,
                        y: this.state.dragY,
                    }}
                    containerStyle={[entryStyle, dragStyle]}
                /> : null
            }
        </View>);
    }
};

class FavoriteCategoryPanel extends PureComponent {
    static defaultProps = {
        column: 4,
        iconSize: 50,
    }
    onEntryPress = (entry) => {
        if (this.props.editing) {
            this.props.changeSelected(entry, !this.isEntrySelected(entry));
        }
    }
    isEntrySelected = (entry) => {
        return this.props.selectedList.some(item => entry.key === item.key);
    }
    render() {
        const { title, items, entryStyle, iconSize, column } = this.props;
        const entryWidth = {
            width: `${100 / column}%`,
        }
        return (
            <View style={styles.categoryPanel}>
                <View style={styles.categoryPanelTitle}>
                    <Text>{title}</Text>
                </View>
                <View style={styles.entryList}>
                    {
                        items.map(item => {
                            return <Entry
                                editing={this.props.editing}
                                selected={this.isEntrySelected(item)}
                                key={item.key}
                                icon={item.icon}
                                text={item.text}
                                iconSize={iconSize}
                                entry={item}
                                onPress={() => this.onEntryPress(item)}
                                containerStyle={[entryWidth, entryStyle]}
                            />;
                        })
                    }
                </View>
            </View>
        )
    }
}

class FavoritePanel extends PureComponent {
    groupData = (list) => {
        const data = list.reduce((total, item) => {
            if (!total[item.category]) {
                total[item.category] = [];
            }
            total[item.category].push(item);
            return total;
        }, {});
        return data;
    }
    componentWillReceiveProps(props) {
        this.setState({
            data: this.groupData(props.list),
        });
    }
    state = {
        data: this.groupData(this.props.list),
    }
    render() {
        return (
            <>
                <WhiteSpace size="md" />
                <ScrollView style={styles.favoritePanel}>
                    {
                        Object.keys(this.state.data).map((category) => {
                            if (category === 'system') {
                                return null;
                            }
                            return (
                                <FavoriteCategoryPanel
                                    editing={this.props.editing}
                                    title={category}
                                    changeSelected={this.props.changeSelected}
                                    selectedList={this.props.selectedList}
                                    items={this.state.data[category]}
                                    entryStyle={styles.entryStyle}
                                />
                            )
                        })
                    }
                </ScrollView>
            </>
        )
    }
}
class EntryListManager extends PureComponent {
    state = {
        editing: false,
        selectedList: this.props.selectedList,
    }
    changeEditStatus = (edit) => {
        this.setState({
            editing: edit,
        });
    }
    changeLocation = (indexA, indexB) => {
        const list = this.state.selectedList;
        const tmp = list[indexA];
        list[indexA] = list[indexB];
        list[indexB] = tmp;
        this.setState({
            selectedList: [...list],
        });
        this.props.onChange(this.state.selectedList);
    }
    changeSelected = (item, selected) => {
        if (selected) {
            if (!this.state.selectedList.some(itm => itm.key === item.key)) {
                this.setState({
                    selectedList: [...this.state.selectedList, item],
                }, () => {
                    this.props.onChange(this.state.selectedList);
                });
            }
        } else {
            const index = this.state.selectedList.findIndex(itm => itm.key === item.key);
            if (index >= 0) {
                this.state.selectedList.splice(index, 1);
                this.setState({
                    selectedList: [...this.state.selectedList],
                }, () => {
                    this.props.onChange(this.state.selectedList);
                });
            }
        }
    }
    render() {
        return (<View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
            <Header headerStyle={{ backgroundColor: 'white' }} title="全部应用" canBack backHandler={this.props.onClose} />
            <FavoriteLine
                changeEditStatus={this.changeEditStatus}
                list={this.state.selectedList}
                editing={this.state.editing}
                column={this.props.column}
                changeSelected={this.changeSelected}
                changeLocation={this.changeLocation}
            />
            <FavoritePanel
                list={this.props.list}
                selectedList={this.state.selectedList}
                changeSelected={this.changeSelected}
                editing={this.state.editing}
            />
        </View>
        );
    }
}

export default class EntryList extends PureComponent {
    static defaultProps = {
        column: 4,
        iconSize: 50,
    }
    static contextTypes = {
        getTopPadding: PropTypes.func,
    }
    componentWillMount() {
        this.backHandler && this.backHandler();
    }
    getSelectedList = () => {
        const { allList, selectedList } = this.props;
        return allList.filter((item) => selectedList.includes(item.key));
    }
    state = {
        editing: false,
        selectedList: this.getSelectedList(),
    }
    closeManager = () => {
        this.setState({
            editing: false,
        });
        this.backHandler && this.backHandler();
        delete this.backHandler;
    }
    onChange = (list) => {
        this.setState({
            selectedList: list,
        });
        const saveList = list.map(item => item.key);
        this.props.onChange && this.props.onChange(saveList);
    }
    moreEntry = {
        key: 'more',
        icon: 'icon-more',
        text: '更多',
        category: 'system',
        favorite: true,
        color: '#FD9B00'
    }
    onEntryPress = (entry) => {
        if (entry.key === 'more') {//用户点击更多
            this.setState({
                editing: true,
            });
            if (getHistory()) {
                getHistory().push('#GridNavigator_popup');
            }
            this.backHandler = BackHandler.addPreEventListener(() => {
                this.closeManager();
            });
            return;
        }
        if (entry.type === 'thirdpart') {
            Util.safeExec(async () => {
                await openUrl(entry.service);
            });
            return;
        }
        if (entry.formKey) {
            if (entry.modal) {
                openModal(entry.formKey, entry.oid, 'EDIT');
            } else {
                openForm(entry.formKey, entry.oid, 'EDIT');
            }
        }
        if (entry.path) {
            History.push(entry.path);
        }
    }

    render() {
        const { entryStyle, iconSize, iconStyle, column, editable = false } = this.props;
        const entryWidth = {
            width: `${100 / column}%`,
        }
        return (<View style={styles.entryList}>
            {
                this.state.selectedList.map(item => {
                    return <Entry
                        key={item.key}
                        icon={item.icon}
                        text={item.text}
                        iconSize={iconSize}
                        iconStyle={iconStyle}
                        entry={item}
                        onPress={this.onEntryPress}
                        containerStyle={[entryWidth, entryStyle]}
                    />;
                })
            }
            {
                editable ? <Entry
                    key={this.moreEntry.key}
                    icon={this.moreEntry.icon}
                    text={this.moreEntry.text}
                    iconSize={iconSize}
                    iconStyle={iconStyle}
                    entry={this.moreEntry}
                    onPress={this.onEntryPress}
                    containerStyle={[entryWidth, entryStyle]}
                /> : null
            }
            {
                this.state.editing ? <Modal
                    maskStyle={{ zIndex: 899 }}
                    wrapClassName="fullscreen"
                    visible={true}
                    transparent={false}
                >
                    <EntryListManager
                        selectedList={this.state.selectedList}
                        onClose={this.closeManager}
                        list={this.props.allList}
                        onChange={this.onChange}
                        column={column}
                    />
                </Modal> : null
            }
        </View>);
    }
};
