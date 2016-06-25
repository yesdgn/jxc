'use strict';
import React from 'react';
import {Table, Icon,Steps ,  Row, Col,Modal } from 'antd';
import {Link} from 'react-router';
import {storeS } from '../common/dgn';
const confirm = Modal.confirm;

const pageSize=10;
const  columns= [
    {
      title: '商品代码',
      dataIndex: 'GoodsCode',
      key: 'GoodsCode'
    }, {
      title: '商品名称',
      dataIndex: 'GoodsName',
      key: 'GoodsName'
    }, {
      title: '商品价格',
      dataIndex: 'Price',
      key: 'Price'
    }, {
      title: '商品分类',
      dataIndex: 'GoodsCategory',
      key: 'GoodsCategory'
    }, {
      title: '标签',
      dataIndex: 'GoodsLabel',
      key: 'GoodsLabel'
    }, {
      title: '操作',
      key: 'operation',
      render(text, record) {
        return (<span>
          <Link to={`/goods/`+record.GoodsID}>编辑</Link>
          </span>
        );
      }
    }
  ]



class Goodses extends React.Component {
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
    total: this.props.dataSource.length>0?parseInt(this.props.dataSource[0].TotalSize):0,
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

export default  Goodses
