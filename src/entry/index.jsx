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
import Message from '../component/Message';
import Messages from '../component/Messages';
const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store);

let rootElement = document.getElementById('react-body');

function requireAuthApp(curRoute,replace) {
  let states=store.getState();
  if (!states.user.userInfo || !states.user.userInfo.UserID)
  {replace('/login'); }
}

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <Route path="/" breadcrumbName="首页"  component={App}>
      <IndexRoute component={Login}/>
      <Route path="login"  breadcrumbName="登录" component={Login}/>
      <Route path="main" breadcrumbName="主页"  onEnter={requireAuthApp}  component={Main} />
      <Route path="users" breadcrumbName="用户列表"  onEnter={requireAuthApp}   component={Users}>
        <Route path=":userid" breadcrumbName="用户"  onEnter={requireAuthApp}   component={User}/>
      </Route>
      <Route path="newPass" breadcrumbName="忘记密码"  component={NewPass}/>
      <Route path="/messages" breadcrumbName="消息列表"  onEnter={requireAuthApp}   component={Messages} />
      <Route path="/messages/:id" breadcrumbName="消息"   onEnter={requireAuthApp}  component={Message}/>
      <Route path="reguser" breadcrumbName="注册" component={RegUser}/>
      <Route path="*" breadcrumbName="未找到页面" component={NoMatch}/>
    </Route>
  </Router>
</Provider>, rootElement)
