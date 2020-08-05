import React, { PureComponent } from 'react';
import { Card } from './FSSC_HospitalityReimbursement';
import Header from 'yes-framework/controls/Header';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CellLayoutTemplate from 'yes-framework/template/TabTemplate/CellLayoutTemplate';

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        padding: 14,
    },
    page: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    label: {
        color: '#333333',
        fontSize: 17,
        justifyContent: 'flex-start',
    },
    layoutStyle: {
        justifyContent: 'flex-end', 
    },
    textStyle: {
        textAlign: 'right',
    }
});

export default class FSSC_PersonMsg extends PureComponent {
    render() {
        return (
            <View style={styles.page}>
                <Header
                    canBack={true}
                    headerStyle={{
                        border: 0,
                        backgroundColor: 'white',
                    }}
                    title={"我的信息"}
                    mode="dark"
                />
                <ScrollView style={{ paddingBottom: 20 }}>
                    <Card
                        title={<Text style={styles.title}>个人信息</Text>}
                        collapseable={false}
                    >
                    </Card>
                    <Card>
                        <CellLayoutTemplate
                            titleStyle={
                                styles.label
                            }
                            layoutStyle={
                                styles.layoutStyle
                            }
                            textStyle={
                                styles.textStyle
                            }
                            items={
                                [{
                                    key:'Photo',
                                    imageStyle: {
                                        width: 100,
                                        height: 100,
                                    },
                                    avatar: true
                                }, 'Name', 'Email', 'MobileNo', 'Gender']
                            } />
                    </Card>
                    <Card>
                        <CellLayoutTemplate
                            titleStyle={
                                styles.label
                            }
                            layoutStyle={
                                styles.layoutStyle
                            }
                            textStyle={
                                styles.textStyle
                            }
                            items={
                                ['CompanyCode', 'DeptID', 'TitleID', 'CreditScore']
                            } />
                    </Card>
                </ScrollView>
            </View>
        )
    }
}
