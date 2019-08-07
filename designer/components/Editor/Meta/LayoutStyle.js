const editor = [
    {
        type: 'Color',
        key: 'backgroundColor',
        caption: '背景色'
    },
    {
        type: 'Combobox',
        key: 'flex',
        caption: '弹性布局系数',
        items: [
            {
                key: '1',
                text: '1',
            }, {
                key: '2',
                text: '2',
            }, {
                key: '3',
                text: '3',
            }, {
                key: '4',
                text: '4',
            },{
                key: '5',
                text: '5',
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
