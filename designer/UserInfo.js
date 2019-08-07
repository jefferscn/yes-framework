import React, { Component } from 'react';
import { AppStatusStore } from 'yes';
import View from '../View';
import { Svr } from 'yes-core';
import Icon from '../Icon';

const styles = {
    container : {
        flexDirection: 'row',
        height: 48,
        alignItems: 'center',
        color: 'white',
    },
    user: {
        paddingRight: 16,
    }
}
export default class UserInfo extends Component {
    doLogout = async ()=> {
        await Svr.SvrMgr.doLogout();
        window.location.reload();
    }
    render() {
        return (<View style={styles.container}>
            <View style={styles.user}>
            {AppStatusStore.getState().getIn(['userinfo', 'name'])}
            </View>
            <Icon onClick={this.doLogout} className="fa-sign-out fa-2x"></Icon>
        </View>)
    } 
}