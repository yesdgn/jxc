import {concat}  from 'lodash';

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
  USER_LOGOUT,
  READ_PERSONS,
  READ_PERSON,
  READ_PERSONFILE,
  SAVE_PERSON,
  REMOVEFILE,
  READ_GOODSES,
  READ_GOODS,
  READ_GOODS_FILE,
  SAVE_GOODS
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

export function common(state = [], action) {
  switch (action.type) {
    case READ_MAIN_MENU:
      return {
        ...state,
        mainMenu: action.receivedJson.items
      }
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
        items: action.receivedJson.items
      }
    case USER_CLEAR:
      return {}
    default:
      return state
  }
}


export function persons(state = [], action) {
  switch (action.type) {
    case READ_PERSONS:
      return {
        ...state,
        personList: action.receivedJson.items
      }
    case READ_PERSON:
      return {
        ...state,
        personInfo: action.receivedJson.items.item0[0]
      }
    case READ_PERSONFILE:
        return {
          ...state,
          personImgs: action.receivedJson.items
        }
    case SAVE_PERSON:
      return {
        ...state,
        saveResult: action.receivedJson.items,
        personInfo:action.srcData
      }
    case USER_CLEAR:
      return {}
    default:
      return state
  }

}

//基础数据
export function baseData(state = [], action) {
  switch (action.type) {
    case READ_GOODSES:
      return {
        ...state,
        goodses: action.receivedJson.items
      }
    case READ_GOODS:
        return {
          ...state,
          goods: action.receivedJson.items[0]
        }
    case READ_GOODS_FILE:
            return {
              ...state,
              goodsImgs: action.receivedJson.items
            }
    case SAVE_GOODS:
                return {
                  ...state,
                  saveGoodsResult: action.receivedJson.items[0],
                  goods:action.srcData
                }
    default:
      return state
  }
}
