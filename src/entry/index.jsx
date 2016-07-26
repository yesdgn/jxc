import 'babel-polyfill';
import '../common/lib';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {storeS} from '../common/dgn';
import {browserHistory, Router, Route, IndexRoute} from 'react-router';
import configureStore from '../redux/configureStore';
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import App from '../component/App';
import NoMatch from '../component/NoMatch';
import Login from '../component/Login';
import Main from '../component/Main';
import PersonList from '../component/base/PersonList';
import Person from '../component/base/Person';
import RegUser from '../component/RegUser';
import NewPass from '../component/NewPass';
import Message from '../component/base/Message';
import MessageList from '../component/base/MessageList';
import Company from '../component/base/Company';
import CompanyList from '../component/base/CompanyList';
import Goods from '../component/project/Goods';
import GoodsList from '../component/project/GoodsList';
import Customer from '../component/project/Customer';
import CustomerList from '../component/project/CustomerList';
import Supplier from '../component/project/Supplier';
import SupplierList from '../component/project/SupplierList';
import Warehouse from '../component/project/Warehouse';
import WarehouseList from '../component/project/WarehouseList';
import RouteApi from '../component/development/RouteApi';
import RouteApiList from '../component/development/RouteApiList';
import InStorage from '../component/project/InStorage';
import InStorageList from '../component/project/InStorageList';
import Dictionary from '../component/base/Dictionary';
import DictionaryList from '../component/base/DictionaryList';
import OutStorage from '../component/project/OutStorage';
import OutStorageList from '../component/project/OutStorageList';
const store = configureStore()
//const history = syncHistoryWithStore(browserHistory, store);

let rootElement = document.getElementById('react-body');

function requireAuthApp(curRoute,replace) {
  let userInfo = storeS.getJson('userInfo');
  if (!userInfo || !userInfo.UserID)
  {replace('/login'); }
}
function refreshApp(curRoute,replace) {
  let userInfo = storeS.getJson('userInfo');
  if (!userInfo || !userInfo.UserID)
  {replace('/login'); }
  else {
    if (curRoute.location.pathname=='/')
    {    replace('/main');}
  }
}
ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" breadcrumbName="首页"  component={App}>
      <IndexRoute  onEnter={refreshApp} />
      <Route path="login"  breadcrumbName="登录" component={Login}/>
      <Route path="main" breadcrumbName="主页"  onEnter={requireAuthApp}  component={Main} />
      <Route path="personList" breadcrumbName="人员列表"  onEnter={requireAuthApp}   component={PersonList} />
      <Route path="/person/:dataID" breadcrumbName="人员"  onEnter={requireAuthApp}   component={Person}/>
      <Route path="newPass" breadcrumbName="忘记密码"  component={NewPass}/>
      <Route path="messages" breadcrumbName="消息列表"  onEnter={requireAuthApp}   component={MessageList} />
      <Route path="/message/:dataID" breadcrumbName="消息"   onEnter={requireAuthApp}  component={Message}/>
      <Route path="companyList" breadcrumbName="公司列表"  onEnter={requireAuthApp}   component={CompanyList} />
      <Route path="/company/:dataID" breadcrumbName="公司"   onEnter={requireAuthApp}  component={Company}/>
      <Route path="goodsList" breadcrumbName="商品列表"  onEnter={requireAuthApp}   component={GoodsList} />
      <Route path="/goods/:dataID" breadcrumbName="商品"   onEnter={requireAuthApp}  component={Goods}/>
      <Route path="customerList" breadcrumbName="客户列表"  onEnter={requireAuthApp}   component={CustomerList} />
      <Route path="/customer/:dataID" breadcrumbName="客户"   onEnter={requireAuthApp}  component={Customer}/>
      <Route path="supplierList" breadcrumbName="供应商列表"  onEnter={requireAuthApp}   component={SupplierList} />
      <Route path="/supplier/:dataID" breadcrumbName="供应商"   onEnter={requireAuthApp}  component={Supplier}/>
      <Route path="warehouseList" breadcrumbName="仓库列表"  onEnter={requireAuthApp}   component={WarehouseList} />
      <Route path="/warehouse/:dataID" breadcrumbName="仓库"   onEnter={requireAuthApp}  component={Warehouse}/>
      <Route path="routeApiList" breadcrumbName="路由API列表"  onEnter={requireAuthApp}   component={RouteApiList} />
      <Route path="/routeApi/:dataID" breadcrumbName="路由API"   onEnter={requireAuthApp}  component={RouteApi}/>
      <Route path="inStorageList" breadcrumbName="采购入库单列表"  onEnter={requireAuthApp}   component={InStorageList} />
      <Route path="/inStorage/:dataID" breadcrumbName="采购入库单"   onEnter={requireAuthApp}  component={InStorage}/>
      <Route path="dictionaryList" breadcrumbName="数据字典列表"  onEnter={requireAuthApp}   component={DictionaryList} />
      <Route path="/dictionary/:dataID" breadcrumbName="数据字典"   onEnter={requireAuthApp}  component={Dictionary}/>
      <Route path="outStorageList" breadcrumbName="销售出库单列表"  onEnter={requireAuthApp}   component={OutStorageList} />
      <Route path="/outStorage/:dataID" breadcrumbName="销售出库单"   onEnter={requireAuthApp}  component={OutStorage}/>
      <Route path="reguser" breadcrumbName="注册" component={RegUser}/>
      <Route path="*" breadcrumbName="未找到页面"  onEnter={refreshApp}  component={NoMatch}/>
    </Route>
  </Router>
</Provider>, rootElement)
