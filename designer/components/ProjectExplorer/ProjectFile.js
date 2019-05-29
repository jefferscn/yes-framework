import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { observable, action } from 'mobx';
import View from '../View';
import Icon from '../Icon';
import { FILE_TYPE } from '../../mobx-store/AppState';

const styles = {
    file: {
        height: 22,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 16,
        paddingRight: 6,
    },
    selected: {
        backgroundColor: 'lightgray',
    },
}

const NewProjectFile = inject('store')(observer(class ProjectFile extends Component {
    toggleExpand = async () => {
        await this.props.file.toggleExpand();
    }
    onSelect = (e)=> {
        e.stopPropagation();
        this.props.store.select(this.props.file);
    }
    getIcon = (type)=> {
        switch(type) {
            case FILE_TYPE.BILLFORM:
                return 'fa-wpforms';
            case FILE_TYPE.CONTROL:
                return 'fa-puzzle-piece';
            case FILE_TYPE.PROJECTCFG:
                return 'fa-gear';
            case FILE_TYPE.LOGINCFG:
                return 'fa-television';
            case FILE_TYPE.ROUTECFG:
                return 'fa-home';
        }
    }
    render() {
        const { file, level, store } = this.props;
        const containerStyle = {
            paddingLeft: 12*level,
        };
        const expand = file.expand;
        const selected = store.selected === this.props.file; 
        const selectedStyle = selected?styles.selected:{};
        if (file.isDirectory) {
            let iconDir = expand ? 'fa-caret-down' : 'fa-caret-right';
            if(file.isLoading) {
                iconDir = 'fa-spinner';
            }
            return (
                <View onClick={this.onSelect} onMouseDown={this.onSelect} >
                    <View onClick = {this.onSelect} style={{...styles.file, ...selectedStyle, ...containerStyle}}>
                        <Icon onClick={this.toggleExpand} className={file.isLoading?'fa-spin':''} name={iconDir} style={styles.icon}/>
                        <a>{file.name}</a>
                    </View>
                    {
                        expand ?
                            <View>
                                {
                                    file.children.map((child) => <NewProjectFile file = {child} level={level+1} />)
                                }
                            </View> : null
                    }
                </View>
            );
        } else {
            return (
                <View onClick = {this.onSelect} onMouseDown={this.onSelect} style ={{...containerStyle, ...styles.file, ...selectedStyle}}>
                    <Icon name={this.getIcon(file.type)} style={styles.icon}/>
                    <a>{file.name}</a>
                </View>
            );
        }
    }
}));

export default NewProjectFile;
