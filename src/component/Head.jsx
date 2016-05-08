
'use strict';
import  React  from 'react';
import { Row,Col,Menu,Dropdown,Icon,Tooltip,Badge } from 'antd';
import { Link } from 'react-router';

const onClick = function ({key}) {
  alert(`点击了菜单${key}`);
};
const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">个人信息</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">注销</Menu.Item>
    <Menu.Item key="3">退出</Menu.Item>
  </Menu>
);


class Head extends React.Component {
    static defaultProps = {
      appName:'奇怪的后台管理系统',
      appUrl:'www.qq.com',
    };
    static propTypes = {
      userInfo:React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
    };
    componentWillMount() {
    };
    addFavorites(){
      this.props.addFavorites();
    }

    render() {
      const {appUrl,appName,userInfo}=this.props;
        return(
          <div style={styles.headrow} >
            <img src="logo.png" style={styles.logoimg} />
            <div style={styles.rightcol}>
                <Dropdown overlay={menu} style={styles.rightcol}>
                  <a className="ant-dropdown-link" href="#">
                    {userInfo.userName}<Icon type="down" />
                  </a>
                </Dropdown>
            </div>
            <a style={styles.rightcol2} onClick={this.addFavorites.bind(this)}>
              <Tooltip title="收藏本页"><Icon type="star-o" /></Tooltip>
            </a>
            <Link to={`/users`} style={styles.rightcol3} >
              <Tooltip title="消息">
                <Badge count={33} overflowCount={9}   >
                  <Icon type="mail" style={styles.rightcol3_1} />
                </Badge>
              </Tooltip>
            </Link>
            <div style={styles.appcol}>
              <h1>{appName}</h1>
              <h3>{appUrl}</h3>
            </div>

          </div>
        );
    }
};

const styles={
  headrow:{
    height:"80px",
    backgroundColor:"#0d0e0e"
  },
  logoimg:{
    maxHeight:"80px",
    float:"left",
    padding:"15px"
  },
  appcol:{
    height:"80px",
    display:"table-cell",
    verticalAlign:"middle"
  },
  rightcol:{
    float:"right",
    padding:"20px 10px 10px 10px"
  },
  rightcol2:{
    float:"right",
    padding:"20px 10px 10px 10px"
  },
  rightcol3:{
    float:"right",
    margin:"20px 30px 10px 10px"
  },
  rightcol3_1:{
    width: "42px"

}

}

export default  Head
