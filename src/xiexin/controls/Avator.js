import React, { PureComponent } from 'react';
import { ControlWrap } from 'yes-intf';
import { StyleSheet, View, Image } from 'react-native';
import { Svr } from 'yes-core';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'ghostwhite',
        borderRadius: '50%',
        overflow: 'hidden',
    }
});
class Avator extends PureComponent {
    static defaultProps = {
        size: 60,
    }
    getAvatorUrl = ()=> {
        const { value } = this.props;
        return `${Svr.SvrMgr.ServerURL}/getHeadImg?personnelOID=${value}`;
    }
    render() {
        const { size, value } = this.props;
        const sizeStyle = {
            width: size,
            height: size,
        }
        return (
            <View style={[styles.container, sizeStyle]}>
                <Image source={this.getAvatorUrl()} style={sizeStyle}/>
            </View>
        )
    }
}

export default ControlWrap(Avator);
