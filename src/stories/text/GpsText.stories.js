import React from 'react';
import { GpsText } from '../../export';
import StoryWrapper from '../StoryWrapper';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    }
})
export default {
    title: 'yes-framework/text/GpsText',
    component: GpsText,
};

const Template = (args) => (
    <StoryWrapper>
        <View style={styles.container}>
            <GpsText {...args} />
        </View>
    </StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'text1',
    style: {
        flex: 1
    },
    autoLocation: true,
};
