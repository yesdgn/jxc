
'use strict';
import  React  from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router';
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
      this.state={
      };
  };
  componentDidMount() {

  };

    render() {

      return(
        <div>
          <Head />
          <Left />
          <div style={styles.contentDiv}>
            <div style={styles.breadcrumb}>
            <Breadcrumb >
              <Link to={`/main`}><Breadcrumb.Item>首页</Breadcrumb.Item></Link>
              <Link to={`/users/`}><Breadcrumb.Item>应用中心</Breadcrumb.Item></Link>
              <Link to={`/user/`}><Breadcrumb.Item>应用列表</Breadcrumb.Item></Link>
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

export default Content
