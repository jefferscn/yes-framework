import React from 'react';
import Rating from '../../controls/Rating';
import StoryWrapper from '../StoryWrapper';

export default {
  title: 'yes-framework/number/Rating',
  component: Rating,
};

const Template = (args) => (
  <StoryWrapper>
      <Rating {...args} />
  </StoryWrapper>);

const argTypes = {
  fractions: {
    description: '一个星的可操作数',
    defaultValue: 1
  },
  step: {
    description: '一个星代表的数量',
    defaultValue: 1,
  },
  start: {
    description: '最小数字',
    defaultValue: 0,
  },
  end: {
    description: '最大数字',
    defaultValue: 5,
  },
}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
  yigoid: 'score',
  fractions: 1,
  step: 1,
  start: 0,
  end: 5,
};
