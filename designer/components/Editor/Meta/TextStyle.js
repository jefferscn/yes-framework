const editor = [
    {
        type: 'Color',
        key: 'color',
        caption: '前景色'
    },
    {
        type: 'Combobox',
        key: 'fontSize',
        caption: '字体',
        items: [
            {
                key: '16',
                text: '16',
            }, {
                key: '20',
                text: '20',
            }, {
                key: '22',
                text: '22',
            }, {
                key: '24',
                text: '24',
            },{
                key: '26',
                text: '26',
            },{
                key: '30',
                text: '30',
            },{
                key: '32',
                text: '32',
            }
        ],
    },
    {
        type: 'Combobox',
        key: 'flexDirection',
        caption: '弹性布局方向',
        items: [
            {
                key: 'row',
                text: '行',
            }, {
                key: 'column',
                text: '列',
            }
        ],
    },
    {
        type: 'Combobox',
        key: 'alignItems',
        caption: '主轴布局',
        items: [
            {
                key: 'flex-start',
                text: '居左',
            }, {
                key: 'center',
                text: '居中',
            }, {
                key: 'flex-end',
                text: '居右',
            }
        ],
    },
    {
        type: 'Combobox',
        key: 'justiyContent',
        caption: '辅轴布局',
        items: [
            {
                key: 'flex-start',
                text: '居左',
            }, {
                key: 'center',
                text: '居中',
            }, {
                key: 'flex-end',
                text: '居右',
            }
        ],
    }
];

const defaultValue = {

};

export default {
    editor,
    defaultValue,
}
