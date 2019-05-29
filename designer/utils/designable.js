import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';

const styles = StyleSheet.create({
    debug: {
        borderWidth:1,
        borderStyle: 'solid',
    },
    container: {
        minHeight: 20,
        borderWidth: 1,
        borderColor: 'fuchsia',
        borderStyle: 'dotted',
    }
});
export default (defaultValue, designMeta) => {
    return (Clazz) => {
        @observer
        class Designable extends Component {
            static contextTypes = {
                isDesignMode: PropTypes.func,
                selectControl: PropTypes.func,
                getMeta: PropTypes.func,
            }

            static childContextTypes = {
                getMeta: PropTypes.func,
            }

            @observable store = this.props.store
            @observable meta = this.calcMeta(this.props.meta);

            getChildContext() {
                return {
                    getMeta: this.getMeta,
                }
            }

            getMeta = () => {
                return this.meta;
            }

            onSelect = (e) => {
                this.context.selectControl(this.meta, this.props, designMeta, defaultValue);
                e.stopPropagation();
            }

            componentWillReceiveProps(props) {
                this.meta = this.calcMeta(props.meta);
            }

            calcMeta = (meta) => {
                Object.entries(defaultValue).forEach(([key, val]) => {
                    if (meta[key] == null) {
                        if (typeof val === 'object') {
                            meta[key] = val;
                        } else {
                            meta[key] = val;
                        }
                    }
                });
                return meta;
                // return Object.assign({}, defaultValue, meta);
            }

            render() {
                if (this.context.isDesignMode && this.context.isDesignMode()) {
                    let debugStyle = null;
                    if (this.store.selectedControl === this.meta) {
                        debugStyle = styles.debug;
                    }
                    const { debugStyle: dbgStyle, meta, ...otherProps } = this.props;
                    return <View style={[styles.container, debugStyle, dbgStyle]} onClick={this.onSelect}>
                        <Clazz debugStyle={dbgStyle} meta={this.meta} {...this.meta} {...otherProps} />
                    </View>
                }
                return <Clazz meta={this.meta} {...this.meta} {...this.props} />
            }
        }
        if(__DESIGN__) {
            Designable = inject('store')(Designable);
        }
        Designable.editor = designMeta;
        Designable.defaultValue = defaultValue;
        return Designable;
    }
}
