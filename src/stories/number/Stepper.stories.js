import React from 'react';
import { Stepper } from '../../export';
import StoryWrapper from '../StoryWrapper';

export default {
  title: 'yes-framework/number/Stepper',
  component: Stepper,
};

const Template = (args) => (
  <StoryWrapper>
    <Stepper {...args} />
  </StoryWrapper>);

const argTypes = {
  step: {
    description: '步长',
    defaultValue: 1,
  },
  min: {
    description: '最小数字',
    defaultValue: 0,
  },
  max: {
    description: '最大数字',
    defaultValue: 5,
  },
}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
  yigoid: 'score',
  min: 0,
  max: 100,
  step :1,
  showNumber: true,
};
