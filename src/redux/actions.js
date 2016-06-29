import {APP_CONFIG} from '../entry/config';
import {storeS,ifNull} from '../common/dgn';
import {SHA1} from 'crypto-js';
import {fetchPost,fetchGet} from './actions_base';
import {message} from 'antd';

//基础数据
export const READ_DICT_GOODSCATEGORY = 'READ_DICT_GOODSCATEGORY';
export const READ_DICT_COMPTYPE = 'READ_DICT_COMPTYPE';
export const READ_DICT_ROUTERETURNTYPE = 'READ_DICT_ROUTERETURNTYPE';

export function readDict(actionType,dictTypeID) {
  return (dispatch, getState) => {
    let params={
      apiid:20,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      dicttypeid:dictTypeID
    };
    return dispatch(fetchPost(actionType, params))
  }
}
//入库
export const READ_INSTORAGE_LIST = 'READ_INSTORAGE_LIST';
export const READ_INSTORAGE = 'READ_INSTORAGE';
export const SAVE_INSTORAGE = 'SAVE_INSTORAGE';

export function readInStorageList(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:32,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(READ_INSTORAGE_LIST, params))
  }
}
export function readInStorage(formID) {
  return (dispatch, getState) => {
    let params={
      apiid:33,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      formid:formID
    };
    return dispatch(fetchPost(READ_INSTORAGE, params ))
  }
}

export function saveInStorage(jsonData) {
return (dispatch, getState) => {
  let params={
    apiid:34,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(SAVE_INSTORAGE, params,jsonData,{isShowResultMessage:true}))
}
}

//平台路由
export const READ_ROUTERS = 'READ_ROUTERS';
export const READ_ROUTER = 'READ_ROUTER';
export const SAVE_ROUTER = 'SAVE_ROUTER';

export function readRoutes(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:29,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(READ_ROUTERS, params))
  }
}
export function readRoute(routeID) {
  return (dispatch, getState) => {
    let params={
      apiid:30,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      routeid:routeID
    };
    return dispatch(fetchPost(READ_ROUTER, params ))
  }
}

export function saveRoute(jsonData) {
return (dispatch, getState) => {
  let params={
    apiid:31,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(SAVE_ROUTER, params,jsonData,{isShowResultMessage:true}))
}
}
//仓库warehouses
export const READ_WAREHOUSES = 'READ_WAREHOUSES';
export const READ_WAREHOUSE = 'READ_WAREHOUSE';
export const SAVE_WAREHOUSE = 'SAVE_WAREHOUSE';

export function readWarehouses(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:26,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(READ_WAREHOUSES, params))
  }
}
export function readWarehouse(WarehouseID) {
  return (dispatch, getState) => {
    let params={
      apiid:28,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      warehouseid:WarehouseID
    };
    return dispatch(fetchPost(READ_WAREHOUSE, params ))
  }
}

export function saveWarehouse(jsonData) {
return (dispatch, getState) => {
  let params={
    apiid:27,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(SAVE_WAREHOUSE, params,jsonData,{isShowResultMessage:true}))
}
}
//供应商
export const READ_SUPPLIERS = 'READ_SUPPLIERS';
export const READ_SUPPLIER = 'READ_SUPPLIER';
export const SAVE_SUPPLIER = 'SAVE_SUPPLIER';
export const READ_SUPPLIER_FILE = 'READ_SUPPLIER_FILE';

export function readSuppliers(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:25,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(READ_SUPPLIERS, params))
  }
}
export function readSupplier(SupplierID) {
  return (dispatch, getState) => {
    let params={
      apiid:22,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      compid:SupplierID
    };
    return dispatch(fetchPost(READ_SUPPLIER, params,null,null,cbReadSupplier))
  }
}
function cbReadSupplier (data,dispatch,params) {
  dispatch(readUploadFile(READ_SUPPLIER_FILE,data.items[0].CompImages,'img'));
}
export function saveSupplier(jsonData) {
return (dispatch, getState) => {
  let params={
    apiid:23,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(SAVE_SUPPLIER, params,jsonData,{isShowResultMessage:true}))
}
}
//客户customer
export const READ_CUSTOMERS = 'READ_CUSTOMERS';
export const READ_CUSTOMER = 'READ_CUSTOMER';
export const SAVE_CUSTOMER = 'SAVE_CUSTOMER';
export const READ_CUSTOMER_FILE = 'READ_CUSTOMER_FILE';

export function readCustomers(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:24,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(READ_CUSTOMERS, params))
  }
}
export function readCustomer(CustomerID) {
  return (dispatch, getState) => {
    let params={
      apiid:22,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      compid:CustomerID
    };
    return dispatch(fetchPost(READ_CUSTOMER, params,null,null,cbReadCustomer))
  }
}
function cbReadCustomer (data,dispatch,params) {
  dispatch(readUploadFile(READ_CUSTOMER_FILE,data.items[0].CompImages,'img'));
}
export function saveCustomer(jsonData) {
return (dispatch, getState) => {
  let params={
    apiid:23,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(SAVE_CUSTOMER, params,jsonData,{isShowResultMessage:true}))
}
}
//公司
export const READ_COMPANIES = 'READ_COMPANIES';
export const READ_COMPANY = 'READ_COMPANY';
export const SAVE_COMPANY = 'SAVE_COMPANY';
export const READ_COMPANY_FILE = 'READ_COMPANY_FILE';

export function readCompanies(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:21,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(READ_COMPANIES, params))
  }
}
export function readCompany(companyID) {
  return (dispatch, getState) => {
    let params={
      apiid:22,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      compid:companyID
    };
    return dispatch(fetchPost(READ_COMPANY, params,null,null,cbReadCompany))
  }
}
function cbReadCompany (data,dispatch,params) {
  dispatch(readUploadFile(READ_COMPANY_FILE,data.items[0].CompImages,'img'));
}
export function saveCompany(jsonData) {
return (dispatch, getState) => {
  let params={
    apiid:23,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(SAVE_COMPANY, params,jsonData,{isShowResultMessage:true}))
}
}
//商品
export const READ_GOODSES = 'READ_GOODSES';
export const READ_GOODS = 'READ_GOODS';
export const READ_GOODS_FILE = 'READ_GOODS_FILE';
export const SAVE_GOODS = 'SAVE_GOODS';
export function readGoodses(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:5,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(READ_GOODSES, params))
  }
}
export function readGoods(goodsID) {
  return (dispatch, getState) => {
    let params={
      apiid:18,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      goodsid:goodsID
    };
    return dispatch(fetchPost(READ_GOODS, params,null,null,cbReadGoods))
  }
}
function cbReadGoods (data,dispatch,params) {
  dispatch(readUploadFile(READ_GOODS_FILE,data.items[0].GoodsImages,'img'));
}
export function saveGoods(jsonData) {
return (dispatch, getState) => {
  let params={
    apiid:19,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(SAVE_GOODS, params,jsonData,{isShowResultMessage:true}))
}
}
//人员
export const READ_PERSONS = 'READ_PERSONS';
export const READ_PERSON = 'READ_PERSON';
export const READ_PERSONFILE = 'READ_PERSONFILE';
export const SAVE_PERSON = 'SAVE_PERSON';

export function readPersons(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:13,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
      filter:''
    };
    return dispatch(fetchPost(READ_PERSONS, params))
  }
}
export function savePerson(data) {
  return (dispatch, getState) => {
    let params={
      apiid:16,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      savetype:'update',
      personid:data.UserID,
      name:data.Name,
      mobile:data.Mobile,
      email:data.Email,
      code:data.Code,
      remark:data.Remark
    };
    return dispatch(fetchPost(SAVE_PERSON, params,data,{isShowResultMessage:true}))
  }
}
export function readPerson(personID) {
  return (dispatch, getState) => {
    let params={
      apiid:14,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      personid:personID
    };
    return dispatch(fetchPost(READ_PERSON, params,null,null,cbReadPerson))
  }
}
function cbReadPerson (data,dispatch,params) {
  dispatch(readUploadFile(READ_PERSONFILE,data.items.item0[0].UserImages,'img'));
}
export function readUploadFile(actionType,fileFormID,gettype) {
  return (dispatch, getState) => {
    let params={
      apiid:15,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      formid:fileFormID,
      gettype:gettype
    };
    return dispatch(fetchPost(actionType, params))
  }
}
//用户
export const USER_LOGIN = 'USER_LOGIN';
export const USER_CLEAR = 'USER_CLEAR';
export const USER_REG = 'USER_REG';
export const RESULT_CLEAR = 'RESULT_CLEAR';
export const READ_USER_MESSAGE = 'READ_USER_MESSAGE';
export const MESSAGE_DONE = 'MESSAGE_DONE';
export const USER_LOGOUT = 'USER_LOGOUT';

export function userLogin(loginInfo) {
  return (dispatch, getState) => {
    let params={
      apiid:3,
      loginid:loginInfo.userName,
      logintype:APP_CONFIG.LOGINTYPE,
      usertype:APP_CONFIG.USERTYPE,
      password:SHA1(loginInfo.password).toString()
    };
    return dispatch(fetchPost(USER_LOGIN, params))
  }
}

export function userReg(regInfo) {
  return (dispatch, getState) => {
    let params={
      apiid:2,
      loginid:regInfo.userName,
      logintype:APP_CONFIG.LOGINTYPE,
      usertype:APP_CONFIG.USERTYPE,
      nickname:regInfo.userName,
      checkcode:'nocheck',
      password:SHA1(regInfo.password).toString()
    };
    return dispatch(fetchPost(USER_REG, params))
  }
}
export function clearUser() {
  return {
    type: USER_CLEAR
  }
}
export function userLogout() {
  return {
    type: USER_LOGOUT
  }
}
export function clearResult() {
  return {
    type: RESULT_CLEAR
  }
}
export function readMessage() {
  return (dispatch, getState) => {
    let params={
      apiid:10,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID
    };
    return dispatch(fetchPost(READ_USER_MESSAGE, params))
  }
}
export function messageFinished (msgID) {
  return (dispatch, getState) => {
    let params={
      apiid:11,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      id:msgID
    };
    return dispatch(fetchPost(MESSAGE_DONE, params,null,null,cbMessageFinished))
  }
}
function cbMessageFinished (data,dispatch,params) {
  //message.success(data.items[0].resultDescribe);
  dispatch(readMessage());
}
//读主菜单信息
export const READ_MAIN_MENU = 'READ_MAIN_MENU'

export function readMainMenu() {
  return (dispatch, getState) => {
    let params={
      apiid:7,
      userid:storeS.getJson('userInfo').UserID
    };
    return dispatch(fetchPost(READ_MAIN_MENU, params))
  }
}
export const REMOVEFILE = 'REMOVEFILE'
export function removeFile(fileid) {
  return (dispatch, getState) => {
    let params={
      apiid:17,
      userid:storeS.getJson('userInfo').UserID,
      sessionkey:storeS.getItem('sessionKey'),
      fileid:fileid
    };
    return dispatch(fetchPost(REMOVEFILE, params))
  }
}
//收藏
export const SET_FAVORITES = 'SET_FAVORITES'
export const READ_FAVORITES = 'READ_FAVORITES'

export function setFavorites() {
  return (dispatch, getState) => {
    let params={
      apiid:8,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      path:location.pathname,
    };
    return dispatch(fetchPost(SET_FAVORITES, params,null,null,cbSetFavorites))
  }
}
function cbSetFavorites (data,dispatch,params) {
  message.success(data.items[0].resultDescribe);
  dispatch(readFavorites());
}
export function readFavorites() {
  return (dispatch, getState) => {
    let params={
      apiid:9,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID
    };
    return dispatch(fetchPost(READ_FAVORITES, params))
  }
}

//图形
export const READ_CHART_DATA = 'READ_CHART_DATA'
export function readChartData() {
  return (dispatch, getState) => {
    let params={
      apiid:12,
      userid:storeS.getJson('userInfo').UserID,
      starttime:'2016-01-01',
      endtime:'2056-01-01',
      sessionkey:storeS.getItem('sessionKey')
    };
    return dispatch(fetchPost(READ_CHART_DATA, params))
  }
}
