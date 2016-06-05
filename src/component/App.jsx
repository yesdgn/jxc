'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Breadcrumb} from 'antd';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import {clearUser,messageFinished,readMessage,setFavorites} from '../redux/actions'
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

  logout=()=>{
    storeS.removeItem("sessionKey");
    storeS.removeItem("UserID");
    this.props.dispatch(clearUser())
    this.context.router.push('/login');
  }
  LeftComponent(url)
  {
    if (cancelLeftComponent.indexOf(url) >= 0) {
      return (null);
    } else {
      return (<Left  menuData={this.props.mainMenu.items} />);
    }
  }
  onMsgDone=(msgID)=>{
   this.props.dispatch(messageFinished(msgID));
  };
  readMessage=()=>{
    this.props.dispatch(readMessage());
  }
  getCustomProps(pathname)
  {
      switch (pathname) {
        case '/messages':
              return {msgDataSource:this.props.user.userMessage?this.props.user.userMessage.items:[]
                ,onMsgDone:this.onMsgDone
                ,readMessage:this.readMessage}
          break;
        default:
          return {};
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
        <Head userInfo={user.userInfo}
          favMenuData={user.favorites?user.favorites.items:[]}
          msgQty={user.userMessage?user.userMessage.items.length:0}
          addFavorites={() => dispatch(setFavorites())}
          logout={this.logout}
          />
        {this.LeftComponent(url)}
        <div style={styles.contentDiv}>
          <div style={styles.breadcrumb}>
            <Breadcrumb {...this.props} />
          </div>
          {React.cloneElement(this.props.children,this.getCustomProps(this.props.location.pathname))}
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
