import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';
import CellLayoutEditor from '../components/Editor/CellLayoutEditor';
import PropTypes from 'prop-types';
import designerstore from './designerstore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    class DesignControlWrap extends Component {
        @observable meta = this.props.meta;
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
        @observable store = new designerstore();

        selectControl = (control, props, meta, defaultValue) => {
            this.store.selectControl(control, props, meta, defaultValue);
        }

        onMetaChange = () => {
            const json = toJS(this.meta);
            if (this.context.isDesignMode && this.context.isDesignMode()) {
                this.context.deployMeta && this.context.deployMeta(json);
            }
        }

        render() {
            const { meta, ...others } = this.props;
            if (this.context.isDesignMode()) {
                return (
                    <MuiThemeProvider uiTheme={{}} >
                        <View style={styles.container} >
                            <View style={styles.billContainer}>
                                <Comp meta={this.meta} {...others} />
                            </View>
                            <View style={styles.editor}>
                                <CellLayoutEditor store = {this.store}/>
                            </View>
                        </View>
                    </MuiThemeProvider>
                )
            }
            return <Comp meta={this.meta} {...others} />
        }
    }
    return DesignControlWrap;
}
