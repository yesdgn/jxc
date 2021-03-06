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
  readMessages,
  setFavorites,
  readMainMenu,
  readFavorites,
  readChartData,
  readDict
 } from '../redux/actions'
import Head from './Head';
import Left from './Left';
import Bottom from './Bottom';
import {storeS} from '../common/dgn';

//不包含左边页、头部页  如登录前页面、个性化页面
const singleComponent = ['/', '/reguser', '/newPass', '/login']
//不包含左边页
const cancelLeftComponent = []
var userInfo;



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

  mainLoad = () => {
    this.props.dispatch(readChartData());
    this.props.dispatch(readMessages());
    this.props.dispatch(readDict(actionsType.READ_DICT_UNIT, '6365673372633792600'));
  }
  headLoad=()=>{
    this.props.dispatch(readFavorites());
  //  this.props.dispatch(readMessages(10,1));
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
        <Head userInfo={userInfo} onLoad={this.headLoad} favMenuData={user.favorites
          ? user.favorites.items
          : []} msgQty={user.userMessage
          ? user.userMessage.item0[0].TotalCount
          : 0} addFavorites={() => dispatch(setFavorites())} logout={this.logout}/>
         {this.LeftComponent(url)}
        <div className="contentDiv">
          <div className="breadcrumb">
            <Breadcrumb {...this.props}/>
          </div>
          {React.cloneElement(this.props.children, this.getCustomProps(this.props.children.props.route.path))}
        </div>
        <Bottom/>
      </div>
    );
  }
};

function mapStateToProps(state) {
  userInfo = storeS.getJson('userInfo');
  if (!userInfo){userInfo={};}
  const {
    common,
    user,
    chart
  } = state
  return {
    common,
    user,
    chart  }
}

export default connect(mapStateToProps)(App)
