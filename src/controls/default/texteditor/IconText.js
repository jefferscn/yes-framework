import React, { PureComponent } from 'react';
import { Components } from 'yes-platform';
import { Text, StyleSheet } from 'react-native';
import { ControlWrap as controlWrap } from 'yes';
const { View } = Components;
import { FontIcon } from '../../../config';
import designExport from 'yes-designer/utils/DesignExport';

@controlWrap
class IconText extends PureComponent {
    static defaultProps = {
        fontSize: 20,
        fontColor: '#28a8d9'
    }
    getSetting = () => {
        let icon;
        let text;
        let iconColor;
        const v = this.props.controlState.get('value');
        icon = `icon-${v}`;
        iconColor = this.props.fontColor;
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

                <FontIcon
                    name={setting.icon}
                    size={this.props.fontSize}
                    color={setting.iconColor}
                />
                {/* {this.generateText(setting.text)} */}
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

const editor = [
    {
        type: 'Color',
        key: 'fontColor',
        caption: '图标颜色',
    }, {
        type: 'Number',
        key: 'fontSize',
        defaultValue: 20,
        caption: '图标大小'
    },
];

const defaultValue = {
    fontColor: '#28a8d9',
    fontSize: 20,
}

const DesignableIconText = designExport(IconText, defaultValue, editor);
DesignableIconText.category = 'yigo';
DesignableIconText.detailType = 'texteditor';
DesignableIconText.key = 'IconText';
export default DesignableIconText;