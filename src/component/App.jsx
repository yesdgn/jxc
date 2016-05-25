'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import * as actions from '../redux/actions'
import Head from './Head';
import Left from './Left';
import Bottom from './Bottom';

//不包含左边页、头部页  如登录前页面、个性化页面
const singleComponent = ['/', '/reguser', '/newPass', '/login']
//不包含左边页
const cancelLeftComponent = []

class App extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
  };
  componentWillMount() {};

  LeftComponent(url)
  {
    if (cancelLeftComponent.indexOf(url) >= 0) {
      return (null);
    } else {
      return (<Left  menuData={this.props.mainMenu.items} onLoadMenuData={() => this.props.dispatch(actions.readMainMenu(this.props.user.userInfo.UserID))}/>);
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
        <Head userInfo={this.props.user.userInfo} favMenuData={this.props.user.favorites?this.props.user.favorites.items:[]}
          addFavorites={() => dispatch(actions.setFavorites(this.props.user.userInfo.UserID))}
          clearUser={() => dispatch(actions.clearUser())}
          onLoadFavData={() => this.props.dispatch(actions.readFavorites(this.props.user.userInfo.UserID))}/>
        {this.LeftComponent(url)}
        <div style={styles.contentDiv}>
          <div style={styles.breadcrumb}>
            <Breadcrumb {...this.props} />
          </div>
          {this.props.children}
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
  const {mainMenu, user} = state
  return {mainMenu: mainMenu, user}
}

export default connect(mapStateToProps)(App)
