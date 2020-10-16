import React from 'react';
import StoryWrapper from '../StoryWrapper';
import GridView from '../../controls/GridView';

export default {
  title: 'yes-framework/grid/GridView',
  component: GridView,
};

const Template = (args) => (
<StoryWrapper>
    <GridView {...args} />
</StoryWrapper>);

const argTypes = {
    
}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    primaryKey: 'title',
    secondKey: ['subTitle'],
    tertiaryKey: ['dict2'],
    useBodyScroll: true,
    rightActions: [{
        text: '显示',
        columnKey: 'aaa'
    }],
    leftActions: [{
        text: '明细',
        columnKey: 'aaa'
    }]
};

export const WithSelect = Template.bind({});
WithSelect.argTypes = argTypes;
WithSelect.args = {
    yigoid: 'grid1',
    primaryKey: 'title',
    secondKey: ['subTitle'],
    tertiaryKey: ['dict2'],
    useBodyScroll: false,
    style: {
        flex: 1,
    },
    leftElement: {
        type: 'element',
        elementType: 'GridSelect',
        elementProps: {
            yigoid: 'select'
        }
    }
};

export const WithNewButton= Template.bind({});
WithNewButton.argTypes = argTypes;
WithNewButton.args = {
    yigoid: 'grid1',
    primaryKey: 'title',
    secondKey: ['subTitle'],
    tertiaryKey: ['dict2'],
    useBodyScroll: true,
    leftElement: {
        type: 'element',
        elementType: 'GridSelect',
        elementProps: {
            yigoid: 'select'
        }
    },
    newElement: {
        type: 'element',
        elementType: 'NativeButton',
        elementProps: {
            title: "新增"
        }
    }
};

export const WithHeader= Template.bind({});
WithHeader.argTypes = argTypes;
WithHeader.args = {
    yigoid: 'grid1',
    primaryKey: 'title',
    secondKey: ['subTitle'],
    tertiaryKey: ['dict2'],
    useBodyScroll: true,
    showHead: true,
    headTitle: "Title",
    headExtra: {
        type: 'element',
        elementType: 'AwesomeFontIcon',
        elementProps: {
            name: 'star',
            size: 20,
            style: {
                color: 'red',
                paddingRight: 12,
            }
        }
    },
    leftElement: {
        type: 'element',
        elementType: 'GridSelect',
        elementProps: {
            yigoid: 'select'
        }
    }
}

export const WithRightElement = Template.bind({});
WithRightElement.argTypes = argTypes;
WithRightElement.args = {
    yigoid: 'grid1',
    primaryKey: 'title',
    secondKey: ['subTitle'],
    tertiaryKey: ['dict2'],
    rightElement: {
        type: 'element',
        elementType: 'ListComponents.ListImage',
        elementProps: {
            yigoid: 'img',
            style: {
                width: 60,
                height: 40,
            },
            containerStyle: {
                justifyContent: 'center',
                paddingRight: 10
            }
        }
    },
    useBodyScroll: true,
}

export const WithLeftElement = Template.bind({});
WithLeftElement.argTypes = argTypes;
WithLeftElement.args = {
    yigoid: 'grid1',
    primaryKey: 'title',
    secondKey: ['subTitle'],
    tertiaryKey: ['dict2'],
    rightElement: {
        type: 'element',
        elementType: 'ListComponents.ListImage',
        elementProps: {
            yigoid: 'img',
            style: {
                width: 40,
                height: 40,
                borderRadius: '50%',
            },
            containerStyle: {
                justifyContent: 'center',
                paddingRight: 10,
            }
        }
    },
    leftElement: {
        type: 'element',
        elementType: 'ListComponents.ListImage',
        elementProps: {
            yigoid: 'img',
            style: {
                width: 40,
                height: 40,
                borderRadius: 10,
            },
            containerStyle: {
                justifyContent: 'center',
                paddingRight: 12,
            }
        }
    },
    useBodyScroll: true,
}
