import React from 'react';
import BarcodeScannerText from '../../controls/BarcodeScannerText';
import StoryWrapper from '../StoryWrapper';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
    }
})
export default {
    title: 'yes-framework/text/QRCodeScanner',
    component: BarcodeScannerText,
};

const Template = (args) => (
    <StoryWrapper>
        <View style={styles.container}>
            <BarcodeScannerText {...args} />
        </View>
    </StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'text1',
};
