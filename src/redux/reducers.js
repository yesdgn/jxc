import { combineReducers } from 'redux'
import { USER_LOGIN,READ_MAIN_MENU,RECEIVE_POSTS,REQUEST_POSTS,RECEIVE_REG_POST } from './actions'

function user(state={} , action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
          ...state,
          userInfo: action.loginInfo
        }
    case RECEIVE_REG_POST:
          return {
            ...state,
            regResult:action.posts.items[0]}
     default:
      return state
  }
}

function mainMenu(state=[] , action) {
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
