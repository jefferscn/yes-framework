import { Login } from 'yes-platform';
import designExport from 'yes-designer/utils/DesignExport';

Login.category = 'template';
Login.detailType = 'login';
const defaultValue = {
    tooltip: '',
    companyName: '',
}
const editor = [
    {
        type: 'Text',
        key: 'tooltip',
        caption: '抬头',
    },{
        type: 'Text',
        key: 'companyName',
        caption: '公司名称',
    },
];
export default designExport(Login, defaultValue, editor);
