import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import IconFont from '../../font';
import { NavBar, Icon, Modal, WhiteSpace } from 'antd-mobile';
// import { showModal } from '../../SiblingMgr';
import util from '../util';
import { openForm, openModal } from '../../util/navigateUtil';
import { CustomBillForm } from 'yes-comp-react-native-web';
import GridView from '../../controls/GridView';
import FlexBox from './FlexBox';
import { ListComponents } from 'yes-comp-react-native-web';
import PropTypes from 'prop-types';
import ImageCarouselGrid from './ImageCarouselGrid';
import { Svr } from 'yes-core';
import BooksTypeImage from './BooksTypeImage';
import BadgeText from '../../controls/BadgeText'

const { ListText } = ListComponents;

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

const openUrl = async (service)=> {
    const data = {
        service: "InvokeUnsafeService",
        extSvrName: service,
        cmd: "InvokeExtService",
    };
    const dt = await Svr.Request.getData(data);
    const result = JSON.parse(dt);
    if(!result.result) {
        alert(result.msg);
        return;
    }
    open(result.data, '_blank', 'location=no');
}
class Entry extends PureComponent {
    onPress = () => {
        this.props.onPress && this.props.onPress(this.props.entry);
    }
    render() {
        const { icon, text, entry, containerStyle, iconStyle, textStyle, iconSize } = this.props;
        return (
            <TouchableHighlight style={containerStyle} onPress={this.onPress}>
                <View style={[styles.entry]}>
                    <IconFont name={icon} size={iconSize} style={[iconStyle]} color={entry.color || "#008CD7"} />
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
    static contextTypes = {
        getTopPadding: PropTypes.func,
    }
    closeManager = () => {
        if (this.modalHandler) {
            this.modalHandler();
        }
    }
    onEntryPress = (entry) => {
        if (entry.key === 'more') {//用户点击更多
            this.modalHandler = util.showModal(
                <Modal
                    maskStyle={{ zIndex: 899 }}
                    wrapClassName="fullscreen"
                    visible={true}
                    transparent={false}
                >
                    <View style={{ flex: 1, backgroundColor: '#e9e9e9' }}>
                        <NavBar
                            className={(this.context.getTopPadding && this.context.getTopPadding())?'toppadding':null}
                            mode="light"
                            icon={<Icon type="left" />}
                            onLeftClick={this.closeManager}
                        >
                            全部应用
                    </NavBar>
                        <FavoriteLine list={this.props.list} />
                        <FavoritePanel list={this.props.list} />
                    </View>
                </Modal>
            )
            return;
        }
        if(entry.type==='thirdpart') {
            openUrl(entry.service);
            return;
        }
        if (entry.formKey) {
            if (entry.modal) {
                openModal(entry.formKey, entry.oid, 'EDIT');
            } else {
                openForm(entry.formKey, entry.oid, 'EDIT');
            }
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
    icon: 'icon-chuchashenqingdan',
    text: '申请单',
    category: '单据类型',
    favorite: true,
    formKey: 'FSSC_ExpenseAccountBillView',
    oid: '-1',
    color: '#BBDEFB'
}, {
    key: 'jiekuandan',
    icon: 'icon-jiekuandan',
    text: '借款单',
    category: '单据类型',
    favorite: true,
    color: '#90CAF9'
}, {
    key: 'baoxiaodan',
    icon: 'icon-wodebaoxiaodan',
    text: '报销单',
    category: '单据类型',
    formKey: 'FSSC_HospitalityReimbursementView',
    oid: "-1",
    favorite: true,
    color: '#63B5F6'
}, {
    key: 'zhangben',
    icon: 'icon-myaccount',
    text: '账本',
    category: '记录消费',
    formKey: 'FSSC_BooksQuery',
    oid: "-1",
    favorite: true,
    color: '#42A5F5'
}, {
    key: 'fapiao',
    icon: 'icon-fapiao',
    text: '发票',
    category: '记录消费',
    formKey: 'FSSC_InvoiceEntry',
    oid: "-1",
    modal: true,
    favorite: true,
    color: '#2196F3'
}, {
    key: 'baobiao',
    icon: 'icon-baobiao',
    text: '报表',
    category: '其他',
    favorite: false,
    color: '#1E88E5'
},{
    key: '商旅',
    icon: 'icon-ly',
    text: '同程',
    category: '其他',
    type: 'thirdpart',
    service: 'CityTourPhoneLoginService',
    favorite: true,
    color: '#1976D2'
}, {
    key: 'more',
    icon: 'icon-more',
    text: '更多',
    category: 'system',
    favorite: true,
    color: '#FFB74D'
}];

class TodoList extends PureComponent {
    render() {
        return (<CustomBillForm formKey="ToDoListTotal" oid="-1" status="DEFAULT">
            <GridView
                yigoid="Grid1"
                showHead={false}
                clickMode="dblclick"
                useBodyScroll={true}
                divider={true}
                dividerStyle={{
                    borderBottomWidth: 10,
                    borderBottomColor: '#F7F7F7',
                }}
                primaryKey={<FlexBox direction="row" style={{ height: 60, flex:1, paddingRight:12, alignItems: 'center', paddingLeft: 16 }}>
                    <BooksTypeImage yigoid="formKey" style={{paddingRight: 12}} />
                    <ListText yigoid="formname" style={{flex:1}}/>
                    <BadgeText yigoid="C" />
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
                    style={{ height: 150, width: '100%' }}
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
                    iconSize={34}
                    iconStyle={styles.icon}
                    entryStyle={styles.entryStyle}
                />
                <WhiteSpace size="md" />
                <TodoList />
            </View>
        )
    }
}
