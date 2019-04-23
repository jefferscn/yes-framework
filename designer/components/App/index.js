import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { inject, observer } from "mobx-react";
import { RefreshIndicator } from 'material-ui';
import { observable } from 'mobx';
// import ProjectTree from '../ProjectTree';
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
    async componentDidMount() {
        await this.props.store.project.reload();
        this.loading = false;
    }
    render() {
        return <MuiThemeProvider muiTheme={getMuiTheme()}>
            <View style={{flex:1}}>
                <AppBar 
                    onLeftIconButtonTouchTap={() => { this.props.toggleTree() }} 
                    iconElementRight = {<UserInfo/>}
                    title="YES Designer Online!" />
                <View style={{flex:1}}>
                    {
                        this.loading ? <RefreshIndicator status='loading' /> : 
                            <ProjectExplorer />
                    }
                </View>
            </View>
        </MuiThemeProvider>
    }
}
