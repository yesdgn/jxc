import * as APP from '../../config';
import fetch from 'isomorphic-fetch'
var CryptoJS = require('crypto-js');
import {message} from 'antd';

//用户登录
export const USER_LOGIN = 'USER_LOGIN';
export const USER_CLEAR = 'USER_CLEAR';
export function userLogin(loginInfo) {
  return (dispatch, getState) => {
    let url=APP.APISERVERURL+`/3?appid=`+APP.APPID+`&appsecret=`+APP.APPSECRET+`&loginid=`+loginInfo.userName+`&logintype=`+APP.LOGINTYPE+`&usertype=`+APP.USERTYPE+`&password=`+CryptoJS.SHA1(loginInfo.password).toString() ;
    return dispatch(fetchPosts(USER_LOGIN,url))
  }
}
export function clearUserInfo() {
  return {
    type: USER_CLEAR
  }
 }
function fetchPosts(actionType,url) {
  return dispatch => {
  //  dispatch(requestPosts(userid))
    return   fetch(url)
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
function receivePosts( actionType,json) {
  return {
    type: actionType,
    receivedJson: json,
    receivedAt: Date.now()
  }
}

//读主菜单信息
export const READ_MAIN_MENU = 'READ_MAIN_MENU'

export function readMainMenu(userid) {
  return (dispatch, getState) => {
      return dispatch(fetchPosts(READ_MAIN_MENU,APP.APISERVERURL+`/7?userid=`+userid))
  }
}
