var _this = this;
import React, { useState, useEffect } from 'react';
import { ControlWrap } from 'yes';
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native';
var styles = StyleSheet.create({
    text: {
        color: '#008cd7',
    }
});
var LongTextWithMore = function (_a) {
    var displayValue = _a.displayValue, style = _a.style, _b = _a.maxLength, maxLength = _b === void 0 ? 100 : _b, _c = _a.lessText, lessText = _c === void 0 ? "缩起" : _c, _d = _a.moreText, moreText = _d === void 0 ? "全文" : _d, _e = _a.moreBehavior, moreBehavior = _e === void 0 ? "show" : _e;
    var _f = useState(true), showAll = _f[0], setShowAll = _f[1];
    var _g = useState(""), showText = _g[0], setShowText = _g[1];
    var _h = useState(false), needCollpase = _h[0], setNeedCollpase = _h[1];
    var originValue = displayValue;
    var expandText = function () {
        if (moreBehavior === 'show') {
            setShowAll(true);
            setShowText(originValue);
            return;
        }
        _this.props.onPress && _this.props.onPress();
    };
    var collapseText = function () {
        if (moreBehavior === 'show') {
            setShowText(originValue.substr(0, maxLength));
            setShowAll(false);
            return;
        }
    };
    useEffect(function () {
        originValue = displayValue;
        if (displayValue.length > maxLength) {
            setShowText(displayValue.substr(0, maxLength));
            setShowAll(false);
        }
        else {
            setShowText(displayValue);
            setShowAll(true);
            setNeedCollpase(false);
        }
    }, [displayValue]);
    return React.createElement(View, { style: style },
        React.createElement(Text, null, showText),
        showAll ? (needCollpase ? React.createElement(TouchableHighlight, { onPress: collapseText },
            React.createElement(Text, { style: styles.text }, lessText)) : null)
            : React.createElement(TouchableHighlight, { onPress: expandText },
                React.createElement(Text, { style: styles.text }, moreText)));
};
export default ControlWrap(LongTextWithMore);
