import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { openForm, newForm } from '../../util/navigateUtil';
import { internationalWrap } from 'yes-intf';
import IconFont from '../../font';

const styles = StyleSheet.create({
    Header: {
        backgroundColor: 'white',
    },
    NavTitle: {
        color: 'black',
        justifyContent: 'center',
        display: 'flex',
        flex: 1,
    },
    HeadBackground: {
        backgroundPosition: 'top',
    },
    Image: {
        height: 30,
        paddingRight: 6,
    },
    BackImage: {
        backgroundPosition: '0 -56',
    },
    Text: {
        paddingTop: 10,
    },
    Container: {
        flexDirection: 'column',
        backgroundColor: '#EFEFF4',
        flex: 1,
    },
    NavView: {
        flexDirection: 'row',
        paddingRight: 16,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    NavItemContainer: {
        flex: 1,
        paddingLeft: 16,
    },
    NavItem: {
        borderRadius: 4,
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    Category: {
        backgroundColor: 'white',
        paddingTop: 40,
    },
    CategoryTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    CategoryDesc: {
        fontSize: 12,
        color: '#8B8B8D',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
    },
    CategoryTitleContainer: {
        flexDirection: 'row',
        position: 'absolute',
        left: 12,
        top: 10,
    },
    EntryContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        paddingBottom: 20,
    },
    Entry: {
        width: '25%',
        alignItems: 'center',
    },
    EntryIcon: {
        width: 45,
        height: 45,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    EntryText: {
        paddingTop: 12,
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
    },
    SmallText: {
        fontSize: 12,
        color: '#8B8B8D',
    },
    Toggle: {
        position: 'absolute',
        right: 12,
        top: 10,
    },
    view: {
        flex: 1,
        backgroundColor: 'whitesmoke',
    }
});
const entries = [
    {
        category: '出差费用',
        open: true,
        items: [
            {
                icon: 'icon-shenqingfeiyong',
                text: '费用',
                enable: true,
                formKey: 'CB_ProjectEAP',
                colorTop: '#FFC400 0%',
                colorBottom: '#FF9100 100%',
                color: '#3F9CFB',
            },
            {
                icon: 'icon-expense',
                text: '报销',
                enable: true,
                formKey: 'CB_ProjectGR*1',
                colorTop: '#FFC400 0%',
                colorBottom: '#FF9100 100%',
                color: '#3F9CFB',
            },
        ],
    },
];
@internationalWrap
export default class Home extends Component {
    state = {
        entries,
    }
    onPress = () => {
        openForm('TSL_ToDoList', -1, 'EDIT');
    }
    toggleCategory = (category) => {
        const cat = this.state.entries.find((item) => item.category === category);
        if (cat) {
            cat.open = !cat.open;
        }
        this.setState({
            entries: this.state.entries,
        });
    }
    formatMessage = (msg) => {
        return this.props.formatMessage(msg);
    }
    newForm = (entry) => {
        newForm(entry.formKey);
    }
    openFeeApply =()=> {
        openForm('CB_ProjectEAPView', -1, 'EDIT');
    }
    openReimburse = ()=> {
        openForm('CB_ProjectGRView*1', -1, 'EDIT');
    }
    render() {
        return (
            <View style={styles.view}>
                <View style={styles.NavView}>
                    {/* <Image style={[StyleSheet.absoluteFill, styles.BackImage]} source={{ uri: HomeBackground }} /> */}
                    <TouchableOpacity style={styles.NavItemContainer} onPress={this.openFeeApply}>
                        <View style={styles.NavItem}>
                            <IconFont style={{ color: '#FF9500', fontSize: 29 }} name="icon-feiyongshenqing" />
                            <Text style={styles.Text}>{this.formatMessage("费用申请单")}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.NavItemContainer} onPress={this.openReimburse}>
                        <View style={styles.NavItem}>
                            <IconFont style={{ color: '#FF9500', fontSize: 29 }} name="icon-baoxiao" />
                            <Text style={styles.Text}>{this.formatMessage('报销单')}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.Container}>
                    {
                        this.state.entries.map((category) =>
                            (
                                <View style={styles.Category}>
                                    <View style={styles.CategoryTitleContainer}>
                                        <Text style={styles.CategoryTitle}>{this.formatMessage(category.category)}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.Toggle} onPress={() => this.toggleCategory(category.category)}>
                                        <Text style={styles.SmallText}>{category.open ? '-' : '+'}</Text>
                                    </TouchableOpacity>
                                    {category.open ? <View style={styles.EntryContainer}>
                                        {
                                            category.items.map((entry) =>
                                                (
                                                    <TouchableOpacity style={styles.Entry} onPress={() => this.newForm(entry)}>
                                                        <View style={[styles.EntryIcon, { backgroundColor: entry.color }]}>
                                                            <IconFont
                                                                name={entry.icon}
                                                                size={20}
                                                                color={'#FFFFFF'}
                                                            />
                                                        </View>
                                                        <View style={styles.EntryText}>
                                                            <Text>{this.formatMessage(entry.text)}</Text>
                                                            {!entry.enable ? <Text style={styles.CategoryDesc}>({this.formatMessage('Comming')})</Text> : null}
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            )
                                        }
                                    </View> : null}
                                </View>
                            )
                        )
                    }
                </ScrollView>
            </View>
        )
    }
}