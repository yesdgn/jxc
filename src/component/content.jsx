
'use strict';
import  React  from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import * as actions from './actions'
import Head from './Head';
import Left from './Left';
import Bottom from './Bottom';
import Main from './Main';

class Content extends React.Component {
  static defaultProps = {
  };
  static propTypes = {
  };
  constructor(props) {
      super(props);
  };
  componentDidMount() {
  };

  render() {
      // 通过调用 connect() 注入:
      const { dispatch, user } = this.props
      return(
        <div>
          <Head userInfo={user.userInfo} addFavorites={url =>
            dispatch(actions.readUser(url))
          } />
          <Left />
          <div style={styles.contentDiv}>
            <div style={styles.breadcrumb}>
            <Breadcrumb >
              <Link to={`/`}><Breadcrumb.Item>首页</Breadcrumb.Item></Link>
              <Link to={`/users`}><Breadcrumb.Item>应用中心</Breadcrumb.Item></Link>
              <Link to={`/user`}><Breadcrumb.Item>应用列表</Breadcrumb.Item></Link>
              <Breadcrumb.Item>某应用</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {this.props.children || <Main /> }
        </div>
        <Bottom />
      </div>
      );
    }
};

const styles={
  contentDiv:{
    margin:"10px 0px 0px 250px",
    minHeight:"500px"
  },
  breadcrumb:{
    marginBottom:"10px"
  }
}

//将state.user绑定到props的user
function mapStateToProps(state) {
  return {
    user: state.user
  }
};

export default  connect(mapStateToProps)(Content)
