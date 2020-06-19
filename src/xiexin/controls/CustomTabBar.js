import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

export default function MyTabBar({ navigationState, getLabelText, navigation, position }) {
    const state = navigationState;
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                // const { options } = descriptors[route.key];
                const label = getLabelText({route});
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = Animated.interpolate(position, {
                    inputRange,
                    outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                });

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        // accessibilityLabel={options.tabBarAccessibilityLabel}
                        // testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                        <Animated.Text style={{ opacity }}>
                            {label}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
