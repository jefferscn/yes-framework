import { Login } from 'yes-platform';
import designable from '../../designer/utils/designable';

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
export default designable(defaultValue, editor)(Login);
