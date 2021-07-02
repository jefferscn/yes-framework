import React from 'react';
import StoryWrapper from '../StoryWrapper';
import { Searchbar } from 'yes-framework/export';

export default {
  title: 'yes-framework/complex/Searchbar',
  component: Searchbar,
};

const Template = (args) => (
<StoryWrapper>
    <Searchbar {...args} />
</StoryWrapper>);

const argTypes = {

}

export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    textField: 'text1',
    searchButton: 'button1',
    placeholder: '',
};
