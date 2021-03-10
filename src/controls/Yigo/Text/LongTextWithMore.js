import React, { useState, useEffect } from 'react';
import { ControlWrap } from 'yes';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    text: {
        color: '#008cd7',
    }
});
const LongTextWithMore = ({ displayValue, style, maxLength = 100, lessText="缩起" ,moreText = "全文", moreBehavior = "show" }) => {
    const [showAll, setShowAll] = useState(true);
    const [showText, setShowText] = useState("");
    const [needCollpase, setNeedCollpase] = useState(false);
    let originValue = displayValue;

    const expandText = () => {
        if (moreBehavior === 'show') {
            setShowAll(true);
            setShowText(originValue);
            return;
        }
        this.props.onPress && this.props.onPress();
    }
    const collapseText = () => {
        if (moreBehavior === 'show') {
            setShowText(originValue.substr(0, maxLength));
            setShowAll(false);
            return;
        }
    }
    useEffect(() => {
        originValue = displayValue;
        if (displayValue.length > maxLength) {
            setShowText(displayValue.substr(0, maxLength));
            setShowAll(false);
        } else {
            setShowText(displayValue);
            setShowAll(true);
            setNeedCollpase(false);
        }
    }, [displayValue])
    return <View style={style}>
        <Text>{showText}</Text>
        {
            showAll ? (needCollpase?<TouchableHighlight onPress={collapseText}><Text style={styles.text}>{lessText}</Text></TouchableHighlight>:null)
                : <TouchableHighlight onPress={expandText}><Text style={styles.text}>{moreText}</Text></TouchableHighlight>
        }
    </View>
}

export default ControlWrap(LongTextWithMore)
