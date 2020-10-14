import React from 'react';
import MapText from '../../controls/MapText';
import StoryWrapper from '../StoryWrapper';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  }
})
export default {
  title: 'yes-framework/text/MapText',
  component: MapText,
};

const Template = (args) => (
  <StoryWrapper>
    <View style={styles.container}>
    <MapText {...args} />
    </View>
  </StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
  yigoid: 'map1',
  style: {
    flex: 1
  }
};
