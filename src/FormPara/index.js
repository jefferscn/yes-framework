import en from './en-US.json';
import zh from './zh-CN.json';

const formPara = navigator.language === 'zh-CN' ? zh : en;

export default formPara;
