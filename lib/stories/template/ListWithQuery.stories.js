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
import ListTemplate from '../../template/ListTemplate/ListWithQuery';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import 'antd-mobile/dist/antd-mobile.css';
import StoryWrapper from '../StoryWrapper';
injectFont(fontAwesome, 'FontAwesome');
export default {
    title: 'yes-framework/template/ListWithQuery',
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
    queryItems: [{
            text: '单据编号',
            content: {
                "type": "element",
                "elementType": "Text",
                "elementProps": {
                    "yigoid": 'map1',
                    "clearButtonMode": true,
                    "scanMode": true,
                    textStyles: {
                        paddingLeft: 24,
                        paddingRight: 12,
                        borderWidth: 1,
                        borderColor: 'lightgray',
                        borderRadius: 20,
                    },
                    layoutStyles: {
                        paddingLeft: 12,
                        marginRight: 12,
                        paddingTop: 8,
                        paddingBottom: 8,
                    }
                }
            }
        }, {
            text: '单据类型',
            content: {
                "type": "element",
                "elementType": "QueryContainer",
                "elementProps": {
                    "supportClear": true,
                    "clearControls": ['BillType_NODB4Other'],
                    "content": {
                        "type": "element",
                        "elementType": "PopoverCombobox",
                        "elementProps": {
                            "yigoid": 'combobox1',
                            inline: true,
                        }
                    }
                }
            }
        }, {
            text: '制单人',
            content: {
                "type": "element",
                "elementType": "QueryContainer",
                "elementProps": {
                    "supportClear": true,
                    "clearControls": ['Creator_NODB4Other'],
                    "content": {
                        "type": "element",
                        "elementType": "ChainDict",
                        "elementProps": {
                            "yigoid": 'dict1',
                            inline: true,
                            hideTitle: true,
                        }
                    }
                }
            }
        }],
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
export var withGridSelect = Template.bind({});
withGridSelect.args = {
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
    "foot": {
        "type": "element",
        "elementType": "GridBatchOperate",
        "elementProps": {
            "yigoid": "grid1",
            "optKey": "BatchAudit",
            "autoHide": false,
            "supportSelectAll": true,
            "title": "审批"
        }
    },
    queryItems: [{
            text: '单据编号',
            content: {
                "type": "element",
                "elementType": "Text",
                "elementProps": {
                    "yigoid": 'map1',
                    "clearButtonMode": true,
                    "scanMode": true,
                    textStyles: {
                        paddingLeft: 24,
                        paddingRight: 12,
                        borderWidth: 1,
                        borderColor: 'lightgray',
                        borderRadius: 20,
                    },
                    layoutStyles: {
                        paddingLeft: 12,
                        marginRight: 12,
                        paddingTop: 8,
                        paddingBottom: 8,
                    }
                }
            }
        }, {
            text: '单据类型',
            content: {
                "type": "element",
                "elementType": "QueryContainer",
                "elementProps": {
                    "supportClear": true,
                    "clearControls": ['BillType_NODB4Other'],
                    "content": {
                        "type": "element",
                        "elementType": "PopoverCombobox",
                        "elementProps": {
                            "yigoid": 'combobox1',
                            inline: true,
                        }
                    }
                }
            }
        }, {
            text: '制单人',
            content: {
                "type": "element",
                "elementType": "QueryContainer",
                "elementProps": {
                    "supportClear": true,
                    "clearControls": ['Creator_NODB4Other'],
                    "content": {
                        "type": "element",
                        "elementType": "ChainDict",
                        "elementProps": {
                            "yigoid": 'dict1',
                            inline: true,
                            hideTitle: true,
                        }
                    }
                }
            }
        }],
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
