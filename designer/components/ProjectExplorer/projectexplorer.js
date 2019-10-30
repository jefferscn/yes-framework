import React, { Component } from 'react';
import View from '../View';
import { inject, observer } from "mobx-react";
import ProjectFileList from './ProjectFileList';
import FileEditor from './FileEditor';

const styles = {
    container: {
        flexDirection: 'row',
        flex: 1,
    }
}
@inject('store')
@observer
class ProjectExplorer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ProjectFileList containerStyle={{ minWidth: 200, overflow: 'auto' }} file={this.props.store.selected} project={this.props.store.project} />
                <FileEditor containerStyle = {{ flex: 1, overflow: 'hidden'}} file={this.props.store.selected} type={this.props.store.fileType} />
            </View>
        )
    }
}

export default ProjectExplorer
