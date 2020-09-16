import React from 'react';
import Header from '../controls/Header';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import StoryContext from 'yes-comp-react-native-web/stories/StoryContext';

injectFont(fontAwesome, 'FontAwesome');

import AppWrapper from '../AppWrapper';
import { ProjectCfg } from '../config/index';
import control from '../config/control';

export default {
  title: 'yes-framework/Header',
  component: Header,
};

const Template = (args) => (
<AppWrapper
  control={control}
  projectCfg={ProjectCfg}
>
  <StoryContext>
    <Header {...args} />
  </StoryContext>
</AppWrapper>);

const argTypes = {
  titleMode: {
    description: 'Title模式flex-android,absolute-ios,使用自定义title控件不起作用',
    defaultValue: 'flex',
    control: {
      type: 'radio',
      options: ['flex', 'absolute']
    }
  },
  mode: {
    control: {
      type: 'radio',
      options: ['dark', 'light']
    }
  },
}
export const CanBack = Template.bind({});
CanBack.argTypes = argTypes;
CanBack.args = {
  titleMode: 'flex',
  canBack: true,
  title: "Title",
  headerStyle: {},
  titleStyle: {},
  textStyle: {},
  mode: 'dark',
};

export const WithoutBack = Template.bind({});
WithoutBack.args = {
  titleMode: 'flex',
  canBack: false,
  title: "Title",
  headerStyle: {},
  titleStyle: {},
  textStyle: {},
  mode: 'dark',
};

export const WithStyle = Template.bind({});
WithStyle.args = {
  titleMode: 'flex',
  canBack: false,
  title: "Title",
  headerStyle: { "boder": "none" },
  titleStyle: { "backgroundColor": "red", "flex": 1 },
  textStyle: { "color": "white" },
  mode: 'dark',
};
export const YIGOFormTitle = Template.bind({});
YIGOFormTitle.argTypes = argTypes;
YIGOFormTitle.args = {
  titleMode: 'flex',
  canBack: true,
  title: "Title",
  headerStyle: {},
  titleStyle: {},
  textStyle: {},
  mode: 'dark',
  titleElement: {
    type: 'element',
    elementType: 'FormTitle'
  }
};

