import React, { useState } from 'react';
import { Animated, View } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { SwipeAction } from 'antd-mobile';

export default ({ onRemove, removeable = true, removeText = "删除", removeStyle, children, right, ...otherProps }) => {
    const [height, setHeight] = useState(new Animated.Value(0));
    let animating = false;
    const onRemove_ = () => {
        animating = true;
        Animated.timing(height, {
            toValue: 0,
            duration: 300,
        }).start(() => {
            animating = false;
            onRemove && onRemove();
        });
    }
    const removeAction = {
        text: removeText,
        style: removeStyle,
        onPress: onRemove_
    };
    let right_ = [];
    if (removeable) {
        if (right) {
            right_ = [removeAction, ...right];
        } else {
            right_ = [removeAction];
        }
    }
    const onLayout = (e) => {
        Animated.timing(height, {
            toValue: e.nativeEvent.layout.height,
            duration: 300,
        }).start(() => {
        });
    }
    return <Animated.View style={[{ overflow: 'hidden' }, {
        height: height,
    }]}>
        <View onLayout={onLayout}>
            <SwipeAction
                {...otherProps}
                right={right_}
            >
                {
                    children
                }
            </SwipeAction>
        </View>
    </Animated.View>
}