import React from 'react';
import SegementToolbar from '../controls/SegementToolbar';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import StoryContext from 'yes-comp-react-native-web/stories/StoryContext';
import 'antd-mobile/dist/antd-mobile.css';
import { View, StyleSheet } from 'react-native';

injectFont(fontAwesome, 'FontAwesome');

import AppWrapper from '../AppWrapper';
import { ProjectCfg } from '../config/index';
import control from '../config/control';

export default {
  title: 'yes-framework/SegementToolbar',
  component: SegementTollbar,
};

const styles = StyleSheet.create({
  page: {
    width: 375,
    height: 812,
  }
});

const Template = (args) => (
<AppWrapper
  control={control}
  projectCfg={ProjectCfg}
>
  <StoryContext>
    <View style={styles.page}>
      <SegementToolbar {...args} />
    </View>
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
