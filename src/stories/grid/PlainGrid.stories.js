import React from 'react';
import PlainGrid from '../../controls/PlainGrid';
import StoryWrapper from '../StoryWrapper';

export default {
    title: 'yes-framework/grid/PlainGrid',
    component: PlainGrid,
};

const Template = (args) => (
    <StoryWrapper>
        <PlainGrid {...args} />
    </StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    cellWidth: 100,
};
