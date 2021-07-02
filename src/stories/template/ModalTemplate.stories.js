import React from 'react';
import ModalTemplate from '../../template/ModalTemplate';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import 'antd-mobile/dist/antd-mobile.css';
import StoryWrapper from '../StoryWrapper';

injectFont(fontAwesome, 'FontAwesome');

export default {
  title: 'yes-framework/template/ModalTemplate',
  component: ModalTemplate,
};

const Template = (args) => (
  <StoryWrapper>
    <ModalTemplate {...args} />
  </StoryWrapper>
)
const argTypes = {
  popup: {
    description: '是否popup模式',
    defaultValue: true,
  },
}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    formStatus: 'ok',
    popup: true,
    content: {
        type: "element",
        elementType: "CellLayoutTemplate",
        elementProps: {
            items: ['dict1', 'combbox1']
        }
    },
    actions: [{
        text: '确定',
        yigoid: 'button1',
    },{
        text: '取消',
        yigoid: 'button1',
    }]
};
