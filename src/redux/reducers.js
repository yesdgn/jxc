import { combineReducers } from 'redux'
import { USER_INFO,READ_MAIN_MENU,INVALIDATE_SUBREDDIT,RECEIVE_POSTS,REQUEST_POSTS } from './actions'

function user(state = {userInfo:{userName:'未登录'}}, action) {
  switch (action.type) {
    case USER_INFO:
      return {
          ...state,
          userInfo: action.userInfo
        }
     default:
      return state
  }
}

function mainMenu(state =[], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts
    default:
      return state
  }
}


const rootReducer = combineReducers({
  user,
  mainMenu
})

export default rootReducer
