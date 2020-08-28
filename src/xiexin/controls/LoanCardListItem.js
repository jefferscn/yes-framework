import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ListComponents } from 'yes-comp-react-native-web';
import { ListRowWrap } from 'yes-intf';
import SplitText from 'yes-framework/controls/SplitText';
import Util from '../util';

const pressRetentionOffset = { top: 1, left: 1, right: 1, bottom: 1 };

const { ListText } = ListComponents;

const styles = StyleSheet.create({
    title: {
        paddingTop: 23,
        paddingLeft: 5,
        color: '#141414',
        fontSize: 14,
        fontWeight: 'bold',
    },
    container: {
        width: '33%',
        display: 'inline-flex',
        padding: 5,
        height: 220,
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
        fontSize: 12,
        fontWeight: 400,
        // whiteSpace: 'nowrap',
        whiteSpace: 'break-spaces',
        color: '#3D3A39',
        paddingTop: 38,
        overflow: 'hidden',
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
        color: '#BB8B5C',
        fontSize: 16,
    },
    currency: {
        fontSize: 10,
        color: '#BB8B5C',
        paddingRight: 4,
    },
    text6: {
        fontSize: 8,
        color: '#141414',
    },
    textContainer: {
        flexDirection: 'row',
        paddingTop: 4,
        alignItems: 'flex-end',
    },
    textContainer1: {
        flexDirection: 'row',
        paddingTop: 30,
        alignItems: 'flex-end',
    },
});

@ListRowWrap
class LoanCardListItem extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress} pressRetentionOffset={pressRetentionOffset}>
                <View style={styles.inner}>
                    <Text style={styles.title}>借款单</Text>
                    <ListText style={styles.text1} yigoid="NO_LV" />
                    <View style={styles.textContainer}>
                        <Text style={styles.text6}>事由:  </Text>
                        <ListText style={styles.text6} yigoid="Explain" />
                    </View>
                    <View style={styles.textContainer1}>
                        <SplitText format={Util.currencyCodeToSign} style={styles.currency} yigoid="CurrencyID" />
                        <ListText style={styles.text5} yigoid="LoanAmount" />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default LoanCardListItem;
