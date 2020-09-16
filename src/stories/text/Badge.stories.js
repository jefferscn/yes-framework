import React from 'react';
import BadgeText from '../../controls/BadgeText';
import StoryWrapper from '../StoryWrapper';

export default {
  title: 'yes-framework/text/Badge',
  component: BadgeText,
};

const Template = (args) => (
  <StoryWrapper>
    <BadgeText {...args} />
  </StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
  yigoid: 'score',
};
