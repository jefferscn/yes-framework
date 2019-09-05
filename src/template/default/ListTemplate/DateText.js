import React, { PureComponent } from 'react';
import { Components } from 'yes-platform';
import { Text } from 'react-native';
import { ControlWrap as controlWrap } from 'yes';
const { View } = Components;
import dateformat from 'dateformat';

class DateText extends PureComponent {
    render() {
        const v = this.props.controlState.get('value');
        const t = new Date(v);
        const year = t.getYear();
        const currentYear = (new Date()).getYear();
        let formatOfDate = 'yy-mm-dd';
        if (year === currentYear) {
            formatOfDate = 'mm-dd';
        }
        const formatOfTime = 'HH:MM';
        return (
            <View
                style={{
                    paddingRight: 16,
                    color: '#c5c5c5',
                    width: 80,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }}
            >
                <Text>{v ? dateformat(t, formatOfDate) : ''}</Text>
                <Text>{v ? dateformat(t, formatOfTime) : ''}</Text>
            </View>
        );
    }
}
export default controlWrap(DateText);
