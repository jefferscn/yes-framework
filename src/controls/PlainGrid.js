import React, { PureComponent } from 'react';
import { GridRowWrap as gridRowWrap, GridWrap } from 'yes';
import { View, Text } from 'react-native';

/**
 * 一个纯粹用来显示用的表格，行列形式
 */
@gridRowWrap
export default class PlainGrid extends PureComponent {
    render() {
        return <View>
            <Text>Not implemented</Text>
        </View>
    }
}
