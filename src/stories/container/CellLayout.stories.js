import React from 'react';
import StoryWrapper from '../StoryWrapper';
import CellLayoutTemplate from '../../template/TabTemplate/CellLayoutTemplate';

export default {
  title: 'yes-framework/container/CellLayout',
  component: CellLayoutTemplate,
};

const Template = (args) => (
<StoryWrapper>
    <CellLayoutTemplate {...args} />
</StoryWrapper>);

const argTypes = {

}

export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    useBodyScroll: false,
    style: {
        flex:1,
        width: '100%',
    },
    titleStyle: {
        color: 'red',
    },
    labelAlign: 'left',
    contentAlign: 'right',
    items: [
        'text1',
        {
            type: 'element',
            elementType: 'BarcodeScannerText',
            elementProps: {
                yigoid: 'text1',
                style: {
                    flex: 1
                }
            }
        },
        {
            'key': 'text1',
            'textStyle': {
                'color': 'red'
            }
        },
        'dict1',
        'image1',
        'combobox1',
        {
            type: 'element',
            elementType: 'Rating',
            elementProps: {
                yigoid: 'score',
            }
        }
    ]
};
