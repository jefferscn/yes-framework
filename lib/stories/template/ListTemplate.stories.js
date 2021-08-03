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
import ListTemplate from '../../template/ListTemplate';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import 'antd-mobile/dist/antd-mobile.css';
import StoryWrapper from '../StoryWrapper';
injectFont(fontAwesome, 'FontAwesome');
export default {
    title: 'yes-framework/template/ListTemplate',
    component: ListTemplate,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(ListTemplate, __assign({}, args)))); };
var argTypes = {};
export var Base = Template.bind({});
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
