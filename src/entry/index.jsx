import 'babel-polyfill';
import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import configureStore from '../redux/configureStore';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import App from '../component/App';
import NoMatch from '../component/NoMatch';
import Login from '../component/Login';
import Main from '../component/Main';
import Users from '../component/Users';
import User from '../component/User';
import RegUser from '../component/RegUser';
import NewPass from '../component/NewPass';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store);

let rootElement = document.getElementById('react-body');

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Login}/>
      <Route path="/login" component={Login}/>
      <Route path="/main" component={Main}/>
      <Route path="/users" component={Users}>
        <Route path="/users/:userid" component={User}/>
      </Route>
      <Route path="/newPass" component={NewPass}/>
      <Route path="/reguser" component={RegUser}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
</Provider>, rootElement)
