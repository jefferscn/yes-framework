import './TabTemplate';
import './ModalTemplate';
import './DynamicTemplate';
import './NormalTemplate';
import './CustomTemplate';
import './ListTemplate';
import './VoidTemplate';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import defaultTemplateMapping from './defaultTemplateMapping';
let TemplateSelect = null;
let CellLayoutEditor = null;
if (__DESIGN__) {
    TemplateSelect = require('../../designer/components/Editor/Controls/TemplateSelect').default;
    CellLayoutEditor = require('../../designer/components/Editor/CellLayoutEditor').default;
}

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
    static contextTypes = {
        isDesignMode: PropTypes.func,
        deployMeta: PropTypes.func,
    }

    static childContextTypes = {
        onMetaChange: PropTypes.func,
        regDesignableIcon: PropTypes.func,
        calcIconPosition: PropTypes.func,
    }

    getChildContext() {
        return {
            onMetaChange: this.onMetaChange,
            regDesignableIcon: this.regDesignableIcon,
            calcIconPosition: this.calcIconPosition,
        }
    }

    onMetaChange = () => {
        const json = toJS(this.meta);
        if (this.context.isDesignMode && this.context.isDesignMode()) {
            this.context.deployMeta && this.context.deployMeta(this.props.formKey, json);
        }
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
    positions = {};
    regDesignableIcon = (rect) => {
        let oldV = this.positions[rect.top];
        if (!oldV) {
            this.positions[rect.top] = [];
            oldV = this.positions[rect.top];
        }
        oldV.push(rect.right);
    }

    findUsablePos = (rect) => {
        const oldV = this.positions[rect.top];
        let right = rect.right;
        let count = 0;
        if (!oldV) {
            return count;
        }
        while (oldV.includes(right)) {
            right -= 20;
            count--;
        }
        return count;
    }

    calcIconPosition = (rect) => {
        return this.findUsablePos(rect);
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
                            <CellLayoutEditor />
                        </View>
                    </View>
                </MuiThemeProvider>
            )
        }
        return <TemplateClass meta={this.meta} {...this.meta} {...others} />
    }
}
