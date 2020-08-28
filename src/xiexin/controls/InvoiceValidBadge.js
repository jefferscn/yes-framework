import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FontIcon from 'yes-framework/font';
import { ControlWrap } from 'yes-intf';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: -5,
        top: -5,
        height: 100, 
        width: 100, 
    },
    text: {
        position: 'absolute',
        top: 36,
        left: 20,
        fontSize: 20,
        transform: 'rotate(-20deg)',
    }
});

class InvoiceValidBadge extends PureComponent {
    static defaultProps = {
        size: 100,
    }
    getText  = ()=> {
        const { value}  = this.props;
        if(!value) {
            return {
                text: "未验证",
                color: "#FFEB3B"
            };
        }
        if(value=="1000") {
            return {
                text: "验证通过",
                color: "#8BC34A",
            };
        }
        return {
            text: "验证失败",
            color: "#F44336"
        }
    }
    render() {
        const { style, size } = this.props;
        const txt = this.getText();
        return (<View style={[styles.container, style]}>
            <FontIcon name="icon-seal_" size={size} color={txt.color} />
            <Text style={[styles.text, {color: txt.color}]}>{txt.text}</Text>
        </View>);
    }
}

export default ControlWrap(InvoiceValidBadge);
