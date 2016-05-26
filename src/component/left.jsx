'use strict';
import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router';
const SubMenu = Menu.SubMenu;

var menuArray = [];
class Left extends React.Component {
  static defaultProps = {
    menuData: []
  };
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      openKeys: []
    };
  };
  handleClick=(e)=> {
    //  console.log('click ', e);
    this.setState({current: e.key, openKeys: e.keyPath.slice(1)});
  };
  onToggle=(info)=> {
    this.setState({
      openKeys: info.open
        ? info.keyPath
        : info.keyPath.slice(1)
    });
  };
 
  initMenu(menuData) {
    return (menuData.map((x) => {
      if (x.children) {
        return (
          <SubMenu key={x.MenuID} title={< span > <Icon type={x.Icon}/> < span > {
            x.MenuName
          } < /span></span >}>
            {this.initMenu(x.children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={x.MenuID}>
            <Link to={x.Url}>
              {x.MenuName}
            </Link>
          </Menu.Item>
        )
      }
    }))
  };
  render() {
    {/* //可以直接放在下面执行，不需要推入数组
        menuArray=[];
        menuArray.push(this.initMenu(this.props.jsonData))
        */
    }
    return (
      <Menu onClick={this.handleClick } style={styles.leftmenu} openKeys={this.state.openKeys} onOpen={this.onToggle} onClose={this.onToggle} selectedKeys={[this.state.current]} mode="inline">
        {this.initMenu(this.props.menuData)}
      </Menu>
    );
  }
};

const styles = {
  leftmenu: {
    width: "240",
    float: "left"
  }
}

export default Left
