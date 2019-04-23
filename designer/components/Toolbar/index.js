import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { View, StyleSheet } from 'react-native';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import ProjectConfig from '../Editor/FileEditors/ProjectConfig';

const styles = StyleSheet.create({
    trigger: {
        position: 'absolute',
        left: -35,
        top: 100,
        width: 45,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        height: 60,
        display: 'flex',
        alignItems: 'center',
        color: 'lightseagreen',
        fontSize: 40,
    }
});

@inject('store')
@observer
export default class Toolbar extends Component {
    @observable projectVisible = false;
    @observable homeVisible= false;
    toggleVisible = ()=> {
        store.toolbarVisible = !store.toolbarVisible;
    } 
    showProjectConfig = ()=>{
        this.projectVisible = true;
    }
    showHomePageConfig = ()=> {
        this.homeVisible = true;
    }
    closeProjectConfig = ()=> {
        this.projectVisible = false;
    }
    render() {
        return (
            <Drawer width={80} containerStyle={{display:'flex', flexDirection: 'column', alignItems: 'center',overflow:'visible'}} openSecondary={true} open={this.props.store.toolbarVisible}>
                <AwesomeFontIcon onPress = {this.toggleVisible} style={[styles.trigger, { color: 'white', fontSize: 29 }]} name="gears" />
                <AwesomeFontIcon onPress = {this.showProjectConfig} style={styles.item} name="gear" />
                <AwesomeFontIcon onPress = {this.showHomePageConfig} style={styles.item} name="home" />
                <ProjectConfig visible={this.projectVisible} close={this.closeProjectConfig} />
            </Drawer>
        )
    }
}
