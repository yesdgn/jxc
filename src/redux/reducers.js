import {
  concat
} from 'lodash';

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
  SAVE_GOODS,
  READ_DICT_GOODSCATEGORY,
  READ_COMPANIES,
  READ_COMPANY,
  SAVE_COMPANY,
  READ_DICT_COMPTYPE,
  READ_COMPANY_FILE,
  READ_CUSTOMERS,
  READ_CUSTOMER,
  SAVE_CUSTOMER,
  READ_CUSTOMER_FILE,
  READ_SUPPLIERS,
  READ_SUPPLIER,
  SAVE_SUPPLIER,
  READ_SUPPLIER_FILE,
  READ_WAREHOUSES,
  READ_WAREHOUSE,
  SAVE_WAREHOUSE,
  READ_ROUTERS,
  READ_ROUTER,
  SAVE_ROUTER,
  READ_DICT_ROUTERETURNTYPE
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
      case READ_DICT_GOODSCATEGORY:
        return {
          ...state,
          GoodsCategory:action.receivedJson.items
        }
        case READ_DICT_COMPTYPE:
          return {
            ...state,
            CompType:action.receivedJson.items
          }
          case READ_DICT_ROUTERETURNTYPE:
            return {
              ...state,
              RouteReturnType:action.receivedJson.items
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
        personInfo: action.srcData
      }
    case USER_CLEAR:
      return {}
    default:
      return state
  }

}

//商品数据
export function goods(state = [], action) {
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
        saveGoodsResult: action.receivedJson.items[0]
      }
    case RESULT_CLEAR:
      return {
        ...state,
        saveGoodsResult:{}
      }
    default:
      return state
  }
}

//公司数据
export function company(state = [], action) {
  switch (action.type) {
    case READ_COMPANIES:
      return {
        ...state,
        companies: action.receivedJson.items
      }
    case READ_COMPANY:
      return {
        ...state,
        company: action.receivedJson.items[0]
      }
      case READ_COMPANY_FILE:
        return {
          ...state,
          compImgs: action.receivedJson.items
        }
    case SAVE_COMPANY:
      return {
        ...state,
        saveCompanyResult: action.receivedJson.items[0]
      }
    case RESULT_CLEAR:
      return {
        ...state,
        saveCompanyResult:{}
      }
    default:
      return state
  }
}
//客户数据
export function customer(state = [], action) {
  switch (action.type) {
    case READ_CUSTOMERS:
      return {
        ...state,
        customers: action.receivedJson.items
      }
    case READ_CUSTOMER:
      return {
        ...state,
        customer: action.receivedJson.items[0]
      }
      case READ_CUSTOMER_FILE:
        return {
          ...state,
          customerImgs: action.receivedJson.items
        }
    case SAVE_CUSTOMER:
      return {
        ...state,
        saveCustomerResult: action.receivedJson.items[0]
      }
    case RESULT_CLEAR:
      return {
        ...state,
        saveCustomerResult:{}
      }
    default:
      return state
  }
}
//供应商数据
export function supplier(state = [], action) {
  switch (action.type) {
    case READ_SUPPLIERS:
      return {
        ...state,
        suppliers: action.receivedJson.items
      }
    case READ_SUPPLIER:
      return {
        ...state,
        supplier: action.receivedJson.items[0]
      }
      case READ_SUPPLIER_FILE:
        return {
          ...state,
          supplierImgs: action.receivedJson.items
        }
    case SAVE_SUPPLIER:
      return {
        ...state,
        saveSupplierResult: action.receivedJson.items[0]
      }
    case RESULT_CLEAR:
      return {
        ...state,
        saveSupplierResult:{}
      }
    default:
      return state
  }
}
//仓库数据
export function warehouse(state = [], action) {
  switch (action.type) {
    case READ_WAREHOUSES:
      return {
        ...state,
        warehouses: action.receivedJson.items
      }
    case READ_WAREHOUSE:
      return {
        ...state,
        warehouse: action.receivedJson.items[0]
      }
    case SAVE_WAREHOUSE:
      return {
        ...state,
        saveWarehouseResult: action.receivedJson.items[0]
      }
    case RESULT_CLEAR:
      return {
        ...state,
        saveWarehouseResult:{}
      }
    default:
      return state
  }
}
//路由表
export function routeApi(state = [], action) {
  switch (action.type) {
    case READ_ROUTERS:
      return {
        ...state,
        routes: action.receivedJson.items
      }
    case READ_ROUTER:
      return {
        ...state,
        route: action.receivedJson.items[0]
      }
    case SAVE_ROUTER:
      return {
        ...state,
        saveRouteResult: action.receivedJson.items[0]
      }
    case RESULT_CLEAR:
      return {
        ...state,
        saveRouteResult:{}
      }
    default:
      return state
  }
}
