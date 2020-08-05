import React, { PureComponent } from 'react';
import Header from 'yes-framework/controls/Header';
import { View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { List } from 'antd-mobile';
import { AppDispatcher } from 'yes-intf';
import AppStatusWrap from 'yes-framework/controls/AppStatusWrap';
import { History } from 'yes-web';
import Update from 'yes-framework/controls/Update';

const Item = List.Item;
const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        flex: 1
    }
});

@AppStatusWrap
class VersionCheckItem extends PureComponent {
    componentWillMount() {
        this.props.updateVersion();
    }
    render() {
        const { fetching, currentVersion, latestVersion, canUpdate, url, title, platform } = this.props;
        let extra = null;
        if(fetching) {
            extra = <ActivityIndicator size="small" />;
        } else {
            if(canUpdate) {
                extra = <Update title="可更新" platform={platform} url={url} /*{...this.props}*/ />
            }
        }
        return (<Item extra={extra} >
            {title}
        </Item>);
    }
}
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
                        <VersionCheckItem 
                            title="检测更新"
                        />
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
