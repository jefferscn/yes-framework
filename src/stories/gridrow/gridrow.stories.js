import React from 'react';
import { GridRow } from 'yes-framework/export';
import StoryWrapper from '../StoryWrapper';

export default {
    title: 'yes-framework/gridrow/GridRow',
    component: GridRow,
};

const Template = (args) => (
    <StoryWrapper>
        <GridRow {...args} />
    </StoryWrapper>);

const argTypes = {

}

export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    "gridId": 'grid1',
    "rowIndex": 0,
    "showSeperator": true,
    seperatorStyle: {
        height: 8,
        backgroundColor: '#F8F8F8',
    },
    headStyle: {
        height: 40,
    },
    footStyle: {
        borderTopWidth: 1,
        borderTopColor: 'lightgrey'
    },
    "headLeft": [
        {
            "type": "element",
            "elementType": "GridSelect",
            "elementProps": {
                yigoid: "isSelect",
                onlyShow: false,
                size: 25,
                color: '#008CD7',
                style: {
                    width: 30,
                }
            }
        },
        {
            "type": "element",
            "elementType": "Image",
            "elementProps": {
                yigoid: "img",
                layoutStyles: {
                    width: 50,
                    height: 50,
                }
            }
        },
        {
            "type": "element",
            "elementType": "ListText",
            "elementProps": {
                yigoid: "title",
                style: {
                    fontSize: 17.5,
                    fontFamily: 'PingFangSC-Medium, PingFang SC',
                    fontWeight: 500,
                    color: '#333333',
                }
            }
        }
    ],
    "headRight": [{
        "type": "element",
        "elementType": "Rating",
        "elementProps": {
            yigoid: "score",
            style: {
                color: '#666666',
                fontSize: 10,
            }
        }
    }],
    "content":
    {
        "type": "element",
        "elementType": "FlexBox",
        "elementProps": {
            direction: 'row',
            items: [{
                "type": "element",
                "elementType": "Image",
                "elementProps": {
                    yigoid: "img",
                    layoutStyles: {
                        width: 100,
                        height: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }
            },
            {
                "type": "element",
                "elementType": "TextList",
                "elementProps": {
                    template: '${caption}:${displayValue}',
                    style: {
                        paddingLeft: 12,
                        paddingTop: 12,
                        flex: 1,
                    },
                    items: [
                        "title",
                        "subTitle",
                        "dict2",
                    ]
                }
            },
            {
                "type": "element",
                "elementType": "ListText",
                "elementProps": {
                    yigoid: "date",
                    style: {
                        fontSize: 12.5,
                        fontFamily: 'PingFangSC-Medium, PingFang SC',
                        fontWeight: 500,
                        color: '#333333',
                        paddingRight: 12,
                        alignItems: 'center',
                        display: 'flex',
                    }
                }
            }
            ]
        }
    },
    "footLeft": [
        {
            "type": "element",
            "elementType": "Rating",
            "elementProps": {
                yigoid: "score",
                style: {
                    color: '#666666',
                    fontSize: 10,
                }
            }
        }
    ],
    "footRight": [
        {
            "type": "element",
            "elementType": "SegementButtons",
            "elementProps": {
                containerStyle: {
                    width: 120,
                    height: 36,
                },
                items: [{
                    key: 'title',
                    text: '驳回'
                }, {
                    key: 'title',
                    text: '同意'
                }]
            }
        }
    ]
};
