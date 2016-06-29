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
import PersonList from '../component/PersonList';
import Person from '../component/Person';
import RegUser from '../component/RegUser';
import NewPass from '../component/NewPass';
import Message from '../component/Message';
import MessageList from '../component/MessageList';
import Company from '../component/Company';
import CompanyList from '../component/CompanyList';
import Goods from '../component/Goods';
import GoodsList from '../component/GoodsList';
import Customer from '../component/Customer';
import CustomerList from '../component/CustomerList';
import Supplier from '../component/Supplier';
import SupplierList from '../component/SupplierList';
import Warehouse from '../component/Warehouse';
import WarehouseList from '../component/WarehouseList';
import RouteApi from '../component/RouteApi';
import RouteApiList from '../component/RouteApiList';
import InStorage from '../component/InStorage';
import InStorageList from '../component/InStorageList';
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
      <Route path="personList" breadcrumbName="人员列表"  onEnter={requireAuthApp}   component={PersonList} />
      <Route path="/person/:personID" breadcrumbName="人员"  onEnter={requireAuthApp}   component={Person}/>
      <Route path="newPass" breadcrumbName="忘记密码"  component={NewPass}/>
      <Route path="messageList" breadcrumbName="消息列表"  onEnter={requireAuthApp}   component={MessageList} />
      <Route path="/message/:id" breadcrumbName="消息"   onEnter={requireAuthApp}  component={Message}/>
      <Route path="companyList" breadcrumbName="公司列表"  onEnter={requireAuthApp}   component={CompanyList} />
      <Route path="/company/:companyID" breadcrumbName="公司"   onEnter={requireAuthApp}  component={Company}/>
      <Route path="goodsList" breadcrumbName="商品列表"  onEnter={requireAuthApp}   component={GoodsList} />
      <Route path="/goods/:goodsID" breadcrumbName="商品"   onEnter={requireAuthApp}  component={Goods}/>
      <Route path="customerList" breadcrumbName="客户列表"  onEnter={requireAuthApp}   component={CustomerList} />
      <Route path="/customer/:customerID" breadcrumbName="客户"   onEnter={requireAuthApp}  component={Customer}/>
      <Route path="supplierList" breadcrumbName="供应商列表"  onEnter={requireAuthApp}   component={SupplierList} />
      <Route path="/supplier/:supplierID" breadcrumbName="供应商"   onEnter={requireAuthApp}  component={Supplier}/>
      <Route path="warehouseList" breadcrumbName="仓库列表"  onEnter={requireAuthApp}   component={WarehouseList} />
      <Route path="/warehouse/:warehouseID" breadcrumbName="仓库"   onEnter={requireAuthApp}  component={Warehouse}/>
      <Route path="routeApiList" breadcrumbName="路由API列表"  onEnter={requireAuthApp}   component={RouteApiList} />
      <Route path="/routeApi/:routeID" breadcrumbName="路由API"   onEnter={requireAuthApp}  component={RouteApi}/>
      <Route path="inStorageList" breadcrumbName="采购入库单列表"  onEnter={requireAuthApp}   component={InStorageList} />
      <Route path="/inStorage/:formID" breadcrumbName="采购入库单"   onEnter={requireAuthApp}  component={InStorage}/>

      <Route path="reguser" breadcrumbName="注册" component={RegUser}/>
      <Route path="*" breadcrumbName="未找到页面" component={NoMatch}/>
    </Route>
  </Router>
</Provider>, rootElement)
