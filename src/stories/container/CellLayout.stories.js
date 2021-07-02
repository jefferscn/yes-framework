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
    labelAlign: {
        description: 'Label横向位置',
        control: {
            type: 'radio',
            options: ['left', 'middle', 'right'],
        },
        defaultValue: 'left',
    },
    labelVAlign: {
        description: 'Label纵向位置',
        control: {
            type: 'radio',
            options: ['top', 'middle', 'bottom'],
        },
        defaultValue: 'middle',
    },
    contentAlign: {
        description: '控件横向位置',
        control: {
            type: 'radio',
            options: ['left', 'middle', 'right'],
        }
    },
    style: {
        description: '控件样式(最外层)',
        control: {
            type: 'object'
        }
    },
    items: {
        description: '行内容',
        control: {
            type: 'object'
        }
    }
}

export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    useBodyScroll: false,
    style: {
        flex: 1,
        width: '100%',
    },
    titleStyle: {
        color: 'red',
    },
    labelAlign: 'left',
    contentAlign: 'right',
    items: [
        {
            type: 'element',
            elementType: 'MapText',
            elementProps: {
                yigoid: 'map1',
                style: {
                    height: 200
                }
            }
        },
        'map1',
        {
            type: 'element',
            elementType: 'GpsText',
            elementProps: {
                yigoid: 'text1',
                style: {
                    flex: 1
                }
            }
        },
        'text1',
        {
            key: 'text1',
            layoutType: 'control',
            layoutStyles: {
                paddingRight: 12,
            }
        },
        {
            key: 'text1',
            caption: '',
            placeholder: '',
        },
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
        {
            type: 'element',
            elementType: 'TreeDict',
            elementProps: {
                yigoid: 'dict2',
            }
        },
        'image1',
        {
            key: 'image1',
            imageStyle: {
                backgroundColor: 'whitesmoke',
            }
        },
        'combobox1',
        {
            type: 'element',
            elementType: 'Rating',
            elementProps: {
                yigoid: 'score',
            }
        }, {
            type: 'element',
            elementType: 'Stepper',
            elementProps: {
                yigoid: 'score',
            }
        }, 'date1',
        {
            key: 'date1',
            onlyDate: true,
        }
    ]
};
