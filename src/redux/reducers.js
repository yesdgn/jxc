import { combineReducers } from 'redux'
import { USER_LOGIN,READ_MAIN_MENU,USER_REG } from './actions'

function user(state={} , action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
          ...state,
          userInfo: action.loginInfo
        }
    case USER_REG:
          return {
            ...state,
            regResult:action.receivedJson.items[0]}
     default:
      return state
  }
}

function mainMenu(state=[] , action) {
  switch (action.type) {
    case READ_MAIN_MENU:
      return action.receivedJson
    default:
      return state
  }
}



const rootReducer = combineReducers({
  user,
  mainMenu
})

export default rootReducer
