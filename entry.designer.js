/*
 * @Author: gmf
 * @Date:   2016-05-13 09:12:40
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-15 09:27:35
 */
// import App from './app/scm'
// import App from './cmcc'
import App from './src/designer.config';
import { start } from 'yes-platform';
import 'antd-mobile/dist/antd-mobile.css';

// self.MonacoEnvironment = {
//   getWorkerUrl: function (moduleId, label) {
//     if (label === 'json') {
//       return './json.worker.bundle.js';
//     }
//     if (label === 'css') {
//       return './css.worker.bundle.js';
//     }
//     if (label === 'html') {
//       return './html.worker.bundle.js';
//     }
//     if (label === 'typescript' || label === 'javascript') {
//       return './ts.worker.bundle.js';
//     }
//     return './editor.worker.bundle.js';
//   }
// }

export default () => {
    if (window.cordova) {
        document.addEventListener("deviceready", ()=> {
            start(App);
        }, false);
    } else {
        start(App);
    }
};
