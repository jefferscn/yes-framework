import React from 'react';
import ListTemplate from '../template/ListTemplate';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import 'antd-mobile/dist/antd-mobile.css';
import StoryWrapper from './StoryWrapper';

injectFont(fontAwesome, 'FontAwesome');

export default {
  title: 'yes-framework/ListTemplate',
  component: ListTemplate,
};

const Template = (args) => (
  <StoryWrapper>
    <ListTemplate {...args} />
  </StoryWrapper>
)
const argTypes = {
}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
  "head": {
    "type": "element",
    "elementType": "Header",
    "elementProps": {
      "canBack": true,
      "titleElement": {
        "type": "element",
        "elementType": "FormTitle",
        "elementProps": {
          "containerStyle": {
            "alignItems": "center",
            "justifyContent": "center"
          }
        }
      }
    }
  },
  filterBlock: {
    "type": "element",
    "elementType": "FilterBlock",
    "elementProps": {
      "filterItems": [
        {
          "type": "element",
          "elementType": "SegementCombobox",
          "elementProps": {
            "yigoid": "combobox1",
            "style": {
              "flex": 1
            },
          }
        }
      ],
      queryButton: 'button1',
      hasMore: true,
      "moreItems": [
        "dict1"
      ]
    }
  },
  list: {
    "type": "element",
    "elementType": "GridView",
    "elementProps": {
      yigoid: 'grid1',
      "primaryKey": "title",
      "secondKey": ["subTitle"],
      useBodyScroll: false,
      style: {
        flex: 1,
      }
    }
  }
};
