import fetch from 'isomorphic-fetch'
import {message} from 'antd';
import {isFunction, isArray} from 'lodash';
import {userLogout} from '../redux/actions'
import {storeS, getUrl} from '../common/dgn';
import {APP_CONFIG} from '../entry/config';
//params:传给服务端的各种参数，srcData:类似于保存时表单的数据 传入后可以给reducers使用,
//option:一些选项，用来控制是否需要显示服务端消息等。
export function fetchGet(actionType, params, callBack,  option,srcData) {
  return dispatch => {
    //  dispatch(requestPosts(userid))
    let url = getUrl('get', params)
    return fetch(url).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.returnCode == 0) {
            if (!option || option.isNeedDispatch===true)
            {dispatch(receiveData(actionType, data, srcData))}
            if (isFunction(callBack)) {
              callBack(data, params, dispatch);
            }
          } else if (data.returnCode == 1003 || data.returnCode == 1004) {
            message.error(data.returnDescribe);
            storeS.removeItem("sessionKey");
            storeS.removeItem("userInfo");
            dispatch(userLogout());
          } else {
            message.error(data.returnDescribe);
          }
        });
      } else {
        message.error('获取数据错误。');
        //console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    }, function(e) {
      message.error('网络连接错误');
      //console.log("Fetch failed!", e);
    });
  }
}

export function fetchPost(actionType, params, callBack, option, srcData) {
  return dispatch => {
    //  dispatch(requestPosts(userid))
    let url = APP_CONFIG.APISERVERURL + '/' + params.apiid;
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: getUrl('post', params)
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          if (data.returnCode == 0) {
            if (!option || option.isNeedDispatch===true)
            {dispatch(receiveData(actionType, data, srcData))}
            if (isFunction(callBack)) {
              callBack(data, params, dispatch);
            }
          } else if (data.returnCode == 1003 || data.returnCode == 1004) {
            message.error(data.returnDescribe);
            storeS.removeItem("sessionKey");
            storeS.removeItem("userInfo");
            dispatch(userLogout());
          } else {
            message.error(data.returnDescribe);
          }
        });
      } else {
        message.error('获取数据错误。');
        //console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    }, function(e) {
      message.error('网络连接错误');
    //  console.log("Fetch failed!", e);
    });
  }
}

function receiveData(actionType, json, srcData) {
  return {type: actionType, receivedJson: json, srcData: srcData, receivedAt: Date.now()}
}
