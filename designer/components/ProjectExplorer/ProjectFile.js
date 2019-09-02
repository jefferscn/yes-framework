import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
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
                return 'form';
            case FILE_TYPE.CONTROL:
                return 'control';
            case FILE_TYPE.PROJECTCFG:
                return 'setting';
            case FILE_TYPE.LOGINCFG:
                return 'safety-certificate';
            case FILE_TYPE.ROUTECFG:
                return 'home';
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
            let iconDir = expand ? 'down' : 'right';
            if(file.isLoading) {
                iconDir = 'sync';
            }
            return (
                <View onClick={this.onSelect} onMouseDown={this.onSelect} >
                    <View onClick = {this.onSelect} style={{...styles.file, ...selectedStyle, ...containerStyle}}>
                        <Icon onClick={this.toggleExpand} spin={file.isLoading?'true':false} name={iconDir} style={styles.icon}/>
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
