import React, { PureComponent } from 'react';
import Header from '../../controls/Header';
import { View, StyleSheet, Button } from 'react-native';
import { List } from 'antd-mobile';
import { AppDispatcher } from 'yes-intf';
import { History } from 'yes-web';

const Item = List.Item;
const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        flex: 1
    }
})
export default class Setting extends PureComponent {
    doLogout = () => {
        History.push('/');
        AppDispatcher.dispatch({
            type: 'XIEXINLOGOUT',
        });
    }
    render() {
        return (
            <View style={styles.page}>
                <Header title="设置" />
                <View style={styles.content}>
                    <List>
                        <Item arrow="horizontal" onClick={() => { }}>
                            清除缓存    
                        </Item>
                    </List>
                </View>
                <Button
                    title="退出登录"
                    onPress={this.doLogout}
                />
            </View>
        )
    }
}
