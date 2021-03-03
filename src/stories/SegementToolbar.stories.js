import React from 'react';
import { SegementToolbar } from '../export';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import StoryContext from 'yes-comp-react-native-web/stories/StoryContext';
import 'antd-mobile/dist/antd-mobile.css';

injectFont(fontAwesome, 'FontAwesome');

import AppWrapper from '../AppWrapper';
import { ProjectCfg } from '../config/index';
import control from '../config/control';

export default {
  title: 'yes-framework/SegementToolbar',
  component: SegementToolbar,
};

const Template = (args) => (
  <AppWrapper
    control={control}
    projectCfg={ProjectCfg}
  >
    <StoryContext>
      <SegementToolbar {...args} />
    </StoryContext>
  </AppWrapper>);

const argTypes = {
  captionMapping: {
    description: '映射表，设计的Caption->App的Caption'
  },
  ignoreItems: {
    description: '强制不显示的项目'
  }
}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
  ignoreItems: [],
  captionMapping: {}
};
