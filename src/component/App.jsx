'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actionsType from '../redux/actionsType';
import {
  clearUser,
  messageFinished,
  readMessage,
  setFavorites,
  readPersons,
  readMainMenu,
  readFavorites,
  readChartData,
  readPerson,
  removeFile,
  clearResult,
  savePerson,
  readUploadFile,
  readGoodses,
  readGoods,
  saveGoods,
  readDict,
  readCompanies,
  readCompany,
  saveCompany,
  readCustomers,
  readCustomer,
  saveCustomer,
  readSuppliers,
  readSupplier,
  saveSupplier,
  readWarehouses,
  readWarehouse,
  saveWarehouse,
  readRoutes,
  readInStorageList,
} from '../redux/actions'
import Head from './Head';
import Left from './Left';
import Bottom from './Bottom';
import {storeS} from '../common/dgn';

//不包含左边页、头部页  如登录前页面、个性化页面
const singleComponent = ['/', '/reguser', '/newPass', '/login']
//不包含左边页
const cancelLeftComponent = []

class App extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userLogout && nextProps.user.userLogout == true) {
      this.logout();
    }
  }
  logout = () => {
    storeS.removeItem("sessionKey");
    storeS.removeItem("userInfo");
    this.props.dispatch(clearUser())
    this.context.router.push('/login');
  }
  LeftComponent = (url) => {
    if (cancelLeftComponent.indexOf(url) >= 0) {
      return (null);
    } else {
      return (<Left menuData={this.props.common.mainMenu} onLoad={() => this.props.dispatch(readMainMenu())}/>);
    }
  }
  onMsgDone = (msgID) => {
    this.props.dispatch(messageFinished(msgID));
  };
  mainLoad = () => {
    this.props.dispatch(readChartData());
    this.props.dispatch(readMessage());
  }
  getCustomProps(pathname)
  {
    //console.log(pathname);
    switch (pathname) {
      case 'main':
        return {
          dataSource: this.props.chart.items
            ? this.props.chart.items
            : [],
          onLoad: this.mainLoad
        }
        break;
      case 'messageList':
        return {
          dataSource: this.props.user.userMessage
            ? this.props.user.userMessage.items
            : [],
          onMsgDone: this.onMsgDone,
          onLoad: () => this.props.dispatch(readMessage())
        }
        break;
      case 'personList':
        return {
          dataSource: this.props.persons.personList
            ? this.props.persons.personList
            : [],
          onLoad: (pageSize, curPage) => this.props.dispatch(readPersons(pageSize, curPage))
        }
        break;
      case '/person/:personID':
        return {
          dataItem: this.props.persons.personInfo
            ? this.props.persons.personInfo
            : {},
          dataItemImgs: this.props.persons.personImgs
            ? this.props.persons.personImgs
            : [],
          onLoad: () => this.props.dispatch(readPerson(this.props.params.personID)),
          removeFile: (fileid) => this.props.dispatch(removeFile(fileid)),
          saveDataItem: (data) => this.props.dispatch(savePerson(data))
        }
        break;
      case 'goodsList':
        return {
          dataSource: this.props.goods.goodses
            ? this.props.goods.goodses
            : [],
          onLoad: (pageSize, curPage) => this.props.dispatch(readGoodses(pageSize, curPage))
        }
        break;
      case '/goods/:goodsID':
        return {
          dataItem: this.props.goods,
          common: this.props.common,
          onLoad: () => {
            this.props.dispatch(readDict(actionsType.READ_DICT_GOODSCATEGORY, '6365673372633792522'))
          },
          onLoadDataItem: () => {
            this.props.dispatch(readGoods(this.props.params.goodsID))
          },
          removeFile: (fileid) => this.props.dispatch(removeFile(fileid)),
          saveDataItem: (data) => this.props.dispatch(saveGoods(data)),
          clearResult: () => this.props.dispatch(clearResult())
        }
        break;
      case 'companyList':
        return {
          dataSource: this.props.company.companies
            ? this.props.company.companies
            : [],
          onLoad: (pageSize, curPage) => this.props.dispatch(readCompanies(pageSize, curPage))
        }
        break;
      case '/company/:companyID':
        return {
          dataItem: this.props.company,
          common: this.props.common,
          onLoad: () => {
            this.props.dispatch(readDict(actionsType.READ_DICT_COMPTYPE, '6365673372633792525'))
          },
          onLoadDataItem: () => {
            this.props.dispatch(readCompany(this.props.params.companyID))
          },
          removeFile: (fileid) => this.props.dispatch(removeFile(fileid)),
          saveDataItem: (data) => this.props.dispatch(saveCompany(data)),
          clearResult: () => this.props.dispatch(clearResult())
        }
        break;
      case 'customerList':
        return {
          dataSource: this.props.customer.customers
            ? this.props.customer.customers
            : [],
          onLoad: (pageSize, curPage) => this.props.dispatch(readCustomers(pageSize, curPage))
        }
        break;
      case '/customer/:customerID':
        return {
          dataItem: this.props.customer,
          common: this.props.common,
          onLoad: () => {
            this.props.dispatch(readDict(actionsType.READ_DICT_COMPTYPE, '6365673372633792525'))
          },
          onLoadDataItem: () => {
            this.props.dispatch(readCustomer(this.props.params.customerID))
          },
          removeFile: (fileid) => this.props.dispatch(removeFile(fileid)),
          saveDataItem: (data) => this.props.dispatch(saveCustomer(data)),
          clearResult: () => this.props.dispatch(clearResult())
        }
        break;
      case 'supplierList':
        return {
          dataSource: this.props.supplier.suppliers
            ? this.props.supplier.suppliers
            : [],
          onLoad: (pageSize, curPage) => this.props.dispatch(readSuppliers(pageSize, curPage))
        }
        break;
      case '/supplier/:supplierID':
        return {
          dataItem: this.props.supplier,
          common: this.props.common,
          onLoad: () => {
            this.props.dispatch(readDict(actionsType.READ_DICT_COMPTYPE, '6365673372633792525'))
          },
          onLoadDataItem: () => {
            this.props.dispatch(readSupplier(this.props.params.supplierID))
          },
          removeFile: (fileid) => this.props.dispatch(removeFile(fileid)),
          saveDataItem: (data) => this.props.dispatch(saveSupplier(data)),
          clearResult: () => this.props.dispatch(clearResult())
        }
        break;
      case 'warehouseList':
        return {
          dataSource: this.props.warehouse.warehouses
            ? this.props.warehouse.warehouses
            : [],
          onLoad: (pageSize, curPage) => this.props.dispatch(readWarehouses(pageSize, curPage))
        }
        break;
      case '/warehouse/:warehouseID':
        return {
          dataItem: this.props.warehouse,
          common: this.props.common,
          onLoadDataItem: () => {
            this.props.dispatch(readWarehouse(this.props.params.warehouseID))
          },
          saveDataItem: (data) => this.props.dispatch(saveWarehouse(data)),
          clearResult: () => this.props.dispatch(clearResult())
        }
        break;
        case 'routeApiList':
          return {
            dataSource: this.props.routeApi.routes
              ? this.props.routeApi.routes
              : [],
            onLoad: (pageSize, curPage) => this.props.dispatch(readRoutes(pageSize, curPage))
          }
          break;
        case 'inStorageList':
              return {
                dataSource: this.props.inStorage.inStorageList
                  ? this.props.inStorage.inStorageList
                  : [],
                  common: this.props.common,
                onLoad: (pageSize, curPage) => this.props.dispatch(readInStorageList(pageSize, curPage))
              }
              break;

      default:
        return {dispatch:this.props.dispatch};
    }

  }
  render() {
    const {dispatch, user} = this.props;
    const url = this.props.location.pathname;
    if (singleComponent.indexOf(url) >= 0) {
      return (this.props.children);
    }

    return (
      <div>
        <Head userInfo={user.userInfo} onLoad={() => dispatch(readFavorites())} favMenuData={user.favorites
          ? user.favorites.items
          : []} msgQty={user.userMessage
          ? user.userMessage.items.length
          : 0} addFavorites={() => dispatch(setFavorites())} logout={this.logout}/> {this.LeftComponent(url)}
        <div style={styles.contentDiv}>
          <div style={styles.breadcrumb}>
            <Breadcrumb {...this.props}/>
          </div>
          {React.cloneElement(this.props.children, this.getCustomProps(this.props.children.props.route.path))}
        </div>
        <Bottom/>
      </div>
    );
  }
};

const styles = {
  contentDiv: {
    margin: "10px 0px 0px 10px",
    minHeight: "500px",
    overflow: "hidden"
  },
  breadcrumb: {
    margin: "0px 0px 10px  10px"
  }
}

//将state.user绑定到props的user
// function mapStateToProps(state) {
//   return {
//     user: state.user
//
//   }
// };
function mapStateToProps(state) {
  const {
    common,
    user,
    chart,
    persons,
    goods,
    company,
    customer,
    supplier,
    warehouse,
    routeApi,
    inStorage
  } = state
  return {
    common,
    user,
    chart,
    persons,
    goods,
    company,
    customer,
    supplier,
    warehouse,
    routeApi,
    inStorage
  }
}

export default connect(mapStateToProps)(App)
