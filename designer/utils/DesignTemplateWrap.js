import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import CellLayoutEditor from '../components/Editor/CellLayoutEditor';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TemplateSelect from '../components/Editor/Controls/TemplateSelect';
import DesignerStore from './designerstore';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    billContainer: {
        width: 375,
        height: 717,
    },
    editor: {
        flex: 1,
        paddingLeft: 20,
    },
    template: {
        height: 50,
    },
    bill: {
        flex:1,
    }
});

export default function debugWrap(Comp) {
    @observer
    class DesignTemplateWrap extends Component {
        @observable meta = this.props.meta;
        static contextTypes = {
            isDesignMode: PropTypes.func,
            getTemplate: PropTypes.func,
        }

        static childContextTypes = {
            selectControl: PropTypes.func,
        }

        getChildContext() {
            return {
                selectControl: this.selectControl,
            }
        }
        @observable store = new DesignerStore();

        selectControl = (control, props, meta, defaultValue) => {
            this.store.selectControl(control, props, meta, defaultValue);
        }
        onTemplateChange = (templateKey) => {
            if (this.meta.formTemplate === templateKey) {
                return;
            }
            const templateClass = this.context.getTemplate(templateKey);
            if (templateClass) {
                this.meta = templateClass.fromJson();
            }
        }
        render() {
            const { meta, ...others } = this.props;
            if (this.context.isDesignMode()) {
                return (
                    <MuiThemeProvider uiTheme={{}} >
                        <View style={styles.container} >
                            <View style={styles.billContainer}>
                                <View style={styles.template}>
                                    <TemplateSelect value={this.meta.formTemplate} onChange={this.onTemplateChange} />
                                </View>
                                <Comp debugStyle={styles.bill} meta={this.meta} {...others} />
                            </View>
                            <View style={styles.editor}>
                                <CellLayoutEditor store={this.store} />
                            </View>
                        </View>
                    </MuiThemeProvider>
                )
            }
            return <Comp meta={this.meta} {...others} />
        }
    }
    return DesignTemplateWrap;
}
