/*
 * @Author: gmf
 * @Date:   2016-05-13 09:12:40
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-15 09:27:35
 */
// import App from './app/scm'
// import App from './cmcc'
import React from 'react';
import App from './src';
import { start } from 'yes-platform';
import 'antd-mobile/dist/antd-mobile.css';
import DesignerProvider from 'yes-designer/utils/provider';
import Controls from './src/config/control';
import './src/yigopatch/design';
import defaultTemplateMapping from './src/template/defaultTemplateMapping';
import Icon from './src/font/IconFont';
import IconData from './src/font/iconfont.json';

App.appWrapper = <DesignerProvider iconData={IconData} iconComponent={Icon} templates={defaultTemplateMapping} controls = {Controls} />;

export default (() => {
    if (window.cordova) {
        document.addEventListener("deviceready", ()=> {
            start(App);
        }, false);
    } else {
        start(App);
    }
})();
