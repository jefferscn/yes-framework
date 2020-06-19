import React, { PureComponent } from 'react';
import { CustomBillForm, ListComponents, Image } from 'yes-comp-react-native-web';
import { StyleSheet, View } from 'react-native';

const { ListImage, ListText } = ListComponents;
const styles = StyleSheet.create({
    personalCard: {
        justifyContent: 'center',
        height: 200,
        backgroundColor: 'dodgerblue',
        paddingLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
    },
    cardImage: {

    },
    cardContent: {
        flexDirection: 'column',
        flex: 1,
    },
    funcionList: {
        flex: 1,
        backgroundColor: 'lightgray',
    },
    avatar: {
        width: 80,
        height: 80,
    },
    page: {
        flex: 1
    }
})
class MyInfo extends PureComponent {
    render() {
        return (
            <View style={styles.page}>
                <CustomBillForm formKey="FSSC_PersonMsg" oid="-1" status="EDIT">
                    <View style={styles.personalCard}>
                        <View style={styles.avatar}>
                            <Image avatar yigoid="Photo" />
                        </View>
                        <View style={styles.cardContent}>
                            <ListText yigoid="Name" />
                            <ListText yigoid="PositionID" />
                        </View>
                    </View>
                </CustomBillForm>
                <View style={styles.funcionList}>

                </View>
            </View>
        )
    }
}

export default MyInfo;
