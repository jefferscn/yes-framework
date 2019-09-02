import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { inject, observer } from "mobx-react";
import { RefreshIndicator } from 'material-ui';
import { observable } from 'mobx';
// import ProjectTree from '../ProjectTree';
// import { ThemeProvider } from 'react-native-material-ui';
import { getTheme, ThemeContext } from 'react-native-material-ui';
import View from '../View';
import { Route, Link, withRouter } from "react-router-dom";
import ProjectExplorer from '../ProjectExplorer';
import UserInfo from './UserInfo';

const styles = {
    tree: {
        width: 300,
        marginLeft: 0,
        backgroundColor: 'white',
        transition: 'margin-left 500ms ease-in-out',
    },
}

const transitionStyles = {
    entering: { marginLeft: -300 },
    entered: { marginLeft: 0 },
};

@inject('store')
@withRouter
@observer
export default class App extends Component {
    @observable loading = true;
    onMessage = async ({ data }) => {
        if (data.type === 'deploymeta') {
            const f = this.props.store.selected;
            // const f = await this.props.store.getBillForm(data.formKey);
            f.commitContent(JSON.stringify(data.meta));
        }
        if (data.type === 'Open') {
            const { formKey, oid, status } = data;
            let f = await this.props.store.getBillForm(formKey);
            if (!f) {
                f = await this.props.store.project.addBillForm(formKey);
            }
            this.props.store.openForm(formKey, oid);
        }
        if (data.type === 'OpenWorkitem') {
            const { WorkitemID, formKey, oid } = data;
            let f = await this.props.store.getBillForm(formKey);
            if (!f) {
                f = await this.props.store.project.addBillForm(formKey);
            }
            this.props.store.openForm(formKey, oid);
            // this.props.store.selectFormKey(formKey);
        }
        if (data.type === 'showlogin') {//显示登录配置

        }
    }
    async componentDidMount() {
        await this.props.store.project.reload();
        this.loading = false;
        window.addEventListener('message', this.onMessage);
    }
    componentWillUnmount() {
        window.removeEventListener('message', this.onMessage);
    }
    render() {
        return <MuiThemeProvider muiTheme={getMuiTheme()}>
            <ThemeContext.Provider value={getTheme({})}>
                <View style={{ flex: 1 }}>
                    <AppBar
                        onLeftIconButtonTouchTap={() => { this.props.toggleTree() }}
                        title="YES Designer Online!" />
                    <View style={{ flex: 1 }}>
                        {
                            this.loading ? <RefreshIndicator status='loading' /> :
                                <ProjectExplorer />
                        }
                    </View>
                </View>
            </ThemeContext.Provider>
        </MuiThemeProvider>
    }
}
