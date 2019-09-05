// import './TabTemplate';
// import './ModalTemplate';
// import './DynamicTemplate';
// import './NormalTemplate';
// import './CustomTemplate';
// import './ListTemplate';
// import './VoidTemplate';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import PropTypes from 'prop-types';
import { templates } from '../config';
import defaultTemplates from './defaulttemplates';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import defaultTemplateMapping from './defaultTemplateMapping';
// import DesignerStore from 'yes-designer/utils/designerstore';
let TemplateSelect = null;
let CellLayoutEditor = null;
let MuiThemeProvider = null;
let DesignerStore = null;
if (__DESIGN__) {
    MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
    DesignerStore = require('yes-designer/utils/designerstore').default;
    TemplateSelect = require('yes-designer/components/Editor/Controls/TemplateSelect').default;
    CellLayoutEditor = require('yes-designer/components/Editor/CellLayoutEditor').default;
}

const allTemplates = Object.assign({}, defaultTemplates, templates);
Object.keys(allTemplates).forEach((temp)=>{
    defaultTemplateMapping.reg(temp, allTemplates[temp]);
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    billContainer: {
        width: 375,
    },
    editor: {
        flex: 1,
        paddingLeft: 20,
    },
    template: {
        height: 50,
    }
});

@observer
export default class Template extends Component {
    @observable meta = this.props.meta;
    @observable store = DesignerStore? new DesignerStore(): null;
    static contextTypes = {
        isDesignMode: PropTypes.func,
        deployMeta: PropTypes.func,
    }

    static childContextTypes = {
        onMetaChange: PropTypes.func,
        selectControl: PropTypes.func,
    }

    getChildContext() {
        return {
            onMetaChange: this.onMetaChange,
            selectControl: this.selectControl,
        }
    }

    onMetaChange = () => {
        const json = toJS(this.meta);
        if (this.context.isDesignMode && this.context.isDesignMode()) {
            this.context.deployMeta && this.context.deployMeta(json);
        }
    }

    selectControl = (control, props, meta, defaultValue) => {
        this.store.selectControl(control, props, meta, defaultValue);
    }

    onTemplateChange = (templateKey) => {
        if (this.meta.formTemplate === templateKey) {
            return;
        }
        const templateClass = defaultTemplateMapping.get(templateKey);
        if (templateClass) {
            this.meta = Object.assign({}, templateClass.defaultValue);
        }
    }

    render() {
        const { meta, ...others } = this.props;
        const TemplateClass = defaultTemplateMapping.get(this.meta.formTemplate);
        // if (this.context.isDesignMode()) {
        if (__DESIGN__) {
            return (
                <MuiThemeProvider uiTheme={{}} >
                    <View style={styles.container} >
                        <View style={styles.billContainer}>
                            <View style={styles.template}>
                                <TemplateSelect value={this.meta.formTemplate} onChange={this.onTemplateChange} />
                            </View>
                            <TemplateClass debugStyle={{ flex: 1 }} meta={this.meta} {...others} />
                        </View>
                        <View style={styles.editor}>
                            <CellLayoutEditor store={this.store} />
                        </View>
                    </View>
                </MuiThemeProvider>
            )
        }
        return <TemplateClass meta={this.meta} {...this.meta} {...others} />
    }
}
