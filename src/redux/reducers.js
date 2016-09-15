import {
  concat
} from 'lodash';
import * as actionsType from './actionsType';
export function user(state = {}, action) {
  switch (action.type) {
    case actionsType.USER_LOGIN:
      return {
        ...state,
        userInfo: action.receivedJson.items.item0[0].result == 'success' ? action.receivedJson.items.item1[0] : {}
      }
    case actionsType.USER_REG:
      return {
        ...state,
        regInfo: action.receivedJson
      }
    case actionsType.USER_CLEAR:
      return {}
    case actionsType.SET_FAVORITES:
      return {
        ...state,
        favoriteResult: action.receivedJson
      }
    case actionsType.READ_FAVORITES:
      return {
        ...state,
        favorites: action.receivedJson
      }
    case actionsType.READ_USER_MESSAGES:
      return {
        ...state,
        userMessage: action.receivedJson.items
      }
    case actionsType.READ_USER_MESSAGE:
      return {
        ...state,
        message: action.receivedJson.items.item0[0]
      }
    case actionsType.MESSAGE_DONE:
      return {
        ...state,
        messageDoneResult: action.receivedJson
      }
    case actionsType.USER_LOGOUT:
      return {
        ...state,
        userLogout: true
      }
    case actionsType.READ_USER_LIST:
        return {
          ...state,
          userList: action.receivedJson.items
        }
    case actionsType.READ_USER:
            return {
              ...state,
              user: action.receivedJson.items.item0[0]
            }
    default:
      return state
  }
}

export function common(state = [], action) {
  switch (action.type) {
    case actionsType.READ_MAIN_MENU:
      return {
        ...state,
        mainMenu: action.receivedJson.items
      }
    case actionsType.READ_DICT_GOODSCATEGORY:
      return {
        ...state,
        GoodsCategory: action.receivedJson.items
      }
    case actionsType.READ_DICT_COMPTYPE:
      return {
        ...state,
        CompType: action.receivedJson.items
      }
    case actionsType.READ_DICT_ROUTERETURNTYPE:
      return {
        ...state,
        RouteReturnType: action.receivedJson.items
      }
    case actionsType.READ_DICT_INSTORAGESTATE:
      return {
        ...state,
        InstorageState: action.receivedJson.items
      }
    case actionsType.READ_DICT_OUTSTORAGESTATE:
      return {
        ...state,
        OutstorageState: action.receivedJson.items
      }
    case actionsType.READ_DICT_UNIT:
      return {
        ...state,
        Unit: action.receivedJson.items
      }
    case actionsType.READ_DICT_CUSTTYPE:
      return {
        ...state,
        CustomerCategory: action.receivedJson.items
      }

    case actionsType.USER_CLEAR:
      return {}
    default:
      return state
  }
}

export function chart(state = [], action) {
  switch (action.type) {
    case actionsType.READ_CHART_DATA:
      return {
        ...state,
        items: action.receivedJson.items
      }
    case actionsType.USER_CLEAR:
      return {}
    default:
      return state
  }
}


export function person(state = [], action) {
  switch (action.type) {
    case actionsType.READ_PERSONS:
      return {
        ...state,
        personList: action.receivedJson.items
      }
    case actionsType.READ_PERSON:
      return {
        ...state,
        person: action.receivedJson.items.item0[0]
      }
    case actionsType.READ_PERSONFILE:
      return {
        ...state,
        personImgs: action.receivedJson.items
      }
    case actionsType.USER_CLEAR:
      return {}
    default:
      return state
  }

}

//商品数据
export function goods(state = [], action) {
  switch (action.type) {
    case actionsType.READ_GOODSES:
      return {
        ...state,
        goodses: action.receivedJson.items
      }
    case actionsType.READ_GOODS:
      return {
        ...state,
        goods_M: action.receivedJson.items.item0[0],
        goods_S: action.receivedJson.items.item1
      }
    case actionsType.READ_GOODS_FILE:
      return {
        ...state,
        goodsImgs: action.receivedJson.items
      }
    default:
      return state
  }
}

//公司数据
export function company(state = [], action) {
  switch (action.type) {
    case actionsType.READ_COMPANIES:
      return {
        ...state,
        companies: action.receivedJson.items
      }
    case actionsType.READ_COMPANY:
      return {
        ...state,
        company: action.receivedJson.items.item0[0]
      }
    case actionsType.READ_COMPANY_FILE:
      return {
        ...state,
        compImgs: action.receivedJson.items
      }
    default:
      return state
  }
}
//客户数据
export function customer(state = [], action) {
  switch (action.type) {
    case actionsType.READ_CUSTOMERS:
      return {
        ...state,
        customers: action.receivedJson.items
      }
    case actionsType.READ_CUSTOMER:
      return {
        ...state,
        customer: action.receivedJson.items.item0[0]
      }
    case actionsType.READ_CUSTOMER_FILE:
      return {
        ...state,
        customerImgs: action.receivedJson.items
      }
    default:
      return state
  }
}
//供应商数据
export function supplier(state = [], action) {
  switch (action.type) {
    case actionsType.READ_SUPPLIERS:
      return {
        ...state,
        suppliers: action.receivedJson.items,
      }
    case actionsType.READ_SUPPLIER:
      return {
        ...state,
        supplier: action.receivedJson.items.item0[0]
      }
    case actionsType.READ_SUPPLIER_FILE:
      return {
        ...state,
        supplierImgs: action.receivedJson.items
      }
    default:
      return state
  }
}
//仓库数据
export function warehouse(state = [], action) {
  switch (action.type) {
    case actionsType.READ_WAREHOUSES:
      return {
        ...state,
        warehouses: action.receivedJson.items
      }
    case actionsType.READ_WAREHOUSE:
      return {
        ...state,
        warehouse: action.receivedJson.items.item0[0]
      }
    default:
      return state
  }
}
//路由表
export function routeApi(state = [], action) {
  switch (action.type) {
    case actionsType.READ_ROUTERS:
      return {
        ...state,
        routes: action.receivedJson.items
      }
    case actionsType.READ_ROUTER:
      return {
        ...state,
        route: action.receivedJson.items.item0[0]
      }
      case actionsType.READ_MENU_TREE:
        return {
          ...state,
          menuTree: action.receivedJson.items
        }
    default:
      return state
  }
}
//采购入库
export function inStorage(state = [], action) {
  switch (action.type) {
    case actionsType.READ_INSTORAGE_LIST:
      return {
        ...state,
        inStorageList: action.receivedJson.items
      }
    case actionsType.READ_INSTORAGE:
      return {
        ...state,
        inStorage_M: action.receivedJson.items.item0[0],
        inStorage_S: action.receivedJson.items.item1
      }
    case actionsType.READ_INSTORAGE_IMG:
      return {
        ...state,
        formImgs: action.receivedJson.items
      }
    case actionsType.READ_INSTORAGE_FILE:
      return {
        ...state,
        formFiles: action.receivedJson.items
      }

    case actionsType.READ_GOODS_SELECT:
      return {
        ...state,
        searchResult: action.receivedJson.items
      }
    default:
      return state
  }
}
//销售出库
export function outStorage(state = [], action) {
  switch (action.type) {
    case actionsType.READ_OUTSTORAGE_LIST:
      return {
        ...state,
        outStorageList: action.receivedJson.items
      }
    case actionsType.READ_OUTSTORAGE:
      return {
        ...state,
        outStorage_M: action.receivedJson.items.item0[0],
        outStorage_S: action.receivedJson.items.item1
      }
    case actionsType.READ_OUTSTORAGE_IMG:
      return {
        ...state,
        formImgs: action.receivedJson.items
      }
    case actionsType.READ_OUTSTORAGE_FILE:
      return {
        ...state,
        formFiles: action.receivedJson.items
      }

    case actionsType.READ_OUTSTORAGE_GOODS:
      return {
        ...state,
        searchResult: action.receivedJson.items
      }
    default:
      return state
  }
}
//数据字典
export function dictionary(state = [], action) {
  switch (action.type) {
    case actionsType.READ_DICTIONARY_LIST:
      return {
        ...state,
        dictionaryList: action.receivedJson.items
      }
    case actionsType.READ_DICTIONARY:
      return {
        ...state,
        dictionary_M: action.receivedJson.items.item0[0],
        dictionary_S: action.receivedJson.items.item1
      }
    default:
      return state
  }
}
//导入配置
export function importConf(state = [], action) {
  switch (action.type) {
    case actionsType.READ_IMPORTEXCELCONF_LIST:
      return {
        ...state,
        importConfList: action.receivedJson.items
      }
    case actionsType.READ_IMPORTEXCELCONF:
      return {
        ...state,
        importConf_M: action.receivedJson.items.item0[0],
        importConf_S: action.receivedJson.items.item1
      }
    default:
      return state
  }
}
//收藏夹配置
export function favorites(state = [], action) {
  switch (action.type) {
    case actionsType.READ_FAVORITESLIST:
      return {
        ...state,
        favoritesList: action.receivedJson.items
      }
    case actionsType.READ_MENU_SELECT:
        return {
          ...state,
          searchResult: action.receivedJson.items
        }
    default:
      return state
  }
}
//角色
export function role(state = [], action) {
  switch (action.type) {
    case actionsType.READ_ROLE_LIST:
      return {
        ...state,
        roleList: action.receivedJson.items
      }
    case actionsType.READ_ROLE:
        return {
          ...state,
          role: action.receivedJson.items.item0[0],
          role_user: action.receivedJson.items.item1
        }
    case actionsType.READ_ROLE_USER_SELECT:
          return {
            ...state,
            searchUserResult: action.receivedJson.items
          }
    case actionsType.READ_ROLE_MENU:
            return {
              ...state,
              roleMenu: action.receivedJson.items
            }
    case actionsType.READ_ROLE_RIGHT:
            return {
                ...state,
                roleRight: action.receivedJson.items
            }
    default:
      return state
  }
}
