var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import { GridRow } from 'yes-framework/export';
import StoryWrapper from '../StoryWrapper';
export default {
    title: 'yes-framework/gridrow/GridRow',
    component: GridRow,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(GridRow, __assign({}, args)))); };
var argTypes = {};
export var Base = Template.bind({});
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
    "content": {
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
export var Simple = Template.bind({});
Simple.argTypes = argTypes;
Simple.args = {
    "gridId": 'grid1',
    "rowIndex": 0,
    "showSeperator": false,
    "contentStyle": {
        paddingTop: 4,
        paddingBottom: 4,
    },
    "content": {
        "type": "element",
        "elementType": "FlexBox",
        "elementProps": {
            "direction": 'row',
            items: [
                {
                    "type": "element",
                    "elementType": "Avatar",
                    "elementProps": {
                        yigoid: "img",
                        size: 30,
                    }
                },
                {
                    "type": "element",
                    "elementType": "Seperator",
                    "elementProps": {}
                },
                {
                    "type": "element",
                    "elementType": "ListText",
                    "elementProps": {
                        yigoid: "title",
                        style: {
                            flex: 1,
                            fontSize: 16,
                            fontFamily: 'PingFangSC-Medium, PingFang SC',
                            fontWeight: 500,
                            color: '#333333',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            display: 'flex',
                        }
                    }
                }, {
                    "type": "element",
                    "elementType": "ListText",
                    "elementProps": {
                        yigoid: "date",
                        style: {
                            fontSize: 12,
                            fontFamily: 'PingFangSC-Medium, PingFang SC',
                            fontWeight: 200,
                            color: '#333333',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            display: 'flex',
                            width: 70,
                        }
                    }
                }, {
                    "type": "element",
                    "elementType": "HasDetailSign",
                    "elementProps": {}
                }
            ]
        }
    }
};
export var News = Template.bind({});
News.argTypes = argTypes;
News.args = {
    "gridId": 'grid1',
    "rowIndex": 0,
    "showSeperator": false,
    seperatorStyle: {
        height: 8,
        backgroundColor: '#F8F8F8',
    },
    headStyle: {
        height: 40,
    },
    footStyle: {
        flex: 1,
    },
    "headLeft": [
        {
            "type": "element",
            "elementType": "Avatar",
            "elementProps": {
                yigoid: "img",
                size: 30,
            }
        }, {
            "type": "element",
            "elementType": "Seperator",
            "elementProps": {}
        },
        {
            "type": "element",
            "elementType": "FlexBox",
            "elementProps": {
                items: [{
                        "type": "element",
                        "elementType": "ListText",
                        "elementProps": {
                            yigoid: "title",
                            style: {
                                fontSize: 16,
                                fontFamily: 'PingFangSC-Medium, PingFang SC',
                                fontWeight: 500,
                                color: '#333333',
                            }
                        }
                    }, {
                        "type": "element",
                        "elementType": "ListText",
                        "elementProps": {
                            yigoid: "subTitle",
                            style: {
                                fontSize: 12,
                                fontFamily: 'PingFangSC-Medium, PingFang SC',
                                fontWeight: 500,
                                color: 'lightgray',
                            }
                        }
                    }]
            }
        }
    ],
    "headRight": [{
            "type": "element",
            "elementType": "IconButton",
            "elementProps": {
                yigoid: "score",
                title: '关注',
                textStyle: {
                    color: 'red',
                    fontSize: 12,
                },
                style: {
                    maxWidth: 50,
                },
            }
        }],
    "content": {
        "type": "element",
        "elementType": "FlexBox",
        "elementProps": {
            items: [{
                    "type": "element",
                    "elementType": "LongTextWithMore",
                    "elementProps": {
                        yigoid: "subTitle",
                    }
                },
                {
                    "type": "element",
                    "elementType": "ListComponents.ListImage",
                    "elementProps": {
                        yigoid: "img",
                        style: {
                            height: 200,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }
                    }
                },
            ]
        }
    },
    "footRight": [
        {
            "type": "element",
            "elementType": "IconButton",
            "elementProps": {
                yigoid: "score",
                icon: 'thumbs-o-up',
                icon: {
                    "type": "element",
                    "elementType": "CheckboxIcon",
                    "elementProps": {
                        yigoid: 'select',
                        trueIcon: 'thumbs-o-up',
                        falseIcon: 'thumbs-o-up',
                        trueStyle: {
                            color: 'red',
                        },
                    }
                },
                title: {
                    "type": "element",
                    "elementType": "ListText",
                    "elementProps": {
                        "yigoid": "score",
                        "style": {
                            paddingLeft: 6,
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 100,
                        }
                    }
                },
            }
        }, {
            "type": "element",
            "elementType": "IconButton",
            "elementProps": {
                yigoid: "score",
                icon: "comment-o",
                iconStyle: {
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 100,
                },
                title: {
                    "type": "element",
                    "elementType": "ListText",
                    "elementProps": {
                        "yigoid": "score",
                        "style": {
                            paddingLeft: 6,
                            color: 'black',
                            fontSize: 12,
                            fontWeight: 100,
                        }
                    }
                },
            }
        }, {
            "type": "element",
            "elementType": "IconButton",
            "elementProps": {
                yigoid: "score",
                title: '分享',
                icon: 'share',
                iconStyle: {
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 100,
                },
                textStyle: {
                    paddingLeft: 6,
                    color: 'black',
                    fontSize: 12,
                    fontWeight: 100,
                },
            }
        }
    ]
};
