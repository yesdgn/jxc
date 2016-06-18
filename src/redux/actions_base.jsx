import fetch from 'isomorphic-fetch'
import {message} from 'antd';
import {isFunction}  from 'lodash';
import {userLogout} from '../redux/actions'
import {storeS,getUrl} from '../common/dgn';
import {APP_CONFIG} from '../entry/config';

export function fetchGet(actionType, params,callBack) {
  return dispatch => {
    //  dispatch(requestPosts(userid))
    let url=getUrl('get',params)
    return fetch(url)
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            if (data.returnCode==0)
            {
              if (isFunction(callBack))
              {callBack(data,dispatch,params);}
              dispatch(receiveData(actionType, data))
           }
           else if (data.returnCode==1003 || data.returnCode==1004 )  {
             message.error(data.returnDescribe);
             storeS.removeItem("sessionKey");
             storeS.removeItem("UserID");
             dispatch(userLogout());
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


export function fetchPost(actionType, params,callBack) {
  return dispatch => {
    //  dispatch(requestPosts(userid))
    let url=APP_CONFIG.APISERVERURL+'/'+params.apiid;
    return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: getUrl('post',params)
      })
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            if (data.returnCode==0)
            {
              if (isFunction(callBack))
              {callBack(data,dispatch,params);}
              dispatch(receiveData(actionType, data))
           }
           else if (data.returnCode==1003 || data.returnCode==1004 )  {
             message.error(data.returnDescribe);
             storeS.removeItem("sessionKey");
             storeS.removeItem("UserID");
             dispatch(userLogout());
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

function receiveData(actionType, json) {
  return {
    type: actionType,
    receivedJson: json,
    receivedAt: Date.now()
  }
}
