import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ListText from 'yes-framework/controls/ListText';
import SplitText from 'yes-framework/controls/SplitText';
import Avator from './Avator';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    row1: {
        paddingTop: 30,
        paddingLeft: 20,
    },
    row11: {
        paddingLeft: 12,
        justifyContent: 'center',
    },
    row2: {
        paddingTop: 30,
        paddingBottom: 30,
    },
    columnTextContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    colorWhite: {
        color: 'white',
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
    topCard: {
        backgroundImage: 'linear-gradient(to bottom right, #41A9FF, #4D78DE);',
        overflow: 'visible',
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
    round1: {
        border: '1px solid white',
        borderRadius: 10,
        paddingLeft: 12,
        paddingRight: 12,
    },
    flex1: {
        flex: 1,
    },
    columnTextPadding: {
        paddingTop: 5,
    }
});

export class ColumnLabelText extends PureComponent {
    render() {
        const { style, yigoid, label, inverse } = this.props;
        return (
            <View style={[styles.columnTextContainer, style]}>
                <ListText style={styles.colorWhite} yigoid={yigoid} emptyStr="0" />
                <Text style={[styles.colorWhite, styles.columnTextPadding]}>{label}</Text>
            </View>
        )
    }
}

export default class BillCard extends PureComponent {
    static defaultProps = {
        statusField: "Status",
        avatorField: "PersonnelID",
        text: "申请人",
        deptField: "CostDept",
        columnField1: "ApplyMoney",
        columnText1: "申请金额",
        columnField2: "HasCost",
        columnText2: "已用金额",
        columnField3: "Balance",
        columnText3: "余额",
    }
    render() {
        const { statusField, avatorField, text, deptField, columnField1, columnField2, columnField3,
                columnText1, columnText3, columnText2 } = this.props;
        return (
            <View style={[styles.card, styles.topCard]}>
                <View style={styles.bookmark}>
                    <ListText style={styles.bookmarkText} yigoid={statusField} />
                    <View style={styles.bookmarkCornor}>
                    </View>
                </View>
                <View style={[styles.row, styles.row1]}>
                    <Avator yigoid={avatorField} />
                    <View style={styles.row11}>
                        <View style={[styles.row, { paddingBottom: 8 }]}>
                            <Text style={styles.colorWhite}>{text}: </Text>
                            <SplitText showIndex={1} style={styles.colorWhite} yigoid={avatorField} />
                        </View>
                        <View style={[styles.row, styles.round1]}>
                            <Text style={styles.colorWhite}>部门: </Text>
                            <ListText style={styles.colorWhite} yigoid={deptField} />
                        </View>
                    </View>
                </View>
                <View style={[styles.row, styles.row2]}>
                    <ColumnLabelText style={styles.flex1} yigoid={columnField1} label={columnText1} />
                    <ColumnLabelText style={styles.flex1} yigoid={columnField2} label={columnText2} />
                    <ColumnLabelText style={styles.flex1} yigoid={columnField3} label={columnText3} />
                </View>
            </View>
        )
    }
}
