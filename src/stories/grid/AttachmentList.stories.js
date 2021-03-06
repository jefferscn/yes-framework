import React from 'react';
import StoryWrapper from '../StoryWrapper';
import { AttachmentList } from '../../export';

export default {
  title: 'yes-framework/grid/AttachmentList',
  component: AttachmentList,
};

const Template = (args) => (
<StoryWrapper>
    <AttachmentList {...args} />
</StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    style: {
      width: '100%',
    },
    fileName: 'img',
    filePath: 'img',
    yigoAttachment: false,
    needThumbnail: false,
    yigoid: 'grid1',
};
