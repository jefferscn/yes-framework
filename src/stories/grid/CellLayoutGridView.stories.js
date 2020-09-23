import React from 'react';
import StoryWrapper from '../StoryWrapper';
import CellLayoutGridView from '../../controls/CellLayoutGridView';

export default {
  title: 'yes-framework/grid/CellLayout',
  component: CellLayoutGridView,
};

const Template = (args) => (
<StoryWrapper>
    <CellLayoutGridView {...args} />
</StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    useBodyScroll: false,
    style: {
        flex:1,
        width: '100%',
    },
    items: [
        'title',
        'subTitle'
    ]
};
