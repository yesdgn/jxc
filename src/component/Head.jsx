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

  addFavorites = () => {
    this.props.addFavorites();
  }
  menuClick = ({key}) => {
    if (`${key}` === '2') {
      this.props.logout();
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
        <Menu.Item key="2">注 销</Menu.Item>
      </Menu>
    )

    const {userInfo} = this.props;
    return (
      <div >
        <Row type="flex" justify="center" align="middle" className="headrow">
          <Col span="1" className="colLeftPa10">
            <img src="logo.png"/>
          </Col>
          <Col span="4" className="colLeftPa20">
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
            <Row type="flex" justify="end" align="middle" className="headcol">
              <Col span="24"  >
                <Link to={`/message`} className="colRightPa20" >
                  <Tooltip title="消息" >
                    <Badge count={this.props.msgQty} overflowCount={99} >
                      <Icon type="mail" className="message" />
                    </Badge>
                  </Tooltip>
                </Link>

                <a   onClick={this.addFavorites} className="colRightPa20">
                  <Tooltip title="收藏本页"><Icon type="star-o"/></Tooltip>
                </a>
                <span className="colRightPa20">
                <Dropdown overlay={menu}  >
                  <Link to={`/users/` + userInfo.UserID} className="ant-dropdown-link">
                    {userInfo.Name}<Icon type="down"/>
                  </Link>
                </Dropdown>
              </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
};



export default Head
