import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, ImageBackground, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { ControlWrap } from 'yes-intf';
import { Modal } from 'antd-mobile';
import zhaodai_bg from '../res/zhaodai_bg.png';
import Header from 'yes-framework/controls/Header';
import CellLayoutTemplate from 'yes-framework/template/TabTemplate/CellLayoutTemplate';
import ListText from 'yes-framework/controls/ListText';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import XieinIcon from 'yes-framework/font';
import SegementToolbar from 'yes-framework/controls/SegementToolbar';
import AttachmentList from 'yes-framework/controls/AttachmentList';
import GridSummary from './GridSummary';
import GridView from 'yes-framework/controls/GridView';
import MoneyWithCurrency from 'yes-framework/controls/MoneyWithCurrency';
import SplitText from 'yes-framework/controls/SplitText';
import Util from '../util';
import VisibleRelated from 'yes-framework/controls/VisibleRelated';
import FormTitle from 'yes-framework/controls/FormTitle';
import AutofitScrollView from 'yes-framework/controls/AutofitScrollView';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 'auto',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
    },
    page: {
        flex: 1,
        backgroundColor: '#F7F6F9',
    },
    card: {
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 13,
        marginRight: 13,
        overflow: 'hidden',
        boxShadow: '0 3px 3px #888888',
        backgroundColor: 'white',
        flexBasis: 'auto',
    },
    firstCard: {
        paddingTop: 30,
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 30,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    cardBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    lightText: {
        color: 'white',
    },
    bigMoney: {
        textAlign: 'right',
        fontSize: 30,
        lineHeight: 30,
    },
    moneyLabel: {
        // flex: 1,
        width: 100,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        display: 'flex',
    },
    font12: {
        fontSize: 12,
    },
    font30: {
        fontSize: 30,
        lineHeight: 30,
    },
    fontAlignRight: {
        textAlign: 'right',
    },
    icon: {

    },
    bookmark: {
        position: 'absolute',
        right: -4,
        height: 30,
        top: 30,
        width: 120,
        backgroundImage: 'linear-gradient(to right, #E9F3AB, #FCD225)',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    bookmarkText: {
        color: '#CA9300',
    },
    bookmarkCornor: {
        position: 'absolute',
        top: -4,
        right: 0,
        border: '2px solid #CCA34D',
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
    },
    cardHead: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        paddingLeft: 8,
        fontWeight: 'bold',
        fontSize: 12,
    },
    cardTitleExtra: {
        flex: 1,
        textAlign: 'right',
        color: '#999999',
        paddingRight: 8,
        paddingleft: 8,
    },
    cardline: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    currency: {
        fontSize: 14,
        color: 'white',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 1,
        display: 'flex',
    },
    currentMain: {
        flex: 1,
        paddingRight: 0,
    },
    mask: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(245,245,245,0.5)',
    },
    celllayoutText: {
        paddingTop: 5,
        paddingBottom: 10,
    }
});

class CardHeader extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    buildIcon = () => {
        const { icon, iconStyle } = this.props;
        if (!icon) {
            return null;
        }
        if (typeof icon === 'string') {
            return <Icon name={icon} style={iconStyle} />;
        }
        return this.context.createElement(icon);
    }
    buildTitle = () => {
        const { title, titleStyle } = this.props;
        if (!title) {
            return null;
        }
        if (typeof title === 'string') {
            return <Text style={styles.cardTitle}>{title}</Text>
        }
        return this.context.createElement(title);
    }
    buildExtra = () => {
        const { extra } = this.props;
        if (!extra) {
            return <View style={{ flex: 1 }} />;
        }
        return this.context.createElement(extra);
    }
    onPress = () => {
        const { expanded } = this.props;
        if (expanded) {
            this.props.collapse && this.props.collapse();
            return;
        }
        this.props.expand && this.props.expand();
    }
    buildCollapse = () => {
        const { collapseable, expanded } = this.props;
        if (!collapseable) {
            return null;
        }
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <Icon name={expanded ? "angle-up" : "angle-down"} size={20} color="#999999" />
            </TouchableWithoutFeedback>
        );

    }
    render() {
        const { icon, title, extra, collapseable } = this.props;
        return (<View style={styles.cardHead}>
            {
                this.buildIcon()
            }
            {
                this.buildTitle()
            }
            {
                this.buildExtra()
            }
            {
                this.buildCollapse()
            }
        </View>);
    }
}

@ControlWrap
export class Card extends PureComponent {
    state = {
        expanded: this.props.collapseable ? this.props.expanded : true,
    }
    collapse = () => {
        this.setState({
            expanded: false,
        });
    }
    expand = () => {
        this.setState({
            expanded: true,
        });
    }
    buildTitleElement() {
        const { title, headIcon, extra, collapseable, expanded } = this.props;
        if (!title) {
            return null;
        }
        return <CardHeader
            expanded={this.state.expanded}
            collapse={this.collapse}
            expand={this.expand}
            icon={headIcon}
            title={title}
            extra={extra}
            collapseable={collapseable} />
    }
    onPress = () => {
        if (this.props.disabled) {
            return;
        }
        this.props.onClick && this.props.onClick();
    }
    render() {
        const { children, background, style, bookmark } = this.props;
        const headElement = this.buildTitleElement();
        return (
            <TouchableWithoutFeedback onPress={this.onPress}>
                <View style={[styles.card, style]}>
                    {
                        bookmark ?
                            <View style={styles.bookmark}>
                                <ListText style={styles.bookmarkText} yigoid={bookmark} />
                                <View style={styles.bookmarkCornor}>
                                </View>
                            </View> : null
                    }
                    {
                        background ? <ImageBackground source={background} imageStyle={styles.cardBackground} style={styles.cardBackground} />
                            : null
                    }
                    {
                        headElement
                    }
                    {
                        this.state.expanded ? children : null
                    }
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles1 = StyleSheet.create({
    label: {
        fontSize: 16,
        color: '#7F8793',
        paddingBottom: 8,
    },
    container: {
        paddingTop: 15,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        paddingTop: 15,
    }
});
class ColumnLabelLayout extends PureComponent {
    render() {
        const { visible, caption, children, textStyle, showArrow, disabled } = this.props;
        if (!visible) {
            return null;
        }
        return (<View style={styles1.row}>
            <View style={styles1.container}>
                <Text style={styles1.label}>{caption}</Text>
                {
                    children
                }
            </View>
            {
                (!disabled && showArrow) ? <Icon style={styles1.icon} name="chevron-right" /> : null
            }
        </View>);
    }
}

const grid2Meta = {
    "control": "GridView",
    "useBodyScroll": true,
    "hideAction": true,
    "primaryKey": "LoanBillNO",
    "secondKey": [
        "RemainAmount", "ReversalAmount"
    ]
};

const actionMeta = {
    "type": "element",
    "elementType": "VisibleFormEditable",
    "elementProps": {
        "element": {
            "type": "element",
            "elementType": "ButtonActionButton",
            "elementProps": {
                "buttonKey": [
                    {
                        "text": "导入账本",
                        "key": "Button3"
                    },
                    {
                        "text": "新建账本",
                        "key": "Button2"
                    }
                ],
                "style": {
                    "right": "50%",
                    "transform": "translateX(30px)",
                    "bottom": 60
                }
            }
        }
    }
}

const detailMeta = {
    "control": "GridView",
    "useBodyScroll": true,
    "hideAction": true,
    "primaryKey": "IndexID_D",
    "secondKey": [
        "FeeType"
    ],
    "tertiaryKey": [
        "SourcesOfBooks"
    ],
    "rightElement": {
        "type": "element",
        "elementType": "FlexBox",
        "elementProps": {
            "direction": "column",
            "style": {
                "justifyContent": "space-between"
            },
            "items": [
                {
                    "type": "element",
                    "elementType": "SplitText",
                    "elementProps": {
                        "yigoid": "BookDate",
                        "style": {
                            "fontSize": 12,
                            "paddingTop": 12,
                            "textAlign": "right"
                        }
                    }
                },
                {
                    "type": "element",
                    "elementType": "MoneyWithCurrency",
                    "elementProps": {
                        "currencyField": {
                            "type": "element",
                            "elementType": "SplitText",
                            "elementProps": {
                                "yigoid": "CurrencyID_D",
                                "style": {
                                    "fontSize": 12,
                                    "paddingRight": 2,
                                    "textAlign": "right"
                                }
                            }
                        },
                        "moneyField": "OriginalAmount",
                        "containerStyle": {
                            "paddingBottom": 6,
                            "justifyContent": "flex-end",
                            "paddingRight": 0
                        }
                    }
                }
            ]
        }
    }
}
export default class HospitalityReimbursement extends PureComponent {
    static contextTypes = {
        createElement: PropTypes.func,
    }
    getLayout = (item) => {
        return <ColumnLabelLayout showArrow={item.arrow} textStyle={item.textStyle} />
    }
    render() {
        const { pageStyle, error, errorMsg, formStatus } = this.props;
        let actionButton = this.context.createElement(actionMeta);
        return (
            <View style={[styles.page, pageStyle]}>
                {
                    error ?
                        <Modal
                            title="错误"
                            visible
                            transparent
                            footer={[{
                                text: "OK",
                                onPress: this.goBack,
                            }]}
                        >
                            <View>
                                <Text>{errorMsg.message}</Text>
                            </View>
                        </Modal> : null
                }
                <Header
                    canBack={true}
                    headerStyle={{
                        border: 0,
                        backgroundColor: 'white',
                    }}
                    // title={"招待费报销"}
                    titleElement={<FormTitle containerStyle={{
                        "alignItems": "center",
                        "justifyContent": "center"
                    }} />}
                    mode="dark"
                />
                <AutofitScrollView style={{ paddingBottom: 20 }}>                    
                    {
                        formStatus != 'ok' ?
                            <View style={styles.mask}><ActivityIndicator /></View> : null
                    }
                    <Card background={zhaodai_bg} style={styles.firstCard}>
                        <View style={styles.row}>
                            <Text style={[styles.lightText, styles.font12]}>单据日期: </Text>
                            <ListText style={[styles.lightText, styles.font12]} yigoid="BillDate" />
                            <MoneyWithCurrency
                                currencyField={
                                    <SplitText emptyStr="" format={Util.currencyCodeToSign} style={styles.currency} yigoid="CurrencyID" />
                                }
                                // moneyField="ReimbursementAmount"
                                moneyField={
                                    <ListText style={[styles.bigMoney, styles.lightText]} yigoid="ActualPaymentAmount" emptyStr="0" />
                                }
                                containerStyle={styles.currentMain}
                                moneyStyle={[styles.bigMoney, styles.lightText]} />
                        </View>
                        <View style={[styles.row, {alignItems: 'flex-end'}]}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.lightText, styles.font12]}>单据编号:</Text>
                                <ListText emptyStr="" style={[styles.lightText, styles.font12, { paddingTop: 5 }]} yigoid="NO" />
                            </View>
                            <Text style={[styles.moneyLabel, styles.lightText]}>实际付款金额</Text>
                        </View>
                    </Card>
                    <Card style={[styles.firstCard, { overflow: 'visible' }]} bookmark="Status">
                        <CellLayoutTemplate 
                            getLayout={this.getLayout} 
                            // layoutStyles={styles.layoutStyle}
                            contentAlign='left'
                            contentLayoutStyle={{flexBasis: 'auto'}}
                            contentTextStyle={styles.celllayoutText}
                            items={[
                            {
                                key: "ReimbursementPersonID",
                                textStyle: {
                                    fontSize: 16,
                                }
                            },
                            {
                                type: 'element',
                                elementType: 'Seperator',
                                elementProps: {}
                            },
                            {
                                key: "PaymentDeptID",
                                textStyle: {
                                    fontSize: 20,
                                    color: '#3B87CF',
                                },
                                arrow: true,
                            },
                            {
                                key: "ReimbursementDeptID",
                                textStyle: {
                                    fontSize: 16,
                                },
                                arrow: true,
                            },
                            {
                                key: "ReceivablesPersonID",
                                textStyle: {
                                    fontSize: 16,
                                },
                                arrow: true
                            },
                            {
                                key: "PaymentMethod",
                                textStyle: {
                                    fontSize: 16,
                                },
                                arrow: true
                            },
                            {
                                key: "Cause",
                                textStyle: {
                                    fontSize: 15,
                                    color: '#3B87CF',
                                }
                            },
                            {
                                key: "StandardMessage",
                                textStyle: {
                                    fontSize: 16,
                                }
                            }
                        ]} />
                    </Card>
                    <VisibleRelated yigoid="GridLayoutPanel1">
                        <Card
                            style={styles.firstCard}
                            title="关联申请单"
                            yigoid="Button1"
                            headIcon={
                                <XieinIcon name="icon-chuchashenqingdan" color="#F48520" size={20} />
                            }
                            collapseable={false}
                            extra={
                                <ListText style={styles.cardTitleExtra} yigoid="ApplicationDate" emptyStr="" />
                            }
                        >
                            <View style={styles.cardline}>
                                <Text style={{ fontSize: 13, fontWeight: 'bold' }}>出差事由: </Text>
                                <ListText style={{ color: '#666666', paddingLeft: 8 }} yigoid="ApplicationExplain" emptyStr="" />
                            </View>
                        </Card>
                    </VisibleRelated>
                    <Card
                        style={styles.firstCard}
                        title="账本明细"
                        headIcon={
                            <XieinIcon name="icon-chuchashenqingdan" color="#2FC6A3" size={20} />
                        }
                        collapseable={true}
                        extra={
                            <GridSummary
                                style={styles.cardTitleExtra}
                                sumField="Amount_D"
                                text="账本,报销总金额"
                                textStyle={{ color: "#2FC6A3" }}
                                yigoid="detail" />
                        }
                    >
                        <GridView
                            yigoid="detail"
                            {...detailMeta}
                        />
                    </Card>
                    <Card
                        style={styles.firstCard}
                        title="关联借款单"
                        yigoid="Button4"
                        headIcon={
                            <XieinIcon name="icon-chuchashenqingdan" color="#F48520" size={20} />
                        }
                        collapseable={false}
                        extra={
                            <GridSummary
                                style={styles.cardTitleExtra}
                                sumField="ReversalAmount"
                                text="借款单,核销总金额"
                                yigoid="Grid2" />
                        }
                    >
                        <GridView
                            yigoid="Grid2"
                            {...grid2Meta}
                        />
                    </Card>
                    <AttachmentList style={[styles.card]} yigoid="AttachmentGrid" fileName="UploadName" filePath="Path" removable title="附件" />
                </AutofitScrollView>
                {
                    actionButton
                }
                <SegementToolbar
                    captionMapping={{
                        "发送PDF文件至邮箱": "封面打印",
                        "撤销已提交审批": "撤销"
                    }}
                    ignoreItems={[
                        "New",
                        "Close"
                    ]}
                />
            </View>
        )
    }
}
