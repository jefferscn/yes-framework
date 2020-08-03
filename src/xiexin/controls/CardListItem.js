import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ListComponents } from 'yes-comp-react-native-web';
import { ListRowWrap } from 'yes-intf';
import TicketNameBadge from './TicketNameBadge';

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
        overflow: 'visible',
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
            <TouchableOpacity style={styles.container} onPress={this.props.onPress} pressRetentionOffset={pressRetentionOffset}>
                <View style={styles.inner}>
                    <ListText style={styles.text1} yigoid="NO_LV" />
                    <ListText style={styles.text2} yigoid="BillDate_LV" />
                    <ListText style={styles.text3} yigoid="PaymentDeptID" />
                    <ListText style={styles.text4} yigoid="ReimbursementPersonID" />
                    <ListText style={styles.text5} yigoid="ReimbursementAmount" />
                    <TicketNameBadge yigoid="FormKey_LV" />
                </View>
            </TouchableOpacity>
        )
    }
}

export default CardListItem;
