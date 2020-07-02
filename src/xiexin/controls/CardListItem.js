import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { ListComponents } from 'yes-comp-react-native-web';
import { ListRowWrap } from 'yes-intf';
import zhaodaiImg from '../res/zhaodai.png';
const pressRetentionOffset = { top: 1, left: 1, right: 1, bottom: 1 };

const { ListText } = ListComponents;

const styles = StyleSheet.create({
    container: {
        width: '33%',
        display: 'inline-flex',
        padding: 5,
        height: 180,
    },
    inner: {
        borderRadius: 10,
        // border: '1px solid gray',
        padding: 5,
        backgroundColor: 'white',
        overflow: 'hidden',
        boxShadow: '1px 1px 5px #888888',
        flex: 1,
    },
    text1: {
        fontSize: 9,
        whiteSpace: 'nowrap',
        paddingTop: 38,
    },
    text2: {
        fontSize: 9,
        paddingBottom: 34,
    },
    text3: {
        fontSize: 10,
        color: '#141414',
        paddingBottom: 14,
    },
    text4: {
        fontSize: 12,
        paddingBottom: 8,
        fontWeight: 'bold',
    },
    text5: {
        color: '#282828',
        fontSize: 12,
    }
});

@ListRowWrap
class CardListItem extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.container} onPress={this.props.onPress} pressRetentionOffset={pressRetentionOffset}>
                <View style={styles.inner}>
                    <ListText style={styles.text1} yigoid="NO_LV" />
                    <ListText style={styles.text2} yigoid="BillDate_LV" />
                    <ListText style={styles.text3} yigoid="PaymentDeptID" />
                    <ListText style={styles.text4} yigoid="ReimbursementPersonID" />
                    <ListText style={styles.text5} yigoid="ReimbursementAmount" />
                    <img style={{
                        position: 'absolute',
                        right: -5,
                        top: -5,
                        height: 40, width: 40
                    }} src={zhaodaiImg} />
                </View>
            </TouchableHighlight>
        )
    }
}

export default CardListItem;
