import React from 'react';
import BadgeText from '../../controls/BadgeText';
import StoryWrapper from '../StoryWrapper';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  }
})
export default {
  title: 'yes-framework/text/Badge',
  component: BadgeText,
};

const Template = (args) => (
  <StoryWrapper>
    <View style={styles.container}>
    <BadgeText {...args} />
    </View>
  </StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
  yigoid: 'score',
};
