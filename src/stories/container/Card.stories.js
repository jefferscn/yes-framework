import React from 'react';
import StoryWrapper from '../StoryWrapper';
import Card from '../../controls/Card';

export default {
  title: 'yes-framework/container/Card',
  component: Card,
};

const Template = (args) => (
<StoryWrapper>
    <Card {...args} />
</StoryWrapper>);

const argTypes = {

}

export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    title: '卡片演示',
    content: {
      type: 'element',
      elementType: 'CellLayoutTemplate',
      elementProps: {
        items: ['dict1', 'number1', 'image1']
      }
    },
    headIcon: {
      type: 'element',
      elementType: 'AwesomeFontIcon',
      elementProps: {
        name: 'star',
      }
    },
    bookmark: 'text1',
    extra: {
      type: 'element',
      elementType: 'AwesomeFontIcon',
      elementProps: {
        name: 'star',
        style: {
          flex: 1,
          textAlign: 'right',
        }
      }
    }

};
