import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import View from '../View';
import ProjectFile from './ProjectFile';

@observer
export default class ProjectFileList extends Component {
    componentDidMount() {
        this.ref.addEventListener('contextmenu',(e)=>e.preventDefault());
    }
    componentWillUnmount() {
        this.ref.removeEventListener('contextmenu');
    }
    render() {
        const { project, containerStyle } = this.props;
        return (
            <View 
                ref = {(ref)=> this.ref = ref}
                style={containerStyle}>
                {
                    project.files.map((file)=>
                        <ProjectFile file = {file} level={1} />
                    )
                }
            </View>
        );
    }
}