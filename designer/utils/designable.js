import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';
import { red400, indigo400, blue400, teal400, yellow400, brown400, pink400, green400, amber400 } from 'material-ui/styles/colors';

const PositionColors = [
    red400,
    indigo400,
    teal400,
    yellow400,
    brown400,
    pink400,
    blue400,
    green400,
    amber400,
];

const styles = StyleSheet.create({
    debug: {
    },
    container: {
        minHeight: 20,
        borderWidth: 1,
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
                applyIconPosition: PropTypes.func,
                releaseIconPosition: PropTypes.func,
            }

            static childContextTypes = {
                getMeta: PropTypes.func,
                applyIconPosition: PropTypes.func,
                releaseIconPosition: PropTypes.func,
            }

            static defaultProps = {
                designPositionBase: false
            }

            @observable store = this.props.store
            @observable meta = this.calcMeta(this.props.meta);
            @observable position = this.props.designPositionBase ? 0 : (this.context.applyIconPosition ? this.context.applyIconPosition() : 0)
            positionApply = [];

            getChildContext() {
                return {
                    getMeta: this.getMeta,
                    applyIconPosition: this.applyIconPosition,
                    releaseIconPosition: this.releaseIconPosition,
                }
            }

            getMeta = () => {
                return this.meta;
            }

            applyIconPosition = () => {
                if (this.props.designPositionBase || !this.context.applyIconPosition) {
                    let positionApply = 1;
                    while (this.positionApply.includes(positionApply)) {
                        positionApply++;
                    }
                    return positionApply;
                }
                return this.context.applyIconPosition && this.context.applyIconPosition();
            }

            releaseIconPosition = (pos) => {
                if (this.props.designPositionBase || !this.context.applyIconPosition) {
                    const index = this.positionApply.findIndex((item) => item === pos);
                    if (index >= 0) {
                        this.positionApply.splice(index, 1);
                    }
                }
            }

            onSelect = (e) => {
                this.context.selectControl(this.meta, this.props, designMeta, defaultValue);
                e.stopPropagation();
            }

            componentWillReceiveProps(props) {
                this.meta = this.calcMeta(props.meta);
            }

            componentWillUnmount() {
                if (this.context.isDesignMode() && (this.props.designPositionBase || !this.context.applyIconPosition)) {
                    this.context.releaseIconPosition && this.context.releaseIconPosition(this.position);
                }
            }
            // componentDidMount() {
            //     const node = ReactDOM.findDOMNode(this.icon);
            //     if (node && this.context.calcIconPosition) {
            //         let rect = node.getBoundingClientRect();
            //         const count = this.context.calcIconPosition(rect);
            //         node.style.right = -count * 20;
            //         rect = node.getBoundingClientRect();
            //         this.context.regDesignableIcon(rect);
            //     }
            // }

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
            }

            render() {
                if (this.context.isDesignMode && this.context.isDesignMode()) {
                    let debugStyle = null;
                    if (this.store.selectedControl === this.meta) {
                        debugStyle = styles.debug;
                    }
                    const { debugStyle: dbgStyle, designStyle, meta, ...otherProps } = this.props;
                    const colorStyle = {
                        borderColor: PositionColors[this.position],
                    }
                    const iconColorStyle = {
                        color: PositionColors[this.position],
                    }
                    return <View style={[styles.container, debugStyle, dbgStyle, designStyle, colorStyle]} >
                        <TouchableOpacity onPress={this.onSelect} ref={(ref) => this.icon = ref} style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, right: 20 * this.position, width: 20, height: 20, zIndex: 100 }}>
                            <AwesomeFontIcon name="gear" style={iconColorStyle} />
                        </TouchableOpacity>
                        <Clazz visible designStyle={dbgStyle || designStyle} meta={this.meta} {...this.meta} {...otherProps} />
                    </View>
                }
                return <Clazz meta={this.meta} {...this.meta} {...this.props} />
            }
        }
        if (__DESIGN__) {
            Designable = inject('store')(Designable);
        }
        Designable.editor = designMeta;
        Designable.defaultValue = defaultValue;
        return Designable;
    }
}
