import { Button } from 'yes-platform';
import designExport from 'yes-designer/utils/DesignExport';
import layoutStyleEditor from 'yes-designer/components/Editor/Meta/LayoutStyle';
import textStyleEditor from 'yes-designer/components/Editor/Meta/TextStyle';

const editor = [
    {
        type: 'SubForm',
        key: 'layoutStyles',
        caption: '布局样式',
        isGroup: true,
        control: layoutStyleEditor,
    },{
        type: 'SubForm',
        key: 'textStyles',
        caption: '文本样式',
        isGroup: true,
        control: textStyleEditor,
    },
];

const defaultValue ={
    layoutStyles: {

    },
    textStyles: {

    }
}

const DesignableButton = designExport(Button, defaultValue, editor);
DesignableButton.category = 'yigo';
DesignableButton.detailType = 'button';
export default DesignableButton;
