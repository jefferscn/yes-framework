import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import PropTypes from 'prop-types';
import CellLayoutEditor from '../Editor/CellLayoutEditor';
import beautify from "json-beautify";

const meta = [
    {
        type: 'Text',
        key: 'sessionKey',
        caption: '唯一标识',
    },
    {
        type: 'Text',
        key: 'serverPath',
        caption: '服务器地址',
    },
    {
        type: 'SubForm',
        key: 'wechat',
        isGroup: true,
        control: {
            editor: [
                {
                    type: 'Text',
                    key: 'signurl',
                    caption: '认证服务地址',
                }
            ],
            defaultValue: {
                signurl: '',
            }
        },
    }, {
        type: 'SubForm',
        key: 'baidumap',
        isGroup: true,
        control: {
            editor: [
                {
                    type: 'Text',
                    key: 'ak',
                    caption: '认证码',
                }
            ],
            defaultValue: {
                ak: '',
            }
        },
    }
];

@inject('store')
@observer
class ProjectViewer extends Component {
    @observable meta = null;
    @observable loading = true;
    static childContextTypes = {
        onMetaChange: PropTypes.func,
    }
    getChildContext() {
        return {
            onMetaChange: this.onMetaChange,
        }
    }
    onMetaChange = () => {
        const { selected } = this.props.store;
        selected.commitContent(beautify(toJS(this.meta), null, 4, 100));
    }
    async componentWillReceiveProps() {
        this.loading = true;
        try {
            if (!this.props.store.selected.loaded) {
                await this.props.store.selected.reloadContent();
            }
            this.meta = JSON.parse(this.props.store.selected.content);
            this.props.store.selectControl(this.meta, meta);
            this.loading = false;
        } catch (ex) {
            console.log(ex);
        }
    }
    async componentDidMount() {
        try {
            if (!this.props.store.selected.loaded) {
                await this.props.store.selected.reloadContent();
            }
            this.meta = JSON.parse(this.props.store.selected.content);
            this.props.store.selectControl(this.meta, meta);
            this.loading = false;
        } catch (ex) {
            console.log(ex);
        }
    }
    render() {
        if (this.loading) {
            return null;
        }
        return <CellLayoutEditor />
    }
}

export default ProjectViewer;
