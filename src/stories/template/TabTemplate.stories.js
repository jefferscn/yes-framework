import React from 'react';
import TabTemplate from '../../template/TabTemplate';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import 'antd-mobile/dist/antd-mobile.css';
import StoryWrapper from '../StoryWrapper';

injectFont(fontAwesome, 'FontAwesome');

export default {
  title: 'yes-framework/template/TabTemplate',
  component: TabTemplate,
};

const Template = (args) => (
  <StoryWrapper>
      <TabTemplate {...args} />
  </StoryWrapper>
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
