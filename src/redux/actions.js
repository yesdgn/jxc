
import {APISERVERURL} from '../../config';
import fetch from 'isomorphic-fetch'
var CryptoJS = require('crypto-js');

//用户信息
export const USER_LOGIN = 'USER_LOGIN';

export function userLogin(loginInfo) {
  return { type: USER_LOGIN, loginInfo }
}

//读主菜单信息
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const READ_MAIN_MENU = 'READ_MAIN_MENU'


export function readMainMenu(userid) {
  return (dispatch, getState) => {
      return dispatch(fetchPosts(userid,APISERVERURL+`/7?userid=`+userid))

  }
}


function receivePosts( json) {
  return {
    type: RECEIVE_POSTS,
    posts: json,
    receivedAt: Date.now()
  }
}



function fetchPosts(data,url) {
  return dispatch => {
  //  dispatch(requestPosts(userid))
    return   fetch(url)
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          dispatch(receivePosts( data))
        });
      } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    }, function(e) {
      console.log("Fetch failed!", e);
    });

  }
}


//用户注册

export const USER_REG = 'USER_REG'
export const RECEIVE_REG_POST = 'RECEIVE_REG_POST'

export function userReg(regInfo) {
  return (dispatch, getState) => {
      return dispatch(fetchPosts1(regInfo,APISERVERURL+`/2?loginid=`+regInfo.userName+`&nickname=`+regInfo.userName+`&logintype=6&usertype=1&password=`+CryptoJS.SHA1(regInfo.password).toString()+`&checkcode=nocheck`))
  }
}
function receivePosts1( json) {
  return {
    type: RECEIVE_REG_POST,
    posts: json,
    receivedAt: Date.now()
  }
}



function fetchPosts1(data,url) {
  return dispatch => {
  //  dispatch(requestPosts(userid))
    return   fetch(url)
    .then(res => {
      if (res.ok) {
        res.json().then(data => {
          dispatch(receivePosts1( data))
        });
      } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    }, function(e) {
      console.log("Fetch failed!", e);
    });

  }
}
