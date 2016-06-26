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
import Persons from '../component/Persons';
import Person from '../component/Person';
import RegUser from '../component/RegUser';
import NewPass from '../component/NewPass';
import Message from '../component/Message';
import Messages from '../component/Messages';
import Company from '../component/Company';
import Companies from '../component/Companies';
import Goods from '../component/Goods';
import Goodses from '../component/Goodses';
import Customer from '../component/Customer';
import Customers from '../component/Customers';
import Supplier from '../component/Supplier';
import Suppliers from '../component/Suppliers';
import Warehouse from '../component/Warehouse';
import Warehouses from '../component/Warehouses';
import RouteApi from '../component/RouteApi';
import RouteApis from '../component/RouteApis';
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
      <Route path="persons" breadcrumbName="人员列表"  onEnter={requireAuthApp}   component={Persons} />
      <Route path="/person/:personID" breadcrumbName="人员"  onEnter={requireAuthApp}   component={Person}/>
      <Route path="newPass" breadcrumbName="忘记密码"  component={NewPass}/>
      <Route path="messages" breadcrumbName="消息列表"  onEnter={requireAuthApp}   component={Messages} />
      <Route path="/message/:id" breadcrumbName="消息"   onEnter={requireAuthApp}  component={Message}/>
      <Route path="companies" breadcrumbName="公司列表"  onEnter={requireAuthApp}   component={Companies} />
      <Route path="/company/:companyID" breadcrumbName="公司"   onEnter={requireAuthApp}  component={Company}/>
      <Route path="goodses" breadcrumbName="商品列表"  onEnter={requireAuthApp}   component={Goodses} />
      <Route path="/goods/:goodsID" breadcrumbName="商品"   onEnter={requireAuthApp}  component={Goods}/>
      <Route path="customers" breadcrumbName="客户列表"  onEnter={requireAuthApp}   component={Customers} />
      <Route path="/customer/:customerID" breadcrumbName="客户"   onEnter={requireAuthApp}  component={Customer}/>
      <Route path="suppliers" breadcrumbName="供应商列表"  onEnter={requireAuthApp}   component={Suppliers} />
      <Route path="/supplier/:supplierID" breadcrumbName="供应商"   onEnter={requireAuthApp}  component={Supplier}/>
      <Route path="warehouses" breadcrumbName="仓库列表"  onEnter={requireAuthApp}   component={Warehouses} />
      <Route path="/warehouse/:warehouseID" breadcrumbName="仓库"   onEnter={requireAuthApp}  component={Warehouse}/>
      <Route path="routeapis" breadcrumbName="路由API列表"  onEnter={requireAuthApp}   component={RouteApis} />
      <Route path="/routeapi/:routeID" breadcrumbName="路由API"   onEnter={requireAuthApp}  component={RouteApi}/>
      <Route path="reguser" breadcrumbName="注册" component={RegUser}/>
      <Route path="*" breadcrumbName="未找到页面" component={NoMatch}/>
    </Route>
  </Router>
</Provider>, rootElement)
