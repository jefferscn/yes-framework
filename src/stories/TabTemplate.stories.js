import React from 'react';
import TabTemplate from '../template/TabTemplate';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import StoryContext from 'yes-comp-react-native-web/stories/StoryContext';
import 'antd-mobile/dist/antd-mobile.css';
import { ControlMappings } from 'yes-comp-react-native-web';
import StoryWrapper from './StoryWrapper';

injectFont(fontAwesome, 'FontAwesome');

import AppWrapper from '../AppWrapper';
import { ProjectCfg } from '../config/index';
import control from '../config/control';

export default {
  title: 'yes-framework/TabTemplate',
  component: TabTemplate,
};

const Template = (args) => (
  // <AppWrapper
  //   control={control}
  //   projectCfg={ProjectCfg}
  // >
  //   <StoryContext controlMapping={ControlMappings.defaultControlMapping}>
  <StoryWrapper>
      <TabTemplate {...args} />
  </StoryWrapper>
  //   </StoryContext>
  // </AppWrapper>);
)
const argTypes = {
}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
  tabs: [{
    title: "页面一",
    items: [
      {
        type: 'element',
        elementType: "Card",
        elementProps: {
          "collapseable": false,
          "headIcon": "",
          "title": "基本信息",
          "content": {
            "type": "element",
            "elementType": "CellLayoutTemplate",
            "elementProps": {
              "textStyle": {
                "textAlign": "right",
                "justifyContent": "flex-end"
              },
              "titleStyle": {
                "justifyContent": "flex-start",
                "fontSize": "15",
                "color": "#666666"
              },
              "layoutStyle": {
                "justifyContent": "flex-end"
              },
              "items": [
                "dict1",
                "text1"
              ]
            }
          }
        }
      }
    ]
  }, {
    title: "页面二",
    items: [{
      type: 'element',
      elementType: "AutoTemplate",
      elementProps: {
        head: null,
        foot: {
            type: 'element',
            elementType: "SegementToolbar",
            elementProps: {
            }
        },
        items: [
          {
            type: 'element',
            elementType: "Card",
            elementProps: {
              "collapseable": false,
              "headIcon": "",
              "title": "基本信息",
              "content": {
                "type": "element",
                "elementType": "CellLayoutTemplate",
                "elementProps": {
                  "textStyle": {
                    "textAlign": "right",
                    "justifyContent": "flex-end"
                  },
                  "titleStyle": {
                    "justifyContent": "flex-start",
                    "fontSize": "15",
                    "color": "#666666"
                  },
                  "layoutStyle": {
                    "justifyContent": "flex-end"
                  },
                  "items": [
                    "dict1",
                    "text1"
                  ]
                }
              }
            }
          }
        ]
      }
    }]
  }]
};
