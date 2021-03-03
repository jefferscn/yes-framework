import React from 'react';
import StoryWrapper from '../StoryWrapper';
import { TextList } from 'yes-framework/export';

export default {
    title: 'yes-framework/container/TextList',
    component: TextList,
};

const Template = (args) => (
    <StoryWrapper>
        <TextList {...args} />
    </StoryWrapper>);

const argTypes = {

}

export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    template: '${caption}:${displayValue}',
    style: {
        paddingLeft: 12,
        paddingTop: 8,
        background: 'white',
    },
    rowStyle: {
        color: 'red',
    },
    items: [
        'map1',
        'text1',
        'dict1',
        'dict2',
        'combobox1',
        'date1',
    ]
};
