import React from 'react';
import { StyleSheet, TouchableHighlight, View, Text } from 'react-native';
import AwesomefontIcon from 'react-native-vector-icons/FontAwesome';
import Element from 'yes-framework/template/Element';
import FormContextWrap from '../Context/FormContextWrap';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    directionRow: {
        flexDirection: 'row',
    },
    directionColumn: {
        flexDirection: 'column',
    },
    textStyle: {
        color: '#008cd7',
    },
});

export default FormContextWrap((props) => {
    const onPress = () => {
        props.onChange(!props.value);
    }

    const { icon, title, style, textStyle, iconStyle, direction, value } = props;
    let iconElement = null;
    let iconSt = iconStyle;
    if(typeof iconStyle === 'function') {
        iconSt = iconStyle(value);
    }
    if (icon) {
        if (typeof icon === 'string') {
            iconElement = <AwesomefontIcon name={icon} style={iconSt} />;
        } else {
            iconElement = <Element meta={icon} />;
        }
    }
    let titleElement = null;
    let titleStyle = textStyle;
    if(typeof textStyle=== 'function') {
        titleStyle = textStyle(value);
    }
    if (title) {
        if (typeof title === 'string') {
            titleElement = <Text style={[styles.textStyle, titleStyle]}>{title}</Text>;
        } else {
            titleElement = <Element meta={title} />;
        }
    }
    return (
        <TouchableHighlight onPress={onPress} style={[{ flex: 1 }, styles.container, style]}>
            <View style={[direction === 'row' ? styles.directionRow : styles.directionColumn]}>
                {
                    iconElement
                }
                {
                    titleElement
                }
            </View>
        </TouchableHighlight>
    )
}); 
