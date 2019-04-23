import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';

const styles= StyleSheet.create({
    debug: {
        borderWidth: 1,
        borderColor: 'fuchsia',
        borderStyle: 'solid',
    }
});

export default function debugWrap(Comp) {
    @inject('store')
    @observer
    class DebugWrap extends Component {
        onSelect = (e)=> {
            // alert('aaa');
            this.props.store.selectControl(this.props.meta);
            e.stopPropagation();
        }
        render() {
            let debugStyle = null;
            if(this.props.store.selectedControl === this.props.meta) {
                debugStyle = styles.debug;
            }
            return <View style={debugStyle} onClick = {this.onSelect}>
                <Comp {...this.props} />
            </View>
        }
    }
    return DebugWrap;
}
