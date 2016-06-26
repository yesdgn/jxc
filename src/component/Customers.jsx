'use strict';
import React from 'react';
import {
  Table,
  Icon,
  Steps,
  Row,
  Col,
  Modal,
  Button
} from 'antd';
import {Link} from 'react-router';
import {storeS} from '../common/dgn';
const confirm = Modal.confirm;

const pageSize = 10;
const columns = [
  {
    title: '客户代码',
    dataIndex: 'CompCode',
    key: 'CompCode'
  }, {
    title: '客户名称',
    dataIndex: 'CompName',
    key: 'CompName'
  }, {
    title: '客户地址',
    dataIndex: 'CompAddr',
    key: 'CompAddr'
  }, {
    title: '客户电话',
    dataIndex: 'CompTel',
    key: 'CompTel'
  }, {
    title: '公司类型',
    dataIndex: 'CompType',
    key: 'CompType'
  }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <span>
          <Link to={`/customer/` + record.CompID}>编辑</Link>
        </span>
      );
    }
  }
]

class Customers extends React.Component {
  static defaultProps = {};
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  };
  componentWillMount() {
    let paginationPage = storeS.getItem("pagination");
    if (paginationPage && this.props.route.path == JSON.parse(paginationPage).path) {
      this.setState({currentPage: JSON.parse(paginationPage).currentPage})
      this.props.onLoad(pageSize, JSON.parse(paginationPage).currentPage);
    }
    else {
      this.props.onLoad(pageSize, this.state.currentPage );
    }

  }
  componentWillUnmount() {
    storeS.setItem("pagination", JSON.stringify({currentPage: this.state.currentPage, path: this.props.route.path}));
  }
  handlePageChange = (current) => {
    this.setState({currentPage: current})
    this.props.onLoad(pageSize, current);
  }
  render() {
    const pagination = {
      total: this.props.dataSource.length > 0
        ? parseInt(this.props.dataSource[0].TotalSize)
        : this.props.dataSource.length,
      defaultCurrent: this.state.currentPage,
      onChange: this.handlePageChange
    };
    return (
      <div>
        <Row type="flex" justify="center" align="end" style={{
          margin: 10
        }}>
          <Col span="2">

            <Button type="primary">
              <Link to="/customer/0">新增</Link>
            </Button>

          </Col>
          <Col span="2">
            <Button type="primary">导出</Button>
          </Col>
        </Row>
        <Table columns={columns} rowKey={record => 'K' + record.ID} dataSource={this.props.dataSource} pagination={pagination}/>
      </div>
    );
  }
};

export default Customers
