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
import * as dgn from '../common/dgn';

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
    dgn.storeS.removeItem("sessionKey");
    dgn.storeS.removeItem("UserID");
    this.props.dispatch(actions.clearUser())
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
  onMsgDone=(msg,index,mouseEvent)=>{
    if (mouseEvent.target.innerText=='完成')
    {this.props.dispatch(actions.messageFinished(msg.ID));}
  };
  getCustomProps(ComponentName)
  {
      switch (ComponentName) {
        case 'Main':
              return {msgDataSource:this.props.user.userMessage?this.props.user.userMessage.items:[]
              ,onMsgDone:this.onMsgDone
              ,readMessage:function(){ this.props.dispatch(actions.readMessage())}.bind(this)}
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
          addFavorites={() => dispatch(actions.setFavorites())}
          logout={this.logout}
          />
        {this.LeftComponent(url)}
        <div style={styles.contentDiv}>
          <div style={styles.breadcrumb}>
            <Breadcrumb {...this.props} />
          </div>
          {React.cloneElement(this.props.children, this.getCustomProps(this.props.children.type.displayName))}
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
