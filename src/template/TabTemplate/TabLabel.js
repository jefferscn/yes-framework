import React, { Component } from 'react';
import { Animated, View, StyleSheet, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import { observable } from 'mobx';
import designable from 'yes-designer/utils/designable';
import AwesomeFontIcon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

@observer
class TabLabel extends Component {
    static contextTypes = {
        isDesignMode: PropTypes.func,
    }
    @observable meta = this.props.meta;
    onMoveLeft = (e) => {
        const index = this.props.routes.indexOf(this.props.meta);
        this.props.onMoveLeft && this.props.onMoveLeft(index);
    }
    onMoveRight = (event) => {
        const index = this.props.routes.indexOf(this.props.meta);
        this.props.onMoveRight && this.props.onMoveRight(index);
    }
    render() {
        if (this.context.isDesignMode()) {
            const index = this.props.routes.indexOf(this.props.meta);
            const showMoveLeft = index > 0 && index <= this.props.routes.length - 1;
            const showMoveRight = index < this.props.routes.length - 2;
            return (<View style={styles.container}>
                {showMoveLeft ? <TouchableOpacity onPress={this.onMoveLeft} style={{ pointerEvents: 'auto' }}>
                    <AwesomeFontIcon name="chevron-left" />
                </TouchableOpacity> : null}
                <Animated.Text style={this.props.style} >
                    {this.meta.title}
                </Animated.Text>
                {showMoveRight ? <ArrowRight style={{ pointerEvents: 'auto' }} onClick={this.onMoveRight} /> : null}</View>);
        } else {
            return (<Animated.Text style={this.props.style} >
                {this.meta.title}
            </Animated.Text>);
        }
    }
}

const defaultValue = {
    title: '',
}
const editor = [
    {
        type: 'Text',
        key: 'title',
        caption: '抬头',
    }
]

export default designable(defaultValue, editor)(TabLabel);
