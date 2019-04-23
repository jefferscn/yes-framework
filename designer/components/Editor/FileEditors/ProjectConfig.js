import React, { Component } from 'react';
import CellLayoutEditor from './CellLayoutEditor';
import fileAccessWrap from '../Wrappers/FileAccessWrapper';
import modalWrap from '../Wrappers/ModalWrapper';
import Text from '../Controls/Text';

const meta = [{
            type: Text,
            caption: 'session标识',
            key: 'sessionKey',
        }, {
            type: Text,
            caption: '服务地址',
            key: 'serverPath',
        }];

@fileAccessWrap('//config/project.json', true)
@modalWrap('项目配置')
class ProjectConfigEditor extends Component {
    render() {
        return (
            <CellLayoutEditor meta = {meta} {...this.props} />
        );
    }
}

export default ProjectConfigEditor;
