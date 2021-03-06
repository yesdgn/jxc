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
import  {APP_CONFIG} from '../entry/config';
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
  componentDidMount() {
    this.props.onLoad();
  }
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
    const userid=userInfo?userInfo.UserID:'';
    const username=userInfo?userInfo.Name:'';
    return (
      <div >
        <Row type="flex" justify="center" align="middle" className="headrow">
          <Col span="1" className="colLeftPa10">
            <img src="logo.png"/>
          </Col>
          <Col span="4" className="colLeftPa20">
                <h2>{APP_CONFIG.APPNAME}</h2>
                <h3>{APP_CONFIG.APPURL}</h3>
          </Col>
          <Col span="14" >
                <Menu onClick={this.handleClick} mode="horizontal"   theme="dark" className="favMenu">
                  {this.addMenuItem(this.props.favMenuData)}
                </Menu>
          </Col>
          <Col span="5"  className="headRightCol" >
                <Link to={`/messages`} className="colRightPa20" >
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
                  <Link to={`/person/` + userid} >
                    {username}<Icon type="down"/>
                  </Link>
                </Dropdown>
              </span>
          </Col>
        </Row>
      </div>
    );
  }
};



export default Head
