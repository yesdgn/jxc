import {APISERVERURL} from '../../config'

//读用户信息

export const USER_INFO = 'USER_INFO';
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};
export function readUser(userInfo) {
  return { type: USER_INFO, userInfo }
}

//读主菜单信息
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const READ_MAIN_MENU = 'READ_MAIN_MENU'


export function readMainMenu(userid) {
  return (dispatch, getState) => {

      return dispatch(fetchPosts(userid))

  }
}


function receivePosts( json) {
  return {
    type: RECEIVE_POSTS,
    posts: json,
    receivedAt: Date.now()
  }
}



function fetchPosts(userid) {
  return dispatch => {
  //  dispatch(requestPosts(userid))
    return   fetch(APISERVERURL+`/7?userid=`+userid)
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
