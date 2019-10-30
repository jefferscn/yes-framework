import React from 'react';
import ReactDOM from 'react-dom';
// import { observable } from 'mobx';
// import { Router, Route } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// import routes from './router';
// import 'font-awesome/css/font-awesome.css';
// import { Provider } from 'react-redux'
import { Provider } from "mobx-react";
import App from './components/App';
import store from './mobx-store';
// import injectTapEventPlugin from 'react-tap-event-plugin'
import 'antd-mobile/dist/antd-mobile.css';
import Controls from 'yes-designer-controls';
import defaultTemplateMapping from 'yes-designer-templateData';
import Icon from 'yes-designer-icon';
import IconData from 'yes-designer-iconData';
import DesignerProvider from './utils/provider';
import 'antd/dist/antd.css';
// import { hot } from 'react-hot-loader/root'
// import store, { history } from './store';

function injectFont(font, fontName) {
    const reactNativeVectorIconsRequiredStyles = `@font-face { src:url(${font});font-family: ${fontName}; }`;
    // create stylesheet
    const style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = reactNativeVectorIconsRequiredStyles;
    } else {
        style.appendChild(document.createTextNode(reactNativeVectorIconsRequiredStyles));
    }
    // inject stylesheet
    document.head.appendChild(style);
}

document.oncontextmenu = function ()//屏蔽鼠标右键  
{
    return false;
}
App.appWrapper = <DesignerProvider iconData={IconData} iconComponent={Icon} templates={defaultTemplateMapping} controls={Controls} />;
let app = document.getElementById('app');
injectFont(fontAwesome, 'FontAwesome');
// const store = new Store();
window.store = store;
// injectTapEventPlugin();
ReactDOM.render(
    <Router>
        <DesignerProvider iconData={IconData} iconComponent={Icon} templates={defaultTemplateMapping} controls={Controls} >
            <Provider store={store}>
                <App />
            </Provider>
        </DesignerProvider>
    </Router>
    , app);

// export default hot(()=><Router>
//          <Provider store={store}>
//              <App />
//          </Provider>
//      </Router>);
