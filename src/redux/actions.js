import {APP_CONFIG} from '../entry/config';
import {storeS,ifNull} from '../common/dgn';
import {SHA1} from 'crypto-js';
import {fetchPost,fetchGet} from './actions_base';
import {message} from 'antd';
import * as actionsType from './actionsType';

//基础数据
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
export function readGoodsSelect(searchStr,pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:37,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      searchStr: searchStr,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_GOODS_SELECT, params))
  }
}
export function readOutstorageGoods(customerID,searchStr,pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:44,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      customerid:customerID,
      searchStr:searchStr,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_OUTSTORAGE_GOODS, params))
  }
}
//角色
export function readRoleList(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:58,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_ROLE_LIST, params))
  }
}
export function readRole(roleID) {
  return (dispatch, getState) => {
    let params={
      apiid:59,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      roleid:roleID
    };
    return dispatch(fetchPost(actionsType.READ_ROLE, params ))
  }
}
export function saveRole(roleID,jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:60,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData),
    roleid:roleID
  };
  return dispatch(fetchPost(null, params,cb,{isNeedDispatch:false}))
}
}
export function readRoleUserSelect(searchStr,pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:61,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      searchStr:searchStr,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_ROLE_USER_SELECT, params))
  }
}
export function readRoleMainMenu() {
  return (dispatch, getState) => {
    let params={
      apiid:62,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID
    };
    return dispatch(fetchPost(actionsType.READ_ROLE_MENU, params))
  }
}
export function readRoleRight(roleID) {
  return (dispatch, getState) => {
    let params={
      apiid:63,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      roleid:roleID
    };
    return dispatch(fetchPost(actionsType.READ_ROLE_RIGHT, params))
  }
}
//数据字典
export function readDictionaryList(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:38,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_DICTIONARY_LIST, params))
  }
}
export function readDictionary(dictTypeID) {
  return (dispatch, getState) => {
    let params={
      apiid:40,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      dictTypeID:dictTypeID
    };
    return dispatch(fetchPost(actionsType.READ_DICTIONARY, params ))
  }
}
export function saveDictionary(jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:39,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(actionsType.SAVE_DICTIONARY, params,cb))
}
}
//入库
export function readInStorageList(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:32,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_INSTORAGE_LIST, params))
  }
}
export function readInStorage(formID) {
  return (dispatch, getState) => {
    let params={
      apiid:47,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      formid:formID
    };
    return dispatch(fetchPost(actionsType.READ_INSTORAGE, params,cbReadInStorage ))
  }
}
function cbReadInStorage (data,params,dispatch) {
    dispatch(readUploadFile(actionsType.READ_INSTORAGE_IMG,data.items.item0[0].FormImages,'img'));
    dispatch(readUploadFile(actionsType.READ_INSTORAGE_FILE,data.items.item0[0].FormFiles,'file'));
  }
export function deleteInStorage(formID,cb) {
    return (dispatch, getState) => {
      let params={
        apiid:48,
        sessionkey:storeS.getItem('sessionKey'),
        userid:storeS.getJson('userInfo').UserID,
        formid:formID
      };
      return dispatch(fetchPost(null, params,cb ,{isNeedDispatch:false}))
    }
  }
export function saveInStorage(jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:35,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData),
    formid:jsonData[0].FormID
  };
  return dispatch(fetchPost(null, params,cb,{isNeedDispatch:false}))
}
}
//出库
export function readOutStorageList(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:43,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_OUTSTORAGE_LIST, params))
  }
}
export function readOutStorage(formID) {
  return (dispatch, getState) => {
    let params={
      apiid:49,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      formid:formID
    };
    return dispatch(fetchPost(actionsType.READ_OUTSTORAGE, params,cbReadOutStorage ))
  }
}
function cbReadOutStorage (data,params,dispatch) {
    dispatch(readUploadFile(actionsType.READ_OUTSTORAGE_IMG,data.items.item0[0].FormImages,'img'));
    dispatch(readUploadFile(actionsType.READ_OUTSTORAGE_FILE,data.items.item0[0].FormFiles,'file'));
  }
export function saveOutStorage(jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:41,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(actionsType.SAVE_OUTSTORAGE, params,cb))
}
}
//平台路由


export function readRoutes(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:29,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(actionsType.READ_ROUTERS, params))
  }
}
export function readRoute(routeID) {
  return (dispatch, getState) => {
    let params={
      apiid:34,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      routeid:routeID
    };
    return dispatch(fetchPost(actionsType.READ_ROUTER, params ))
  }
}

export function saveRoute(jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:30,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(actionsType.SAVE_ROUTER, params,cb))
}
}
export function readMenuTree() {
  return (dispatch, getState) => {
    let params={
      apiid:64,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
    };
    return dispatch(fetchPost(actionsType.READ_MENU_TREE, params ))
  }
}

//仓库warehouses


export function readWarehouses(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:26,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(actionsType.READ_WAREHOUSES, params))
  }
}
export function readWarehouse(WarehouseID) {
  return (dispatch, getState) => {
    let params={
      apiid:52,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      warehouseid:WarehouseID
    };
    return dispatch(fetchPost(actionsType.READ_WAREHOUSE, params ))
  }
}

export function saveWarehouse(jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:28,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(actionsType.SAVE_WAREHOUSE, params,cb))
}
}
//供应商

export function readSuppliers(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:25,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(actionsType.READ_SUPPLIERS, params))
  }
}
export function readSupplier(SupplierID) {
  return (dispatch, getState) => {
    let params={
      apiid:54,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      compid:SupplierID
    };
    return dispatch(fetchPost(actionsType.READ_SUPPLIER, params,cbReadSupplier))
  }
}
function cbReadSupplier (data,params,dispatch) {
  dispatch(readUploadFile(actionsType.READ_SUPPLIER_FILE,data.items.item0[0].CompImages,'img'));
}
export function saveSupplier(jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:55,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(actionsType.SAVE_SUPPLIER, params,cb))
}
}
//客户customer

export function readCustomers(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:24,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(actionsType.READ_CUSTOMERS, params))
  }
}
export function readCustomer(CustomerID) {
  return (dispatch, getState) => {
    let params={
      apiid:53,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      compid:CustomerID
    };
    return dispatch(fetchPost(actionsType.READ_CUSTOMER, params,cbReadCustomer))
  }
}
function cbReadCustomer (data,params,dispatch) {
  dispatch(readUploadFile(actionsType.READ_CUSTOMER_FILE,data.items.item0[0].CompImages,'img'));
}
export function saveCustomer(jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:22,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(actionsType.SAVE_CUSTOMER, params,cb))
}
}
//公司

export function readCompanies(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:21,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
    };
    return dispatch(fetchPost(actionsType.READ_COMPANIES, params))
  }
}
export function readCompany(companyID) {
  return (dispatch, getState) => {
    let params={
      apiid:57,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      compid:companyID
    };
    return dispatch(fetchPost(actionsType.READ_COMPANY, params,cbReadCompany ))
  }
}
function cbReadCompany (data,params,dispatch) {
  dispatch(readUploadFile(actionsType.READ_COMPANY_FILE,data.items.item0[0].CompImages,'img'));
}
export function saveCompany(jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:56,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(actionsType.SAVE_COMPANY, params,cb ))
}
}
//商品
export function readGoodses(pageSize,curPage,filterCondition,sorter) {
  return (dispatch, getState) => {
    let params={
      apiid:5,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage,
      filter:JSON.stringify(filterCondition),
      sorter:ifNull(sorter)?'':' order by '+sorter.field  + (sorter.order==='ascend'?' asc ':' desc ')
    };
    return dispatch(fetchPost(actionsType.READ_GOODSES, params))
  }
}

export function readGoods(goodsID) {
  return (dispatch, getState) => {
    let params={
      apiid:51,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      goodsid:goodsID
    };
    return dispatch(fetchPost(actionsType.READ_GOODS, params,cbReadGoods))
  }
}
function cbReadGoods (data,params,dispatch) {
  dispatch(readUploadFile(actionsType.READ_GOODS_FILE,data.items.item0[0].GoodsImages,'img'));
}
export function saveGoods(jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:18,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(actionsType.SAVE_GOODS, params,cb))
}
}
//人员
export function readPersons(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:13,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_PERSONS, params))
  }
}
export function savePerson(jsonData,cb) {
  return (dispatch, getState) => {
    let params={
      apiid:14,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      jsonData:JSON.stringify(jsonData)
    };
    return dispatch(fetchPost(actionsType.SAVE_PERSON, params,cb))
  }
}
export function readPerson(personID) {
  return (dispatch, getState) => {
    let params={
      apiid:50,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      personID:personID
    };
    return dispatch(fetchPost(actionsType.READ_PERSON, params,cbReadPerson))
  }
}
function cbReadPerson (data,params,dispatch) {
  dispatch(readUploadFile(actionsType.READ_PERSONFILE,data.items.item0[0].UserImages,'img'));
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
export function readUserList(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:65,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_USER_LIST, params))
  }
}
export function readUser(userID) {
  return (dispatch, getState) => {
    let params={
      apiid:66,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      personID:userID
    };
    return dispatch(fetchPost(actionsType.READ_USER, params))
  }
}
export function saveUser(jsonData,cb) {
  return (dispatch, getState) => {
    let params={
      apiid:67,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      jsonData:JSON.stringify(jsonData)
    };
    return dispatch(fetchPost(actionsType.SAVE_USER, params,cb))
  }
}
export function userLogin(loginInfo,cb) {
  return (dispatch, getState) => {
    let params={
      apiid:3,
      loginid:loginInfo.userName,
      logintype:APP_CONFIG.LOGINTYPE,
      usertype:APP_CONFIG.USERTYPE,
      password:SHA1(loginInfo.password).toString()
    };
    return dispatch(fetchPost(actionsType.USER_LOGIN, params,cb))
  }
}

export function userReg(regInfo,cb) {
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
    return dispatch(fetchPost(actionsType.USER_REG, params,cb))
  }
}
export function changePassword(personID,oldPasssord,newPasssord,cb) {
  return (dispatch, getState) => {
    let params={
      apiid:68,
      sessionkey:storeS.getItem('sessionKey'),
      personid:personID,
      oldpassword:SHA1(oldPasssord).toString(),
      newpassword:SHA1(newPasssord).toString(),
    };
    return dispatch(fetchPost(null, params,cb,{isNeedDispatch:false}))
  }
}


export function clearUser() {
  return {
    type: actionsType.USER_CLEAR
  }
}
export function userLogout() {
  return {
    type: actionsType.USER_LOGOUT
  }
}
export function clearResult() {
  return {
    type: actionsType.RESULT_CLEAR
  }
}
export function readMessage(msgID) {
  return (dispatch, getState) => {
    let params={
      apiid:45,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      jsonData:JSON.stringify([{msgID:msgID}])
    };
    return dispatch(fetchPost(actionsType.READ_USER_MESSAGE, params))
  }
}

export function readMessages() {
  return (dispatch, getState) => {
    let params={
      apiid:10,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID
    };
    return dispatch(fetchPost(actionsType.READ_USER_MESSAGES, params))
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
    return dispatch(fetchPost(actionsType.MESSAGE_DONE, params,cbMessageFinished))
  }
}
function cbMessageFinished (data,params,dispatch) {
  //message.success(data.items[0].resultDescribe);
  dispatch(readMessage());
}
//读主菜单信息

export function readMainMenu() {
  return (dispatch, getState) => {
    let params={
      apiid:7,
      userid:storeS.getJson('userInfo').UserID
    };
    return dispatch(fetchPost(actionsType.READ_MAIN_MENU, params))
  }
}

export function removeFile(fileid) {
  return (dispatch, getState) => {
    let params={
      apiid:17,
      userid:storeS.getJson('userInfo').UserID,
      sessionkey:storeS.getItem('sessionKey'),
      fileid:fileid
    };
    return dispatch(fetchPost(actionsType.REMOVEFILE, params))
  }
}
//收藏

export function setFavorites() {
  return (dispatch, getState) => {
    let params={
      apiid:8,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      path:location.pathname,
    };
    return dispatch(fetchPost(actionsType.SET_FAVORITES, params,cbSetFavorites))
  }
}
function cbSetFavorites (data,params,dispatch) {
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
    return dispatch(fetchPost(actionsType.READ_FAVORITES, params))
  }
}
export function saveLog(module,pathname,operation,describe) {
  return (dispatch, getState) => {
    let params={
      apiid:46,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      appid:APP_CONFIG.APPID,
      loginid:storeS.getJson('userInfo').LoginID,
      module:module,
      pathname:pathname,
      operation:operation,
      describe:describe
    };
    return dispatch(fetchPost(actionsType.SAVE_LOG, params,null,{isNeedDispatch:false}))
  }
}
//图形

export function readChartData() {
  return (dispatch, getState) => {
    let params={
      apiid:12,
      userid:storeS.getJson('userInfo').UserID,
      starttime:'2016-01-01',
      endtime:'2056-01-01',
      sessionkey:storeS.getItem('sessionKey')
    };
    return dispatch(fetchPost(actionsType.READ_CHART_DATA, params))
  }
}
export function exportExcel(apiid,sheetNames,cb) {
  return (dispatch, getState) => {
    let params={
      apiid:apiid,
      userid:storeS.getJson('userInfo').UserID,
      sessionkey:storeS.getItem('sessionKey'),
      sheetNames:sheetNames
    };
    return dispatch(fetchPost(null, params,cb,{isNeedDispatch:false}))
  }
}
//导入配置
export function readImportExcelConfList(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:16,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_IMPORTEXCELCONF_LIST, params))
  }
}
export function readImportExcelConf(formID) {
  return (dispatch, getState) => {
    let params={
      apiid:36,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      formid:formID
    };
    return dispatch(fetchPost(actionsType.READ_IMPORTEXCELCONF, params ))
  }
}
export function saveImportExcelConf(jsonData,cb) {
return (dispatch, getState) => {
  let params={
    apiid:19,
    sessionkey:storeS.getItem('sessionKey'),
    userid:storeS.getJson('userInfo').UserID,
    jsonData:JSON.stringify(jsonData)
  };
  return dispatch(fetchPost(null, params,cb))
}
}
//得到列名
export function getTableColName(tableName,cb) {
  return (dispatch, getState) => {
    let params={
      apiid:23,
      userid:storeS.getJson('userInfo').UserID,
      sessionkey:storeS.getItem('sessionKey'),
      tableName:tableName
    };
    return dispatch(fetchPost(null, params,cb,{isNeedDispatch:false}))
  }
}
export function readFavoritesList() {
  let userid=storeS.getJson('userInfo').UserID;
  return (dispatch, getState) => {
    let params={
      apiid:42,
      sessionkey:storeS.getItem('sessionKey'),
      userid:userid
    };
    return dispatch(fetchPost(actionsType.READ_FAVORITESLIST, params ))
  }
}
export function saveFavoritesList(jsonData,cb) {
  return (dispatch, getState) => {
    let params={
      apiid:27,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      jsonData:JSON.stringify(jsonData)
    };
    return dispatch(fetchPost(null, params,cb))
  }
}
export function readMenuSelect(searchStr,pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:31,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      searchStr:searchStr ,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_MENU_SELECT, params))
  }
}

//菜单
export function readMenuList(pageSize,curPage) {
  return (dispatch, getState) => {
    let params={
      apiid:69,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      pageSize:pageSize,
      curPage:curPage
    };
    return dispatch(fetchPost(actionsType.READ_MENU_LIST, params))
  }
}
export function saveMenu(jsonData,cb) {
  return (dispatch, getState) => {
    let params={
      apiid:71,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      jsonData:JSON.stringify(jsonData)
    };
    return dispatch(fetchPost(null, params,cb,{isNeedDispatch:false}))
  }
}
export function readMenu(menuID) {
  return (dispatch, getState) => {
    let params={
      apiid:70,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      menuid:menuID
    };
    return dispatch(fetchPost(actionsType.READ_MENU, params))
  }
}
export function addMenu(payload) {
  return {
    type: actionsType.ADD_MENU,
    payload:payload
  }
}
export function dragMenu(dragKey,dropKey,cb) {
  return (dispatch, getState) => {
    let params={
      apiid:72,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getJson('userInfo').UserID,
      dragKey:dragKey,
      dropKey:dropKey
    };
    return dispatch(fetchPost(null, params,cb,{isNeedDispatch:false}))
  }
}
