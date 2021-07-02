import React from 'react';
import StoryWrapper from '../StoryWrapper';
import { ImageCarouselGrid } from '../../export';

export default {
  title: 'yes-framework/grid/CarouselGrid',
  component: ImageCarouselGrid,
};

const Template = (args) => (
<StoryWrapper>
    <ImageCarouselGrid {...args} />
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
    style: {
        height: 200,
        witdh: '100%',
    }
};
