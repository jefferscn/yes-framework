import React from 'react';
import ReactDOM from 'react-dom';
import { observable } from 'mobx';
// import { Router, Route } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom";
// import routes from './router';
import 'font-awesome/css/font-awesome.css';
// import { Provider } from 'react-redux'
import { Provider, inject } from "mobx-react";
import App from './components/App';
import store from './mobx-store';
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'antd-mobile/dist/antd-mobile.css';
// import { hot } from 'react-hot-loader/root'
// import store, { history } from './store';

let app = document.getElementById('app');
// const store = new Store();
window.store = store;
injectTapEventPlugin();
ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    , app);

// export default hot(()=><Router>
//          <Provider store={store}>
//              <App />
//          </Provider>
//      </Router>);
