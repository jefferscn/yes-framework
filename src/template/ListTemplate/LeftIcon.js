import React, { PureComponent } from 'react';
import { Components } from 'yes-platform';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, StyleSheet } from 'react-native';
import { ControlWrap as controlWrap } from 'yes';
const { View } = Components;
class LeftIcon extends PureComponent {
    getSetting = () => {
        let icon;
        let text;
        let iconColor;
        const v = this.props.controlState.get('value');
        switch (v) {
            case 'LeaveApplication_flow':
                icon = 'clock-o';
                text = '请假';
                iconColor = '#ee5b47';
                break;
            case 'SalesContractChina_flow':
                icon = 'truck';
                text = '销售合同';
                iconColor = '#28a8d9';
                break;
            default:
                icon = 'pencil';
                text = '默认';
                iconColor = '';
        }
        return {
            icon,
            text,
            iconColor,
        };
    }
    generateText = (text) => {
        const len = text.length;
        let v;
        switch (len) {
            case 4:
                v = (
                    <View>
                        <Text>{text.slice(0, 2)}</Text>
                        <Text>{text.slice(2)}</Text>
                    </View>
                );
                break;
            default:
                v = <Text>{text}</Text>;
        }
        return v;
    }
    render() {
        const setting = this.getSetting();
        return (
            <View
                style={styles.container}
            >
                <Icon
                    name={setting.icon}
                    size={26}
                    color={setting.iconColor}
                />
                {this.generateText(setting.text)}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: 50,
    },
});
export default controlWrap(LeftIcon);
