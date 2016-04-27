import { combineReducers } from 'redux'
import { USER_INFO } from './actions'

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

const jxcApp = combineReducers({
  user
})

export default jxcApp
