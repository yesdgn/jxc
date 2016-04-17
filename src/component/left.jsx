
'use strict';
import  React  from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';
const SubMenu = Menu.SubMenu;

class Left extends React.Component {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props) {
        super(props);
        this.state={
          current: '1',
          openKeys: []
        };
    };
    componentWillMount() {
    };
    handleClick(e) {
      console.log('click ', e);
      this.setState({
        current: e.key,
        openKeys: e.keyPath.slice(1)
      });
    };
    onToggle(info) {
      this.setState({
        openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
      });
    };
    render() {
      return(
          <Menu onClick={this.handleClick.bind(this)}
            style={styles.leftmenu}
            openKeys={this.state.openKeys}
            onOpen={this.onToggle.bind(this)}
            onClose={this.onToggle.bind(this)}
            selectedKeys={[this.state.current]}
            mode="inline">
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
              <Menu.Item key="1"><Link to={`/main`}>选项1</Link></Menu.Item>
              <Menu.Item key="2"><Link to={`/users`}>选项2</Link></Menu.Item>
              <Menu.Item key="3">选项3</Menu.Item>
              <Menu.Item key="4">选项4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
              <Menu.Item key="5">选项5</Menu.Item>
              <Menu.Item key="6">选项6</Menu.Item>
              <SubMenu key="sub3" title="三级导航">
                <Menu.Item key="7">选项7</Menu.Item>
                <Menu.Item key="8">选项8</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>导航三</span></span>}>
              <Menu.Item key="9">选项9</Menu.Item>
              <Menu.Item key="10">选项10</Menu.Item>
              <Menu.Item key="11">选项11</Menu.Item>
              <Menu.Item key="12">选项12</Menu.Item>
            </SubMenu>
          </Menu>
        );
    }
};

const styles={
  leftmenu:{
    width:"240",
    float:"left"
  }
}

export default Left
