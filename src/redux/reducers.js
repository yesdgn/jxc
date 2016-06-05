import {
  USER_LOGIN,
  USER_REG,
  READ_MAIN_MENU,
  USER_CLEAR,
  SET_FAVORITES,
  RESULT_CLEAR,
  READ_FAVORITES,
  READ_USER_MESSAGE,
  MESSAGE_DONE,
  READ_CHART_DATA,
  USER_LOGOUT
} from './actions'

export function user(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userLoginResult: action.receivedJson,
        userInfo: action.receivedJson.items.item0[0].result == 'success' ? action.receivedJson.items.item1[0] : {}
      }
    case USER_REG:
      return {
        ...state,
        regInfo: action.receivedJson
      }
    case USER_CLEAR:
      return {}
    case SET_FAVORITES:
      return {
        ...state,
        favoriteResult: action.receivedJson
      }
    case READ_FAVORITES:
      return {
        ...state,
        favorites: action.receivedJson
      }
    case RESULT_CLEAR:
      return {
        ...state,
        userLoginResult: {}
      }
    case READ_USER_MESSAGE:
      return {
        ...state,
        userMessage: action.receivedJson
      }
    case MESSAGE_DONE:
      return {
        ...state,
        messageDoneResult: action.receivedJson
      }
    case USER_LOGOUT:
        return {
          ...state,
          userLogout: true
        }
    default:
      return state
  }
}

export function mainMenu(state = [], action) {
  switch (action.type) {
    case READ_MAIN_MENU:
      return action.receivedJson
    case USER_CLEAR:
        return {}
    default:
      return state
  }
}

export function chart(state = [], action) {
  switch (action.type) {
    case READ_CHART_DATA:
      return {
        ...state,
        items:action.receivedJson.items
      }
    case USER_CLEAR:
        return {}
    default:
      return state
  }
}
