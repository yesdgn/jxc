import * as APP from '../entry/config';
import * as dgn from '../common/dgn';
import fetch from 'isomorphic-fetch'
import * as CryptoJS from 'crypto-js';
import {message} from 'antd';


//用户
export const USER_LOGIN = 'USER_LOGIN';
export const USER_CLEAR = 'USER_CLEAR';
export const USER_REG = 'USER_REG';

export function userLogin(loginInfo) {
  return (dispatch, getState) => {
    let param={
      loginid:loginInfo.userName,
      logintype:APP.LOGINTYPE,
      usertype:APP.USERTYPE,
      password:CryptoJS.SHA1(loginInfo.password).toString()
    };
    return dispatch(fetchPosts(USER_LOGIN, dgn.getUrl(3,param)))
  }
}

export function userReg(regInfo) {
  return (dispatch, getState) => {
    let param={
      loginid:regInfo.userName,
      logintype:APP.LOGINTYPE,
      usertype:APP.USERTYPE,
      nickname:regInfo.userName,
      checkcode:'nocheck',
      password:CryptoJS.SHA1(regInfo.password).toString()
    };
    return dispatch(fetchPosts(USER_REG, dgn.getUrl(2,param)))
  }
}
export function clearUserInfo() {
  return {
    type: USER_CLEAR
  }
}

//读主菜单信息
export const READ_MAIN_MENU = 'READ_MAIN_MENU'

export function readMainMenu(userid) {
  return (dispatch, getState) => {
    let param={
      userid:userid
    };
    return dispatch(fetchPosts(READ_MAIN_MENU, dgn.getUrl(7,param)))
  }
}

//收藏
export const SET_FAVORITES = 'SET_FAVORITES'

export function setFavorites(UserID) {
  return (dispatch, getState) => {
    let param={
      sessionkey:dgn.storeS.getItem('sessionKey'),
      userid:UserID,
      path:location.pathname,
    };
    return dispatch(fetchPosts(SET_FAVORITES, dgn.getUrl(8,param)))
  }
}

function fetchPosts(actionType, url) {
  return dispatch => {
    //  dispatch(requestPosts(userid))
    return fetch(url)
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            dispatch(receivePosts(actionType, data))
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
