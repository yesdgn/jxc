import fetch from 'isomorphic-fetch'
import {message} from 'antd';
import {isFunction}  from 'lodash';
import {userLogout} from '../redux/actions'
import {storeS,getUrl} from '../common/dgn';

export function fetchPosts(actionType, params,callBack) {
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

function receivePosts(actionType, json) {
  return {
    type: actionType,
    receivedJson: json,
    receivedAt: Date.now()
  }
}
