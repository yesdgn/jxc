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
import './App.css';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Head extends React.Component {
  static defaultProps = {
    favMenuData: []
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
  componentWillMount() {
    this.props.onLoadFavData();
  }

  addFavorites = () => {
    this.props.addFavorites();
  }
  menuClick = ({key}) => {
    if (`${key}` === '2') {
      dgn.storeS.removeItem("sessionKey");
      this.props.clearUser();
      this.context.router.push('/login');
    }
  };
  addMenuItem(favMenuData) {
    return( favMenuData.map((x) => {
        return(
          <Menu.Item key={x.ID}>
            <Link to={x.Path} >{x.Title}</Link>
          </Menu.Item>
        )
    }
    )
  )
};
  render() {
    const menu = (
      <Menu onClick={this.menuClick}>
        <Menu.Item key="2">注销</Menu.Item>
      </Menu>
    )

    const {userInfo} = this.props;
    return (
      <div >
        <Row type="flex" justify="center" align="middle" className="headrow">
          <Col span="1">
            <img src="logo.png"/>
          </Col>
          <Col span="4">
            <Row type="flex">
              <Col span="24">
                <h1>{APP.APPNAME}</h1>
              </Col>
            </Row>
            <Row type="flex">
              <Col span="24">
                <h3>{APP.APPURL}</h3>
              </Col>
            </Row>
          </Col>
          <Col span="15" className="headcol">
            <Row type="flex"  justify="start" align="bottom" className="favRow" >
              <Col span="24">
                <Menu onClick={this.handleClick} mode="horizontal"  theme="dark" className="favMenu">
                  {this.addMenuItem(this.props.favMenuData)}
                </Menu>
              </Col>
            </Row>
          </Col>
          <Col span="4" className="headcol">
            <Row type="flex" justify="end" align="top">
              <Col span="8">
                <Link to={`/users`} style={styles.rightcol3}>
                  <Tooltip title="消息">
                    <Badge count={33} overflowCount={9}>
                      <Icon type="mail" style={styles.rightcol3_1}/>
                    </Badge>
                  </Tooltip>
                </Link>
              </Col>
              <Col span="8">
                <a style={styles.rightcol2} onClick={this.addFavorites}>
                  <Tooltip title="收藏本页"><Icon type="star-o"/></Tooltip>
                </a>
              </Col>
              <Col span="8">
                <Dropdown overlay={menu} style={styles.rightcol}>
                  <Link to={`users/` + userInfo.UserID} className="ant-dropdown-link">
                    {userInfo.Name}<Icon type="down"/>
                  </Link>
                </Dropdown>
              </Col>
            </Row>
          </Col>
        </Row>
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
