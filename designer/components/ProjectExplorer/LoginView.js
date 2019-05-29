import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import PropTypes from 'prop-types';
import CellLayoutEditor from '../Editor/CellLayoutEditor';
import beautify from "json-beautify";
import { View, StyleSheet } from 'react-native';
import Controls from '../../../src/config/control';
import Element from '../../../src/template/Element';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    login: {
        width: 335,
        height: 667,
    }
})

@inject('store')
@observer
class LoginViewer extends Component {
    @observable meta = null;
    @observable loading = true;
    static childContextTypes = {
        onMetaChange: PropTypes.func,
        getControl: PropTypes.func,
    }
    getChildContext() {
        return {
            onMetaChange: this.onMetaChange,
            getControl: this.getControl,
        }
    }
    getControl = (key)=> {
        return Controls[key];
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
            this.props.store.selectControl(this.meta, Element.editor);
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
            this.props.store.selectControl(this.meta, Element.editor);
            this.loading = false;
        } catch (ex) {
            console.log(ex);
        }
    }
    render() {
        if (this.loading) {
            return null;
        }
        return (
            <View style={styles.container}>
                <View style={styles.login}>
                    <Element meta = {this.meta} />
                </View>
                <CellLayoutEditor />
            </View>
        ) 
    }
}

export default LoginViewer;
