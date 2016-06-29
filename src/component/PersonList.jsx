'use strict';
import React from 'react';
import {Table, Icon,Steps ,  Row, Col,Modal } from 'antd';
import {Link} from 'react-router';
import {storeS } from '../common/dgn';
const confirm = Modal.confirm;

const pageSize=10;
const  columns= [
    {
      title: '人员代码',
      dataIndex: 'Code',
      key: 'Code'
    }, {
      title: '姓名',
      dataIndex: 'Name',
      key: 'Name'
    }, {
      title: '电子邮箱',
      dataIndex: 'Email',
      key: 'Email'
    }, {
      title: '手机',
      dataIndex: 'Mobile',
      key: 'Mobile'
    }, {
      title: '头像',
      dataIndex: 'UserImages',
      key: 'UserImages'
    }, {
      title: '操作',
      key: 'operation',
      render(text, record) {
        return (<span>
          <Link to={`/person/`+record.UserID}>编辑</Link>
          </span>
        );
      }
    }
  ]



class Persons extends React.Component {
  static defaultProps = {
   };
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state={
      currentPage:1
    }
  };
  componentWillMount() {
    let paginationPage= storeS.getItem("pagination");
    if (paginationPage && this.props.route.path == JSON.parse(paginationPage).path) {
      this.setState({currentPage: JSON.parse(paginationPage).currentPage})
      this.props.onLoad(pageSize, JSON.parse(paginationPage).currentPage);
    }
    else {
      this.props.onLoad(pageSize, this.state.currentPage );
    }
  }
componentWillUnmount() {
  storeS.setItem("pagination",JSON.stringify({currentPage:this.state.currentPage,path:this.props.route.path}));
}
 handlePageChange=(current)=>{
     this.setState({
       currentPage:current
     })
     this.props.onLoad(pageSize,current);
  }
  render() {
    const pagination = {
    total: this.props.dataSource.length>0?parseInt(this.props.dataSource[0].TotalSize):this.props.dataSource.length,
    defaultCurrent:this.state.currentPage,
    onChange:this.handlePageChange
    };
    return (
      <Row type="flex" justify="center" align="middle"  >
        <Col span="24" >
          <Table columns={columns}   rowKey={record => 'K'+record.ID}
             dataSource={this.props.dataSource}  pagination={pagination}
             />
        </Col>
      </Row>
  );
  }
};

export default  Persons
