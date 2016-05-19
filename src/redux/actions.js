import {APISERVERURL} from '../../config';
import fetch from 'isomorphic-fetch'
var CryptoJS = require('crypto-js');




//读主菜单信息
export const READ_MAIN_MENU = 'READ_MAIN_MENU'


export function readMainMenu(userid) {
  return (dispatch, getState) => {
      return dispatch(fetchPosts(READ_MAIN_MENU,APISERVERURL+`/7?userid=`+userid))

  }
}


function receivePosts( actionType,json) {
  return {
    type: actionType,
    receivedJson: json,
    receivedAt: Date.now()
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
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    }, function(e) {
      console.log("Fetch failed!", e);
    });

  }
}


//用户登录
export const USER_LOGIN = 'USER_LOGIN';


export function userLogin(loginInfo) {
  return (dispatch, getState) => {
    let url=APISERVERURL+`/3?appid=1000&appsecret=friuiowqueoikdsjkwoieuo&loginid=`+loginInfo.userName+`&logintype=6&usertype=1&password=`+CryptoJS.SHA1(loginInfo.password).toString() ;
    return dispatch(fetchPosts(USER_LOGIN,url))
  }
}
