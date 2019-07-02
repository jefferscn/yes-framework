import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import CellLayoutEditor from '../../designer/components/Editor/CellLayoutEditor';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import BaseMeta from './BaseMeta';
import TemplateSelect from '../../designer/components/Editor/Controls/TemplateSelect';
import defaultTemplateMapping from './defaultTemplateMapping';

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
    }
});

export default function debugWrap(Comp) {
    @observer
    class DebugWrap extends Component {
        @observable meta = this.props.meta;
        static contextTypes = {
            isDesignMode: PropTypes.func,
        }
        static childContextTypes = {
            regDesignableIcon: PropTypes.func,
            calcIconPosition: PropTypes.func,
        }
        getChildContext() {
            return {
                regDesignableIcon: this.regDesignableIcon,
                calcIconPosition: this.calcIconPosition,
            };
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


        onTemplateChange = (templateKey) => {
            if (this.meta.formTemplate === templateKey) {
                return;
            }
            const templateClass = defaultTemplateMapping.get(templateKey);
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
                                <Comp meta={this.meta} {...others} />
                            </View>
                            <View style={styles.editor}>
                                <CellLayoutEditor />
                            </View>
                        </View>
                    </MuiThemeProvider>
                )
            }
            return <Comp meta={this.meta} {...others} />
        }
    }
    return DebugWrap;
}
