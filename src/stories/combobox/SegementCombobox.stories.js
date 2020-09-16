import React from 'react';
import SegementCombobox from '../../controls/SegementCombobox';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import StoryContext from 'yes-comp-react-native-web/stories/StoryContext';
import 'antd-mobile/dist/antd-mobile.css';

injectFont(fontAwesome, 'FontAwesome');

import AppWrapper from '../../AppWrapper';
import { ProjectCfg } from '../../config/index';
import control from '../../config/control';

export default {
  title: 'yes-framework/combobox/SegementCombobox',
  component: SegementCombobox,
};

const Template = (args) => (
<AppWrapper
  control={control}
  projectCfg={ProjectCfg}
>
  <StoryContext>
    <SegementCombobox {...args} />
  </StoryContext>
</AppWrapper>);

const argTypes = {

}

export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'combobox1',
};
