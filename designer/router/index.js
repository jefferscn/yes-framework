import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import { App } from '../linkedComponents';
// import Login from '../components/Login';
// import App from '../linkedComponents/App';
// import Form from '../linkedComponents/Form'; 
// import Solution from '../linkedComponents/Solution';
// import CommonDef from '../linkedComponents/CommonDef'
// import { DataObject } from '../linkedComponents/DataModel';

const routes = 
<Route path="/" component={App}>
    {/* <Route path="/Solution/*" component={Solution}/>
    <Route path="/CommonDef/*" component={CommonDef}/>
    <Route path="/Form/*" component={Form}/>
    <Route path="/DataObject/*" component={DataObject}/> */}
</Route>;

export default routes
