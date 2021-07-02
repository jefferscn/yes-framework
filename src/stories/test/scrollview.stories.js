import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { RefreshControl } from 'react-native-web-refresh-control';
import Animated, {
    useAnimatedGestureHandler, useAnimatedStyle,
    useAnimatedScrollHandler,
    useSharedValue, withTiming, withSpring
} from 'react-native-reanimated';

const styles = StyleSheet.create({
    inner: {
        height: 1000,
    },
    image: {
        height: 300,
    },
    text: {
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 400,
    }
});

const { ScrollView } = Animated;

const Scroll = ({ style }) => {
    const scrollHanlder = useAnimatedScrollHandler({
        onScroll: (event, ctx) => {
            console.log(event);
        },
    });
    return (
        // <PanGestureHandler onGestureEvent={event}>
            <ScrollView
                // refreshControl={<RefreshControl />}
                style={style}
                onScroll={scrollHanlder}
                scrollEventThrottle={10}
            >
                <View style={styles.inner}>
                    <Image style={styles.image} source="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1361135963,570304265&fm=26&gp=0.jpg" />
                    <Text style={[styles.text]}>我了个差</Text>
                    <View style={{
                        flex: 1,
                        background: 'yellow',
                    }}></View>
                </View>
            </ScrollView>
        // </PanGestureHandler>
    )
}

export default {
    title: 'yes-framework/test/scrollview',
    component: Scroll,
};

const Template = (args) => (
    <Scroll {...args} />
);

const argTypes = {
}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    style: {
        flex: 1,
    }
};
