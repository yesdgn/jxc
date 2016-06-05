import {APP_CONFIG} from '../entry/config';
import {storeS,getUrl} from '../common/dgn';
import {isFunction}  from 'lodash';
import fetch from 'isomorphic-fetch'
import {SHA1} from 'crypto-js';
import {message} from 'antd';


//用户
export const USER_LOGIN = 'USER_LOGIN';
export const USER_CLEAR = 'USER_CLEAR';
export const USER_REG = 'USER_REG';
export const RESULT_CLEAR = 'RESULT_CLEAR';
export const READ_USER_MESSAGE = 'READ_USER_MESSAGE';
export const MESSAGE_DONE = 'MESSAGE_DONE';

export function userLogin(loginInfo) {
  return (dispatch, getState) => {
    let params={
      apiid:3,
      loginid:loginInfo.userName,
      logintype:APP_CONFIG.LOGINTYPE,
      usertype:APP_CONFIG.USERTYPE,
      password:SHA1(loginInfo.password).toString()
    };
    return dispatch(fetchPosts(USER_LOGIN, params))
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
    return dispatch(fetchPosts(USER_REG, params))
  }
}
export function clearUser() {
  return {
    type: USER_CLEAR
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
      userid:storeS.getItem('UserID')
    };
    return dispatch(fetchPosts(READ_USER_MESSAGE, params))
  }
}
export function messageFinished (msgID) {
  return (dispatch, getState) => {
    let params={
      apiid:11,
      sessionkey:storeS.getItem('sessionKey'),
      userid:storeS.getItem('UserID'),
      id:msgID
    };
    return dispatch(fetchPosts(MESSAGE_DONE, params,cbMessageFinished))
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
      userid:storeS.getItem('UserID')
    };
    return dispatch(fetchPosts(READ_MAIN_MENU, params))
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
      userid:storeS.getItem('UserID'),
      path:location.pathname,
    };
    return dispatch(fetchPosts(SET_FAVORITES, params,cbSetFavorites))
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
      userid:storeS.getItem('UserID')
    };
    return dispatch(fetchPosts(READ_FAVORITES, params))
  }
}

//图形
export const READ_GOODS_ANALYSIS = 'READ_GOODS_ANALYSIS'
export function readGoodsAnalysis() {
  return (dispatch, getState) => {
    let params={
      apiid:12,
      sessionkey:storeS.getItem('sessionKey')
    };
    return dispatch(fetchPosts(READ_GOODS_ANALYSIS, params))
  }
}

function fetchPosts(actionType, params,callBack) {
  return dispatch => {
    //  dispatch(requestPosts(userid))
    let url=getUrl(params)
    return fetch(url)
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            if (data.returnCode==0)
            {
              if (isFunction(callBack))
              {callBack(data,dispatch,params);}
              dispatch(receivePosts(actionType, data))
           }
           else if (data.returnCode==1003 || data.returnCode==1004 )  {
             message.error(data.returnDescribe);
             storeS.removeItem("sessionKey");
             storeS.removeItem("UserID");
             dispatch(clearUser());
             this.context.router.push('/login');
           }
           else {
             message.error(data.returnDescribe);
           }
          });
        } else {
          message.error('获取数据错误。');
          console.log("Looks like the response wasn't perfect, got status", res.status);
        }
      }, function(e) {
        message.error('网络连接错误');
        console.log("Fetch failed!", e);
      });
  }
}

function receivePosts(actionType, json) {
  return {
    type: actionType,
    receivedJson: json,
    receivedAt: Date.now()
  }
}
