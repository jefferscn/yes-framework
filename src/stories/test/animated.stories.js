import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, withSpring, withRepeat } from 'react-native-reanimated';

const styles = StyleSheet.create({
    face: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        color: 'white',
    },
    cube: {
        transformStyle: 'preserve-3d',
    },
    container: {
        // marginTop: 50,
        // marginBottom: 50,
    }
});
const Cube = ({ size, style }) => {
    const sz = size / 2;
    const sizeStyle = {
        height: size,
        width: size,
    };
    const translateStyle = {
        backgroundColor: 'rgba(90,90,90,.7)',
        transform: [
            { translateZ: sz }
        ]
    }
    const topStyle = {
        backgroundColor: 'rgba(0,210,0,.7)',
        transform: [
            { translateZ: sz }
        ]
    };
    const bottomStyle = {
        transform: [
            { rotateX: '180deg' },
            { translateZ: sz }
        ]
    }
    const leftStyle = {
        backgroundColor: 'rgba(210,0,0,.7)',
        transform: [
            { rotateY: '90deg' },
            { translateZ: sz }
        ]
    }
    const rightStyle = {
        backgroundColor: 'rgba(0,0,210,.7)',
        transform: [
            { rotateY: '-90deg' },
            { translateZ: sz }
        ]
    }
    const frontStyle = {
        backgroundColor: 'rgba(210,210,0,.7)',
        transform: [
            { rotateX: '90deg' },
            { translateZ: sz }
        ]
    }
    const backStyle = {
        backgroundColor: 'rgba(210,0,210,.7)',
        transform: [
            { rotateX: '-90deg' },
            { translateZ: sz }
        ]
    }
    return (
        <Animated.View style={[styles.cube, style, sizeStyle]}>
            <View style={[styles.face, topStyle]}><Text style={styles.text}>1</Text></View>
            <View style={[styles.face, bottomStyle]}><Text style={styles.text}>2</Text></View>
            <View style={[styles.face, leftStyle]}><Text style={styles.text}>3</Text></View>
            <View style={[styles.face, rightStyle]}><Text style={styles.text}>4</Text></View>
            <View style={[styles.face, frontStyle]}><Text style={styles.text}>5</Text></View>
            <View style={[styles.face, backStyle]}><Text style={styles.text}>6</Text></View>
        </Animated.View>
    )
};

const AnimatedCube = ({ size = 100 }) => {
    // const [x, setX] = useState(0);
    // const [y, setY] = useState(0);
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    let [lastX, setLastX] = useState(0);
    let [lastY, setLastY] = useState(0);
    const event = useAnimatedGestureHandler({
        onStart: (event, ctx) => {
        },
        onEnd: (event, ctx) => {
            setLastX(x.value);
            setLastY(y.value);
        },
        onActive: (event, ctx) => {
            console.log(event);
            const distance = Math.sqrt(Math.pow(event.translationX, 2) + Math.pow(event.translationY, 2));
            // 200pt = 90deg
            const angle = distance * Math.PI / 400;
            const newX = lastX + 180 * Math.atan(Math.tan(angle) * event.translationX / distance) / Math.PI;
            const newY = lastY + 180 * Math.atan(Math.tan(angle) * -event.translationY / distance) / Math.PI;
            console.log(distance, angle, newX, newY);
            x.value = newX;
            y.value = newY;
        }
    });
    const rotateStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotateY: `${x.value}deg`,
            }, {
                rotateX: `${y.value}deg`,
            }]
        }
    });
    const containerStyle = {
        width: size,
        height: size,
    };
    const reset = () => {
        x.value = withRepeat(withSpring(0), 2, true);
        y.value = withRepeat(withSpring(0), 2, true);
        setLastX(0);
        setLastY(0);
    }
    return (
        <View>
            <PanGestureHandler onGestureEvent={event}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                }}>
                    <Cube size={size}
                        style={rotateStyle}
                    />
                </View>
            </PanGestureHandler>
            <Button title="恢复" onPress={reset} />
        </View>
    )
}

export default {
    title: 'yes-framework/test/animated',
    component: AnimatedCube,
};

const Template = (args) => (
    <AnimatedCube {...args} />
);

const argTypes = {
}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    size: 150
};
