const data = {
    supportControlTypes : ['listview','grid','texteditor','datepicker','toolbar','checkbox','button','combobox', 'dict', 'radiobutton'],//当前支持的yigo控件
    defaultControlMapping : {//每个yigo控件对应的默认渲染控件
        'texteditor': 'DefaultTextEditor',
        'listview': 'DefaultListView',
        'grid': 'DefaultGridView',
        'button': 'DefaultButton',
        'datepicker': 'DefaultDatePicker',
        'toolbar': 'SegementToolbar',
        'checkbox': 'Switch',
        'dict': 'DefaultDict',
        'combobox': 'DefaultCombobox',
        'radiobutton': 'DefaultCombobox',
    }
};

export default data;
