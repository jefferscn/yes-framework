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
import StoryWrapper from '../StoryWrapper';
import { GridView, ListText } from '../../export';
import { View } from 'react-native';
import { GridRowWrap } from 'yes-intf';
var RowView = GridRowWrap(function (_a) {
    var rowIndex = _a.rowIndex, style = _a.style;
    var bkColor = {
        backgroundColor: rowIndex % 2 ? 'white' : 'gray',
    };
    return React.createElement(View, { style: [style, bkColor] },
        React.createElement(ListText, { yigoid: "title" }));
});
export default {
    title: 'yes-framework/grid/GridView',
    component: GridView,
};
var Template = function (args) { return (React.createElement(StoryWrapper, null,
    React.createElement(GridView, __assign({}, args)))); };
var data = [];
var argTypes = {};
export var Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    primaryKey: 'title',
    secondKey: ['subTitle'],
    tertiaryKey: ['dict2'],
    useBodyScroll: true,
    rowHeight: 76,
    keyField: 'id',
    RowElement: React.createElement(RowView, { style: { height: 76 } }),
    rightActions: [{
            text: '显示',
            columnKey: 'aaa'
        }],
    leftActions: [{
            text: '明细',
            columnKey: 'aaa'
        }]
};
export var WithSelect = Template.bind({});
WithSelect.argTypes = argTypes;
WithSelect.args = {
    yigoid: 'grid1',
    primaryKey: 'title',
    secondKey: ['subTitle'],
    tertiaryKey: ['dict2'],
    keyField: 'id',
    useBodyScroll: false,
    style: {
        flex: 1,
    },
    rowHeight: 76,
    removeable: false,
    clickMode: 'select',
    leftElement: {
        type: 'element',
        elementType: 'GridSelect',
        elementProps: {
            yigoid: 'select'
        }
    }
};
export var WithNewButton = Template.bind({});
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
export var WithHeader = Template.bind({});
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
};
export var WithRightElement = Template.bind({});
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
};
export var WithLeftElement = Template.bind({});
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
};
