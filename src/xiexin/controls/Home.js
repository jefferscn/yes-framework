import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import img from '../res/head.png';
import IconFont from '../../font';
import { Modal, NavBar, Icon } from 'antd-mobile';
import { showModal, onModalClose } from '../../SiblingMgr';
import { openForm } from '../../util/navigateUtil';
import { CustomBillForm } from 'yes-comp-react-native-web';
import GridView from '../../controls/GridView';
import FlexBox from './FlexBox';
import { ListComponents } from 'yes-comp-react-native-web';
import ImageCarouselGrid from './ImageCarouselGrid';

const { ListText } = ListComponents;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#e9e9e9',
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
        fontSize: 50,
    },
    entryText: {

    },
    entryList: {
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    entryStyle: {
        justifyContent: 'center',
        height: 100,
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
        paddingTop: 12,
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
    }
});

class Entry extends PureComponent {
    onPress = () => {
        this.props.onPress && this.props.onPress(this.props.entry);
    }
    render() {
        const { icon, text, containerStyle, iconStyle, textStyle, iconSize } = this.props;
        return (
            <TouchableHighlight style={containerStyle} onPress={this.onPress}>
                <View style={[styles.entry]}>
                    <IconFont name={icon} size={iconSize} style={[iconStyle]} />
                    <Text style={[styles.entryText, textStyle]}>{text}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

class FavoriteLine extends PureComponent {
    onPress = () => {

    }
    render() {
        const { list } = this.props;
        return (<View style={styles.favoriteLine}>
            <Text style={styles.favoriteLineTextLeft} >常用功能</Text>
            <View style={[{ flex: 1, flexDirection: 'row' }]}>
                {
                    list.map(item => {
                        return item.favorite ? <IconFont style={styles.smallIcon} name={item.icon} size={30} /> : null;
                    })
                }
            </View>
            <TouchableHighlight style={styles.favoriteLineTextRight} onPress={this.onPress}>
                <Text style={styles.button}>编辑</Text>
            </TouchableHighlight>
        </View>);
    }
}

class FavoriteCategoryPanel extends PureComponent {
    static defaultProps = {
        column: 4,
        iconSize: 50,
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
                                key={item.key}
                                icon={item.icon}
                                text={item.text}
                                iconSize={iconSize}
                                entry={item}
                                onPress={this.onEntryPress}
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
    state = {
        data: this.groupData(this.props.list),
    }
    render() {
        return (
            <View style={styles.favoritePanel}>
                {
                    Object.keys(this.state.data).map((category) => {
                        return (
                            <FavoriteCategoryPanel
                                title={category}
                                items={this.state.data[category]}
                                entryStyle={styles.entryStyle}
                            />
                        )
                    })
                }
            </View>
        )
    }
}

class EntryList extends PureComponent {
    static defaultProps = {
        column: 4,
        iconSize: 50,
    }
    closeManager = () => {
        if (this.modalHandler) {
            this.modalHandler();
        }
    }
    onEntryPress = (entry) => {
        if (entry.key === 'more') {//用户点击更多
            this.modalHandler = showModal(
                <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={this.closeManager}
                    >
                        全部应用
                    </NavBar>
                    <FavoriteLine list={this.props.list} />
                    <FavoritePanel list={this.props.list} />
                </View>
            )
            return;
        }
        if(entry.formKey) {
            openForm(entry.formKey, entry.oid, 'EDIT');
        }
    }
    render() {
        const { list, entryStyle, iconSize, iconStyle } = this.props;
        const entryWidth = {
            width: `${100 / this.props.column}%`,
        }
        return (<View style={styles.entryList}>
            {
                list.map(item => {
                    return item.favorite ? <Entry
                        key={item.key}
                        icon={item.icon}
                        text={item.text}
                        iconSize={iconSize}
                        iconStyle={iconStyle}
                        entry={item}
                        onPress={this.onEntryPress}
                        containerStyle={[entryWidth, entryStyle]}
                    /> : null;
                })
            }
        </View>);
    }
};

const list = [{
    key: 'shenqingdan',
    icon: 'icon-expense',
    text: '申请单',
    category: '单据类型',
    favorite: true,
    formKey: 'FSSC_ExpenseAccountBillView',
    oid: '-1'
}, {
    key: 'jiekuandan',
    icon: 'icon-expense',
    text: '借款单',
    category: '单据类型',
    favorite: true,
}, {
    key: 'baoxiaodan',
    icon: 'icon-expense',
    text: '报销单',
    category: '单据类型',
    favorite: true,
}, {
    key: 'zhangben',
    icon: 'icon-expense',
    text: '账本',
    category: '记录消费',
    favorite: false,
}, {
    key: 'baobiao',
    icon: 'icon-expense',
    text: '报表',
    category: '其他',
    favorite: false,
}, {
    key: 'more',
    icon: 'icon-dashboard',
    text: '更多',
    category: 'system',
    favorite: true,
}];

class TodoList extends PureComponent {
    render() {
        return (<CustomBillForm formKey="ToDoListTotal" oid="-1" status="DEFAULT">
            <GridView 
                yigoid="Grid1"
                showHead={false}
                clickMode="dblclick"
                userBodyScroll={true}
                primaryKey={<FlexBox direction="row" style={{height:40,alignItems:'center',paddingLeft:16}}>
                    <ListText yigoid="C"/>
                    <Text>条</Text>
                    <ListText yigoid="formname"/>
                    <Text>等待处理</Text>
                    </FlexBox>}
            />
        </CustomBillForm>);
    }
}
class ImageCarousel extends PureComponent {
    render() {
        return (
            <CustomBillForm formKey="FSSC_SlideShowList" oid="-1" status="DEFAULT">
                <ImageCarouselGrid 
                    style={{height:200}}
                    yigoid="detail"
                    imageColumn="ImgPath"
                    textColumn="Description"
                />
            </CustomBillForm>
        )
    }
}
export default class Home extends PureComponent {
    render() {
        return (
            <View style={styles.page}>
                <ImageCarousel />
                <EntryList
                    list={list}
                    iconSize={50}
                    iconStyle={styles.icon}
                    entryStyle={styles.entryStyle}
                />
                <TodoList />
            </View>
        )
    }
}
