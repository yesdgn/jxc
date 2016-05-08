
'use strict';
import  React  from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import Head from './Head';
import Left from './Left';
import Bottom from './Bottom';

//不包含左边页、头部页  如登录前页面、个性化页面
const singleComponent=[]
//不包含左边页
const cancelLeftComponent=['/users']

class App extends React.Component {
  static defaultProps = {
  };
  static propTypes = {
  };
  constructor(props) {
      super(props);
  };
  componentWillMount() {
   this.props.dispatch(actions.readMainMenu(123456))
  };
  LeftComponent(url)
  {
    if (cancelLeftComponent.includes(url) )
      {
        return(null);
      }
      else {
        return(<Left jsonData={this.props.mainMenu.items} />);
      }
  }
  render() {
      const { dispatch, user } = this.props;
      const url=this.props.location.pathname;
      if (singleComponent.includes(url) )
        {
          return(
            this.props.children
          );
        }
      return(
        <div>
          <Head userInfo={user.userInfo}  addFavorites={() =>
            dispatch(actions.readUser(url))
          } />
          {this.LeftComponent(url)}
          <div style={styles.contentDiv}>
            <div style={styles.breadcrumb}>
            <Breadcrumb >
              <Link to={`/main`}><Breadcrumb.Item>首页</Breadcrumb.Item></Link>
              <Link to={`/users`}><Breadcrumb.Item>应用中心</Breadcrumb.Item></Link>
              <Link to={`/user`}><Breadcrumb.Item>应用列表</Breadcrumb.Item></Link>
              <Breadcrumb.Item>某应用</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {this.props.children}
        </div>
        <Bottom />
      </div>
      );
    }
};

const styles={
  contentDiv:{
    margin:"10px 0px 0px 10px",
    minHeight:"500px",
    overflow:"hidden"
  },
  breadcrumb:{
    margin:"0px 0px 10px  10px",
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
  const { mainMenu,user } = state



  return {
    mainMenu:mainMenu,
    user
  }
}

export default  connect(mapStateToProps)(App)
