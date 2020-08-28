import React, { PureComponent, useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { View, StyleSheet } from 'react-native';
import TemplateView from 'yes-framework/TemplateView';
import Header from 'yes-framework/controls/Header';

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    tabViewStyle: {
        backgroundColor: 'white',
    },
    labelStyle: {
        color: "#666666",
    },
    indicatorStyle: {
        backgroundColor: "#108EE9",
    }
})
export default class LoanPayback extends PureComponent {
    state = {
        index: 0,
        routes: [
            {
                key: 'first',
                title: '借款单',
            },
            {
                key: 'second',
                title: '还款单'
            }
        ]
    }
    renderScene = SceneMap({
        first: () => (
            <TemplateView formKey="FSSC_LoanBillView" oid="-1" status="EDIT" />
        ),
        second: () => (
            <TemplateView formKey="FSSC_RepaymentBillView" oid="-1" status="EDIT" />
        )
    })
    setIndex = (index) => {
        this.setState({
            index,
        });
    }
    renderTabBar = (props)=> {
        return <TabBar {...props} 
                style={styles.tabViewStyle} 
                indicatorStyle={styles.indicatorStyle}
                activeColor="#108EE9"
                inactiveColor="#666666"
            />;
    }
    render() {
        const { style } = this.props;
        return (
            <View style={[styles.container, style]}>
                <Header title="借还款单" headerStyle={{border: 0}} titleMode="absolute" />
                <TabView
                    navigationState={this.state}
                    swipeEnabled={false}
                    renderTabBar={this.renderTabBar}
                    renderScene={this.renderScene}
                    onIndexChange={this.setIndex}
                />
            </View>
        )
    }
}
