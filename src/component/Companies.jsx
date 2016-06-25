'use strict';
import React from 'react';
import {Table, Icon,Steps ,  Row, Col,Modal } from 'antd';
import {Link} from 'react-router';
import {storeS } from '../common/dgn';
const confirm = Modal.confirm;

const pageSize=10;
const  columns= [
    {
      title: '公司代码',
      dataIndex: 'CompCode',
      key: 'CompCode'
    }, {
      title: '公司名称',
      dataIndex: 'CompName',
      key: 'CompName'
    }, {
      title: '公司电话',
      dataIndex: 'CompTel',
      key: 'CompTel'
    }, {
      title: '公司传真',
      dataIndex: 'CompFax',
      key: 'CompFax'
    }, {
      title: '公司地址',
      dataIndex: 'CompAddr',
      key: 'CompAddr'
    }, {
      title: '操作',
      key: 'operation',
      render(text, record) {
        return (<span>
          <Link to={`/company/`+record.CompID}>编辑</Link>
          </span>
        );
      }
    }
  ]



class Companies extends React.Component {
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
    this.props.onLoad(pageSize,this.state.currentPage);
    let paginationPage= storeS.getItem("pagination");
    if (paginationPage && this.props.route.path==JSON.parse(paginationPage).path)
    {
       this.setState({
        currentPage:JSON.parse(paginationPage).currentPage
      })
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
    total: this.props.personsDataSource.length>0?this.props.personsDataSource[0].PageTotalSize:0,
    defaultCurrent:this.state.currentPage,
    onChange:this.handlePageChange
    };
    return (
      <Row type="flex" justify="center" align="middle"  >
        <Col span="24" >
          <Table columns={columns}   rowKey={record => 'K'+record.UserID}
             dataSource={this.props.personsDataSource}  pagination={pagination}
             />
        </Col>
      </Row>
  );
  }
};

export default  Companies
