import React from 'react';
import StoryWrapper from '../StoryWrapper';
import { SectionList } from '../../export';

export default {
  title: 'yes-framework/grid/SectionList',
  component: SectionList,
};

const Template = (args) => (
<StoryWrapper>
    <SectionList {...args} />
</StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    sectionColumn: 'date',
    mapFun: "date",
    storybook: true,
    primaryKey: 'title',
    secondKey: ['subTitle'],
    tertiaryKey: ['dict2'],
    useBodyScroll: true,
    rightActions: [{
        text: '显示',
        columnKey: 'aaa'
    }],
    leftActions: [{
        text: '明细',
        columnKey: 'aaa'
    }]
};
