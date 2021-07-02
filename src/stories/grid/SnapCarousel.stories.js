import React from 'react';
import StoryWrapper from '../StoryWrapper';
import { SnapCarousel } from '../../export';

export default {
  title: 'yes-framework/grid/SnapCarousel',
  component: SnapCarousel,
};

const Template = (args) => (
<StoryWrapper>
    <SnapCarousel {...args} />
</StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    needThumbnail: false,
    yigoid: 'grid1',
    imageColumn: 'img',
    height: 200,
    textColumn: 'title',
    sliderWidth: 400,
    itemWidth: 440,
    style: {
        height: 200,
        witdh: '100%',
    }
};
