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
import {connect} from 'react-redux'
import {readSuppliers} from '../../redux/actions';
import {storeS} from '../../common/dgn';
const confirm = Modal.confirm;

const pageSize = 10;
const columns = [
  {
    title: '供应商代码',
    dataIndex: 'CompCode',
    key: 'CompCode'
  }, {
    title: '供应商名称',
    dataIndex: 'CompName',
    key: 'CompName'
  }, {
    title: '供应商地址',
    dataIndex: 'CompAddr',
    key: 'CompAddr'
  }, {
    title: '供应商电话',
    dataIndex: 'CompTel',
    key: 'CompTel'
  }, {
    title: '操作',
    key: 'operation',
    render(text, record) {
      return (
        <span>
          <Link to={`/supplier/` + record.CompID}>编辑</Link>
        </span>
      );
    }
  }
]

class Suppliers extends React.Component {
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
      this.props.dispatch(readSuppliers(pageSize, JSON.parse(paginationPage).currentPage));
    }
    else {
      this.props.dispatch(readSuppliers(pageSize, this.state.currentPage ));
    }

  }
  componentWillUnmount() {
    storeS.setItem("pagination", JSON.stringify({currentPage: this.state.currentPage, path: this.props.route.path}));
  }
  handlePageChange = (current) => {
    this.setState({currentPage: current})
    this.props.dispatch(readSuppliers(pageSize, current));
  }
  render() {
    const pagination = {
      total: this.props.dataSource0? this.props.dataSource0.length:0,
      defaultCurrent: this.state.currentPage,
      onChange: this.handlePageChange
    };
    return (
      <div>
        <Row type="flex" justify="center" align="end" style={{
          margin: 10
        }}>
          <Col span="2">

            <Link to="/supplier/0">
              <Button type="primary">新增</Button>
            </Link>

          </Col>
          <Col span="2">
            <Button type="primary">导出</Button>
          </Col>
        </Row>
        <Table columns={columns} rowKey={record => 'K' + record.ID} dataSource={this.props.dataSource0} pagination={pagination}/>
      </div>
    );
  }
};
function mapStateToProps(state) {
  const {supplier} = state;
  let dataSource0=supplier.suppliers;
  return {dataSource0}
}
export default   connect(mapStateToProps)(Suppliers)
