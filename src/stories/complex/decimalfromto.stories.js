import React from 'react';
import DecimalFromTo from '../../controls/DecimalFromTo';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import StoryContext from 'yes-comp-react-native-web/stories/StoryContext';
import 'antd-mobile/dist/antd-mobile.css';

injectFont(fontAwesome, 'FontAwesome');

import AppWrapper from '../../AppWrapper';
import { ProjectCfg } from '../../config/index';
import control from '../../config/control';

export default {
  title: 'yes-framework/complex/decimalfromto',
  component: DecimalFromTo,
};

const Template = (args) => (
<AppWrapper
  control={control}
  projectCfg={ProjectCfg}
>
  <StoryContext>
    <DecimalFromTo {...args} />
  </StoryContext>
</AppWrapper>);

const argTypes = {

}

export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    fromId: 'score',
    toId: 'score',
};
