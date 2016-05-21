'use strict';
import React from 'react';
import {
  Row,
  Col,
  Menu,
  Dropdown,
  Icon,
  Tooltip,
  Badge
} from 'antd';
import {Link} from 'react-router';
import * as dgn from '../common/dgn';
import * as APP from '../entry/config';

class Head extends React.Component {
  static defaultProps = {
  };
  static propTypes = {
    userInfo: React.PropTypes.object.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);

  };
  componentWillMount() {};
  addFavorites() {
    this.props.addFavorites();
  }
  menuClick=({key}) =>{
    if (`${key}`==='2')
    {
      dgn.storeS.removeItem("sessionKey");
      this.props.clearUserInfo();
      this.context.router.push('/login');
    }
  };

  render() {
    const menu = (
      <Menu onClick={this.menuClick}>
        <Menu.Item key="2">注销</Menu.Item>
      </Menu>
    )
    const {userInfo} = this.props;
    return (
      <div style={styles.headrow}>
        <img src="logo.png" style={styles.logoimg}/>
        <div style={styles.rightcol}>
          <Dropdown overlay={menu} style={styles.rightcol}>
             <Link to={`/users/`+userInfo.UserID}  className="ant-dropdown-link"  >
              {userInfo.Name}<Icon type="down"/>
            </Link>
          </Dropdown>
        </div>
        <a style={styles.rightcol2} onClick={this.addFavorites.bind(this)}>
          <Tooltip title="收藏本页"><Icon type="star-o"/></Tooltip>
        </a>
        <Link to={`/users`} style={styles.rightcol3}>
          <Tooltip title="消息">
            <Badge count={33} overflowCount={9}>
              <Icon type="mail" style={styles.rightcol3_1}/>
            </Badge>
          </Tooltip>
        </Link>
        <div style={styles.appcol}>
          <h1>{APP.APPNAME}</h1>
          <h3>{APP.APPURL}</h3>
        </div>

      </div>
    );
  }
};

const styles = {
  headrow: {
    height: "80px",
    backgroundColor: "#0d0e0e"
  },
  logoimg: {
    maxHeight: "80px",
    float: "left",
    padding: "15px"
  },
  appcol: {
    height: "80px",
    display: "table-cell",
    verticalAlign: "middle"
  },
  rightcol: {
    float: "right",
    padding: "20px 10px 10px 10px"
  },
  rightcol2: {
    float: "right",
    padding: "20px 10px 10px 10px"
  },
  rightcol3: {
    float: "right",
    margin: "20px 30px 10px 10px"
  },
  rightcol3_1: {
    width: "42px"

  }

}

export default Head
